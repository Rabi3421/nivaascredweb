import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { PropertyModel } from "@/lib/models";
import { UserRole } from "@/lib/constants/roles";
import { requireRole } from "@/lib/auth/current-user";
import { createPropertySchema } from "@/lib/validations/property";
import {
  successResponse,
  createdResponse,
  handleRouteError,
} from "@/lib/api-response";

// ─── GET /api/landlord/properties — landlord's own properties ─────────────────

export async function GET(_req: NextRequest) {
  try {
    const user = await requireRole([UserRole.LANDLORD]);

    await connectDB();

    const properties = await PropertyModel.find({ landlordId: user._id })
      .sort({ createdAt: -1 })
      .lean();

    return successResponse("Properties fetched successfully", { properties });
  } catch (error) {
    return handleRouteError(error, "GET /api/landlord/properties");
  }
}

// ─── POST /api/landlord/properties — create a new property ───────────────────

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole([UserRole.LANDLORD]);

    const body = await req.json();
    const data = createPropertySchema.parse(body);

    await connectDB();

    const property = new PropertyModel({
      ...data,
      landlordId: user._id,
      // Denormalize from address for fast filtering
      city: data.address.city,
      state: data.address.state,
      pincode: data.address.pincode,
      availabilityStatus: data.availabilityStatus ?? "available",
    });

    await property.save();

    return createdResponse("Property created successfully", { property });
  } catch (error) {
    return handleRouteError(error, "POST /api/landlord/properties");
  }
}
