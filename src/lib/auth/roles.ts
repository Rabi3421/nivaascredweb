import { UserRole } from "@/lib/constants/roles";

export const REGISTERABLE_ROLES = [
  UserRole.TENANT,
  UserRole.LANDLORD,
] as const;

export type RegisterableRole = (typeof REGISTERABLE_ROLES)[number];

export function isRegisterableRole(role: string): role is RegisterableRole {
  return (REGISTERABLE_ROLES as readonly string[]).includes(role);
}
