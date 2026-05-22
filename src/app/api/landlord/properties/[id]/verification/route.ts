import { NextRequest } from "next/server";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import connectDB from "@/lib/db";
import { PropertyModel, VerificationModel } from "@/lib/models";
import { createPropertyVerificationSchema } from "@/lib/validations/verification";
import {
  createdResponse,
  errorResponse,
  handleRouteError,
} from "@/lib/api-response";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireRole([UserRole.LANDLORD]);
    const { id } = await params;
    const data = createPropertyVerificationSchema.parse(await req.json());

    await connectDB();

    const property = await PropertyModel.findById(id);
    if (!property) {
      return errorResponse("Property not found", 404);
    }
    if (property.landlordId.toString() !== user._id.toString()) {
      return errorResponse("Forbidden", 403);
    }

    const verification = await VerificationModel.create({
      userId: user._id,
      propertyId: property._id,
      type: "property",
      status: "pending",
      adminNotes: data.notes,
      submittedAt: new Date(),
      documents: [
        {
          type: "property_deed",
          fileUrl: data.documentUrl,
          fileName: data.documentUrl.split("/").pop() || "property-document",
          fileSizeBytes: 1,
          mimeType: "application/octet-stream",
          uploadedAt: new Date(),
        },
      ],
    });

    property.verificationStatus = "pending";
    await property.save();

    return createdResponse("Property verification request submitted successfully", {
      verification,
      property,
    });
  } catch (error) {
    return handleRouteError(error, "POST /api/landlord/properties/[id]/verification");
  }
}
