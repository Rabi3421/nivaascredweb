import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { UserModel } from "@/lib/models";
import {
  getRefreshTokenFromCookies,
  setAuthCookies,
  clearAuthCookies,
} from "@/lib/auth/cookies";
import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
  hashRefreshToken,
  compareRefreshToken,
} from "@/lib/auth/tokens";
import { toSafeUser } from "@/lib/auth/current-user";
import {
  ApiError,
  successResponse,
  handleRouteError,
} from "@/lib/api-response";

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

export async function POST(req: NextRequest) {
  try {
    const mobileClient = isMobileClient(req);
    const refreshToken = mobileClient
      ? await getMobileRefreshToken(req)
      : await getRefreshTokenFromCookies();
    if (!refreshToken) throw new ApiError("No refresh token", 401);

    const decoded = verifyRefreshToken(refreshToken);

    await connectDB();

    // Explicitly select refreshTokenHash (excluded by default)
    const user = await UserModel.findById(decoded.userId).select(
      "+refreshTokenHash"
    );

    if (!user || !user.isActive || user.isBlocked) {
      throw new ApiError("Unauthorized", 401);
    }

    if (!user.refreshTokenHash) {
      throw new ApiError("Session expired, please log in again", 401);
    }

    const tokenValid = compareRefreshToken(refreshToken, user.refreshTokenHash);
    if (!tokenValid) {
      // Token reuse detected — invalidate the session
      await UserModel.findByIdAndUpdate(user._id, {
        $unset: { refreshTokenHash: "" },
      });
      const clearResponse = NextResponse.json(
        { success: false, message: "Invalid session, please log in again" },
        { status: 401 }
      );
      if (!mobileClient) {
        clearAuthCookies(clearResponse);
      }
      return clearResponse;
    }

    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const newAccessToken = signAccessToken(tokenPayload);
    const newRefreshToken = signRefreshToken(tokenPayload);

    user.refreshTokenHash = hashRefreshToken(newRefreshToken);
    await user.save();

    const response = successResponse("Token refreshed", {
      user: toSafeUser(user),
      ...(mobileClient
        ? { accessToken: newAccessToken, refreshToken: newRefreshToken }
        : {}),
    });

    if (!mobileClient) {
      setAuthCookies(response as NextResponse, newAccessToken, newRefreshToken);
    }
    return response;
  } catch (error) {
    return handleRouteError(error, "POST /api/auth/refresh-token");
  }
}
