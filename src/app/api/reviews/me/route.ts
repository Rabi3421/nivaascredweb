import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { ReviewModel } from "@/lib/models";
import { requireAuth } from "@/lib/auth/current-user";
import { handleRouteError, successResponse } from "@/lib/api-response";

export async function GET(_req: NextRequest) {
  try {
    const user = await requireAuth();

    await connectDB();

    const reviews = await ReviewModel.find({ revieweeId: user._id })
      .populate({
        path: "reviewerId",
        select: "fullName avatar role",
      })
      .populate({
        path: "propertyId",
        select: "title city state",
      })
      .sort({ createdAt: -1 })
      .lean();

    return successResponse("Received reviews fetched successfully", { reviews });
  } catch (error) {
    return handleRouteError(error, "GET /api/reviews/me");
  }
}
