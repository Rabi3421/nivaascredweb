import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import {
  NotificationModel,
  RentalHistoryModel,
  ReviewRequestModel,
} from "@/lib/models";
import { UserRole } from "@/lib/constants/roles";
import { requireAuth, requireRole } from "@/lib/auth/current-user";
import { createReviewRequestSchema } from "@/lib/validations/review";
import {
  createdResponse,
  errorResponse,
  handleRouteError,
  successResponse,
} from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole([UserRole.TENANT, UserRole.LANDLORD]);
    const data = createReviewRequestSchema.parse(await req.json());

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

    const recipientId = isTenant
      ? rentalHistory.landlordId
      : rentalHistory.tenantId;

    const existing = await ReviewRequestModel.findOne({
      rentalHistoryId: rentalHistory._id,
      requesterId: user._id,
      recipientId,
      status: "pending",
    }).lean();
    if (existing) {
      return errorResponse("A pending review request already exists", 409);
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const reviewRequest = await ReviewRequestModel.create({
      rentalHistoryId: rentalHistory._id,
      requesterId: user._id,
      recipientId,
      propertyId: rentalHistory.propertyId,
      reviewerRole: isTenant ? UserRole.LANDLORD : UserRole.TENANT,
      status: "pending",
      expiresAt,
    });

    await NotificationModel.create({
      userId: recipientId,
      title: "Review requested",
      message:
        data.message ||
        `${user.fullName} requested a review for your rental experience.`,
      type: "review_request",
      channels: ["in_app"],
      actionUrl: isTenant ? "/landlord/reviews" : "/tenant/reviews",
      data: {
        rentalHistoryId: rentalHistory._id.toString(),
        reviewRequestId: reviewRequest._id.toString(),
      },
    });

    return createdResponse("Review request created successfully", {
      reviewRequest,
    });
  } catch (error) {
    return handleRouteError(error, "POST /api/review-requests");
  }
}

export async function GET(_req: NextRequest) {
  try {
    const user = await requireAuth();

    await connectDB();

    const reviewRequests = await ReviewRequestModel.find({ recipientId: user._id })
      .populate({
        path: "requesterId",
        select: "fullName avatar role",
      })
      .populate({
        path: "rentalHistoryId",
        select: "startDate endDate status monthlyRent",
      })
      .populate({
        path: "propertyId",
        select: "title city state rentAmount images",
      })
      .sort({ createdAt: -1 })
      .lean();

    return successResponse("Review requests fetched successfully", {
      reviewRequests,
    });
  } catch (error) {
    return handleRouteError(error, "GET /api/review-requests");
  }
}
