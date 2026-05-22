import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { PropertyModel } from "@/lib/models";
import {
  successResponse,
  errorResponse,
  handleRouteError,
} from "@/lib/api-response";

// ─── GET /api/properties/[id] — public single property detail ─────────────────

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();

    const property = await PropertyModel.findById(id)
      .populate({ path: "landlordId", select: "fullName avatar isEmailVerified" })
      .lean();

    if (!property) {
      return errorResponse("Property not found", 404);
    }

    return successResponse("Property fetched successfully", { property });
  } catch (error) {
    return handleRouteError(error, "GET /api/properties/[id]");
  }
}
