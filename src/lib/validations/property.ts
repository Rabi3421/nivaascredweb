import { z } from "zod";

// ─── Enum values (mirror Property.model.ts) ───────────────────────────────────

export const PROPERTY_TYPES = [
  "1BHK",
  "2BHK",
  "3BHK",
  "4BHK",
  "Studio",
  "Villa",
  "PG",
] as const;

export const FURNISHING_STATUSES = [
  "unfurnished",
  "semi_furnished",
  "fully_furnished",
] as const;

export const AVAILABILITY_STATUSES = [
  "available",
  "rented",
  "inactive",
  "pending_review",
] as const;

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

const addressSchema = z.object({
  line1: z.string().min(1, "Address line 1 is required").max(200).trim(),
  line2: z.string().max(200).trim().optional(),
  locality: z.string().min(1, "Locality is required").max(100).trim(),
  city: z.string().min(1, "City is required").max(100).trim(),
  state: z.string().min(1, "State is required").max(100).trim(),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
});

const imageInputSchema = z.object({
  url: z.string().url("Invalid image URL"),
  alt: z.string().max(200).trim().optional(),
  isPrimary: z.boolean(),
});

// ─── Create schema ────────────────────────────────────────────────────────────

export const createPropertySchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(150, "Title must be at most 150 characters")
    .trim(),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(3000, "Description must be at most 3000 characters")
    .trim(),
  address: addressSchema,
  rentAmount: z
    .number({ error: "Rent amount must be a number" })
    .min(1000, "Rent must be at least ₹1,000"),
  depositAmount: z
    .number({ error: "Deposit must be a number" })
    .min(0, "Deposit cannot be negative"),
  maintenanceCharges: z.number().min(0).optional(),
  propertyType: z.enum(PROPERTY_TYPES, { error: "Invalid property type" }),
  furnishingStatus: z.enum(FURNISHING_STATUSES, {
    error: "Invalid furnishing status",
  }),
  bedrooms: z
    .number({ error: "Bedrooms must be a number" })
    .int()
    .min(0)
    .max(20),
  bathrooms: z
    .number({ error: "Bathrooms must be a number" })
    .int()
    .min(1)
    .max(20),
  areaSqFt: z.number().min(100).optional(),
  images: z.array(imageInputSchema).optional(),
  amenities: z.array(z.string().trim()).optional(),
  preferredTenants: z.array(z.string().trim()).optional(),
  petsAllowed: z.boolean().optional(),
  availabilityStatus: z.enum(AVAILABILITY_STATUSES).optional(),
  availableFrom: z.string().optional(),
  noticePeriodDays: z.number().int().min(0).optional(),
});

// ─── Update schema (all fields optional) ─────────────────────────────────────

export const updatePropertySchema = z.object({
  title: z.string().min(10).max(150).trim().optional(),
  description: z.string().min(50).max(3000).trim().optional(),
  address: addressSchema.optional(),
  rentAmount: z.number().min(1000).optional(),
  depositAmount: z.number().min(0).optional(),
  maintenanceCharges: z.number().min(0).optional(),
  propertyType: z.enum(PROPERTY_TYPES).optional(),
  furnishingStatus: z.enum(FURNISHING_STATUSES).optional(),
  bedrooms: z.number().int().min(0).max(20).optional(),
  bathrooms: z.number().int().min(1).max(20).optional(),
  areaSqFt: z.number().min(100).optional(),
  images: z.array(imageInputSchema).optional(),
  amenities: z.array(z.string().trim()).optional(),
  preferredTenants: z.array(z.string().trim()).optional(),
  petsAllowed: z.boolean().optional(),
  availabilityStatus: z.enum(AVAILABILITY_STATUSES).optional(),
  availableFrom: z.string().optional(),
  noticePeriodDays: z.number().int().min(0).optional(),
});

// ─── Search / filter schema ───────────────────────────────────────────────────

export const propertySearchSchema = z.object({
  city: z.string().trim().optional(),
  propertyType: z.enum(PROPERTY_TYPES).optional(),
  furnishingStatus: z.enum(FURNISHING_STATUSES).optional(),
  minRent: z.number().min(0).optional(),
  maxRent: z.number().min(0).optional(),
  search: z.string().trim().optional(),
  page: z.number().int().min(1),
  limit: z.number().int().min(1).max(50),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
export type PropertySearchInput = z.infer<typeof propertySearchSchema>;
