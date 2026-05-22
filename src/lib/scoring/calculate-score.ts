import { Types } from "mongoose";
import { UserRole } from "@/lib/constants/roles";
import connectDB from "@/lib/db";
import {
  ApplicationModel,
  LandlordProfileModel,
  PropertyModel,
  RentalHistoryModel,
  ReviewModel,
  ScoreLogModel,
  TenantProfileModel,
  UserModel,
  VerificationModel,
} from "@/lib/models";

export const MIN_SCORE = 300;
export const MAX_SCORE = 900;
export const DEFAULT_SCORE = 600;

export type ScoreGrade = "Excellent" | "Good" | "Fair" | "Risky" | "High Risk";

export interface ScoreFactorBreakdown {
  points: number;
  maxPoints: number;
  [key: string]: unknown;
}

export interface ScoreBreakdown {
  reviews: ScoreFactorBreakdown;
  rentalHistory: ScoreFactorBreakdown;
  applications?: ScoreFactorBreakdown;
  propertyTrust?: ScoreFactorBreakdown;
  verification: ScoreFactorBreakdown;
}

export interface CalculatedScore {
  score: number;
  minScore: number;
  maxScore: number;
  grade: ScoreGrade;
  breakdown: ScoreBreakdown;
  lastCalculatedAt: string;
}

function clampScore(score: number): number {
  return Math.min(MAX_SCORE, Math.max(MIN_SCORE, Math.round(score)));
}

export function getScoreGrade(score: number): ScoreGrade {
  if (score >= 800) return "Excellent";
  if (score >= 700) return "Good";
  if (score >= 600) return "Fair";
  if (score >= 500) return "Risky";
  return "High Risk";
}

function objectId(userId: string | Types.ObjectId): Types.ObjectId {
  return typeof userId === "string" ? new Types.ObjectId(userId) : userId;
}

function reviewPoints(avgRating: number, count: number): number {
  if (count === 0) return 150;
  return Math.round((avgRating / 5) * 250);
}

function verificationPointsFromBooleans(status?: object): number {
  if (!status) return 0;
  const values = Object.values(status).filter(
    (value): value is boolean => typeof value === "boolean"
  );
  if (values.length === 0) return 0;
  return Math.round((values.filter(Boolean).length / values.length) * 70);
}

async function verificationPoints(userId: Types.ObjectId, profileStatus?: object) {
  const docs = await VerificationModel.find({ userId })
    .select("status type")
    .lean();

  const docPoints = docs.reduce((total, doc) => {
    if (doc.status === "approved") return total + 10;
    if (doc.status === "pending" || doc.status === "under_review") return total + 5;
    return total;
  }, 0);

  const profilePoints = verificationPointsFromBooleans(profileStatus);
  const hasProfileVerification = profilePoints > 0;
  const points =
    docs.length === 0 && !hasProfileVerification
      ? 25
      : Math.min(100, profilePoints + Math.min(30, docPoints));

  return {
    points,
    maxPoints: 100,
    approvedDocuments: docs.filter((doc) => doc.status === "approved").length,
    pendingDocuments: docs.filter(
      (doc) => doc.status === "pending" || doc.status === "under_review"
    ).length,
    rejectedDocuments: docs.filter((doc) => doc.status === "rejected").length,
  };
}

