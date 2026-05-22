# NivaasCred — Backend Integration Plan

> Status: **Pre-implementation planning document**  
> Applies to: Next.js 15 App Router + MongoDB + JWT Auth + React Native mobile

---

## 1. Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                      Clients                                 │
│   Next.js Web (Browser)          React Native CLI (Mobile)   │
└────────────────┬───────────────────────────┬─────────────────┘
                 │ httpOnly cookie auth       │ Bearer token auth
                 ▼                           ▼
┌──────────────────────────────────────────────────────────────┐
│              Next.js App Router  (src/app/api/...)           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Auth Routes  │  │ Entity Routes│  │   Admin Routes   │   │
│  └──────┬────────┘  └──────┬───────┘  └────────┬─────────┘   │
│         │                 │                   │              │
│         └─────────────────▼───────────────────┘             │
│                    Middleware Layer                          │
│         (isAuthenticated → hasRole → isResourceOwner)        │
│                           │                                  │
│                    Service Layer                             │
│         (business logic, score calculation, notifications)   │
│                           │                                  │
│            ┌──────────────▼──────────────┐                  │
│            │         MongoDB Atlas        │                  │
│            │   (via Mongoose ODM)         │                  │
│            └─────────────────────────────┘                  │
└──────────────────────────────────────────────────────────────┘
         │                              │
    File Uploads                   External Services
    (AWS S3 / Cloudinary)          (Razorpay, Resend, Twilio)
```

**Key principle:** The same API routes serve both web and mobile. The only difference is the authentication mechanism (cookie vs Authorization header).

---

## 2. Tech Stack Decisions

| Concern                  | Choice                          | Reason                                                  |
| ------------------------ | ------------------------------- | ------------------------------------------------------- |
| Database                 | MongoDB Atlas                   | Flexible schema for evolving domain; great with Next.js |
| ODM                      | Mongoose 8                      | Schema validation, virtuals, population, middleware      |
| Auth (tokens)            | JWT (HS256)                     | Simple, stateless, works for web + mobile               |
| Auth (web delivery)      | httpOnly + Secure + SameSite=Strict cookie | XSS-safe; CSRF-safe with SameSite              |
| Auth (mobile delivery)   | Access token in response body; refresh in secure storage | React Native secure storage |
| Password hashing         | bcrypt (12 rounds)              | Industry standard                                       |
| Input validation         | Zod                             | TypeScript-first; shared schemas for forms + API        |
| File uploads             | AWS S3 with presigned URLs      | Client uploads directly; no server bandwidth overhead   |
| Email                    | Resend (or Nodemailer + SMTP)   | Transactional email for OTP, verification, receipts     |
| SMS / OTP                | MSG91 or Twilio                 | Indian phone number OTP verification                    |
| Payments                 | Razorpay                        | Best Indian payment gateway                             |
| Rate limiting            | Upstash Redis + `@upstash/ratelimit` | Serverless-compatible; per-IP and per-user limits   |
| Caching                  | Upstash Redis                   | Property listings, score cache                          |

---

## 3. Environment Variables

Create `.env.local` (never commit):

```bash
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/nivaascred?retryWrites=true&w=majority

# JWT
JWT_ACCESS_SECRET=<random-64-char-string>
JWT_REFRESH_SECRET=<different-random-64-char-string>
JWT_ACCESS_EXPIRES_IN=900          # 15 minutes (seconds)
JWT_REFRESH_EXPIRES_IN=604800      # 7 days (seconds)

# Next.js
NEXTAUTH_URL=http://localhost:4028
NEXT_PUBLIC_API_URL=http://localhost:4028/api

# AWS S3
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=nivaascred-uploads
AWS_S3_DOCUMENTS_BUCKET=nivaascred-docs  # restricted access

# Email (Resend)
RESEND_API_KEY=
EMAIL_FROM=no-reply@nivaascred.com

# SMS (MSG91)
MSG91_AUTH_KEY=
MSG91_TEMPLATE_ID_OTP=

