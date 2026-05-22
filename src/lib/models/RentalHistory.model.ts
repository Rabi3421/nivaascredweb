import mongoose, { Document, Model, Schema, Types } from "mongoose";

// ─── TypeScript interfaces ─────────────────────────────────────────

export interface IRentPayment {
  _id: Types.ObjectId;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  lateFee?: number;
  status: "pending" | "paid" | "late" | "missed";
  method?: "upi" | "bank_transfer" | "cash" | "cheque";
  transactionId?: string;
  receiptUrl?: string;
  createdAt: Date;
}

export interface IRentalHistory {
  tenantId: Types.ObjectId;
  landlordId: Types.ObjectId;
  propertyId: Types.ObjectId;
  applicationId?: Types.ObjectId;
  monthlyRent: number;
  maintenanceCharges?: number;
  depositAmount: number;
  startDate: Date;
  endDate?: Date;
  status: "active" | "completed" | "terminated";
  terminationReason?: string;
  terminatedBy?: "tenant" | "landlord" | "admin";
  agreementUrl?: string;
  payments: IRentPayment[];
  landlordReviewId?: Types.ObjectId;
  tenantReviewId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRentalHistoryDocument extends IRentalHistory, Document {}

export type IRentalHistoryModel = Model<IRentalHistoryDocument>;

// ─── Sub-schemas ──────────────────────────────────────────────────

const RentPaymentSchema = new Schema<IRentPayment>(
  {
    amount: {
      type: Number,
      required: true,
      min: [0, "Payment amount must be >= 0"],
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paidDate: {
      type: Date,
      default: null,
    },
    lateFee: {
      type: Number,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "late", "missed"],
      default: "pending",
    },
    method: {
      type: String,
      enum: ["upi", "bank_transfer", "cash", "cheque"],
    },
    transactionId: {
      type: String,
      trim: true,
    },
    receiptUrl: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { _id: true }
);

// ─── Schema ───────────────────────────────────────────────────────

const RentalHistorySchema = new Schema<IRentalHistoryDocument>(
  {
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
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "propertyId is required"],
    },
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      default: null,
    },
    monthlyRent: {
      type: Number,
      required: [true, "Monthly rent is required"],
      min: [1, "Monthly rent must be > 0"],
    },
    maintenanceCharges: {
      type: Number,
      min: 0,
      default: 0,
    },
    depositAmount: {
      type: Number,
      required: [true, "Deposit amount is required"],
      min: 0,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: {
        values: ["active", "completed", "terminated"],
        message: "{VALUE} is not a valid rental status",
      },
      default: "active",
    },
    terminationReason: {
      type: String,
      trim: true,
      maxlength: [500, "Termination reason must be at most 500 characters"],
    },
    terminatedBy: {
      type: String,
      enum: ["tenant", "landlord", "admin"],
    },
    agreementUrl: {
      type: String,
      default: null,
    },
    payments: {
      type: [RentPaymentSchema],
      default: [],
    },
    landlordReviewId: {
      type: Schema.Types.ObjectId,
      ref: "Review",
      default: null,
    },
    tenantReviewId: {
      type: Schema.Types.ObjectId,
      ref: "Review",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────

RentalHistorySchema.index({ tenantId: 1, status: 1 });
RentalHistorySchema.index({ landlordId: 1, status: 1 });
RentalHistorySchema.index({ propertyId: 1 });
RentalHistorySchema.index({ status: 1 });

// ─── Model ────────────────────────────────────────────────────────

const RentalHistoryModel: IRentalHistoryModel =
  (mongoose.models.RentalHistory as IRentalHistoryModel) ||
  mongoose.model<IRentalHistoryDocument, IRentalHistoryModel>(
    "RentalHistory",
    RentalHistorySchema
  );

export default RentalHistoryModel;
