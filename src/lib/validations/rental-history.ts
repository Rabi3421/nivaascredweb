import { z } from "zod";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export const RENTAL_HISTORY_STATUSES = ["active", "completed", "terminated"] as const;

const dateString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Invalid date format");

export const createRentalHistorySchema = z
  .object({
    applicationId: z.string().regex(OBJECT_ID_REGEX, "Invalid application ID format"),
    startDate: dateString,
    endDate: dateString.optional(),
    monthlyRent: z.number({ error: "Monthly rent must be a number" }).positive(),
    depositAmount: z.number({ error: "Deposit amount must be a number" }).min(0),
    status: z.enum(RENTAL_HISTORY_STATUSES).default("active"),
  })
  .refine(
    (data) => !data.endDate || new Date(data.endDate) > new Date(data.startDate),
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

export const updateRentalHistorySchema = z
  .object({
    startDate: dateString.optional(),
    endDate: dateString.optional().nullable(),
    monthlyRent: z.number({ error: "Monthly rent must be a number" }).positive().optional(),
    depositAmount: z.number({ error: "Deposit amount must be a number" }).min(0).optional(),
    status: z.enum(RENTAL_HISTORY_STATUSES).optional(),
  })
  .refine(
    (data) =>
      !data.startDate ||
      !data.endDate ||
      new Date(data.endDate) > new Date(data.startDate),
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

export type CreateRentalHistoryInput = z.infer<typeof createRentalHistorySchema>;
export type UpdateRentalHistoryInput = z.infer<typeof updateRentalHistorySchema>;
