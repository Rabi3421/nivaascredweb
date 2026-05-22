import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { UserModel } from "@/lib/models";
import { getRefreshTokenFromCookies, clearAuthCookies } from "@/lib/auth/cookies";
import { verifyRefreshToken } from "@/lib/auth/tokens";
import { successResponse } from "@/lib/api-response";

export async function POST() {
  const response = successResponse("Logged out successfully");

  try {
    const refreshToken = await getRefreshTokenFromCookies();

    if (refreshToken) {
      const decoded = verifyRefreshToken(refreshToken);
      await connectDB();
      await UserModel.findByIdAndUpdate(decoded.userId, {
        $unset: { refreshTokenHash: "" },
      });
    }
  } catch {
    // Always clear cookies regardless of token validity
  }

  clearAuthCookies(response as NextResponse);
  return response;
}
