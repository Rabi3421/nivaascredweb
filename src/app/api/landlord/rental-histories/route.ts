import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { ApplicationModel, RentalHistoryModel } from "@/lib/models";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import { createRentalHistorySchema } from "@/lib/validations/rental-history";
import { recalculateUsersSafely } from "@/lib/scoring/calculate-score";
import {
  createdResponse,
  errorResponse,
  handleRouteError,
  successResponse,
} from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole([UserRole.LANDLORD]);
    const data = createRentalHistorySchema.parse(await req.json());

    await connectDB();

    const application = await ApplicationModel.findById(data.applicationId);
    if (!application) {
      return errorResponse("Application not found", 404);
    }
    if (application.landlordId.toString() !== user._id.toString()) {
      return errorResponse("Forbidden", 403);
    }
    if (application.status !== "approved") {
      return errorResponse("Rental history can only be created for approved applications", 400);
    }

    const existing = await RentalHistoryModel.findOne({
      applicationId: application._id,
    }).lean();
    if (existing) {
      return errorResponse("Rental history already exists for this application", 409);
    }

    const rentalHistory = await RentalHistoryModel.create({
      applicationId: application._id,
      tenantId: application.tenantId,
      landlordId: application.landlordId,
      propertyId: application.propertyId,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      monthlyRent: data.monthlyRent,
      depositAmount: data.depositAmount,
      status: data.status,
    });

    await recalculateUsersSafely([
      { userId: application.tenantId, role: UserRole.TENANT },
      { userId: application.landlordId, role: UserRole.LANDLORD },
    ]);

    return createdResponse("Rental history created successfully", {
      rentalHistory,
    });
  } catch (error) {
    return handleRouteError(error, "POST /api/landlord/rental-histories");
  }
}

export async function GET(_req: NextRequest) {
  try {
    const user = await requireRole([UserRole.LANDLORD]);

    await connectDB();

    const rentalHistories = await RentalHistoryModel.find({ landlordId: user._id })
      .populate({
        path: "tenantId",
        select: "fullName email phone avatar",
      })
      .populate({
        path: "propertyId",
        select: "title city state rentAmount images",
      })
      .sort({ createdAt: -1 })
      .lean();

    return successResponse("Rental histories fetched successfully", {
      rentalHistories,
    });
  } catch (error) {
    return handleRouteError(error, "GET /api/landlord/rental-histories");
  }
}
