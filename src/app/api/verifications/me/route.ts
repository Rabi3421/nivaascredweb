import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/current-user";
import connectDB from "@/lib/db";
import { VerificationModel } from "@/lib/models";
import { handleRouteError, successResponse } from "@/lib/api-response";

export async function GET(_req: NextRequest) {
  try {
    const user = await requireAuth();

    await connectDB();

    const verifications = await VerificationModel.find({ userId: user._id })
      .populate({
        path: "propertyId",
        select: "title city state verificationStatus",
      })
      .sort({ createdAt: -1 })
      .lean();

    return successResponse("Verifications fetched successfully", {
      verifications,
    });
  } catch (error) {
    return handleRouteError(error, "GET /api/verifications/me");
  }
}
