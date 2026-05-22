import mongoose, { Document, Model, Schema, Types } from "mongoose";

// ─── TypeScript interfaces ─────────────────────────────────────────

export type DisputeType =
  | "deposit_refund"
  | "property_damage"
  | "rent_payment"
  | "maintenance_neglect"
  | "unlawful_eviction"
  | "false_review"
  | "other";

export type DisputeStatus =
  | "open"
  | "under_review"
  | "mediation"
  | "awaiting_evidence"
  | "resolved_tenant_favor"
  | "resolved_landlord_favor"
  | "resolved_mutual"
  | "escalated"
  | "closed";

export type DisputePriority = "low" | "medium" | "high" | "urgent";

export interface IDisputeMessage {
  _id: Types.ObjectId;
  senderId: Types.ObjectId;
  senderRole: "tenant" | "landlord" | "admin";
  message: string;
  attachmentUrls: string[];
  sentAt: Date;
}

export interface IDispute {
  raisedBy: Types.ObjectId;
  againstUser: Types.ObjectId;
  propertyId?: Types.ObjectId;
  rentalHistoryId?: Types.ObjectId;
  type: DisputeType;
  title: string;
  description: string;
  status: DisputeStatus;
  priority: DisputePriority;
  evidenceUrls: string[];
  messages: IDisputeMessage[];
  adminAssignedTo?: Types.ObjectId;
  resolution?: string;
  resolvedAt?: Date;
  scoreImpactTenant?: number;
  scoreImpactLandlord?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDisputeDocument extends IDispute, Document {}

export type IDisputeModel = Model<IDisputeDocument>;

// ─── Sub-schema ───────────────────────────────────────────────────

const DisputeMessageSchema = new Schema<IDisputeMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderRole: {
      type: String,
      enum: ["tenant", "landlord", "admin"],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: [3000, "Message must be at most 3000 characters"],
    },
    attachmentUrls: {
      type: [String],
      default: [],
    },
    sentAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { _id: true }
);

// ─── Schema ───────────────────────────────────────────────────────

const DisputeSchema = new Schema<IDisputeDocument>(
  {
    raisedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "raisedBy is required"],
    },
    againstUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "againstUser is required"],
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },
    rentalHistoryId: {
      type: Schema.Types.ObjectId,
      ref: "RentalHistory",
      default: null,
    },
    type: {
      type: String,
      enum: {
        values: [
          "deposit_refund",
          "property_damage",
          "rent_payment",
          "maintenance_neglect",
          "unlawful_eviction",
          "false_review",
          "other",
        ],
        message: "{VALUE} is not a valid dispute type",
      },
      required: [true, "Dispute type is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [150, "Title must be at most 150 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [50, "Description must be at least 50 characters"],
      maxlength: [5000, "Description must be at most 5000 characters"],
    },
    status: {
      type: String,
      enum: {
        values: [
          "open",
          "under_review",
          "mediation",
          "awaiting_evidence",
          "resolved_tenant_favor",
          "resolved_landlord_favor",
          "resolved_mutual",
          "escalated",
          "closed",
        ],
        message: "{VALUE} is not a valid dispute status",
      },
      default: "open",
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high", "urgent"],
        message: "{VALUE} is not a valid priority",
      },
      default: "medium",
    },
    evidenceUrls: {
      type: [String],
      default: [],
    },
    messages: {
      type: [DisputeMessageSchema],
      default: [],
    },
    adminAssignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    resolution: {
      type: String,
      trim: true,
      maxlength: [5000, "Resolution must be at most 5000 characters"],
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
    scoreImpactTenant: {
      type: Number,
      default: null,
    },
    scoreImpactLandlord: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────

DisputeSchema.index({ raisedBy: 1, status: 1 });
DisputeSchema.index({ againstUser: 1, status: 1 });
DisputeSchema.index({ status: 1, priority: -1 });
DisputeSchema.index({ adminAssignedTo: 1, status: 1 });
DisputeSchema.index({ rentalHistoryId: 1 });
DisputeSchema.index({ createdAt: -1 });

// ─── Model ────────────────────────────────────────────────────────

const DisputeModel: IDisputeModel =
  (mongoose.models.Dispute as IDisputeModel) ||
  mongoose.model<IDisputeDocument, IDisputeModel>("Dispute", DisputeSchema);

export default DisputeModel;
