// Single source of truth for user roles used by both Mongoose enum
// validation and JWT payload / middleware role checks.
export enum UserRole {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  LANDLORD = "landlord",
  TENANT = "tenant",
}

export const USER_ROLES = Object.values(UserRole) as string[];
