import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { PropertyModel } from "@/lib/models";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import { updatePropertySchema } from "@/lib/validations/property";
import {
  successResponse,
  errorResponse,
  handleRouteError,
} from "@/lib/api-response";

type RouteContext = { params: Promise<{ id: string }> };

// ─── PATCH /api/landlord/properties/[id] — update own property ───────────────

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireRole([UserRole.LANDLORD]);
    const { id } = await params;

    await connectDB();

    const property = await PropertyModel.findById(id);
    if (!property) return errorResponse("Property not found", 404);
    if (property.landlordId.toString() !== user._id.toString()) {
      return errorResponse("Forbidden", 403);
    }

    const body = await req.json();
    // Prevent overriding landlordId from body
    const { landlordId: _omit, ...rawData } = body;
    const data = updatePropertySchema.parse(rawData);

    // Re-denormalize if address changed
    if (data.address) {
      (data as Record<string, unknown>).city = data.address.city;
      (data as Record<string, unknown>).state = data.address.state;
      (data as Record<string, unknown>).pincode = data.address.pincode;
    }

    const updated = await PropertyModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();

    return successResponse("Property updated successfully", { property: updated });
  } catch (error) {
    return handleRouteError(error, "PATCH /api/landlord/properties/[id]");
  }
}

// ─── DELETE /api/landlord/properties/[id] — hard delete own property ─────────

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireRole([UserRole.LANDLORD]);
    const { id } = await params;

    await connectDB();

    const property = await PropertyModel.findById(id);
    if (!property) return errorResponse("Property not found", 404);
    if (property.landlordId.toString() !== user._id.toString()) {
      return errorResponse("Forbidden", 403);
    }

    await PropertyModel.findByIdAndDelete(id);

    return successResponse("Property deleted successfully");
  } catch (error) {
    return handleRouteError(error, "DELETE /api/landlord/properties/[id]");
  }
}
