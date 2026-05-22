import { apiClient } from "@/lib/api/client";
import type {
  CreateRentalHistoryInput,
  UpdateRentalHistoryInput,
} from "@/lib/validations/rental-history";

export type RentalHistoryStatus = "active" | "completed" | "terminated";

export interface ApiRentalUser {
  _id: string;
  fullName: string;
  email?: string;
  phone?: string | null;
  avatar?: string | null;
  role?: string;
}

export interface ApiRentalProperty {
  _id: string;
  title: string;
  city: string;
  state: string;
  rentAmount: number;
  images?: Array<{ url: string; alt?: string; isPrimary: boolean }>;
}

export interface ApiRentalHistory {
  _id: string;
  tenantId: ApiRentalUser | string;
  landlordId: ApiRentalUser | string;
  propertyId: ApiRentalProperty | string;
  applicationId?: string;
  monthlyRent: number;
  depositAmount: number;
  startDate: string;
  endDate?: string | null;
  status: RentalHistoryStatus;
  landlordReviewId?: string | null;
  tenantReviewId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function createRentalHistory(
  data: CreateRentalHistoryInput
): Promise<ApiRentalHistory> {
  const res = await apiClient.post<{ rentalHistory: ApiRentalHistory }>(
    "/landlord/rental-histories",
    data
  );
  return res.data!.rentalHistory;
}

export async function getLandlordRentalHistories(): Promise<ApiRentalHistory[]> {
  const res = await apiClient.get<{ rentalHistories: ApiRentalHistory[] }>(
    "/landlord/rental-histories"
  );
  return res.data!.rentalHistories;
}

export async function updateRentalHistory(
  id: string,
  data: UpdateRentalHistoryInput
): Promise<ApiRentalHistory> {
  const res = await apiClient.patch<{ rentalHistory: ApiRentalHistory }>(
    `/landlord/rental-histories/${id}`,
    data
  );
  return res.data!.rentalHistory;
}

export async function getTenantRentalHistories(): Promise<ApiRentalHistory[]> {
  const res = await apiClient.get<{ rentalHistories: ApiRentalHistory[] }>(
    "/tenant/rental-histories"
  );
  return res.data!.rentalHistories;
}

export const RENTAL_STATUS_LABELS: Record<RentalHistoryStatus, string> = {
  active: "Active",
  completed: "Completed",
  terminated: "Terminated",
};

export const RENTAL_STATUS_STYLES: Record<RentalHistoryStatus, string> = {
  active: "bg-success/10 text-success",
  completed: "bg-primary/10 text-primary",
  terminated: "bg-destructive/10 text-destructive",
};
