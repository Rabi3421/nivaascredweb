export type ApplicationStatus =
  | "pending"
  | "shortlisted"
  | "under_review"
  | "interview_scheduled"
  | "approved"
  | "rejected"
  | "withdrawn"
  | "expired";

export interface ApplicationDocument {
  _id: string;
  propertyId: string; // ref → properties
  tenantId: string; // ref → users
  landlordId: string; // ref → users
  status: ApplicationStatus;
  moveInDate: string; // ISO date — preferred by tenant
  proposedRent?: number; // if tenant negotiates
  message: string; // cover message from tenant
  documents: ApplicationDocument_Doc[];
  interviewScheduledAt?: string; // ISO date
  interviewNotes?: string; // landlord private
  rejectionReason?: string;
  approvedAt?: string; // ISO date — when approved, triggers rental creation
  expiresAt: string; // ISO date — auto-expire if no action taken
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationDocument_Doc {
  type: "salary_slip" | "offer_letter" | "bank_statement" | "identity_proof" | "other";
  url: string; // S3 URL
  uploadedAt: string;
  verified: boolean;
}

/** Populated application returned by the API */
export interface ApplicationResponse extends ApplicationDocument {
  tenant: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    rentalTrustScore: number;
    creditTier: string;
    profession: string;
    monthlyIncome: string;
    totalRentals: number;
    onTimePayments: number;
  };
  property: {
    _id: string;
    title: string;
    locality: string;
    city: string;
    monthlyRent: number;
    type: string;
    primaryImage?: string;
  };
}

/** Request body for POST /api/applications */
export interface CreateApplicationPayload {
  propertyId: string;
  moveInDate: string;
  proposedRent?: number;
  message: string;
}

/** Request body for PUT /api/applications/:id (landlord update) */
export interface UpdateApplicationPayload {
  status: ApplicationStatus;
  rejectionReason?: string;
  interviewScheduledAt?: string;
  interviewNotes?: string;
}
