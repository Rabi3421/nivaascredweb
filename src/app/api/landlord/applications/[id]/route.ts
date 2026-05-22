import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { ApplicationModel } from "@/lib/models";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import { updateApplicationStatusSchema } from "@/lib/validations/application";
import {
  successResponse,
  errorResponse,
  handleRouteError,
} from "@/lib/api-response";

type RouteContext = { params: Promise<{ id: string }> };

// ─── PATCH /api/landlord/applications/[id] — update application status ────────

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireRole([UserRole.LANDLORD]);
    const { id } = await params;

    const body = await req.json();
    const data = updateApplicationStatusSchema.parse(body);

    await connectDB();

    const application = await ApplicationModel.findById(id);
    if (!application) {
      return errorResponse("Application not found", 404);
    }

    // Ensure this application belongs to one of the landlord's own properties
    if (application.landlordId.toString() !== user._id.toString()) {
      return errorResponse("Forbidden", 403);
    }

    application.status = data.status;

    // Store the landlord note in the most appropriate field based on new status
    if (data.landlordNote) {
      if (data.status === "rejected") {
        application.rejectionReason = data.landlordNote;
      } else {
        application.interviewNotes = data.landlordNote;
      }
    }

    if (data.status === "approved") {
      application.approvedAt = new Date();

      // When approved, reject all other pending/shortlisted applications for the same property.
      // This is safe because only one tenant can be approved per property at a time,
      // and it prevents a property from having multiple approved applications simultaneously.
      await ApplicationModel.updateMany(
        {
          propertyId: application.propertyId,
          _id: { $ne: application._id },
          status: { $in: ["pending", "shortlisted"] },
        },
        { $set: { status: "rejected" } }
      );
    }

    await application.save();

    return successResponse("Application updated successfully", { application });
  } catch (error) {
    return handleRouteError(error, "PATCH /api/landlord/applications/[id]");
  }
}