# Payments (Razorpay)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# App
NODE_ENV=development
APP_URL=http://localhost:4028
```

---

## 4. Folder Structure Plan

```
src/
├── app/
│   └── api/                         ← All API route handlers
│       ├── auth/
│       │   ├── register/route.ts
│       │   ├── login/route.ts
│       │   ├── logout/route.ts
│       │   ├── refresh/route.ts
│       │   ├── forgot-password/route.ts
│       │   ├── reset-password/route.ts
│       │   ├── verify-email/route.ts
│       │   └── me/route.ts
│       ├── users/
│       │   └── me/
│       │       ├── route.ts            (GET, PUT, DELETE)
│       │       ├── avatar/route.ts     (PUT)
│       │       └── password/route.ts   (PUT)
│       ├── tenants/
│       │   └── me/
│       │       ├── profile/route.ts
│       │       ├── rental/route.ts     (current rental)
│       │       ├── rentals/route.ts    (history)
│       │       ├── applications/route.ts
│       │       ├── saved-properties/
│       │       │   └── [propertyId]/route.ts
│       │       ├── payments/route.ts
│       │       └── score/route.ts
│       ├── landlords/
│       │   └── me/
│       │       ├── profile/route.ts
│       │       ├── properties/route.ts
│       │       ├── applications/route.ts
│       │       ├── tenants/route.ts
│       │       └── revenue/route.ts
│       ├── properties/
│       │   ├── route.ts               (GET list, POST create)
│       │   └── [id]/
│       │       ├── route.ts           (GET, PUT, DELETE)
│       │       └── reviews/route.ts
│       ├── applications/
│       │   ├── route.ts               (POST)
│       │   └── [id]/route.ts          (GET, PUT, DELETE)
│       ├── reviews/
│       │   ├── route.ts               (POST)
│       │   └── [id]/route.ts          (GET, PUT)
│       ├── verifications/
│       │   ├── route.ts               (POST, GET me)
│       │   └── [id]/route.ts
│       ├── disputes/
│       │   ├── route.ts               (POST)
│       │   └── [id]/
│       │       ├── route.ts           (GET, PUT)
│       │       └── messages/route.ts  (POST)
│       ├── notifications/
│       │   ├── route.ts               (GET list)
│       │   ├── [id]/read/route.ts     (PUT)
│       │   ├── read-all/route.ts      (PUT)
│       │   ├── preferences/route.ts   (GET, PUT)
│       │   └── unread-count/route.ts  (GET)
│       ├── uploads/
│       │   └── presign/route.ts       (POST — returns S3 presigned URL)
│       └── admin/
│           ├── users/route.ts
│           ├── users/[id]/block/route.ts
│           ├── verifications/route.ts
│           ├── verifications/[id]/route.ts
│           ├── disputes/route.ts
│           ├── disputes/[id]/resolve/route.ts
│           └── stats/route.ts
│
├── lib/
│   ├── db/
│   │   ├── connect.ts               ← Mongoose singleton connection
│   │   └── models/
│   │       ├── User.model.ts
│   │       ├── TenantProfile.model.ts
│   │       ├── LandlordProfile.model.ts
│   │       ├── Property.model.ts
│   │       ├── RentalHistory.model.ts
│   │       ├── RentPayment.model.ts
│   │       ├── Review.model.ts
│   │       ├── ReviewRequest.model.ts
│   │       ├── Application.model.ts
│   │       ├── Verification.model.ts
│   │       ├── Dispute.model.ts
│   │       ├── ScoreLog.model.ts
│   │       ├── Notification.model.ts
│   │       └── RefreshToken.model.ts
│   │
│   ├── auth/
│   │   ├── jwt.ts                   ← sign/verify access + refresh tokens
│   │   ├── cookies.ts               ← set/clear httpOnly refresh cookie
│   │   ├── password.ts              ← bcrypt hash/compare
│   │   └── middleware.ts            ← withAuth, withRole HOF wrappers
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── property.service.ts
│   │   ├── application.service.ts
│   │   ├── rental.service.ts
│   │   ├── review.service.ts
│   │   ├── verification.service.ts
│   │   ├── dispute.service.ts
│   │   ├── score.service.ts         ← Rental Trust Score engine
│   │   └── notification.service.ts
│   │
│   ├── validators/
│   │   ├── auth.schemas.ts          ← Zod schemas for auth payloads
│   │   ├── property.schemas.ts
│   │   ├── application.schemas.ts
│   │   ├── review.schemas.ts
│   │   └── ...
│   │
│   └── storage/
│       ├── s3.ts                    ← AWS S3 presigned URL generation
│       └── upload.ts                ← File type/size validation helpers
│
├── types/                           ← Already created ✓
└── data/                            ← Mock data (replaced by DB) ✓
```

---

## 5. MongoDB Collections

### Collection Design

| Collection          | Indexes                                                               | Notes                                          |
| ------------------- | --------------------------------------------------------------------- | ---------------------------------------------- |
| `users`             | `email (unique)`, `phone (unique)`, `role`                            | Core auth entity                               |
| `tenant_profiles`   | `userId (unique)`                                                     | 1:1 with users where role=tenant               |
| `landlord_profiles` | `userId (unique)`                                                     | 1:1 with users where role=landlord             |
| `properties`        | `landlordId`, `city`, `status`, `monthlyRent`, `type`                | Compound: `city + status + monthlyRent`        |
| `rental_histories`  | `tenantId`, `landlordId`, `propertyId`, `status`                     | TTL index on endDate for archiving             |
| `rent_payments`     | `rentalId`, `status`, `dueDate`                                      | Compound: `rentalId + status`                  |
| `reviews`           | `revieweeId`, `propertyId`, `rentalId (unique)`                      | Unique on rentalId prevents duplicate reviews  |
| `review_requests`   | `rentalId`, `requesterId`, `status`, `expiresAt`                     | TTL index on expiresAt                         |
| `applications`      | `propertyId + tenantId (unique)`, `landlordId`, `status`             | Unique prevents duplicate applications         |
| `verifications`     | `userId + type (unique)`, `status`                                   | One verification per type per user             |
| `disputes`          | `rentalId`, `raisedById`, `status`, `priority`                       |                                                |
| `score_logs`        | `userId`, `createdAt`                                                | Append-only; never deleted                     |
| `notifications`     | `userId + isRead`, `createdAt`                                       | TTL index: delete after 90 days                |
| `refresh_tokens`    | `token (unique)`, `userId`, `expiresAt`                              | TTL index on expiresAt                         |

---

## 6. Authentication Flow

### 6.1 Registration
```
Client                    API                           DB
  │─── POST /api/auth/register ────────────────────────▶│
  │    { firstName, lastName, email, phone, role, ... }  │
  │                        │── Validate with Zod ───────▶│
  │                        │── Hash password (bcrypt) ──▶│
  │                        │── Create User document ─────▶│
  │                        │── Create TenantProfile       │
  │                        │    or LandlordProfile ──────▶│
  │                        │── Send email verification ──▶│ (async)
  │◀─── 201 { user } ───────│                             │
