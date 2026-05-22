import mongoose, { Document, Model, Schema, Types } from "mongoose";

// ─── TypeScript interfaces ─────────────────────────────────────────

export type NotificationType =
  | "payment_due"
  | "payment_received"
  | "payment_late"
  | "application_received"
  | "application_status_changed"
  | "rental_started"
  | "rental_ending_soon"
  | "rental_ended"
  | "review_request"
  | "review_received"
  | "dispute_opened"
  | "dispute_update"
  | "dispute_resolved"
  | "verification_approved"
  | "verification_rejected"
  | "score_changed"
  | "message_received"
  | "system";

export type NotificationChannel = "in_app" | "email" | "sms" | "push";

export interface INotification {
  userId: Types.ObjectId;
  title: string;
  message: string;
  type: NotificationType;
  channels: NotificationChannel[];
  isRead: boolean;
  readAt?: Date;
  actionUrl?: string;
  data?: Record<string, unknown>;
  emailSentAt?: Date;
  smsSentAt?: Date;
  pushSentAt?: Date;
  createdAt: Date;
}

export interface INotificationDocument extends INotification, Document {}

export type INotificationModel = Model<INotificationDocument>;

// ─── Schema ───────────────────────────────────────────────────────

const NotificationSchema = new Schema<INotificationDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title must be at most 200 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [1000, "Message must be at most 1000 characters"],
    },
    type: {
      type: String,
      enum: {
        values: [
          "payment_due",
          "payment_received",
          "payment_late",
          "application_received",
          "application_status_changed",
          "rental_started",
          "rental_ending_soon",
          "rental_ended",
          "review_request",
          "review_received",
          "dispute_opened",
          "dispute_update",
          "dispute_resolved",
          "verification_approved",
          "verification_rejected",
          "score_changed",
          "message_received",
          "system",
        ],
        message: "{VALUE} is not a valid notification type",
      },
      required: [true, "Notification type is required"],
    },
    channels: {
      type: [String],
      enum: ["in_app", "email", "sms", "push"],
      default: ["in_app"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
      default: null,
    },
    actionUrl: {
      type: String,
      default: null,
    },
    data: {
      type: Schema.Types.Mixed,
      default: null,
    },
    emailSentAt: {
      type: Date,
      default: null,
    },
    smsSentAt: {
      type: Date,
      default: null,
    },
    pushSentAt: {
      type: Date,
      default: null,
    },
  },
  {
    // Only createdAt — notifications are immutable after creation
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────

NotificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
NotificationSchema.index({ userId: 1, type: 1 });
// TTL: auto-delete notifications older than 90 days
NotificationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 90 }
);

// ─── Model ────────────────────────────────────────────────────────

const NotificationModel: INotificationModel =
  (mongoose.models.Notification as INotificationModel) ||
  mongoose.model<INotificationDocument, INotificationModel>(
    "Notification",
    NotificationSchema
  );

export default NotificationModel;
