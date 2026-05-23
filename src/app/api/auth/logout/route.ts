import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { UserModel } from "@/lib/models";
import { getRefreshTokenFromCookies, clearAuthCookies } from "@/lib/auth/cookies";
import { verifyAccessToken, verifyRefreshToken } from "@/lib/auth/tokens";
import { successResponse } from "@/lib/api-response";

function isMobileClient(req: NextRequest): boolean {
  return req.headers.get("x-client-type") === "mobile";
}

async function getMobileRefreshToken(req: NextRequest): Promise<string | undefined> {
  try {
    const body = (await req.json()) as { refreshToken?: string };
    return body.refreshToken;
  } catch {
    return undefined;
  }
}

function getBearerToken(req: NextRequest): string | undefined {
  const authorization = req.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return undefined;
  return authorization.slice("Bearer ".length).trim();
}

export async function POST(req: NextRequest) {
  const response = successResponse("Logged out successfully");

  try {
    const mobileClient = isMobileClient(req);
    const refreshToken = mobileClient
      ? await getMobileRefreshToken(req)
      : await getRefreshTokenFromCookies();
    const bearerToken = mobileClient ? getBearerToken(req) : undefined;

    if (refreshToken) {
      const decoded = verifyRefreshToken(refreshToken);
      await connectDB();
      await UserModel.findByIdAndUpdate(decoded.userId, {
        $unset: { refreshTokenHash: "" },
      });
    } else if (bearerToken) {
      const decoded = verifyAccessToken(bearerToken);
      await connectDB();
      await UserModel.findByIdAndUpdate(decoded.userId, {
        $unset: { refreshTokenHash: "" },
      });
    }
  } catch {
    // Always clear cookies regardless of token validity
  }

  if (!isMobileClient(req)) {
    clearAuthCookies(response as NextResponse);
  }
  return response;
}
