import { NextRequest } from "next/server";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import connectDB from "@/lib/db";
import {
  LandlordProfileModel,
  PropertyModel,
  TenantProfileModel,
  UserModel,
  VerificationModel,
} from "@/lib/models";
import { updateVerificationStatusSchema } from "@/lib/validations/verification";
import {
  errorResponse,
  handleRouteError,
  successResponse,
} from "@/lib/api-response";
import { recalculateUsersSafely } from "@/lib/scoring/calculate-score";

type RouteContext = { params: Promise<{ id: string }> };

function profilePathForType(role: string, type: string): string | null {
  if (role === UserRole.TENANT) {
    if (["identity", "income", "employment", "background", "bank"].includes(type)) {
      return `verificationStatus.${type}`;
    }
  }
  if (role === UserRole.LANDLORD) {
    if (["identity", "property", "bank"].includes(type)) {
      return `verificationStatus.${type}`;
    }
  }
  return null;
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const admin = await requireRole([UserRole.ADMIN, UserRole.SUPERADMIN]);
    const { id } = await params;
    const data = updateVerificationStatusSchema.parse(await req.json());

    await connectDB();

    const verification = await VerificationModel.findById(id);
    if (!verification) {
      return errorResponse("Verification not found", 404);
    }

    const user = await UserModel.findById(verification.userId).select("role").lean();
    if (!user) {
      return errorResponse("Verification user not found", 404);
    }

    verification.status = data.status;
    verification.reviewedBy = admin._id;
    verification.reviewedAt = new Date();
    verification.rejectionReason =
      data.status === "rejected" ? data.rejectionReason || "Rejected by admin" : undefined;
    await verification.save();

    const isApproved = data.status === "approved";

    if (verification.propertyId) {
      await PropertyModel.findByIdAndUpdate(verification.propertyId, {
        $set: { verificationStatus: isApproved ? "approved" : "rejected" },
      });
    } else {
      const path = profilePathForType(user.role, verification.type);
      if (path) {
        const update = { $set: { [path]: isApproved } };
        if (user.role === UserRole.TENANT) {
          await TenantProfileModel.findOneAndUpdate(
            { userId: verification.userId },
            update
          );
        } else if (user.role === UserRole.LANDLORD) {
          await LandlordProfileModel.findOneAndUpdate(
            { userId: verification.userId },
            update
          );
        }
      }
    }

    await recalculateUsersSafely([
      { userId: verification.userId, role: user.role },
    ]);

    const updated = await VerificationModel.findById(verification._id)
      .populate({ path: "userId", select: "fullName email role avatar" })
      .populate({ path: "propertyId", select: "title city state verificationStatus" })
      .lean();

    return successResponse("Verification updated successfully", {
      verification: updated,
    });
  } catch (error) {
    return handleRouteError(error, "PATCH /api/admin/verifications/[id]");
  }
}
