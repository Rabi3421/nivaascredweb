import { NextRequest } from "next/server";
import { z } from "zod";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import { errorResponse, handleRouteError, successResponse } from "@/lib/api-response";
import { UserModel } from "@/lib/models";
import { recalculateUserScore } from "@/lib/scoring/calculate-score";

const recalculateUserSchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
});

export async function POST(req: NextRequest) {
  try {
    const admin = await requireRole([UserRole.ADMIN, UserRole.SUPERADMIN]);
    const data = recalculateUserSchema.parse(await req.json());
    const user = await UserModel.findById(data.userId).select("role").lean();

    if (!user) {
      return errorResponse("User not found", 404);
    }

    const score = await recalculateUserScore(user._id, user.role, {
      reason: "Admin requested score recalculation",
      appliedBy: admin._id,
    });

    return successResponse("User score recalculated successfully", score);
  } catch (error) {
    return handleRouteError(error, "POST /api/admin/scores/recalculate-user");
  }
}
