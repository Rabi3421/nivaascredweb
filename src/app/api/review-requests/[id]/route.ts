import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { ReviewRequestModel } from "@/lib/models";
import { requireAuth } from "@/lib/auth/current-user";
import { updateReviewRequestStatusSchema } from "@/lib/validations/review";
import { errorResponse, handleRouteError, successResponse } from "@/lib/api-response";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const data = updateReviewRequestStatusSchema.parse(await req.json());

    await connectDB();

    const reviewRequest = await ReviewRequestModel.findById(id);
    if (!reviewRequest) {
      return errorResponse("Review request not found", 404);
    }
    if (reviewRequest.recipientId.toString() !== user._id.toString()) {
      return errorResponse("Forbidden", 403);
    }

    reviewRequest.status = data.status;
    await reviewRequest.save();

    return successResponse("Review request updated successfully", {
      reviewRequest,
    });
  } catch (error) {
    return handleRouteError(error, "PATCH /api/review-requests/[id]");
  }
}
