import mongoose, { Document, Model, Schema, Types } from "mongoose";

// ─── TypeScript interfaces ─────────────────────────────────────────

interface IVerificationStatus {
  identity: boolean;
  property: boolean;
  bank: boolean;
  gstin: boolean;
}

export interface ILandlordProfile {
  userId: Types.ObjectId;
  businessName?: string;
  businessType?: "individual" | "company" | "developer" | "family_owned";
  gstin?: string;
  panNumber?: string;
  totalProperties: number;
  occupiedProperties: number;
  averageRating: number;
  totalReviews: number;
  rentalScore: number;
  profileCompletion: number;
  verificationStatus: IVerificationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILandlordProfileDocument extends ILandlordProfile, Document {}

export type ILandlordProfileModel = Model<ILandlordProfileDocument>;

// ─── Schema ───────────────────────────────────────────────────────

const LandlordProfileSchema = new Schema<ILandlordProfileDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
      unique: true,
    },
    businessName: {
      type: String,
      trim: true,
      maxlength: [200, "Business name must be at most 200 characters"],
    },
    businessType: {
      type: String,
      enum: ["individual", "company", "developer", "family_owned"],
      default: "individual",
    },
    gstin: {
      type: String,
      trim: true,
      uppercase: true,
      match: [
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        "Invalid GSTIN format",
      ],
      sparse: true,
    },
    panNumber: {
      type: String,
      trim: true,
      uppercase: true,
      match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"],
      sparse: true,
    },
    totalProperties: {
      type: Number,
      default: 0,
      min: 0,
    },
    occupiedProperties: {
      type: Number,
      default: 0,
      min: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    rentalScore: {
      type: Number,
      default: 300,
      min: [300, "Rental score floor is 300"],
      max: [1000, "Rental score ceiling is 1000"],
    },
    profileCompletion: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    verificationStatus: {
      identity: { type: Boolean, default: false },
      property: { type: Boolean, default: false },
      bank: { type: Boolean, default: false },
      gstin: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────

LandlordProfileSchema.index({ userId: 1 }, { unique: true });
LandlordProfileSchema.index({ averageRating: -1 });
LandlordProfileSchema.index({ rentalScore: -1 });

// ─── Model ────────────────────────────────────────────────────────

const LandlordProfileModel: ILandlordProfileModel =
  (mongoose.models.LandlordProfile as ILandlordProfileModel) ||
  mongoose.model<ILandlordProfileDocument, ILandlordProfileModel>(
    "LandlordProfile",
    LandlordProfileSchema
  );

export default LandlordProfileModel;
