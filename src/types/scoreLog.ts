export type ScoreCategory =
  | "payment_on_time" // +10 per on-time payment
  | "payment_late" // -50 per late payment
  | "payment_missed" // -100 per missed payment
  | "review_received_positive" // +20 per 5-star review received
  | "review_received_negative" // -10 per 1-star review received
  | "verification_approved" // +10 per verified document
  | "verification_revoked" // -20 when a verification is revoked
  | "dispute_raised_against" // -30 when a dispute is raised against user
  | "dispute_resolved_favor" // +20 when dispute resolved in user's favor
  | "dispute_resolved_against" // -40 when dispute resolved against user
  | "tenure_milestone" // +50 per 12-month consecutive tenancy
  | "account_activity" // small adjustments for profile completion etc.
  | "manual_admin"; // admin manual correction

/** Mirrors the `score_logs` MongoDB collection */
export interface ScoreLogDocument {
  _id: string;
  userId: string; // ref → users
  previousScore: number;
  newScore: number;
  change: number; // positive or negative
  category: ScoreCategory;
  reason: string; // human-readable explanation
  referenceId?: string; // ref to the triggering document (payment, review, dispute, etc.)
  referenceModel?: "RentPayment" | "Review" | "Dispute" | "Verification" | "RentalHistory";
  appliedBy?: string; // ref → users (admin) for manual changes
  createdAt: string;
}

/** Score tier thresholds */
export const SCORE_TIERS = {
  building: { min: 300, max: 549, label: "Building Trust" },
  good: { min: 550, max: 699, label: "Good Standing" },
  excellent: { min: 700, max: 849, label: "Excellent" },
  outstanding: { min: 850, max: 1000, label: "Outstanding" },
} as const;

export type ScoreTier = keyof typeof SCORE_TIERS;

export function getScoreTier(score: number): ScoreTier {
  if (score >= 850) return "outstanding";
  if (score >= 700) return "excellent";
  if (score >= 550) return "good";
  return "building";
}

/** Score change event modifiers — single source of truth for both frontend display and backend calculation */
export const SCORE_DELTAS: Record<ScoreCategory, number> = {
  payment_on_time: +10,
  payment_late: -50,
  payment_missed: -100,
  review_received_positive: +20,
  review_received_negative: -10,
  verification_approved: +10,
  verification_revoked: -20,
  dispute_raised_against: -30,
  dispute_resolved_favor: +20,
  dispute_resolved_against: -40,
  tenure_milestone: +50,
  account_activity: +5,
  manual_admin: 0, // variable — set per admin action
};

/** Response shape for score history endpoint */
export interface ScoreHistoryResponse {
  currentScore: number;
  currentTier: ScoreTier;
  history: ScoreLogDocument[];
  breakdown: {
    totalPositive: number;
    totalNegative: number;
    onTimePayments: number;
    latePayments: number;
    missedPayments: number;
    verificationsCompleted: number;
    reviewsReceived: number;
  };
}
