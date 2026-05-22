export { default as UserModel } from "./User.model";
export { default as TenantProfileModel } from "./TenantProfile.model";
export { default as LandlordProfileModel } from "./LandlordProfile.model";
export { default as PropertyModel } from "./Property.model";
export { default as RentalHistoryModel } from "./RentalHistory.model";
export { default as ReviewModel } from "./Review.model";
export { default as ReviewRequestModel } from "./ReviewRequest.model";
export { default as ApplicationModel } from "./Application.model";
export { default as VerificationModel } from "./Verification.model";
export { default as DisputeModel } from "./Dispute.model";
export { default as ScoreLogModel } from "./ScoreLog.model";
export { default as NotificationModel } from "./Notification.model";

// Re-export TypeScript interfaces for convenience
export type { IUser, IUserDocument, IUserModel } from "./User.model";
export type { ITenantProfile, ITenantProfileDocument } from "./TenantProfile.model";
export type { ILandlordProfile, ILandlordProfileDocument } from "./LandlordProfile.model";
export type { IProperty, IPropertyDocument } from "./Property.model";
export type { IRentalHistory, IRentalHistoryDocument, IRentPayment } from "./RentalHistory.model";
export type { IReview, IReviewDocument } from "./Review.model";
export type { IReviewRequest, IReviewRequestDocument } from "./ReviewRequest.model";
export type { IApplication, IApplicationDocument, ApplicationStatus } from "./Application.model";
export type { IVerification, IVerificationDocument, VerificationType, VerificationStatus } from "./Verification.model";
export type { IDispute, IDisputeDocument, DisputeType, DisputeStatus } from "./Dispute.model";
export type { IScoreLog, IScoreLogDocument, ScoreCategory } from "./ScoreLog.model";
export type { INotification, INotificationDocument, NotificationType } from "./Notification.model";
