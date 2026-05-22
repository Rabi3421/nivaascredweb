export type NotificationType =
  | "payment_due" // rent due in X days
  | "payment_received" // landlord received payment
  | "payment_late" // payment overdue
  | "application_received" // landlord: new application
  | "application_status_changed" // tenant: application approved/rejected
  | "rental_started" // rental agreement activated
  | "rental_ending_soon" // lease ends in 30/7 days
  | "rental_ended" // rental marked complete
  | "review_request" // prompted to write a review
  | "review_received" // someone reviewed you
  | "dispute_opened" // dispute raised against you
  | "dispute_update" // dispute status changed
  | "dispute_resolved" // dispute has been resolved
  | "verification_approved" // document verified
  | "verification_rejected" // document rejected with reason
  | "score_changed" // rental trust score updated
  | "message_received" // new message from other party
  | "system"; // platform-level announcements

export type NotificationChannel = "in_app" | "email" | "sms" | "push";

export interface NotificationData {
  // Generic deep-link data for mobile push notifications
  screen?: string; // e.g., "RentalDetail", "Application"
  entityId?: string; // the ID to navigate to
  entityType?: string; // e.g., "rental", "application", "dispute"
  [key: string]: unknown;
}

/** Mirrors the `notifications` MongoDB collection */
export interface NotificationDocument {
  _id: string;
  userId: string; // ref → users
  type: NotificationType;
  title: string;
  message: string;
  data?: NotificationData;
  channels: NotificationChannel[];
  isRead: boolean;
  readAt?: string; // ISO date
  emailSentAt?: string;
  smsSentAt?: string;
  pushSentAt?: string;
  createdAt: string;
}

/** Notification preference settings stored on the user document */
export interface NotificationPreferences {
  paymentReminders: boolean;
  applicationUpdates: boolean;
  reviewRequests: boolean;
  disputeAlerts: boolean;
  scoreChanges: boolean;
  systemAnnouncements: boolean;
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
  };
}

/** Request body for PUT /api/notifications/preferences */
export type UpdateNotificationPreferencesPayload = Partial<NotificationPreferences>;

/** Aggregated unread count returned by /api/notifications/unread-count */
export interface NotificationUnreadCount {
  total: number;
  byType: Partial<Record<NotificationType, number>>;
}
