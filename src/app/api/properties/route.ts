import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { PropertyModel } from "@/lib/models";
import {
  propertySearchSchema,
} from "@/lib/validations/property";
import { successResponse, handleRouteError } from "@/lib/api-response";

// ─── GET /api/properties — public, paginated, filtered ───────────────────────

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const sp = url.searchParams;

    // Coerce string params to numbers before validation
    const rawParams = {
      city: sp.get("city") ?? undefined,
      propertyType: sp.get("propertyType") ?? undefined,
      furnishingStatus: sp.get("furnishingStatus") ?? undefined,
      minRent: sp.get("minRent") ? Number(sp.get("minRent")) : undefined,
      maxRent: sp.get("maxRent") ? Number(sp.get("maxRent")) : undefined,
      search: sp.get("search") ?? undefined,
      page: sp.get("page") ? Number(sp.get("page")) : 1,
      limit: sp.get("limit") ? Number(sp.get("limit")) : 12,
    };

    const params = propertySearchSchema.parse(rawParams);

    await connectDB();

    // Build query filter
    const filter: Record<string, unknown> = {
      availabilityStatus: { $in: ["available", "rented"] },
    };

    if (params.city) {
      filter.city = { $regex: params.city, $options: "i" };
    }
    if (params.propertyType) {
      filter.propertyType = params.propertyType;
    }
    if (params.furnishingStatus) {
      filter.furnishingStatus = params.furnishingStatus;
    }
    if (params.minRent !== undefined || params.maxRent !== undefined) {
      const rentFilter: Record<string, number> = {};
      if (params.minRent !== undefined) rentFilter.$gte = params.minRent;
      if (params.maxRent !== undefined) rentFilter.$lte = params.maxRent;
      filter.rentAmount = rentFilter;
    }
    if (params.search) {
      filter.$or = [
        { title: { $regex: params.search, $options: "i" } },
        { "address.locality": { $regex: params.search, $options: "i" } },
        { city: { $regex: params.search, $options: "i" } },
      ];
    }

    const skip = (params.page - 1) * params.limit;

    const [properties, total] = await Promise.all([
      PropertyModel.find(filter)
        .populate({ path: "landlordId", select: "fullName avatar isEmailVerified" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(params.limit)
        .lean(),
      PropertyModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / params.limit);

    return successResponse("Properties fetched successfully", {
      properties,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages,
        hasNextPage: params.page < totalPages,
        hasPrevPage: params.page > 1,
      },
    });
  } catch (error) {
    return handleRouteError(error, "GET /api/properties");
  }
}
