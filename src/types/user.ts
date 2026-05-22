// ─── UI component types (used by existing dashboard/header components) ────────

export type UserRole = "tenant" | "landlord" | "admin";

export interface VerificationStatus {
  [key: string]: boolean;
}

export interface DashboardTask {
  task: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  icon: string;
}

export interface DashboardAction {
  label: string;
  href: string;
  icon: string;
  variant?: "primary" | "outline";
}

// ─── API / Database document types ────────────────────────────────────────────

/** Mirrors the MongoDB `users` collection. Never includes passwordHash on the client. */
export interface UserDocument {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  city: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  isBlocked: boolean;
  lastLoginAt?: string; // ISO date
  createdAt: string;
  updatedAt: string;
}

/** Convenience: full name derived on the client */
export type UserResponse = UserDocument & { fullName: string };

/** Mirrors the `tenant_profiles` collection */
export interface TenantProfileDocument {
  _id: string;
  userId: string;
  profession: string;
  monthlyIncome: string;
  employmentType: "salaried" | "self_employed" | "business" | "student" | "other";
  bio?: string;
  preferredLocations: string[];
  preferredPropertyTypes: string[];
  budgetMin: number;
  budgetMax: number;
  moveInDate?: string; // ISO date
  petsOwned: boolean;
  currentRentalId?: string; // ref → rental_histories
  rentalTrustScore: number; // 300–1000
  creditTier: "building" | "good" | "excellent" | "outstanding";
  totalRentals: number;
  onTimePayments: number;
  latePayments: number;
  missedPayments: number;
  verificationStatus: VerificationStatus;
  createdAt: string;
  updatedAt: string;
}

/** Mirrors the `landlord_profiles` collection */
export interface LandlordProfileDocument {
  _id: string;
  userId: string;
  businessType: "individual" | "company" | "developer" | "family_owned";
  businessName?: string;
  gstin?: string;
  panNumber?: string;
  totalProperties: number;
  occupiedProperties: number;
  averageRating: number;
  totalReviews: number;
  verificationStatus: VerificationStatus;
  rentalTrustScore: number; // 300–1000
  creditTier: "building" | "good" | "excellent" | "outstanding";
  createdAt: string;
  updatedAt: string;
}

// ─── Auth payload types (forms → API) ─────────────────────────────────────────

export interface LoginPayload {
  email?: string;
  phone?: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: "tenant" | "landlord";
  city: string;
  profession?: string;
  incomeOrProperties?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

/** Returned alongside user on successful login */
export interface AuthTokens {
  accessToken: string;
  expiresIn: number; // seconds — typically 900 (15 min)
  // refreshToken is httpOnly cookie for web, included in body for mobile
}

export interface AuthLoginResponse {
  user: UserResponse;
  tokens: AuthTokens;
}

/** JWT payload (decoded) */
export interface JwtPayload {
  sub: string; // userId
  role: UserRole;
  iat: number;
  exp: number;
}
