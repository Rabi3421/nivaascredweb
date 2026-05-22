import { TokenExpiredError } from "jsonwebtoken";
import connectDB from "@/lib/db";
import {
  UserModel,
  TenantProfileModel,
  LandlordProfileModel,
} from "@/lib/models";
import { UserRole } from "@/lib/constants/roles";
import { getAccessTokenFromCookies } from "@/lib/auth/cookies";
import { verifyAccessToken } from "@/lib/auth/tokens";
import { toSafeUser } from "@/lib/auth/current-user";
import {
  ApiError,
  successResponse,
  errorResponse,
  handleRouteError,
} from "@/lib/api-response";

export async function GET() {
  try {
    const token = await getAccessTokenFromCookies();
    if (!token) throw new ApiError("Unauthorized", 401);

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        return errorResponse("Access token expired", 401);
      }
      throw new ApiError("Invalid token", 401);
    }

    await connectDB();

    const user = await UserModel.findById(decoded.userId);
    if (!user || !user.isActive || user.isBlocked) {
      throw new ApiError("Unauthorized", 401);
    }

    let profile = null;
    if (user.role === UserRole.TENANT) {
      profile = await TenantProfileModel.findOne({ userId: user._id });
    } else if (user.role === UserRole.LANDLORD) {
      profile = await LandlordProfileModel.findOne({ userId: user._id });
    }

    return successResponse("User fetched successfully", {
      user: toSafeUser(user),
      profile,
    });
  } catch (error) {
    return handleRouteError(error, "GET /api/auth/me");
  }
}
