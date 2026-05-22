import mongoose, { Document, Model, Schema, Types } from "mongoose";

// ─── TypeScript interfaces ─────────────────────────────────────────

export type ScoreCategory =
  | "payment_on_time"
  | "payment_late"
  | "payment_missed"
  | "review_received_positive"
  | "review_received_negative"
  | "verification_approved"
  | "verification_revoked"
  | "dispute_raised_against"
  | "dispute_resolved_favor"
  | "dispute_resolved_against"
  | "tenure_milestone"
  | "account_activity"
  | "manual_admin";

export interface IScoreLog {
  userId: Types.ObjectId;
  oldScore: number;
  newScore: number;
  change: number; // newScore - oldScore (positive or negative)
  category: ScoreCategory;
  reason: string;
  referenceId?: Types.ObjectId;
  referenceModel?: string;
  appliedBy?: Types.ObjectId; // admin user for manual_admin changes
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface IScoreLogDocument extends IScoreLog, Document {}

export type IScoreLogModel = Model<IScoreLogDocument>;

// ─── Schema ───────────────────────────────────────────────────────

const ScoreLogSchema = new Schema<IScoreLogDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    oldScore: {
      type: Number,
      required: [true, "oldScore is required"],
      min: 300,
      max: 1000,
    },
    newScore: {
      type: Number,
      required: [true, "newScore is required"],
      min: 300,
      max: 1000,
    },
    change: {
      type: Number,
      required: [true, "change is required"],
    },
    category: {
      type: String,
      enum: {
        values: [
          "payment_on_time",
          "payment_late",
          "payment_missed",
          "review_received_positive",
          "review_received_negative",
          "verification_approved",
          "verification_revoked",
          "dispute_raised_against",
          "dispute_resolved_favor",
          "dispute_resolved_against",
          "tenure_milestone",
          "account_activity",
          "manual_admin",
        ],
        message: "{VALUE} is not a valid score category",
      },
      required: [true, "Category is required"],
    },
    reason: {
      type: String,
      required: [true, "Reason is required"],
      trim: true,
      maxlength: [500, "Reason must be at most 500 characters"],
    },
    referenceId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    referenceModel: {
      type: String,
      enum: [
        "RentPayment",
        "Review",
        "Dispute",
        "Verification",
        "RentalHistory",
        null,
      ],
      default: null,
    },
    appliedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    // Score logs are append-only — updatedAt is not needed
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────

ScoreLogSchema.index({ userId: 1, createdAt: -1 });
ScoreLogSchema.index({ category: 1 });

// ─── Model ────────────────────────────────────────────────────────

const ScoreLogModel: IScoreLogModel =
  (mongoose.models.ScoreLog as IScoreLogModel) ||
  mongoose.model<IScoreLogDocument, IScoreLogModel>(
    "ScoreLog",
    ScoreLogSchema
  );

export default ScoreLogModel;
