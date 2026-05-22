import { apiClient } from "./client";

// ─── Types matching actual backend response (toSafeUser output) ────────────

export interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  role: "superadmin" | "admin" | "landlord" | "tenant";
  avatar?: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  isBlocked: boolean;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type AuthProfile = Record<string, unknown> | null;

export interface AuthUserResponse {
  user: AuthUser;
}

export interface MeResponse {
  user: AuthUser;
  profile: AuthProfile;
}

// ─── Input types ──────────────────────────────────────────────────────────────

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  role: "tenant" | "landlord";
}

// ─── Dashboard route helper ───────────────────────────────────────────────────

export function getDashboardRoute(
  role: AuthUser["role"]
): string {
  if (role === "tenant") return "/tenant/dashboard";
  if (role === "landlord") return "/landlord/dashboard";
  return "/admin/dashboard";
}

// ─── Service ─────────────────────────────────────────────────────────────────

export const authService = {
  login: (input: LoginInput) =>
    apiClient.post<AuthUserResponse>("/auth/login", input),

  register: (input: RegisterInput) =>
    apiClient.post<AuthUserResponse>("/auth/register", input),

  logout: () => apiClient.post<null>("/auth/logout"),

  getMe: () => apiClient.get<MeResponse>("/auth/me"),

  refreshToken: () => apiClient.post<AuthUserResponse>("/auth/refresh-token"),
};