```

### 6.2 Login (Web)
```
Client                    API                           DB
  │─── POST /api/auth/login ───────────────────────────▶│
  │    { email, password }                               │
  │                        │── Find user by email ──────▶│
  │                        │── bcrypt.compare ──────────▶│
  │                        │── Generate accessToken ─────│
  │                        │── Generate refreshToken ────│
  │                        │── Store refreshToken hash ─▶│
  │◀─── 200 { user, accessToken }                        │
  │     Set-Cookie: refreshToken (httpOnly, Secure) ─────│
```

### 6.3 Login (Mobile)
```
Client                    API
  │─── POST /api/auth/login ──────────────────────────▶│
  │    { email, password, clientType: "mobile" }        │
  │◀─── 200 { user, accessToken, refreshToken } ────────│
  │  (no cookie — tokens stored in React Native         │
  │   SecureStore / Keychain)                           │
```

### 6.4 Token Refresh
- **Web:** Send `POST /api/auth/refresh` — cookie is auto-included
- **Mobile:** Send `POST /api/auth/refresh` with `{ refreshToken }` in body
- On success: new accessToken returned; new refreshToken issued (rotation)

### 6.5 Middleware Architecture
```typescript
// src/lib/auth/middleware.ts

// Usage in route handlers:
// export const GET = withAuth(withRole('tenant', handler));

