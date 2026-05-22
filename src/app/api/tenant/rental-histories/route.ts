import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { RentalHistoryModel } from "@/lib/models";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import { handleRouteError, successResponse } from "@/lib/api-response";

export async function GET(_req: NextRequest) {
  try {
    const user = await requireRole([UserRole.TENANT]);

    await connectDB();

    const rentalHistories = await RentalHistoryModel.find({ tenantId: user._id })
      .populate({
        path: "landlordId",
        select: "fullName email avatar",
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
    return handleRouteError(error, "GET /api/tenant/rental-histories");
  }
}
