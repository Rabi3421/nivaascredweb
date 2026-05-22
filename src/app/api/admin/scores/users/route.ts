import { NextRequest } from "next/server";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import connectDB from "@/lib/db";
import {
  LandlordProfileModel,
  TenantProfileModel,
  UserModel,
} from "@/lib/models";
import { handleRouteError, successResponse } from "@/lib/api-response";
import { DEFAULT_SCORE, getScoreGrade } from "@/lib/scoring/calculate-score";

export async function GET(req: NextRequest) {
  try {
    await requireRole([UserRole.ADMIN, UserRole.SUPERADMIN]);

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 20)));
    const role = searchParams.get("role");
    const query: Record<string, unknown> = {
      role: { $in: [UserRole.TENANT, UserRole.LANDLORD] },
    };
    if (role === UserRole.TENANT || role === UserRole.LANDLORD) {
      query.role = role;
    }

    await connectDB();

    const [users, total] = await Promise.all([
      UserModel.find(query)
        .select("fullName email role avatar")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      UserModel.countDocuments(query),
    ]);

    const tenantIds = users
      .filter((user) => user.role === UserRole.TENANT)
      .map((user) => user._id);
    const landlordIds = users
      .filter((user) => user.role === UserRole.LANDLORD)
      .map((user) => user._id);

    const [tenantProfiles, landlordProfiles] = await Promise.all([
      TenantProfileModel.find({ userId: { $in: tenantIds } })
        .select("userId rentalScore verificationStatus")
        .lean(),
      LandlordProfileModel.find({ userId: { $in: landlordIds } })
        .select("userId rentalScore verificationStatus")
        .lean(),
    ]);

    const tenantProfileMap = new Map(
      tenantProfiles.map((profile) => [profile.userId.toString(), profile])
    );
    const landlordProfileMap = new Map(
      landlordProfiles.map((profile) => [profile.userId.toString(), profile])
    );

    const scoreUsers = users.map((user) => {
      const profile =
        user.role === UserRole.TENANT
          ? tenantProfileMap.get(user._id.toString())
          : landlordProfileMap.get(user._id.toString());
      const score = profile?.rentalScore ?? DEFAULT_SCORE;
      return {
        _id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        score,
        grade: getScoreGrade(score),
        verificationStatus: profile?.verificationStatus ?? null,
      };
    });

    return successResponse("Score users fetched successfully", {
      users: scoreUsers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleRouteError(error, "GET /api/admin/scores/users");
  }
}
