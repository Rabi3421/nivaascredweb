// ─── UI component type (ReviewSystemSection, ReviewTimeline) ──────────────────

export interface Review {
  id: string;
  type: "landlord" | "tenant";
  reviewer: string;
  reviewerImage: string;
  reviewerImageAlt: string;
  rating: number;
  property: string;
  date: string;
  text: string;
  verified: boolean;
  paymentHistory: string;
}

// ─── API / Database document types ────────────────────────────────────────────

export type ReviewerRole = "tenant" | "landlord";
export type ReviewTargetType = "user" | "property";

/** Per-category ratings included in detailed reviews */
export interface ReviewCategories {
  communication: number; // 1–5
  cleanliness: number; // 1–5
  maintenance: number; // 1–5
  // Tenant-only fields
  onTimePayment?: number; // 1–5 — landlord rating tenant
  propertyConditionLeft?: number; // 1–5 — landlord rating tenant
  // Landlord/property fields
  propertyCondition?: number; // 1–5 — tenant rating property
  valueForMoney?: number; // 1–5 — tenant rating landlord
}

/** Mirrors the `reviews` MongoDB collection */
export interface ReviewDocument {
  _id: string;
  rentalId: string; // ref → rental_histories (ensures one review per rental)
  reviewerId: string; // ref → users
  revieweeId: string; // ref → users
  propertyId: string; // ref → properties
  reviewerRole: ReviewerRole;
  targetType: ReviewTargetType;
  overallRating: number; // 1–5
  categories: ReviewCategories;
  title?: string;
  text: string;
  isVerified: boolean; // true = came from a confirmed rental
  isAnonymous: boolean;
  helpfulVotes: number;
  reportCount: number;
  landlordResponse?: string; // landlord can respond to tenant's property review
  landlordRespondedAt?: string;
  isHidden: boolean; // admin can hide
  createdAt: string;
  updatedAt: string;
}

/** Populated review returned by the API (includes reviewer/reviewee names) */
export interface ReviewResponse extends ReviewDocument {
  reviewer: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role: ReviewerRole;
  };
  property: {
    _id: string;
    title: string;
    locality: string;
    city: string;
  };
}

/** Request body for POST /api/reviews */
export interface CreateReviewPayload {
  rentalId: string;
  overallRating: number;
  categories: ReviewCategories;
  title?: string;
  text: string;
  isAnonymous?: boolean;
}

/** Mirrors the `review_requests` collection.
 *  Created automatically when a rental ends; both parties get a request. */
export interface ReviewRequest {
  _id: string;
  rentalId: string;
  requesterId: string; // the one who can fill in the review
  recipientId: string; // the one being reviewed
  reviewerRole: ReviewerRole;
  propertyId: string;
  status: "pending" | "completed" | "declined" | "expired";
  reviewId?: string; // ref → reviews (set when completed)
  expiresAt: string; // ISO date — typically 30 days after rental end
  reminderCount: number;
  lastReminderAt?: string;
  createdAt: string;
  updatedAt: string;
}
