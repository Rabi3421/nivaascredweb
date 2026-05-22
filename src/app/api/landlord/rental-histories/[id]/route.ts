import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { RentalHistoryModel } from "@/lib/models";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import { updateRentalHistorySchema } from "@/lib/validations/rental-history";
import { errorResponse, handleRouteError, successResponse } from "@/lib/api-response";
import { recalculateUsersSafely } from "@/lib/scoring/calculate-score";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireRole([UserRole.LANDLORD]);
    const { id } = await params;
    const data = updateRentalHistorySchema.parse(await req.json());

    await connectDB();

    const rentalHistory = await RentalHistoryModel.findById(id);
    if (!rentalHistory) {
      return errorResponse("Rental history not found", 404);
    }
    if (rentalHistory.landlordId.toString() !== user._id.toString()) {
      return errorResponse("Forbidden", 403);
    }

    const nextStartDate = data.startDate
      ? new Date(data.startDate)
      : rentalHistory.startDate;
    const nextEndDate =
      data.endDate === null
        ? undefined
        : data.endDate
        ? new Date(data.endDate)
        : rentalHistory.endDate;

    if (nextEndDate && nextEndDate <= nextStartDate) {
      return errorResponse("End date must be after start date", 400, {
        endDate: "End date must be after start date",
      });
    }

    if (data.startDate) rentalHistory.startDate = nextStartDate;
    if (data.endDate !== undefined) rentalHistory.endDate = nextEndDate;
    if (data.monthlyRent !== undefined) rentalHistory.monthlyRent = data.monthlyRent;
    if (data.depositAmount !== undefined) {
      rentalHistory.depositAmount = data.depositAmount;
    }
    if (data.status) rentalHistory.status = data.status;

    await rentalHistory.save();

    await recalculateUsersSafely([
      { userId: rentalHistory.tenantId, role: UserRole.TENANT },
      { userId: rentalHistory.landlordId, role: UserRole.LANDLORD },
    ]);

    return successResponse("Rental history updated successfully", {
      rentalHistory,
    });
  } catch (error) {
    return handleRouteError(error, "PATCH /api/landlord/rental-histories/[id]");
  }
}
