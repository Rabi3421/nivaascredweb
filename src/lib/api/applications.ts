import { apiClient } from "@/lib/api/client";
import type { UpdateApplicationStatusInput } from "@/lib/validations/application";

// ─── API shapes ────────────────────────────────────────────────────────────────

export type ApplicationStatus =
  | "pending"
  | "shortlisted"
  | "under_review"
  | "interview_scheduled"
  | "approved"
  | "rejected"
  | "withdrawn"
  | "expired";

export interface ApiApplicationProperty {
  _id: string;
  title: string;
  city: string;
  state: string;
  rentAmount: number;
  images?: Array<{ url: string; alt?: string; isPrimary: boolean }>;
  availabilityStatus?: string;
}

export interface ApiApplicationUser {
  _id: string;
  fullName: string;
  email?: string;
  phone?: string | null;
  avatar?: string | null;
}

export interface ApiApplicationTenantProfile {
  occupation?: string;
  monthlyIncome?: string;
  rentalScore?: number;
  verificationStatus?: {
    identity: boolean;
    income: boolean;
    employment: boolean;
    background: boolean;
    bank: boolean;
  };
}

export interface ApiApplication {
  _id: string;
  propertyId: ApiApplicationProperty | string;
  tenantId: ApiApplicationUser | string;
  landlordId: ApiApplicationUser | string;
  status: ApplicationStatus;
  message: string;
  moveInDate?: string | null;
  rejectionReason?: string;
  interviewNotes?: string;
  approvedAt?: string | null;
  // Only present on landlord endpoint
  tenantProfile?: ApiApplicationTenantProfile | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApplyForPropertyInput {
  propertyId: string;
  message?: string;
  moveInDate?: string;
}

// ─── Tenant APIs ──────────────────────────────────────────────────────────────

export async function applyForProperty(
  data: ApplyForPropertyInput
): Promise<ApiApplication> {
  const res = await apiClient.post<{ application: ApiApplication }>(
    "/applications",
    data
  );
  return res.data!.application;
}

export async function getMyTenantApplications(): Promise<ApiApplication[]> {
  const res = await apiClient.get<{ applications: ApiApplication[] }>(
    "/tenant/applications"
  );
  return res.data!.applications;
}

// ─── Landlord APIs ────────────────────────────────────────────────────────────

export async function getLandlordApplications(): Promise<ApiApplication[]> {
  const res = await apiClient.get<{ applications: ApiApplication[] }>(
    "/landlord/applications"
  );
  return res.data!.applications;
}

export async function updateApplicationStatus(
  id: string,
  data: UpdateApplicationStatusInput
): Promise<ApiApplication> {
  const res = await apiClient.patch<{ application: ApiApplication }>(
    `/landlord/applications/${id}`,
    data
  );
  return res.data!.application;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "Pending Review",
  shortlisted: "Shortlisted",
  under_review: "Under Review",
  interview_scheduled: "Interview Scheduled",
  approved: "Approved",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
  expired: "Expired",
};

export const STATUS_STYLES: Record<ApplicationStatus, string> = {
  pending: "bg-warning/10 text-warning",
  shortlisted: "bg-primary/10 text-primary",
  under_review: "bg-accent/10 text-accent",
  interview_scheduled: "bg-accent/10 text-accent",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  withdrawn: "bg-muted text-muted-foreground",
  expired: "bg-muted text-muted-foreground",
};
