import { apiClient } from "@/lib/api/client";
import type { CreateReviewInput } from "@/lib/validations/review";

export interface ApiReviewUser {
  _id: string;
  fullName: string;
  avatar?: string | null;
  role: "tenant" | "landlord";
}

export interface ApiReviewProperty {
  _id: string;
  title: string;
  city: string;
  state: string;
}

export interface ApiReview {
  _id: string;
  reviewerId: ApiReviewUser | string;
  revieweeId: ApiReviewUser | string;
  propertyId?: ApiReviewProperty | string | null;
  rentalHistoryId: string;
  reviewerRole: "tenant" | "landlord";
  revieweeRole: "tenant" | "landlord";
  rating: number;
  title?: string;
  comment: string;
  tags: string[];
  moderationStatus: "pending" | "approved" | "flagged" | "hidden";
  createdAt: string;
  updatedAt: string;
}

export async function createReview(data: CreateReviewInput): Promise<ApiReview> {
  const res = await apiClient.post<{ review: ApiReview }>("/reviews", data);
  return res.data!.review;
}

export async function getReceivedReviews(): Promise<ApiReview[]> {
  const res = await apiClient.get<{ reviews: ApiReview[] }>("/reviews/me");
  return res.data!.reviews;
}

export async function getGivenReviews(): Promise<ApiReview[]> {
  const res = await apiClient.get<{ reviews: ApiReview[] }>("/reviews/given");
  return res.data!.reviews;
}
