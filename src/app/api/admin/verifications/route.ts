import { NextRequest } from "next/server";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import connectDB from "@/lib/db";
import { UserModel, VerificationModel } from "@/lib/models";
import { adminVerificationFiltersSchema } from "@/lib/validations/verification";
import { handleRouteError, successResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await requireRole([UserRole.ADMIN, UserRole.SUPERADMIN]);
    const sp = new URL(req.url).searchParams;
    const filters = adminVerificationFiltersSchema.parse({
      status: sp.get("status") ?? undefined,
      type: sp.get("type") ?? undefined,
      userRole: sp.get("userRole") ?? undefined,
      page: sp.get("page") ? Number(sp.get("page")) : 1,
      limit: sp.get("limit") ? Number(sp.get("limit")) : 20,
    });

    await connectDB();

    const query: Record<string, unknown> = {};
    if (filters.status) query.status = filters.status;
    if (filters.type) query.type = filters.type;
    if (filters.userRole) {
      const users = await UserModel.find({ role: filters.userRole as UserRole })
        .select("_id")
        .lean();
      query.userId = { $in: users.map((user) => user._id) };
    }

    const skip = (filters.page - 1) * filters.limit;
    const [verifications, total] = await Promise.all([
      VerificationModel.find(query)
        .populate({ path: "userId", select: "fullName email role avatar" })
        .populate({ path: "propertyId", select: "title city state verificationStatus" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(filters.limit)
        .lean(),
      VerificationModel.countDocuments(query),
    ]);

    return successResponse("Verifications fetched successfully", {
      verifications,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages: Math.ceil(total / filters.limit),
      },
    });
  } catch (error) {
    return handleRouteError(error, "GET /api/admin/verifications");
  }
}
