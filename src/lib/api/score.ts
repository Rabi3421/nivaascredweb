import { apiClient } from "@/lib/api/client";

export type ScoreGrade = "Excellent" | "Good" | "Fair" | "Risky" | "High Risk";

export interface ApiScoreFactor {
  points: number;
  maxPoints: number;
  [key: string]: unknown;
}

export interface ApiScoreBreakdown {
  reviews: ApiScoreFactor;
  rentalHistory: ApiScoreFactor;
  applications?: ApiScoreFactor;
  propertyTrust?: ApiScoreFactor;
  verification: ApiScoreFactor;
}

export interface ApiScore {
  score: number;
  minScore: number;
  maxScore: number;
  grade: ScoreGrade;
  breakdown: ApiScoreBreakdown;
  lastCalculatedAt: string;
}

export interface ApiAdminScoreUser {
  _id: string;
  fullName: string;
  email: string;
  role: "tenant" | "landlord";
  avatar?: string | null;
  score: number;
  grade: ScoreGrade;
  verificationStatus: Record<string, boolean> | null;
}

export interface ApiAdminScoreUsersResponse {
  users: ApiAdminScoreUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getMyScore(): Promise<ApiScore> {
  const res = await apiClient.get<ApiScore>("/score/me");
  return res.data!;
}

export async function recalculateMyScore(): Promise<ApiScore> {
  const res = await apiClient.post<ApiScore>("/score/recalculate");
  return res.data!;
}

export async function getAdminScoreUsers(params?: {
  page?: number;
  limit?: number;
  role?: "tenant" | "landlord";
}): Promise<ApiAdminScoreUsersResponse> {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));
  if (params?.role) search.set("role", params.role);
  const query = search.toString();
  const res = await apiClient.get<ApiAdminScoreUsersResponse>(
    `/admin/scores/users${query ? `?${query}` : ""}`
  );
  return res.data!;
}

export async function recalculateUserScore(userId: string): Promise<ApiScore> {
  const res = await apiClient.post<ApiScore>("/admin/scores/recalculate-user", {
    userId,
  });
  return res.data!;
}

export const SCORE_GRADE_STYLES: Record<ScoreGrade, string> = {
  Excellent: "bg-success/10 text-success",
  Good: "bg-primary/10 text-primary",
  Fair: "bg-warning/10 text-warning",
  Risky: "bg-destructive/10 text-destructive",
  "High Risk": "bg-destructive/10 text-destructive",
};
