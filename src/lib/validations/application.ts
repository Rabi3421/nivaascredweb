import { z } from "zod";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

// ─── Create application (tenant → property) ───────────────────────────────────

export const createApplicationSchema = z.object({
  propertyId: z
    .string()
    .regex(OBJECT_ID_REGEX, "Invalid property ID format"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message must be at most 1000 characters")
    .optional(),
  moveInDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "Invalid date format"
    ),
});

// ─── Landlord updates application status ─────────────────────────────────────
// Note: the Application model uses "approved" for the accepted state
// (the model enum is: pending | shortlisted | under_review | interview_scheduled | approved | rejected | withdrawn | expired)
// Landlords may set: pending, shortlisted, approved, rejected

export const updateApplicationStatusSchema = z.object({
  status: z.enum(["pending", "shortlisted", "approved", "rejected"], {
    error: "Status must be one of: pending, shortlisted, approved, rejected",
  }),
  landlordNote: z.string().max(500).trim().optional(),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationStatusInput = z.infer<typeof updateApplicationStatusSchema>;
