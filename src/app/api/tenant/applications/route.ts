import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { ApplicationModel } from "@/lib/models";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import { successResponse, handleRouteError } from "@/lib/api-response";

// ─── GET /api/tenant/applications — tenant's own applications ────────────────

export async function GET(_req: NextRequest) {
  try {
    const user = await requireRole([UserRole.TENANT]);

    await connectDB();

    const applications = await ApplicationModel.find({ tenantId: user._id })
      .populate({
        path: "propertyId",
        select: "title city state rentAmount images availabilityStatus",
      })
      .populate({
        path: "landlordId",
        select: "fullName avatar",
      })
      .sort({ createdAt: -1 })
      .lean();

    return successResponse("Applications fetched successfully", { applications });
  } catch (error) {
    return handleRouteError(error, "GET /api/tenant/applications");
  }
}
