# Database Indexes

This document records the intended Mongoose indexes for the NivaasCred MVP and the manual cleanup steps needed if older indexes already exist in MongoDB Atlas.

## User

- `{ email: 1 }`, unique
  - Enforces one account per email.
- `{ phone: 1 }`, unique, sparse
  - Enforces unique phone numbers only when a phone is present.
- `{ role: 1 }`
  - Speeds admin/user role filtering.
- `{ isActive: 1, isBlocked: 1 }`
  - Supports auth checks and future admin user lists.

Safe unique indexes: `email` and sparse `phone`.

## TenantProfile

- `{ userId: 1 }`, unique
  - One tenant profile per user.
- `{ rentalScore: -1 }`
  - Supports score sorting/ranking.

## LandlordProfile

- `{ userId: 1 }`, unique
  - One landlord profile per user.
- `{ averageRating: -1 }`
  - Supports future landlord ranking.
- `{ rentalScore: -1 }`
  - Supports score sorting/ranking.

## Property

- `{ landlordId: 1 }`
  - Supports landlord property management.
- `{ city: 1, availabilityStatus: 1, rentAmount: 1 }`
  - Supports public property listing filters.
- `{ propertyType: 1 }`
  - Supports property type filtering.
- `{ rentAmount: 1 }`
  - Supports rent range filtering/sorting.
- `{ averageRating: -1 }`
  - Supports future rating sorting.
- `{ createdAt: -1 }`
  - Supports latest-first listing.

No unique property indexes are used in the MVP.

## Application

- `{ propertyId: 1, tenantId: 1 }`, unique
  - Intentionally allows one application per tenant per property.
- `{ landlordId: 1, status: 1 }`
  - Supports landlord application queues.
- `{ tenantId: 1, status: 1 }`
  - Supports tenant application history.
- `{ status: 1 }`
  - Supports status filtering.
- `{ createdAt: -1 }`
  - Supports latest-first lists.

Safe unique index: `{ propertyId, tenantId }` is intentional for the current business rule.

## RentalHistory

- `{ tenantId: 1, status: 1 }`
  - Supports tenant rental history pages.
- `{ landlordId: 1, status: 1 }`
  - Supports landlord rental history pages.
- `{ propertyId: 1 }`
  - Supports property-linked rental history.
- `{ status: 1 }`
  - Supports status filtering and scoring.

No unique rental-history index exists. Duplicate prevention for `applicationId` is currently handled in application code.

## Review

- `{ rentalHistoryId: 1, reviewerId: 1 }`, unique
  - Enforces one review per rental per reviewer.
- `{ revieweeId: 1, moderationStatus: 1 }`
  - Supports received reviews.
- `{ propertyId: 1, moderationStatus: 1 }`
  - Supports future property review summaries.
- `{ reviewerId: 1 }`
  - Supports given reviews.
- `{ rating: -1 }`
  - Supports rating analytics.

Safe unique index: `{ rentalHistoryId, reviewerId }`.

## ReviewRequest

- `{ rentalHistoryId: 1, recipientId: 1 }`
  - Supports request lookup for rental participants.
- `{ recipientId: 1, status: 1 }`
  - Supports received request inboxes.
- `{ expiresAt: 1 }`, TTL `2592000` seconds
  - Removes expired request records 30 days after `expiresAt`.

No unique request index exists; duplicate pending requests are prevented in application code.

## Verification

Current intended indexes:

- `{ userId: 1, type: 1, createdAt: -1 }`
  - Supports user verification history and latest-by-type display.
- `{ status: 1 }`
  - Supports admin review queues.
- `{ reviewedBy: 1 }`
  - Supports future admin audit views.
- `{ propertyId: 1, status: 1 }`
  - Supports property verification review and property-linked lookups.

No unique verification index should exist. Multiple verification attempts over time must be allowed.

## ScoreLog

- `{ userId: 1, createdAt: -1 }`
  - Supports latest score snapshot lookup.
- `{ category: 1 }`
  - Supports future score analytics.

## Notification

- `{ userId: 1, isRead: 1, createdAt: -1 }`
  - Supports notification inboxes.
- `{ userId: 1, type: 1 }`
  - Supports type filtering.
- `{ createdAt: 1 }`, TTL `7776000` seconds
  - Deletes notifications older than 90 days.

## Dispute

Disputes are not part of the MVP flow, but the model currently defines:

- `{ raisedBy: 1, status: 1 }`
- `{ againstUser: 1, status: 1 }`
- `{ status: 1, priority: -1 }`
- `{ adminAssignedTo: 1, status: 1 }`
- `{ rentalHistoryId: 1 }`
- `{ createdAt: -1 }`

## Manual MongoDB Atlas Cleanup

If the database was used before Phase 10, old verification unique indexes may still exist. These must be dropped manually because Mongoose will not automatically remove old indexes.

Indexes to check and drop on the `verifications` collection:

- `userId_1_type_1`
- `userId_1_type_1_propertyId_1`

Only drop these if they are marked `unique: true`.

### Atlas Steps

1. Open MongoDB Atlas.
2. Select the project and cluster.
3. Open `Browse Collections`.
4. Select the NivaasCred database.
5. Open the `verifications` collection.
6. Open the `Indexes` tab.
7. Look for `userId_1_type_1` or `userId_1_type_1_propertyId_1`.
8. Confirm the index is unique.
9. Drop the old unique index.
10. Restart the app or allow Mongoose to create the current non-unique indexes.

For production, take a backup/snapshot before dropping indexes.
