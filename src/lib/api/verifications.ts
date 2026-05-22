import { apiClient } from "@/lib/api/client";
import type {
  CreatePropertyVerificationInput,
  CreateVerificationInput,
  UpdateVerificationStatusInput,
} from "@/lib/validations/verification";

export type VerificationType =
  | "identity"
  | "income"
  | "employment"
  | "property"
  | "background"
  | "bank";

export type VerificationStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected"
  | "expired";

export interface ApiVerificationUser {
  _id: string;
  fullName: string;
  email: string;
  role: "tenant" | "landlord" | "admin" | "superadmin";
  avatar?: string | null;
}

export interface ApiVerificationProperty {
  _id: string;
  title: string;
  city: string;
  state: string;
  verificationStatus?: "unverified" | "pending" | "approved" | "rejected";
}

export interface ApiVerification {
  _id: string;
  userId: string | ApiVerificationUser;
  propertyId?: string | ApiVerificationProperty | null;
  type: VerificationType;
  status: VerificationStatus;
  documents: Array<{
    type: string;
    fileUrl: string;
    fileName: string;
    fileSizeBytes: number;
    mimeType: string;
    uploadedAt: string;
  }>;
  submittedAt: string;
  rejectionReason?: string;
  adminNotes?: string;
  reviewedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminVerificationFilters {
  status?: VerificationStatus;
  type?: VerificationType;
  userRole?: "tenant" | "landlord";
  page?: number;
  limit?: number;
}

export async function createVerification(
  data: CreateVerificationInput
): Promise<ApiVerification> {
  const res = await apiClient.post<{ verification: ApiVerification }>(
    "/verifications",
    data
  );
  return res.data!.verification;
}

export async function getMyVerifications(): Promise<ApiVerification[]> {
  const res = await apiClient.get<{ verifications: ApiVerification[] }>(
    "/verifications/me"
  );
  return res.data!.verifications;
}

export async function requestPropertyVerification(
  propertyId: string,
  data: CreatePropertyVerificationInput
): Promise<ApiVerification> {
  const res = await apiClient.post<{ verification: ApiVerification }>(
    `/landlord/properties/${propertyId}/verification`,
    data
  );
  return res.data!.verification;
}

export async function getAdminVerifications(
  filters: AdminVerificationFilters = {}
): Promise<{
  verifications: ApiVerification[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}> {
  const sp = new URLSearchParams();
  if (filters.status) sp.set("status", filters.status);
  if (filters.type) sp.set("type", filters.type);
  if (filters.userRole) sp.set("userRole", filters.userRole);
  if (filters.page) sp.set("page", String(filters.page));
  if (filters.limit) sp.set("limit", String(filters.limit));
  const query = sp.toString();
  const res = await apiClient.get<{
    verifications: ApiVerification[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }>(`/admin/verifications${query ? `?${query}` : ""}`);
  return res.data!;
}

export async function updateVerificationStatus(
  id: string,
  data: UpdateVerificationStatusInput
): Promise<ApiVerification> {
  const res = await apiClient.patch<{ verification: ApiVerification }>(
    `/admin/verifications/${id}`,
    data
  );
  return res.data!.verification;
}

export const VERIFICATION_STATUS_LABELS: Record<VerificationStatus, string> = {
  pending: "Pending",
  under_review: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
  expired: "Expired",
};

export const VERIFICATION_STATUS_STYLES: Record<VerificationStatus, string> = {
  pending: "bg-warning/10 text-warning",
  under_review: "bg-primary/10 text-primary",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  expired: "bg-muted text-muted-foreground",
};
