import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/current-user";
import { successResponse, handleRouteError } from "@/lib/api-response";
import { UserRole } from "@/lib/constants/roles";
import connectDB from "@/lib/db";
import {
  LandlordProfileModel,
  ScoreLogModel,
  TenantProfileModel,
} from "@/lib/models";
import {
  DEFAULT_SCORE,
  MAX_SCORE,
  MIN_SCORE,
  ScoreBreakdown,
  getScoreGrade,
  recalculateUserScore,
} from "@/lib/scoring/calculate-score";

const STALE_AFTER_MS = 24 * 60 * 60 * 1000;

export async function GET(_req: NextRequest) {
  try {
    const user = await requireAuth();

    await connectDB();

    const latestLog = await ScoreLogModel.findOne({ userId: user._id })
      .sort({ createdAt: -1 })
      .lean();
    const isStale =
      !latestLog || Date.now() - new Date(latestLog.createdAt).getTime() > STALE_AFTER_MS;

    if (
      isStale ||
      !latestLog.metadata ||
      typeof latestLog.metadata !== "object" ||
      !("breakdown" in latestLog.metadata)
    ) {
      const calculated = await recalculateUserScore(user._id, user.role, {
        reason: "Score recalculated from GET /api/score/me",
      });
      return successResponse("Score fetched successfully", calculated);
    }

    const profile =
      user.role === UserRole.TENANT
        ? await TenantProfileModel.findOne({ userId: user._id }).lean()
        : user.role === UserRole.LANDLORD
        ? await LandlordProfileModel.findOne({ userId: user._id }).lean()
        : null;
    const score = profile?.rentalScore ?? latestLog.newScore ?? DEFAULT_SCORE;

    return successResponse("Score fetched successfully", {
      score,
      minScore: MIN_SCORE,
      maxScore: MAX_SCORE,
      grade: getScoreGrade(score),
      breakdown: latestLog.metadata.breakdown as ScoreBreakdown,
      lastCalculatedAt: latestLog.createdAt.toISOString(),
    });
  } catch (error) {
    return handleRouteError(error, "GET /api/score/me");
  }
}
