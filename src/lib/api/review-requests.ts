import { apiClient } from "@/lib/api/client";
import type {
  CreateReviewRequestInput,
  UpdateReviewRequestStatusInput,
} from "@/lib/validations/review";
import type { ApiRentalHistory, ApiRentalProperty, ApiRentalUser } from "./rental-histories";

export type ReviewRequestStatus = "pending" | "completed" | "declined" | "expired";

export interface ApiReviewRequest {
  _id: string;
  rentalHistoryId: ApiRentalHistory | string;
  requesterId: ApiRentalUser | string;
  recipientId: string;
  propertyId: ApiRentalProperty | string;
  reviewerRole: "tenant" | "landlord";
  status: ReviewRequestStatus;
  reviewId?: string | null;
  expiresAt: string;
  reminderCount: number;
  lastReminderAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function createReviewRequest(
  data: CreateReviewRequestInput
): Promise<ApiReviewRequest> {
  const res = await apiClient.post<{ reviewRequest: ApiReviewRequest }>(
    "/review-requests",
    data
  );
  return res.data!.reviewRequest;
}

export async function getReviewRequests(): Promise<ApiReviewRequest[]> {
  const res = await apiClient.get<{ reviewRequests: ApiReviewRequest[] }>(
    "/review-requests"
  );
  return res.data!.reviewRequests;
}

export async function updateReviewRequestStatus(
  id: string,
  data: UpdateReviewRequestStatusInput
): Promise<ApiReviewRequest> {
  const res = await apiClient.patch<{ reviewRequest: ApiReviewRequest }>(
    `/review-requests/${id}`,
    data
  );
  return res.data!.reviewRequest;
}

export const REVIEW_REQUEST_STATUS_LABELS: Record<ReviewRequestStatus, string> = {
  pending: "Pending",
  completed: "Completed",
  declined: "Declined",
  expired: "Expired",
};
