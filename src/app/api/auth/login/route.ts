import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import connectDB from "@/lib/db";
import { UserModel } from "@/lib/models";
import { comparePassword } from "@/lib/auth/password";
import { signAccessToken, signRefreshToken, hashRefreshToken } from "@/lib/auth/tokens";
import { setAuthCookies } from "@/lib/auth/cookies";
import { toSafeUser } from "@/lib/auth/current-user";
import {
  ApiError,
  successResponse,
  errorResponse,
  handleRouteError,
} from "@/lib/api-response";
import { LoginSchema } from "@/lib/validations/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = LoginSchema.parse(body);

    await connectDB();

    // Explicitly select passwordHash (excluded by default via select:false)
    const user = await UserModel.findOne({ email: input.email }).select(
      "+passwordHash"
    );

    if (!user) {
      throw new ApiError("Invalid email or password", 401);
    }

    if (!user.isActive) {
      throw new ApiError("Your account has been deactivated", 403);
    }

    if (user.isBlocked) {
      throw new ApiError("Your account has been suspended", 403);
    }

    const passwordMatch = await comparePassword(
      input.password,
      user.passwordHash
    );
    if (!passwordMatch) {
      throw new ApiError("Invalid email or password", 401);
    }

    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken(tokenPayload);

    user.refreshTokenHash = hashRefreshToken(refreshToken);
    user.lastLoginAt = new Date();
    await user.save();

    const response = successResponse("Login successful", {
      user: toSafeUser(user),
    });

    setAuthCookies(response as NextResponse, accessToken, refreshToken);
    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        errors[issue.path.join(".")] = issue.message;
      }
      return errorResponse("Validation failed", 422, errors);
    }
    return handleRouteError(error, "POST /api/auth/login");
  }
}
