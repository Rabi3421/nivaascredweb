import mongoose, { Document, Model, Schema, Types } from "mongoose";

// ─── TypeScript interfaces ─────────────────────────────────────────

interface IReviewCategories {
  communication?: number;
  cleanliness?: number;
  maintenance?: number;
  valueForMoney?: number;
  onTimePayment?: number;
  propertyConditionLeft?: number;
  propertyCondition?: number;
}

export interface IReview {
  reviewerId: Types.ObjectId;
  revieweeId: Types.ObjectId;
  propertyId?: Types.ObjectId;
  rentalHistoryId: Types.ObjectId;
  reviewerRole: "tenant" | "landlord";
  revieweeRole: "tenant" | "landlord";
  rating: number;
  title?: string;
  comment: string;
  categories?: IReviewCategories;
  tags: string[];
  isPublic: boolean;
  isVerified: boolean;
  isAnonymous: boolean;
  helpfulVotes: number;
  moderationStatus: "pending" | "approved" | "flagged" | "hidden";
  landlordResponse?: string;
  landlordRespondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewDocument extends IReview, Document {}

export type IReviewModel = Model<IReviewDocument>;

// ─── Sub-schema ───────────────────────────────────────────────────

const ReviewCategoriesSchema = new Schema<IReviewCategories>(
  {
    communication: { type: Number, min: 1, max: 5 },
    cleanliness: { type: Number, min: 1, max: 5 },
    maintenance: { type: Number, min: 1, max: 5 },
    valueForMoney: { type: Number, min: 1, max: 5 },
    onTimePayment: { type: Number, min: 1, max: 5 },
    propertyConditionLeft: { type: Number, min: 1, max: 5 },
    propertyCondition: { type: Number, min: 1, max: 5 },
  },
  { _id: false }
);

// ─── Schema ───────────────────────────────────────────────────────

const ReviewSchema = new Schema<IReviewDocument>(
  {
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "reviewerId is required"],
    },
    revieweeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "revieweeId is required"],
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },
    rentalHistoryId: {
      type: Schema.Types.ObjectId,
      ref: "RentalHistory",
      required: [true, "rentalHistoryId is required"],
    },
    reviewerRole: {
      type: String,
      enum: {
        values: ["tenant", "landlord"],
        message: "{VALUE} is not a valid reviewer role",
      },
      required: [true, "reviewerRole is required"],
    },
    revieweeRole: {
      type: String,
      enum: {
        values: ["tenant", "landlord"],
        message: "{VALUE} is not a valid reviewee role",
      },
      required: [true, "revieweeRole is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [150, "Title must be at most 150 characters"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
      minlength: [20, "Comment must be at least 20 characters"],
      maxlength: [2000, "Comment must be at most 2000 characters"],
    },
    categories: {
      type: ReviewCategoriesSchema,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    helpfulVotes: {
      type: Number,
      default: 0,
      min: 0,
    },
    moderationStatus: {
      type: String,
      enum: ["pending", "approved", "flagged", "hidden"],
      default: "pending",
    },
    landlordResponse: {
      type: String,
      trim: true,
      maxlength: [1000, "Landlord response must be at most 1000 characters"],
    },
    landlordRespondedAt: {
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

// Unique: one review per rental per reviewer
ReviewSchema.index(
  { rentalHistoryId: 1, reviewerId: 1 },
  { unique: true }
);
ReviewSchema.index({ revieweeId: 1, moderationStatus: 1 });
ReviewSchema.index({ propertyId: 1, moderationStatus: 1 });
ReviewSchema.index({ reviewerId: 1 });
ReviewSchema.index({ rating: -1 });

// ─── Model ────────────────────────────────────────────────────────

const ReviewModel: IReviewModel =
  (mongoose.models.Review as IReviewModel) ||
  mongoose.model<IReviewDocument, IReviewModel>("Review", ReviewSchema);

export default ReviewModel;