withAuth(handler)      // verifies JWT, attaches user to request context
withRole(role, handler)// checks user.role === role
isResourceOwner(handler, getOwnerId) // checks user._id === resource owner
```

---

## 7. Rental Trust Score Algorithm

The Rental Trust Score (RTS) ranges from **300–1000**. It is calculated incrementally using the `score_logs` collection.

### 7.1 Score Events

| Event                            | Delta   | Trigger                                        |
| -------------------------------- | ------- | ---------------------------------------------- |
| On-time rent payment             | +10     | Payment status set to `paid` before dueDate    |
| Late rent payment (1–7 days)     | -50     | Payment status set to `late`                   |
| Missed payment (>7 days)         | -100    | Scheduled job marks payment as `missed`        |
| 5-star review received           | +20     | Review created with overallRating ≥ 4.5        |
| 1–2 star review received         | -10     | Review created with overallRating ≤ 2          |
| Identity verification approved   | +10     | Admin approves verification of type `identity` |
| Income verification approved     | +10     | Admin approves `income` verification           |
| Employment verification approved | +10     | Admin approves `employment` verification       |
| 12-month consecutive tenancy     | +50     | Rental history: 12 consecutive on-time months  |
| Dispute raised against you       | -30     | Dispute status set to `open`                   |
| Dispute resolved in your favor   | +20     | Dispute resolved in user's favor               |
| Dispute resolved against you     | -40     | Dispute resolved against user                  |
| Profile completion (80%)         | +5      | One-time; account activity event               |

### 7.2 Score Tiers

| Range    | Tier           | Label            | Benefits                              |
| -------- | -------------- | ---------------- | ------------------------------------- |
| 300–549  | Building Trust | 🔵 Building       | Basic listing access                  |
| 550–699  | Good Standing  | 🟢 Good           | Highlighted in search                 |
| 700–849  | Excellent      | 🥈 Excellent      | Priority match, "Recommended" badge   |
| 850–1000 | Outstanding    | 🥇 Outstanding    | Top listing priority, trust badge     |

### 7.3 Score Service Implementation Plan
```typescript
// src/lib/services/score.service.ts

async function applyScoreEvent(
  userId: string,
  category: ScoreCategory,
  referenceId: string,
  referenceModel: string,
  customDelta?: number
): Promise<void> {
  // 1. Get current score from TenantProfile or LandlordProfile
  // 2. Calculate new score (clamp 300–1000)
  // 3. Create ScoreLog document
  // 4. Update profile.rentalTrustScore
  // 5. Update profile.creditTier
  // 6. Create Notification (score_changed type)
  // All in a MongoDB transaction
}
```

---

## 8. File Upload Strategy

### 8.1 Property Images (Public)
1. Frontend requests presigned URL: `POST /api/uploads/presign` with `{ fileType, bucket: "images" }`
2. API validates file type (JPEG/PNG/WebP only, max 10MB), returns presigned PUT URL
3. Client uploads directly to S3
4. Client saves S3 URL in property form
5. On property save: URL stored in `Property.images[]`

### 8.2 Verification Documents (Private)
1. Same presigned URL flow but `bucket: "documents"`
2. S3 bucket policy: objects are private by default
3. Access through pre-signed GET URLs (15-min expiry) generated by the API
4. Admin receives presigned GET URL when reviewing

### 8.3 Avatar Uploads
- Max 5MB, JPEG/PNG/WebP only
- Stored in `images` bucket under `avatars/` prefix
- Old avatar deleted from S3 on update

---

## 9. Notification Service

```
Event occurs → Service creates Notification document →
Notification worker:
  ├── In-app: document stored, unread count cache updated
  ├── Email: Resend API (async, non-blocking)
  └── SMS: MSG91 API (async, for critical events only)

Mobile push:
  └── Firebase Cloud Messaging (FCM) — Phase 10
