export type DisputeType =
  | "deposit_refund" // tenant claims deposit not returned
  | "property_damage" // landlord claims tenant damaged property
  | "rent_payment" // dispute over unpaid/underpaid rent
  | "maintenance_neglect" // tenant claims landlord ignored maintenance
  | "unlawful_eviction" // tenant claims forced out
  | "false_review" // user claims a review is fake
  | "other";

export type DisputeStatus =
  | "open"
  | "under_review"
  | "mediation"
  | "awaiting_evidence"
  | "resolved_tenant_favor"
  | "resolved_landlord_favor"
  | "resolved_mutual"
  | "escalated"
  | "closed";

export interface DisputeMessage {
  _id: string;
  senderId: string; // ref → users
  senderRole: "tenant" | "landlord" | "admin";
  message: string;
  attachmentUrls: string[];
  createdAt: string;
}

/** Mirrors the `disputes` MongoDB collection */
export interface DisputeDocument {
  _id: string;
  rentalId: string; // ref → rental_histories
  raisedById: string; // ref → users
  againstId: string; // ref → users
  propertyId: string; // ref → properties
  type: DisputeType;
  title: string;
  description: string;
  status: DisputeStatus;
  priority: "low" | "medium" | "high" | "urgent";
  evidenceUrls: string[]; // S3 URLs
  messages: DisputeMessage[];
  adminAssignedTo?: string; // ref → users (admin)
  resolution?: string; // admin's final decision text
  resolvedAt?: string; // ISO date
  scoreImpactTenant?: number; // score change applied after resolution
  scoreImpactLandlord?: number;
  createdAt: string;
  updatedAt: string;
}

/** Request body for POST /api/disputes */
export interface CreateDisputePayload {
  rentalId: string;
  type: DisputeType;
  title: string;
  description: string;
  evidenceUrls?: string[];
}

/** Responding to an active dispute */
export interface RespondToDisputePayload {
  message: string;
  attachmentUrls?: string[];
}

/** Admin resolving a dispute */
export interface ResolveDisputePayload {
  status:
    | "resolved_tenant_favor"
    | "resolved_landlord_favor"
    | "resolved_mutual"
    | "closed";
  resolution: string;
  scoreImpactTenant?: number;
  scoreImpactLandlord?: number;
}
