import { z } from "zod";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export const REVIEW_REQUEST_STATUSES = [
  "pending",
  "completed",
  "declined",
  "expired",
] as const;

export const createReviewSchema = z.object({
  rentalHistoryId: z.string().regex(OBJECT_ID_REGEX, "Invalid rental history ID format"),
  rating: z.number({ error: "Rating must be a number" }).min(1).max(5),
  title: z.string().min(1, "Title is required").max(150).trim(),
  comment: z.string().min(20, "Comment must be at least 20 characters").max(2000).trim(),
  tags: z.array(z.string().trim().min(1).max(50)).optional(),
});

export const createReviewRequestSchema = z.object({
  rentalHistoryId: z.string().regex(OBJECT_ID_REGEX, "Invalid rental history ID format"),
  message: z.string().max(1000).trim().optional(),
});

export const updateReviewRequestStatusSchema = z.object({
  status: z.enum(["completed", "declined", "expired"], {
    error: "Status must be one of: completed, declined, expired",
  }),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type CreateReviewRequestInput = z.infer<typeof createReviewRequestSchema>;
export type UpdateReviewRequestStatusInput = z.infer<
  typeof updateReviewRequestStatusSchema
>;
