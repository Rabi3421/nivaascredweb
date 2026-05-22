import { UserRole } from "@/lib/constants/roles";
import connectDB from "@/lib/db";
import { UserModel } from "@/lib/models";
import { IUserDocument } from "@/lib/models/User.model";
import { ApiError } from "@/lib/api-response";
import { getAccessTokenFromCookies } from "@/lib/auth/cookies";
import { verifyAccessToken } from "@/lib/auth/tokens";

export function toSafeUser(user: IUserDocument): Record<string, unknown> {
  const obj = user.toObject() as Record<string, unknown>;
  delete obj.passwordHash;
  delete obj.refreshTokenHash;
  return obj;
}

export async function getCurrentUser(): Promise<IUserDocument | null> {
  try {
    const token = await getAccessTokenFromCookies();
    if (!token) return null;

    const decoded = verifyAccessToken(token);
    await connectDB();
    const user = await UserModel.findById(decoded.userId);
    if (!user || !user.isActive || user.isBlocked) return null;
    return user;
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<IUserDocument> {
  const user = await getCurrentUser();
  if (!user) throw new ApiError("Unauthorized", 401);
  return user;
}

export async function requireRole(
  allowedRoles: UserRole[]
): Promise<IUserDocument> {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role as UserRole)) {
    throw new ApiError("Forbidden", 403);
  }
  return user;
}
