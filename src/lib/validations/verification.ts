import { z } from "zod";

export const VERIFICATION_TYPES = [
  "identity",
  "income",
  "employment",
  "property",
  "background",
  "bank",
] as const;

export const VERIFICATION_STATUSES = [
  "pending",
  "under_review",
  "approved",
  "rejected",
  "expired",
] as const;

export const createVerificationSchema = z.object({
  type: z.enum(VERIFICATION_TYPES),
  documentUrl: z.string().url("Document URL must be a valid URL"),
  notes: z.string().max(1000).trim().optional(),
});

export const createPropertyVerificationSchema = z.object({
  documentUrl: z.string().url("Document URL must be a valid URL"),
  notes: z.string().max(1000).trim().optional(),
});

export const adminVerificationFiltersSchema = z.object({
  status: z.enum(VERIFICATION_STATUSES).optional(),
  type: z.enum(VERIFICATION_TYPES).optional(),
  userRole: z.enum(["tenant", "landlord"]).optional(),
  page: z.number().int().min(1),
  limit: z.number().int().min(1).max(50),
});

export const updateVerificationStatusSchema = z.object({
  status: z.enum(["approved", "rejected"], {
    error: "Status must be approved or rejected",
  }),
  rejectionReason: z.string().max(500).trim().optional(),
});

export type CreateVerificationInput = z.infer<typeof createVerificationSchema>;
export type CreatePropertyVerificationInput = z.infer<
  typeof createPropertyVerificationSchema
>;
export type UpdateVerificationStatusInput = z.infer<
  typeof updateVerificationStatusSchema
>;
