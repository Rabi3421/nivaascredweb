import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { RentalHistoryModel, ReviewModel, ReviewRequestModel } from "@/lib/models";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import { createReviewSchema } from "@/lib/validations/review";
import { recalculateUsersSafely } from "@/lib/scoring/calculate-score";
import {
  createdResponse,
  errorResponse,
  handleRouteError,
} from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole([UserRole.TENANT, UserRole.LANDLORD]);
    const data = createReviewSchema.parse(await req.json());

    await connectDB();

    const rentalHistory = await RentalHistoryModel.findById(data.rentalHistoryId);
    if (!rentalHistory) {
      return errorResponse("Rental history not found", 404);
    }

    const userId = user._id.toString();
    const isTenant = rentalHistory.tenantId.toString() === userId;
    const isLandlord = rentalHistory.landlordId.toString() === userId;
    if (!isTenant && !isLandlord) {
      return errorResponse("Forbidden", 403);
    }

    const existing = await ReviewModel.findOne({
      rentalHistoryId: rentalHistory._id,
      reviewerId: user._id,
    }).lean();
    if (existing) {
      return errorResponse("You have already reviewed this rental history", 409);
    }

    const reviewerRole = isLandlord ? "landlord" : "tenant";
    const revieweeRole = isLandlord ? "tenant" : "landlord";

    const review = new ReviewModel({
      rentalHistoryId: rentalHistory._id,
      propertyId: rentalHistory.propertyId,
      reviewerId: user._id,
      reviewerRole,
      revieweeId: isLandlord ? rentalHistory.tenantId : rentalHistory.landlordId,
      revieweeRole,
      rating: data.rating,
      title: data.title,
      comment: data.comment,
      tags: data.tags ?? [],
      isVerified: true,
      moderationStatus: "approved",
    });
    await review.save();

    if (isLandlord) {
      rentalHistory.landlordReviewId = review._id;
    } else {
      rentalHistory.tenantReviewId = review._id;
    }
    await rentalHistory.save();

    try {
      await ReviewRequestModel.findOneAndUpdate(
        {
          rentalHistoryId: review.rentalHistoryId,
          requesterId: review.revieweeId,
          recipientId: review.reviewerId,
          status: "pending",
        },
        {
          $set: {
            status: "completed",
            reviewId: review._id,
          },
        }
      );
    } catch (reviewRequestError) {
      console.error(
        "[POST /api/reviews] Failed to complete related review request",
        reviewRequestError
      );
    }

    await recalculateUsersSafely([
      { userId: review.reviewerId, role: reviewerRole },
      { userId: review.revieweeId, role: revieweeRole },
    ]);

    return createdResponse("Review created successfully", { review });
  } catch (error) {
    return handleRouteError(error, "POST /api/reviews");
  }
}