async function persistScore(
  userId: Types.ObjectId,
  role: UserRole.TENANT | UserRole.LANDLORD,
  score: number,
  breakdown: ScoreBreakdown,
  reason: string,
  appliedBy?: Types.ObjectId
) {
  const existingProfile =
    role === UserRole.TENANT
      ? await TenantProfileModel.findOne({ userId }).lean()
      : await LandlordProfileModel.findOne({ userId }).lean();
  const oldScore = existingProfile?.rentalScore ?? DEFAULT_SCORE;

  if (role === UserRole.TENANT) {
    await TenantProfileModel.findOneAndUpdate(
      { userId },
      { $set: { rentalScore: score } },
      { upsert: true, setDefaultsOnInsert: true }
    );
  } else {
    await LandlordProfileModel.findOneAndUpdate(
      { userId },
      { $set: { rentalScore: score } },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }

  await ScoreLogModel.create({
    userId,
    oldScore,
    newScore: score,
    change: score - oldScore,
    category: appliedBy ? "manual_admin" : "account_activity",
    reason,
    appliedBy,
    metadata: {
      grade: getScoreGrade(score),
      breakdown,
      minScore: MIN_SCORE,
      maxScore: MAX_SCORE,
    },
  });
}

export async function calculateTenantScore(
  userId: string | Types.ObjectId,
  options?: { persist?: boolean; reason?: string; appliedBy?: Types.ObjectId }
): Promise<CalculatedScore> {
  await connectDB();
  const id = objectId(userId);

  const [profile, reviews, rentalCounts, applicationCounts] = await Promise.all([
    TenantProfileModel.findOne({ userId: id }).lean(),
    ReviewModel.find({ revieweeId: id, revieweeRole: "tenant" })
      .select("rating")
      .lean(),
    RentalHistoryModel.aggregate<{ _id: string; count: number }>([
      { $match: { tenantId: id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    ApplicationModel.aggregate<{ _id: string; count: number }>([
      { $match: { tenantId: id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
  ]);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;
  const reviewBreakdown = {
    points: reviewPoints(avgRating, reviews.length),
    maxPoints: 250,
    averageRating: Number(avgRating.toFixed(2)),
    reviewCount: reviews.length,
  };

  const rentalMap = new Map(rentalCounts.map((item) => [item._id, item.count]));
  const completed = rentalMap.get("completed") ?? 0;
  const active = rentalMap.get("active") ?? 0;
  const terminated = rentalMap.get("terminated") ?? 0;
  const totalRentals = completed + active + terminated;
  const rentalPoints =
    totalRentals === 0
      ? 75
      : Math.max(0, Math.min(150, completed * 45 + active * 25 - terminated * 35));
  const rentalBreakdown = {
    points: rentalPoints,
    maxPoints: 150,
    completed,
    active,
    terminated,
  };

  const applicationMap = new Map(applicationCounts.map((item) => [item._id, item.count]));
  const approved = applicationMap.get("approved") ?? 0;
  const rejected = applicationMap.get("rejected") ?? 0;
  const pending = applicationMap.get("pending") ?? 0;
  const shortlisted = applicationMap.get("shortlisted") ?? 0;
  const totalApplications = approved + rejected + pending + shortlisted;
  const applicationPoints =
    totalApplications === 0
      ? 50
      : Math.max(0, Math.min(100, approved * 30 - rejected * 5));
  const applicationBreakdown = {
    points: applicationPoints,
    maxPoints: 100,
    approved,
    rejected,
    pending,
    shortlisted,
  };

  const verificationBreakdown = await verificationPoints(
    id,
    profile?.verificationStatus
  );

  const breakdown: ScoreBreakdown = {
    reviews: reviewBreakdown,
    rentalHistory: rentalBreakdown,
    applications: applicationBreakdown,
    verification: verificationBreakdown,
  };

  const score = clampScore(
    MIN_SCORE +
      reviewBreakdown.points +
      rentalBreakdown.points +
      applicationBreakdown.points +
      verificationBreakdown.points
  );

  if (options?.persist !== false) {
    await persistScore(
      id,
      UserRole.TENANT,
      score,
      breakdown,
      options?.reason ?? "Tenant score recalculated",
      options?.appliedBy
    );
  }

  return {
    score,
    minScore: MIN_SCORE,
    maxScore: MAX_SCORE,
    grade: getScoreGrade(score),
    breakdown,
    lastCalculatedAt: new Date().toISOString(),
  };
}

export async function calculateLandlordScore(
  userId: string | Types.ObjectId,
  options?: { persist?: boolean; reason?: string; appliedBy?: Types.ObjectId }
): Promise<CalculatedScore> {
  await connectDB();
  const id = objectId(userId);

  const [profile, reviews, rentalCounts, propertyCounts] = await Promise.all([
    LandlordProfileModel.findOne({ userId: id }).lean(),
    ReviewModel.find({ revieweeId: id, revieweeRole: "landlord" })
      .select("rating")
      .lean(),
    RentalHistoryModel.aggregate<{ _id: string; count: number }>([
      { $match: { landlordId: id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    PropertyModel.aggregate<{ _id: string; count: number }>([
      { $match: { landlordId: id } },
      { $group: { _id: "$availabilityStatus", count: { $sum: 1 } } },
    ]),
  ]);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;
  const reviewBreakdown = {
    points: reviewPoints(avgRating, reviews.length),
    maxPoints: 250,
    averageRating: Number(avgRating.toFixed(2)),
    reviewCount: reviews.length,
  };

  const rentalMap = new Map(rentalCounts.map((item) => [item._id, item.count]));
  const completed = rentalMap.get("completed") ?? 0;
  const active = rentalMap.get("active") ?? 0;
  const terminated = rentalMap.get("terminated") ?? 0;
  const totalRentals = completed + active + terminated;
  const rentalBreakdown = {
    points:
      totalRentals === 0
        ? 75
        : Math.max(0, Math.min(150, completed * 40 + active * 25 - terminated * 20)),
    maxPoints: 150,
    completed,
    active,
    terminated,
  };

  const propertyMap = new Map(propertyCounts.map((item) => [item._id, item.count]));
  const totalProperties = propertyCounts.reduce((sum, item) => sum + item.count, 0);
  const activePropertyCount =
    (propertyMap.get("available") ?? 0) + (propertyMap.get("rented") ?? 0);
  const profilePropertyBonus = profile?.verificationStatus?.property ? 25 : 0;
  const propertyBreakdown = {
    points:
      totalProperties === 0
        ? 50
        : Math.min(100, activePropertyCount * 20 + profilePropertyBonus),
    maxPoints: 100,
    totalProperties,
    activeProperties: activePropertyCount,
    verifiedPropertyProfile: Boolean(profile?.verificationStatus?.property),
  };

  const verificationBreakdown = await verificationPoints(
    id,
    profile?.verificationStatus
  );

  const breakdown: ScoreBreakdown = {
    reviews: reviewBreakdown,
    rentalHistory: rentalBreakdown,
    propertyTrust: propertyBreakdown,
    verification: verificationBreakdown,
  };

  const score = clampScore(
    MIN_SCORE +
      reviewBreakdown.points +
      rentalBreakdown.points +
      propertyBreakdown.points +
      verificationBreakdown.points
  );

  if (options?.persist !== false) {
    await persistScore(
      id,
      UserRole.LANDLORD,
      score,
      breakdown,
      options?.reason ?? "Landlord score recalculated",
      options?.appliedBy
    );
  }

  return {
    score,
    minScore: MIN_SCORE,
    maxScore: MAX_SCORE,
    grade: getScoreGrade(score),
    breakdown,
    lastCalculatedAt: new Date().toISOString(),
  };
}

export async function recalculateUserScore(
  userId: string | Types.ObjectId,
  role?: string,
  options?: { reason?: string; appliedBy?: Types.ObjectId }
): Promise<CalculatedScore> {
  await connectDB();
  const id = objectId(userId);
  let resolvedRole = role;

  if (!resolvedRole) {
    const user = await UserModel.findById(id).select("role").lean();
    resolvedRole = user?.role;
  }

  if (resolvedRole === UserRole.TENANT) {
    return calculateTenantScore(id, { ...options, persist: true });
  }
  if (resolvedRole === UserRole.LANDLORD) {
    return calculateLandlordScore(id, { ...options, persist: true });
  }

  throw new Error("Score is only available for tenant and landlord users");
}

export async function recalculateUsersSafely(
  users: Array<{ userId: string | Types.ObjectId; role: string }>
) {
  await Promise.all(
    users.map(async (user) => {
      try {
        await recalculateUserScore(user.userId, user.role, {
          reason: "Score recalculated from platform activity",
        });
      } catch (error) {
        console.error("[score] Failed to recalculate user score", {
          userId: user.userId.toString(),
          error,
        });
      }
    })
  );
}
