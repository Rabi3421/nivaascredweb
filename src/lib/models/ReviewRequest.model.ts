import mongoose, { Document, Model, Schema, Types } from "mongoose";

// ─── TypeScript interfaces ─────────────────────────────────────────

export interface IReviewRequest {
  rentalHistoryId: Types.ObjectId;
  requesterId: Types.ObjectId;
  recipientId: Types.ObjectId;
  propertyId: Types.ObjectId;
  reviewerRole: "tenant" | "landlord";
  status: "pending" | "completed" | "declined" | "expired";
  reviewId?: Types.ObjectId;
  expiresAt: Date;
  reminderCount: number;
  lastReminderAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewRequestDocument extends IReviewRequest, Document {}

export type IReviewRequestModel = Model<IReviewRequestDocument>;

// ─── Schema ───────────────────────────────────────────────────────

const ReviewRequestSchema = new Schema<IReviewRequestDocument>(
  {
    rentalHistoryId: {
      type: Schema.Types.ObjectId,
      ref: "RentalHistory",
      required: [true, "rentalHistoryId is required"],
    },
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "requesterId is required"],
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "recipientId is required"],
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "propertyId is required"],
    },
    reviewerRole: {
      type: String,
      enum: {
        values: ["tenant", "landlord"],
        message: "{VALUE} is not a valid reviewer role",
      },
      required: [true, "reviewerRole is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "completed", "declined", "expired"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
    reviewId: {
      type: Schema.Types.ObjectId,
      ref: "Review",
      default: null,
    },
    expiresAt: {
      type: Date,
      required: [true, "expiresAt is required"],
    },
    reminderCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastReminderAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────

ReviewRequestSchema.index({ rentalHistoryId: 1, recipientId: 1 });
ReviewRequestSchema.index({ recipientId: 1, status: 1 });
// TTL index: auto-expire records 30 days after expiresAt
ReviewRequestSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 2592000 });

// ─── Model ────────────────────────────────────────────────────────

const ReviewRequestModel: IReviewRequestModel =
  (mongoose.models.ReviewRequest as IReviewRequestModel) ||
  mongoose.model<IReviewRequestDocument, IReviewRequestModel>(
    "ReviewRequest",
    ReviewRequestSchema
  );

export default ReviewRequestModel;
