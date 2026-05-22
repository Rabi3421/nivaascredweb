import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/current-user";
import { handleRouteError, successResponse } from "@/lib/api-response";
import { recalculateUserScore } from "@/lib/scoring/calculate-score";

export async function POST(_req: NextRequest) {
  try {
    const user = await requireAuth();
    const score = await recalculateUserScore(user._id, user.role, {
      reason: "User requested score recalculation",
    });

    return successResponse("Score recalculated successfully", score);
  } catch (error) {
    return handleRouteError(error, "POST /api/score/recalculate");
  }
}
