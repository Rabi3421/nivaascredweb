import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import connectDB from "@/lib/db";
import { UserModel, TenantProfileModel, LandlordProfileModel } from "@/lib/models";
import { UserRole } from "@/lib/constants/roles";
import { hashPassword } from "@/lib/auth/password";
import { signAccessToken, signRefreshToken, hashRefreshToken } from "@/lib/auth/tokens";
import { setAuthCookies } from "@/lib/auth/cookies";
import { toSafeUser } from "@/lib/auth/current-user";
import {
  ApiError,
  createdResponse,
  errorResponse,
  handleRouteError,
} from "@/lib/api-response";
import { RegisterSchema } from "@/lib/validations/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = RegisterSchema.parse(body);

    await connectDB();

    // Check uniqueness before hashing (cheap DB check first)
    const existingEmail = await UserModel.findOne({ email: input.email });
    if (existingEmail) {
      throw new ApiError("Email is already registered", 409);
    }

    if (input.phone) {
      const existingPhone = await UserModel.findOne({ phone: input.phone });
      if (existingPhone) {
        throw new ApiError("Phone number is already registered", 409);
      }
    }

    const passwordHash = await hashPassword(input.password);

    // Instantiate first to get _id before save (avoids extra DB round-trip)
    const user = new UserModel({
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      passwordHash,
      role: input.role,
    });

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

    // Create role-specific profile
    if (input.role === UserRole.TENANT) {
      await TenantProfileModel.create({ userId: user._id });
    } else {
      await LandlordProfileModel.create({ userId: user._id });
    }

    const response = createdResponse("Registration successful", {
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
    return handleRouteError(error, "POST /api/auth/register");
  }
}