```

**Critical events → SMS:** payment_late, payment_missed, dispute_opened  
**Standard events → Email:** verification_approved/rejected, review_request, rental_started  
**In-app only:** score_changed, system announcements

---

## 10. Integration Phases

### Phase 1 — Foundation (Week 1–2)
- [ ] MongoDB connection singleton (`src/lib/db/connect.ts`)
- [ ] User Mongoose model
- [ ] `POST /api/auth/register`
- [ ] `POST /api/auth/login` (web + mobile)
- [ ] `POST /api/auth/logout`
- [ ] `POST /api/auth/refresh`
- [ ] JWT utilities + middleware (`withAuth`, `withRole`)
- [ ] `GET /api/auth/me`

### Phase 2 — Profiles (Week 2–3)
- [ ] TenantProfile + LandlordProfile models
- [ ] `GET/PUT /api/users/me`
- [ ] `GET/PUT /api/tenants/me/profile`
- [ ] `GET/PUT /api/landlords/me/profile`
- [ ] `PUT /api/users/me/avatar` (S3 presign flow)

### Phase 3 — Properties (Week 3–4)
- [ ] Property model
- [ ] `GET /api/properties` (with filters + pagination)
- [ ] `GET /api/properties/:id`
- [ ] `POST /api/properties` (landlord)
- [ ] `PUT /api/properties/:id`
- [ ] `DELETE /api/properties/:id`
- [ ] Property image upload (S3 presign)
- [ ] Saved properties endpoints

### Phase 4 — Applications (Week 4–5)
- [ ] Application model
- [ ] `POST /api/applications` (tenant applies)
- [ ] `GET /api/landlords/me/applications`
- [ ] `PUT /api/applications/:id` (landlord approves/rejects)
- [ ] Application → Rental creation on approval

### Phase 5 — Rentals & Payments (Week 5–7)
- [ ] RentalHistory + RentPayment models
- [ ] Payment tracking endpoints
- [ ] Razorpay integration (collect rent)
- [ ] Payment receipt generation (PDF → S3)
- [ ] Score events on payment (on_time, late, missed)
- [ ] Scheduled job: mark overdue payments as `missed`

### Phase 6 — Reviews (Week 7–8)
- [ ] Review + ReviewRequest models
- [ ] `POST /api/reviews` (after rental ends)
- [ ] Auto-create ReviewRequests when rental ends
- [ ] Score events on review creation
- [ ] `GET /api/users/:id/reviews` (public profile)

### Phase 7 — Verifications (Week 8–9)
- [ ] Verification model
- [ ] `POST /api/verifications` (submit documents)
- [ ] S3 presign for verification documents
- [ ] Admin verification queue endpoints
- [ ] Score events on approval
- [ ] Email notification on approval/rejection

### Phase 8 — Disputes (Week 9–10)
- [ ] Dispute model
- [ ] `POST /api/disputes`
- [ ] Dispute messaging thread
- [ ] Admin dispute resolution
- [ ] Score impact on resolution

### Phase 9 — Notifications (Week 10–11)
- [ ] Notification model
- [ ] Notification service (in-app + email + SMS)
- [ ] `GET /api/notifications` + read/unread endpoints
- [ ] Notification preferences

### Phase 10 — Mobile API (Week 11–12)
- [ ] Detect mobile client (`X-Client-Type: mobile` header)
- [ ] Mobile-specific token handling (tokens in body, not cookie)
- [ ] FCM push notification integration
- [ ] Deep-link data in notification payloads
- [ ] Test all endpoints from React Native client

---

## 11. Security Checklist

- [ ] All inputs validated with Zod before touching the database
- [ ] Rate limiting on auth routes (5 req/min per IP for login, register)
- [ ] bcrypt with 12 rounds for passwords
- [ ] JWT secrets ≥ 64 chars, stored in env vars
- [ ] httpOnly + Secure + SameSite=Strict on refresh token cookie
- [ ] CORS configured to allow only web domain + mobile (via header-based detection)
- [ ] All file uploads: type check, size check, virus scan (optional ClamAV)
- [ ] MongoDB injection prevented by Mongoose schema typing
- [ ] No sensitive fields returned in API responses (passwordHash, refreshTokenHash)
- [ ] Admin routes protected by `withRole('admin')` middleware
- [ ] Dispute evidence and verification docs behind signed S3 URLs
- [ ] Pagination on all list endpoints (max 50 per page)
- [ ] `X-Content-Type-Options: nosniff` + `X-Frame-Options: DENY` headers

---

## 12. Mobile API Strategy (React Native)

The React Native app consumes the **exact same API routes** as the web app.

**Differences handled by the API:**

| Concern       | Web                                  | Mobile                                   |
| ------------- | ------------------------------------ | ---------------------------------------- |
| Auth detect   | No header needed (cookie-based)      | `X-Client-Type: mobile` header           |
| Token deliver | accessToken in body; refresh as cookie | Both tokens in response body           |
| Token store   | Browser handles cookie automatically | `expo-secure-store` or `react-native-keychain` |
| Token send    | Cookie auto-sent on every request    | `Authorization: Bearer <accessToken>`    |
| Token refresh | `POST /api/auth/refresh` (cookie auto-sent) | `POST /api/auth/refresh` with `{ refreshToken }` in body |

**Recommendation:** Create a shared API client (`src/lib/apiClient.ts`) with:
- Auto token refresh on 401
- `X-Client-Type` header injection for mobile
- Consistent error handling

---

## 13. Recommended Development Order

```
1. MongoDB setup + User model + Auth routes     [unblocks everything]
2. Property model + listings API                [unblocks tenant/landlord flows]
3. Application + Rental flows                  [core business logic]
4. Reviews + Score calculation                 [core value proposition]
5. Verifications + Dispute management          [trust features]
6. Notifications                               [polish]
7. Admin dashboard API                         [operations]
8. Mobile-specific hardening                   [React Native]
```
