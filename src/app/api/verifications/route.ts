import { NextRequest } from "next/server";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import connectDB from "@/lib/db";
import { VerificationModel } from "@/lib/models";
import { createVerificationSchema } from "@/lib/validations/verification";
import { createdResponse, handleRouteError } from "@/lib/api-response";

function documentTypeForVerification(type: string) {
  if (type === "income") return "salary_slip";
  if (type === "employment") return "offer_letter";
  if (type === "property") return "property_deed";
  if (type === "bank") return "bank_statement";
  if (type === "background") return "police_noc";
  return "aadhaar_front";
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole([UserRole.TENANT, UserRole.LANDLORD]);
    const data = createVerificationSchema.parse(await req.json());

    await connectDB();

    const verification = await VerificationModel.create({
      userId: user._id,
      type: data.type,
      status: "pending",
      adminNotes: data.notes,
      submittedAt: new Date(),
      documents: [
        {
          type: documentTypeForVerification(data.type),
          fileUrl: data.documentUrl,
          fileName: data.documentUrl.split("/").pop() || "verification-document",
          fileSizeBytes: 1,
          mimeType: "application/octet-stream",
          uploadedAt: new Date(),
        },
      ],
    });

    return createdResponse("Verification request submitted successfully", {
      verification,
    });
  } catch (error) {
    return handleRouteError(error, "POST /api/verifications");
  }
}
