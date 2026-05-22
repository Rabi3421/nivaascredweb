import mongoose, { Document, Model, Schema, Types } from "mongoose";

// ─── TypeScript interfaces ─────────────────────────────────────────

export type VerificationType =
  | "identity"
  | "income"
  | "employment"
  | "property"
  | "background"
  | "bank";

export type VerificationStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected"
  | "expired";

export interface IVerificationDocumentFile {
  type:
    | "aadhaar_front"
    | "aadhaar_back"
    | "passport"
    | "pan_card"
    | "salary_slip"
    | "itr"
    | "offer_letter"
    | "property_deed"
    | "bank_statement"
    | "police_noc"
    | "other";
  fileUrl: string;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  uploadedAt: Date;
}

export interface IVerification {
  userId: Types.ObjectId;
  propertyId?: Types.ObjectId;
  type: VerificationType;
  status: VerificationStatus;
  documents: IVerificationDocumentFile[];
  submittedAt: Date;
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
  rejectionReason?: string;
  adminNotes?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVerificationDocument extends IVerification, Document {}

export type IVerificationModel = Model<IVerificationDocument>;

// ─── Sub-schema ───────────────────────────────────────────────────

const VerificationFileSchema = new Schema<IVerificationDocumentFile>(
  {
    type: {
      type: String,
      enum: [
        "aadhaar_front",
        "aadhaar_back",
        "passport",
        "pan_card",
        "salary_slip",
        "itr",
        "offer_letter",
        "property_deed",
        "bank_statement",
        "police_noc",
        "other",
      ],
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    fileSizeBytes: {
      type: Number,
      required: true,
      min: 1,
    },
    mimeType: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { _id: false }
);

// ─── Schema ───────────────────────────────────────────────────────

const VerificationSchema = new Schema<IVerificationDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },
    type: {
      type: String,
      enum: {
        values: [
          "identity",
          "income",
          "employment",
          "property",
          "background",
          "bank",
        ],
        message: "{VALUE} is not a valid verification type",
      },
      required: [true, "Verification type is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "under_review", "approved", "rejected", "expired"],
        message: "{VALUE} is not a valid verification status",
      },
      default: "pending",
    },
    documents: {
      type: [VerificationFileSchema],
      required: [true, "At least one document is required"],
      validate: {
        validator: (docs: IVerificationDocumentFile[]) => docs.length > 0,
        message: "At least one document file must be uploaded",
      },
    },
    submittedAt: {
      type: Date,
      default: () => new Date(),
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
    rejectionReason: {
      type: String,
      trim: true,
      maxlength: [500, "Rejection reason must be at most 500 characters"],
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: [1000, "Admin notes must be at most 1000 characters"],
    },
    expiresAt: {
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

VerificationSchema.index({ userId: 1, type: 1, createdAt: -1 });
VerificationSchema.index({ status: 1 });
VerificationSchema.index({ reviewedBy: 1 });
VerificationSchema.index({ propertyId: 1, status: 1 });

// ─── Model ────────────────────────────────────────────────────────

const VerificationModel: IVerificationModel =
  (mongoose.models.Verification as IVerificationModel) ||
  mongoose.model<IVerificationDocument, IVerificationModel>(
    "Verification",
    VerificationSchema
  );

export default VerificationModel;
