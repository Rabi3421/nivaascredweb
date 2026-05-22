import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { ApplicationModel, TenantProfileModel } from "@/lib/models";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import { successResponse, handleRouteError } from "@/lib/api-response";
// ─── GET /api/landlord/applications — all apps for landlord's properties ──────

function extractId(field: unknown): string | null {
  if (!field) return null;
  if (typeof field === "string") return field;
  const obj = field as Record<string, unknown>;
  if (obj._id) return String(obj._id);
  return String(field);
}

export async function GET(_req: NextRequest) {
  try {
    const user = await requireRole([UserRole.LANDLORD]);

    await connectDB();

    const applications = await ApplicationModel.find({ landlordId: user._id })
      .populate({
        path: "tenantId",
        select: "fullName email phone avatar",
      })
      .populate({
        path: "propertyId",
        select: "title city state rentAmount",
      })
      .sort({ createdAt: -1 })
      .lean();

    if (applications.length === 0) {
      return successResponse("Applications fetched successfully", {
        applications: [],
      });
    }

    // Batch-fetch tenant profiles to include in the response
    const tenantIds = [
      ...new Set(
        applications.map((a) => extractId(a.tenantId)).filter(Boolean) as string[]
      ),
    ];

    const tenantProfiles = await TenantProfileModel.find({
      userId: { $in: tenantIds },
    })
      .select("userId occupation monthlyIncome rentalScore verificationStatus")
      .lean();

    const profilesByUserId = new Map(
      tenantProfiles.map((p) => [p.userId.toString(), p])
    );

    // Merge tenant profile into each application
    const enriched = applications.map((app) => {
      const tenantUserId = extractId(app.tenantId);
      const tenantProfile = tenantUserId
        ? (profilesByUserId.get(tenantUserId) ?? null)
        : null;

      return { ...app, tenantProfile };
    });

    return successResponse("Applications fetched successfully", {
      applications: enriched,
    });
  } catch (error) {
    return handleRouteError(error, "GET /api/landlord/applications");
  }
}
