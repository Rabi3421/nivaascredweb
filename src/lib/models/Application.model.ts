import mongoose, { Document, Model, Schema, Types } from "mongoose";

// ─── TypeScript interfaces ─────────────────────────────────────────

export type ApplicationStatus =
  | "pending"
  | "shortlisted"
  | "under_review"
  | "interview_scheduled"
  | "approved"
  | "rejected"
  | "withdrawn"
  | "expired";

export interface IApplication {
  propertyId: Types.ObjectId;
  tenantId: Types.ObjectId;
  landlordId: Types.ObjectId;
  status: ApplicationStatus;
  message: string;
  moveInDate?: Date;
  proposedRent?: number;
  rejectionReason?: string;
  interviewScheduledAt?: Date;
  interviewNotes?: string;
  approvedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IApplicationDocument extends IApplication, Document {}

export type IApplicationModel = Model<IApplicationDocument>;

// ─── Schema ───────────────────────────────────────────────────────

const ApplicationSchema = new Schema<IApplicationDocument>(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "propertyId is required"],
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "tenantId is required"],
    },
    landlordId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "landlordId is required"],
    },
    status: {
      type: String,
      enum: {
        values: [
          "pending",
          "shortlisted",
          "under_review",
          "interview_scheduled",
          "approved",
          "rejected",
          "withdrawn",
          "expired",
        ],
        message: "{VALUE} is not a valid application status",
      },
      default: "pending",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [20, "Message must be at least 20 characters"],
      maxlength: [1500, "Message must be at most 1500 characters"],
    },
    moveInDate: {
      type: Date,
      default: null,
    },
    proposedRent: {
      type: Number,
      min: 0,
    },
    rejectionReason: {
      type: String,
      trim: true,
      maxlength: [500, "Rejection reason must be at most 500 characters"],
    },
    interviewScheduledAt: {
      type: Date,
      default: null,
    },
    interviewNotes: {
      type: String,
      trim: true,
      maxlength: [1000, "Interview notes must be at most 1000 characters"],
    },
    approvedAt: {
      type: Date,
      default: null,
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

// Unique: one application per tenant per property
ApplicationSchema.index(
  { propertyId: 1, tenantId: 1 },
  { unique: true }
);
ApplicationSchema.index({ landlordId: 1, status: 1 });
ApplicationSchema.index({ tenantId: 1, status: 1 });
ApplicationSchema.index({ status: 1 });
ApplicationSchema.index({ createdAt: -1 });

// ─── Model ────────────────────────────────────────────────────────

const ApplicationModel: IApplicationModel =
  (mongoose.models.Application as IApplicationModel) ||
  mongoose.model<IApplicationDocument, IApplicationModel>(
    "Application",
    ApplicationSchema
  );

export default ApplicationModel;
