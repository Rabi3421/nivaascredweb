import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { ApplicationModel, PropertyModel } from "@/lib/models";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import { createApplicationSchema } from "@/lib/validations/application";
import {
  createdResponse,
  errorResponse,
  handleRouteError,
} from "@/lib/api-response";

const DEFAULT_MESSAGE =
  "I am interested in this property and would like to apply.";

// ─── POST /api/applications — tenant submits application ──────────────────────

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole([UserRole.TENANT]);

    const body = await req.json();
    const data = createApplicationSchema.parse(body);

    await connectDB();

    // Verify property exists and is in a state that accepts applications
    const property = await PropertyModel.findById(data.propertyId).lean();
    if (!property) {
      return errorResponse("Property not found", 404);
    }
    if (!["available", "rented"].includes(property.availabilityStatus)) {
      return errorResponse(
        "This property is not currently accepting applications",
        400
      );
    }

    // Check for any existing application by this tenant for this property.
    // The model enforces a unique index on {propertyId, tenantId}, so only one
    // application can ever exist per (tenant, property) pair.
    const existing = await ApplicationModel.findOne({
      propertyId: data.propertyId,
      tenantId: user._id,
    }).lean();

    if (existing) {
      const blockingStatuses = ["pending", "shortlisted", "approved", "under_review"];
      if (blockingStatuses.includes(existing.status)) {
        return errorResponse(
          `You already have an active application for this property (status: ${existing.status})`,
          409
        );
      }
      // rejected / withdrawn / expired: the DB unique index still prevents a new row
      return errorResponse(
        "You have already applied to this property. Contact the landlord to reconsider.",
        409
      );
    }

    const application = new ApplicationModel({
      propertyId: data.propertyId,
      tenantId: user._id,
      landlordId: property.landlordId,
      message: data.message ?? DEFAULT_MESSAGE,
      moveInDate: data.moveInDate ? new Date(data.moveInDate) : undefined,
      status: "pending",
    });

    await application.save();

    return createdResponse("Application submitted successfully", { application });
  } catch (error) {
    return handleRouteError(error, "POST /api/applications");
  }
}
