import mongoose, { Document, Model, Schema, Types } from "mongoose";

// ─── TypeScript interfaces ─────────────────────────────────────────

interface IAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface IVerificationStatus {
  identity: boolean;
  income: boolean;
  employment: boolean;
  background: boolean;
  bank: boolean;
}

export interface ITenantProfile {
  userId: Types.ObjectId;
  occupation?: string;
  employmentType?: "salaried" | "self_employed" | "business" | "student" | "other";
  monthlyIncome?: string;
  bio?: string;
  currentAddress?: IAddress;
  permanentAddress?: IAddress;
  preferredLocations: string[];
  preferredPropertyTypes: string[];
  budgetMin?: number;
  budgetMax?: number;
  moveInDate?: Date;
  petsOwned: boolean;
  rentalScore: number;
  profileCompletion: number;
  verificationStatus: IVerificationStatus;
  rentalHistoryCount: number;
  currentRentalId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITenantProfileDocument extends ITenantProfile, Document {}

export type ITenantProfileModel = Model<ITenantProfileDocument>;

// ─── Sub-schemas ──────────────────────────────────────────────────

const AddressSchema = new Schema<IAddress>(
  {
    line1: { type: String, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: {
      type: String,
      trim: true,
      match: [/^\d{6}$/, "Invalid pincode"],
    },
  },
  { _id: false }
);

// ─── Schema ───────────────────────────────────────────────────────

const TenantProfileSchema = new Schema<ITenantProfileDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
      unique: true,
    },
    occupation: {
      type: String,
      trim: true,
      maxlength: [100, "Occupation must be at most 100 characters"],
    },
    employmentType: {
      type: String,
      enum: ["salaried", "self_employed", "business", "student", "other"],
    },
    monthlyIncome: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, "Bio must be at most 500 characters"],
    },
    currentAddress: {
      type: AddressSchema,
      default: null,
    },
    permanentAddress: {
      type: AddressSchema,
      default: null,
    },
    preferredLocations: {
      type: [String],
      default: [],
    },
    preferredPropertyTypes: {
      type: [String],
      default: [],
    },
    budgetMin: {
      type: Number,
      min: [0, "Budget min must be >= 0"],
    },
    budgetMax: {
      type: Number,
      min: [0, "Budget max must be >= 0"],
    },
    moveInDate: {
      type: Date,
      default: null,
    },
    petsOwned: {
      type: Boolean,
      default: false,
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
      income: { type: Boolean, default: false },
      employment: { type: Boolean, default: false },
      background: { type: Boolean, default: false },
      bank: { type: Boolean, default: false },
    },
    rentalHistoryCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    currentRentalId: {
      type: Schema.Types.ObjectId,
      ref: "RentalHistory",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────

TenantProfileSchema.index({ userId: 1 }, { unique: true });
TenantProfileSchema.index({ rentalScore: -1 });

// ─── Model ────────────────────────────────────────────────────────

const TenantProfileModel: ITenantProfileModel =
  (mongoose.models.TenantProfile as ITenantProfileModel) ||
  mongoose.model<ITenantProfileDocument, ITenantProfileModel>(
    "TenantProfile",
    TenantProfileSchema
  );

export default TenantProfileModel;
