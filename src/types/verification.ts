/** Status of a single verification request document — distinct from the UI VerificationStatus dict in user.ts */
export type VerificationDocStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected"
  | "expired";

export type VerificationType =
  | "identity" // Aadhaar / Passport
  | "income" // Salary slip / ITR
  | "employment" // Offer letter / Employment certificate
  | "property" // Property deed / Registry
  | "background" // Police verification
  | "bank"; // Cancelled cheque / bank statement


export interface VerificationDocumentFile {
  type:
    | "aadhaar_front"
    | "aadhaar_back"
    | "passport"
    | "pan_card"
    | "salary_slip"
    | "itr"
    | "offer_letter"
    | "property_deed"
    | "bank_statement"
    | "police_noc"
    | "other";
  fileUrl: string; // S3 URL — access-controlled
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  uploadedAt: string;
}

/** Mirrors the `verifications` MongoDB collection */
export interface VerificationDocument {
  _id: string;
  userId: string; // ref → users
  type: VerificationType;
  status: VerificationDocStatus;
  documents: VerificationDocumentFile[];
  submittedAt: string;
  reviewedBy?: string; // ref → users (admin)
  reviewedAt?: string;
  rejectionReason?: string;
  adminNotes?: string;
  expiresAt?: string; // some verifications expire (e.g., police NOC)
  createdAt: string;
  updatedAt: string;
}

/** For the admin verifications queue */
export interface VerificationQueueItem {
  _id: string;
  userId: string;
  userFullName: string;
  userRole: "tenant" | "landlord";
  userAvatar?: string;
  type: VerificationType;
  status: VerificationDocStatus;
  documentCount: number;
  submittedAt: string;
  priority: "low" | "medium" | "high";
}

/** Request body for POST /api/verifications */
export interface SubmitVerificationPayload {
  type: VerificationType;
  documentUrls: { type: VerificationDocumentFile["type"]; url: string; fileName: string; fileSizeBytes: number }[];
}

/** Admin action on a verification */
export interface ReviewVerificationPayload {
  status: Extract<VerificationDocStatus, "approved" | "rejected">;
  rejectionReason?: string;
  adminNotes?: string;
}
