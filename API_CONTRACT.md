# NivaasCred — API Contract

> Status: **Pre-implementation contract** (UI-only; no real routes implemented yet)  
> Base URL: `/api` (relative to app origin)  
> All request/response bodies are `application/json` unless noted.

---

## Conventions

### Authentication

| Context | Mechanism |
|---------|-----------|
| Web | `accessToken` returned in response body; `refreshToken` in `Set-Cookie` (httpOnly, Secure, SameSite=Strict) |
| Mobile | Both tokens returned in response body; send `Authorization: Bearer <accessToken>` on subsequent requests |
| Mobile detect | Send `X-Client-Type: mobile` header on login/refresh |

Protected endpoints require a valid `accessToken`. The middleware reads the `Authorization` header (mobile) or derives it from the session cookie (web). Routes marked **Admin only** additionally require `role = "admin"`.

### Response Envelope

**Success:**
```json
{ "success": true, "message": "...", "data": { ... } }
```

**Paginated success:**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1, "limit": 20, "total": 84,
    "totalPages": 5, "hasNextPage": true, "hasPrevPage": false
  }
}
```

**Error:**
```json
{ "success": false, "error": "Human-readable message" }
```

**Validation error:**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": { "email": "Invalid email address", "phone": "Required" }
}
```

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No content (DELETE success) |
| 400 | Bad request / validation failed |
| 401 | Unauthenticated (missing or expired token) |
| 403 | Forbidden (authenticated but wrong role/owner) |
| 404 | Resource not found |
| 409 | Conflict (duplicate, already exists) |
| 422 | Unprocessable entity |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

### Pagination Query Parameters

All `GET` list endpoints accept:

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page (max 50) |
| `search` | string | — | Full-text search |
| `sortBy` | string | `createdAt` | Field to sort by |
| `sortOrder` | `asc\|desc` | `desc` | Sort direction |

---

## Auth Routes

### POST /api/auth/register

Create a new user account and corresponding profile.

**Auth:** None  
**Rate limit:** 5 requests / 15 min per IP

**Request body:**
```json
{
  "firstName": "string (required, 1–50 chars)",
  "lastName": "string (required, 1–50 chars)",
  "email": "string (required, valid email)",
  "phone": "string (required, 10-digit Indian mobile)",
  "password": "string (required, min 8 chars, 1 uppercase, 1 number)",
  "role": "tenant | landlord (required)",
  "city": "string (required)",
  "profession": "string (optional, for tenants)",
  "monthlyIncome": "string (optional, e.g. '₹50,000–₹75,000', for tenants)",
  "businessType": "individual | company | developer | family_owned (optional, for landlords)"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Account created. Please verify your email.",
  "data": {
    "user": {
      "_id": "string",
      "firstName": "string",
      "lastName": "string",
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "role": "tenant | landlord",
      "city": "string",
      "isEmailVerified": false,
      "createdAt": "ISO date"
    }
  }
}
```

**Errors:**
- `400` — Validation failed (see `errors` map)
- `409` — Email or phone already registered

---

### POST /api/auth/login

Authenticate a user and issue tokens.

**Auth:** None  
**Rate limit:** 10 requests / 15 min per IP

**Request body:**
```json
{
  "email": "string (required if phone not provided)",
  "phone": "string (required if email not provided)",
  "password": "string (required)",
  "rememberMe": "boolean (optional, extends refresh token to 30 days)"
}
```

**Headers (optional):**
```
X-Client-Type: mobile
```

**Response 200 (web):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "string",
      "firstName": "string",
      "lastName": "string",
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "role": "tenant | landlord | admin",
      "avatar": "string | null",
      "city": "string",
      "isEmailVerified": "boolean",
      "lastLoginAt": "ISO date"
    },
    "tokens": {
      "accessToken": "string (JWT, 15 min)",
      "expiresIn": 900
    }
  }
}
```
Plus `Set-Cookie: refreshToken=<token>; HttpOnly; Secure; SameSite=Strict; Path=/api/auth/refresh`

**Response 200 (mobile — X-Client-Type: mobile):**
```json
{
  "success": true,
  "data": {
    "user": { "...same as above..." },
    "tokens": {
      "accessToken": "string (JWT, 15 min)",
      "refreshToken": "string (JWT, 7 days)",
      "expiresIn": 900
    }
  }
}
```

**Errors:**
- `400` — Validation failed
- `401` — Invalid credentials
- `403` — Account blocked

---

### POST /api/auth/logout

Invalidate the current session.

**Auth:** Authenticated  
**Rate limit:** None

**Request body:** None (cookie or Bearer token identifies session)

**Response 200:**
```json
{ "success": true, "message": "Logged out successfully" }
```

Clears the `refreshToken` cookie (web). Invalidates the refresh token in the `refresh_tokens` collection.

---

### POST /api/auth/refresh

Issue a new access token using a refresh token (token rotation).

**Auth:** None (refresh token is the credential)  
**Rate limit:** 20 requests / 5 min per IP

**Request body (mobile only):**
```json
{ "refreshToken": "string (required for mobile)" }
```

Web clients send no body — the httpOnly cookie is used automatically.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "tokens": {
      "accessToken": "string",
      "expiresIn": 900
    }
  }
}
```

Mobile also receives a new `refreshToken` in the body. Web receives a new `Set-Cookie`.

**Errors:**
- `401` — Refresh token missing, invalid, or expired
- `403` — Refresh token revoked (suspicious reuse detected)

---

### GET /api/auth/me

Return the currently authenticated user.

**Auth:** Authenticated

**Response 200:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "string",
      "firstName": "string",
      "lastName": "string",
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "role": "tenant | landlord | admin",
      "avatar": "string | null",
      "city": "string",
      "isEmailVerified": "boolean",
      "isPhoneVerified": "boolean"
    }
  }
}
```

---

### POST /api/auth/forgot-password

Send a password reset link to the user's email.

**Auth:** None  
**Rate limit:** 3 requests / 15 min per email

**Request body:**
```json
{ "email": "string (required, valid email)" }
```

**Response 200:**
```json
{
  "success": true,
  "message": "If an account exists, a reset link has been sent."
}
```

Always returns 200 to avoid email enumeration.

---

### POST /api/auth/reset-password

Reset password using a token from the email link.

**Auth:** None  
**Rate limit:** 5 requests / 15 min per IP

**Request body:**
```json
{
  "token": "string (required, from reset email)",
  "password": "string (required, min 8 chars, 1 uppercase, 1 number)",
  "confirmPassword": "string (required, must match password)"
}
```

**Response 200:**
```json
{ "success": true, "message": "Password reset successful." }
```

**Errors:**
- `400` — Validation failed / passwords don't match
- `401` — Reset token invalid or expired

---

### POST /api/auth/verify-email

Confirm a user's email address using the token sent at registration.

**Auth:** None

**Request body:**
```json
{ "token": "string (required)" }
```

**Response 200:**
```json
{ "success": true, "message": "Email verified successfully." }
```

**Errors:**
- `401` — Token invalid or expired
- `409` — Email already verified

---

## User Routes

### GET /api/users/me

Get the full profile of the authenticated user including role-specific profile data.

**Auth:** Authenticated

**Response 200:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "string",
      "firstName": "string",
      "lastName": "string",
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "role": "tenant | landlord | admin",
      "avatar": "string | null",
      "city": "string",
      "isEmailVerified": "boolean",
      "isPhoneVerified": "boolean",
      "createdAt": "ISO date"
    },
    "profile": {
      "...TenantProfileDocument or LandlordProfileDocument fields..."
    }
  }
}
```

---

### PUT /api/users/me

Update basic user information.

**Auth:** Authenticated

**Request body (all fields optional):**
```json
{
  "firstName": "string (1–50 chars)",
  "lastName": "string (1–50 chars)",
  "phone": "string (10-digit Indian mobile)",
  "city": "string"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Profile updated.",
  "data": { "user": { "...updated UserDocument fields..." } }
}
```

**Errors:**
- `400` — Validation failed
- `409` — Phone number already in use

---

### DELETE /api/users/me

Deactivate the authenticated user's account (soft delete).

**Auth:** Authenticated  

**Request body:**
```json
{ "password": "string (required for confirmation)" }
```

**Response 200:**
```json
{ "success": true, "message": "Account deactivated." }
```

---

### PUT /api/users/me/avatar

Upload a new profile avatar.

**Auth:** Authenticated

**Request body:**
```json
{
  "avatarUrl": "string (required, S3 URL from presign upload)"
}
```

**Response 200:**
```json
{
  "success": true,
  "data": { "avatarUrl": "string" }
}
```

---

### PUT /api/users/me/password

Change the authenticated user's password.

**Auth:** Authenticated  
**Rate limit:** 5 requests / 15 min per user

**Request body:**
```json
{
  "currentPassword": "string (required)",
  "newPassword": "string (required, min 8 chars, 1 uppercase, 1 number)",
  "confirmPassword": "string (required, must match newPassword)"
}
```

**Response 200:**
```json
{ "success": true, "message": "Password updated. All other sessions have been signed out." }
```

**Errors:**
- `400` — Validation failed
- `401` — Current password incorrect

---

## Tenant Routes

### GET /api/tenants/me/profile

Get the tenant's full profile.

**Auth:** Authenticated (role: tenant)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "profile": {
      "_id": "string",
      "userId": "string",
      "profession": "string",
      "monthlyIncome": "string",
      "employmentType": "salaried | self_employed | business | student | other",
      "bio": "string | null",
      "preferredLocations": ["string"],
      "preferredPropertyTypes": ["string"],
      "budgetMin": "number",
      "budgetMax": "number",
      "moveInDate": "ISO date | null",
      "petsOwned": "boolean",
      "rentalTrustScore": "number (300–1000)",
      "creditTier": "building | good | excellent | outstanding",
      "totalRentals": "number",
      "onTimePayments": "number",
      "latePayments": "number",
      "missedPayments": "number",
      "verificationStatus": {
        "identity": "boolean",
        "income": "boolean",
        "employment": "boolean",
        "background": "boolean"
      }
    }
  }
}
```

---

### PUT /api/tenants/me/profile

Update the tenant's profile.

**Auth:** Authenticated (role: tenant)

**Request body (all fields optional):**
```json
{
  "profession": "string",
  "monthlyIncome": "string",
  "employmentType": "salaried | self_employed | business | student | other",
  "bio": "string (max 500 chars)",
  "preferredLocations": ["string"],
  "preferredPropertyTypes": ["string"],
  "budgetMin": "number",
  "budgetMax": "number",
  "moveInDate": "ISO date string",
  "petsOwned": "boolean"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Profile updated.",
  "data": { "profile": { "...updated fields..." } }
}
```

---

### GET /api/tenants/me/rental

Get the tenant's current active rental.

**Auth:** Authenticated (role: tenant)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "rental": {
      "_id": "string",
      "property": {
        "_id": "string",
        "title": "string",
        "locality": "string",
        "city": "string",
        "primaryImage": "string | null"
      },
      "landlord": {
        "_id": "string",
        "fullName": "string",
        "avatar": "string | null",
        "phone": "string"
      },
      "monthlyRent": "number",
      "maintenanceCharges": "number | null",
      "securityDeposit": "number",
      "startDate": "ISO date",
      "endDate": "ISO date | null",
      "status": "active",
      "nextPaymentDue": "ISO date",
      "nextPaymentAmount": "number",
      "agreementUrl": "string | null"
    }
  }
}
```

**Errors:**
- `404` — No active rental found

---

### GET /api/tenants/me/rentals

Get the tenant's rental history (paginated).

**Auth:** Authenticated (role: tenant)

**Query params:** `page`, `limit`, `status` (`active | completed | terminated`)

**Response 200:** Paginated list of `RentalSummary` objects.

---

### GET /api/tenants/me/applications

Get all rental applications submitted by the tenant (paginated).

**Auth:** Authenticated (role: tenant)

**Query params:** `page`, `limit`, `status` (see `ApplicationStatus` type)

**Response 200:** Paginated list of `ApplicationResponse` objects.

---

### GET /api/tenants/me/payments

Get the tenant's rent payment history (paginated).

**Auth:** Authenticated (role: tenant)

**Query params:** `page`, `limit`, `status` (`pending | paid | late | missed`), `rentalId`

**Response 200:** Paginated list of `RentPayment` objects.

---

### GET /api/tenants/me/score

Get the tenant's Rental Trust Score history and breakdown.

**Auth:** Authenticated (role: tenant)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "currentScore": "number",
    "currentTier": "building | good | excellent | outstanding",
    "history": [
      {
        "_id": "string",
        "previousScore": "number",
        "newScore": "number",
        "change": "number (positive or negative)",
        "category": "ScoreCategory string",
        "reason": "string",
        "createdAt": "ISO date"
      }
    ],
    "breakdown": {
      "totalPositive": "number",
      "totalNegative": "number",
      "onTimePayments": "number",
      "latePayments": "number",
      "missedPayments": "number",
      "verificationsCompleted": "number",
      "reviewsReceived": "number"
    }
  }
}
```

---

### GET /api/tenants/me/saved-properties

Get the tenant's saved/bookmarked properties (paginated).

**Auth:** Authenticated (role: tenant)

**Response 200:** Paginated list of `PropertyWithLandlord` objects with `isSaved: true`.

---

### PUT /api/tenants/me/saved-properties/:propertyId

Toggle save/unsave a property.

**Auth:** Authenticated (role: tenant)

**Request body:** None

**Response 200:**
```json
{
  "success": true,
  "data": { "isSaved": "boolean" }
}
```

---

### DELETE /api/tenants/me/saved-properties/:propertyId

Remove a property from saved list.

**Auth:** Authenticated (role: tenant)

**Response 204:** No content.

---

## Landlord Routes

### GET /api/landlords/me/profile

Get the landlord's full profile.

**Auth:** Authenticated (role: landlord)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "profile": {
      "_id": "string",
      "userId": "string",
      "businessType": "individual | company | developer | family_owned",
      "businessName": "string | null",
      "gstin": "string | null",
      "panNumber": "string | null",
      "totalProperties": "number",
      "occupiedProperties": "number",
      "averageRating": "number",
      "totalReviews": "number",
      "rentalTrustScore": "number",
      "creditTier": "building | good | excellent | outstanding",
      "verificationStatus": {
        "identity": "boolean",
        "property": "boolean",
        "bank": "boolean"
      }
    }
  }
}
```

---

### PUT /api/landlords/me/profile

Update the landlord's profile.

**Auth:** Authenticated (role: landlord)

**Request body (all fields optional):**
```json
{
  "businessType": "individual | company | developer | family_owned",
  "businessName": "string",
  "gstin": "string (15-char GSTIN format)",
  "panNumber": "string (10-char PAN format)"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Profile updated.",
  "data": { "profile": { "...updated fields..." } }
}
```

---

### GET /api/landlords/me/properties

Get all properties owned by the landlord (paginated).

**Auth:** Authenticated (role: landlord)

**Query params:** `page`, `limit`, `status` (`active | inactive | rented | pending_review`)

**Response 200:** Paginated list of `PropertyDocument` objects.

---

### GET /api/landlords/me/applications

Get all rental applications received by the landlord (paginated).

**Auth:** Authenticated (role: landlord)

**Query params:** `page`, `limit`, `status`, `propertyId`

**Response 200:** Paginated list of `ApplicationResponse` objects (includes tenant profile snapshot).

---

### GET /api/landlords/me/tenants

Get all current and past tenants of the landlord (paginated).

**Auth:** Authenticated (role: landlord)

**Query params:** `page`, `limit`, `status` (`active | past`)

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "rentalId": "string",
      "tenantId": "string",
      "tenantFullName": "string",
      "tenantAvatar": "string | null",
      "tenantScore": "number",
      "property": { "_id": "string", "title": "string" },
      "startDate": "ISO date",
      "endDate": "ISO date | null",
      "status": "active | completed | terminated"
    }
  ],
  "pagination": { "..." }
}
```

---

### GET /api/landlords/me/revenue

Get revenue summary and payment statistics.

**Auth:** Authenticated (role: landlord)

**Query params:** `year` (number), `month` (1–12, optional)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "totalCollected": "number",
    "pendingAmount": "number",
    "overdueAmount": "number",
    "occupancyRate": "number (0–100 percent)",
    "paymentsByMonth": [
      { "month": "string", "collected": "number", "pending": "number" }
    ]
  }
}
```

---

## Property Routes

### GET /api/properties

Get a paginated, filtered list of properties.

**Auth:** None (public)  
**Rate limit:** 60 requests / min per IP

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Max 50 |
| `city` | string | Filter by city |
| `locality` | string | Filter by neighbourhood |
| `type` | string | `1BHK\|2BHK\|3BHK\|4BHK\|Studio\|Villa\|PG` |
| `minRent` | number | Minimum monthly rent |
| `maxRent` | number | Maximum monthly rent |
| `furnishing` | string | `unfurnished\|semi_furnished\|fully_furnished` |
| `minScore` | number | Minimum landlord trust score |
| `amenities` | string | Comma-separated list |
| `available` | boolean | Filter only available properties |

**Response 200:** Paginated list of `PropertyWithLandlord` objects.

---

### POST /api/properties

Create a new property listing.

**Auth:** Authenticated (role: landlord)

**Request body:**
```json
{
  "title": "string (required, 10–100 chars)",
  "description": "string (required, 50–2000 chars)",
  "type": "1BHK | 2BHK | 3BHK | 4BHK | Studio | Villa | PG (required)",
  "address": {
    "line1": "string (required)",
    "line2": "string (optional)",
    "locality": "string (required)",
    "city": "string (required)",
    "state": "string (required)",
    "pincode": "string (required, 6 digits)"
  },
  "coordinates": {
    "lat": "number (optional)",
    "lng": "number (optional)"
  },
  "monthlyRent": "number (required, > 0)",
  "maintenanceCharges": "number (optional)",
  "securityDeposit": "number (required, > 0)",
  "images": [
    {
      "url": "string (S3 URL)",
      "alt": "string",
      "isPrimary": "boolean"
    }
  ],
  "amenities": ["string"],
  "furnishing": "unfurnished | semi_furnished | fully_furnished (required)",
  "totalFloors": "number (optional)",
  "floorNumber": "number (optional)",
  "bedrooms": "number (required)",
  "bathrooms": "number (required)",
  "areaSqFt": "number (optional)",
  "availableFrom": "ISO date (required)",
  "petsAllowed": "boolean",
  "preferredTenants": ["string"],
  "noticePeriodDays": "number (optional)"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Property listed successfully.",
  "data": { "property": { "...PropertyDocument..." } }
}
```

**Errors:**
- `400` — Validation failed
- `403` — User is not a landlord

---

### GET /api/properties/:id

Get full details of a single property.

**Auth:** None (public)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "property": {
      "...PropertyWithLandlord fields...",
      "isSaved": "boolean (false if not authenticated)"
    }
  }
}
```

**Errors:**
- `404` — Property not found

---

### PUT /api/properties/:id

Update a property listing.

**Auth:** Authenticated (role: landlord, must own the property)

**Request body:** Same fields as `POST /api/properties`, all optional.

**Response 200:**
```json
{
  "success": true,
  "message": "Property updated.",
  "data": { "property": { "...updated PropertyDocument..." } }
}
```

**Errors:**
- `403` — Not the property owner
- `404` — Property not found

---

### DELETE /api/properties/:id

Delete a property listing (soft delete — sets status to `inactive`).

**Auth:** Authenticated (role: landlord, must own the property)

**Response 200:**
```json
{ "success": true, "message": "Property removed from listings." }
```

**Errors:**
- `400` — Cannot delete a property with an active rental
- `403` — Not the property owner
- `404` — Property not found

---

### GET /api/properties/:id/reviews

Get all reviews for a property (paginated).

**Auth:** None (public)

**Query params:** `page`, `limit`, `sortBy` (`createdAt | overallRating`)

**Response 200:** Paginated list of `ReviewDocument` objects with reviewer name and avatar.

---

## Application Routes

### POST /api/applications

Submit a rental application for a property.

**Auth:** Authenticated (role: tenant)

**Request body:**
```json
{
  "propertyId": "string (required)",
  "moveInDate": "ISO date (required)",
  "proposedRent": "number (optional)",
  "message": "string (required, 50–1000 chars)"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Application submitted successfully.",
  "data": { "application": { "...ApplicationDocument..." } }
}
```

**Errors:**
- `400` — Validation failed
- `404` — Property not found
- `409` — Application already submitted for this property

---

### GET /api/applications/:id

Get a single application.

**Auth:** Authenticated (must be the tenant applicant or the landlord of the property)

**Response 200:**
```json
{
  "success": true,
  "data": { "application": { "...ApplicationResponse..." } }
}
```

**Errors:**
- `403` — Not the applicant or property owner
- `404` — Application not found

---

### PUT /api/applications/:id

Update an application status (landlord action) or withdraw (tenant action).

**Auth:** Authenticated (landlord or tenant depending on action)

**Request body (landlord — approve/reject/shortlist):**
```json
{
  "status": "shortlisted | under_review | interview_scheduled | approved | rejected",
  "rejectionReason": "string (required if status=rejected)",
  "interviewScheduledAt": "ISO date (required if status=interview_scheduled)",
  "interviewNotes": "string (optional)"
}
```

**Request body (tenant — withdraw):**
```json
{ "status": "withdrawn" }
```

**Response 200:**
```json
{
  "success": true,
  "message": "Application updated.",
  "data": { "application": { "...updated ApplicationDocument..." } }
}
```

**Notes:**
- When landlord sets `status: "approved"`, a `RentalHistory` document is automatically created and property status is set to `rented`.
- Tenant and landlord each receive a notification.

---

### DELETE /api/applications/:id

Withdraw an application (tenant only, if status is `pending`).

**Auth:** Authenticated (role: tenant, must be the applicant)

**Response 200:**
```json
{ "success": true, "message": "Application withdrawn." }
```

---

## Review Routes

### POST /api/reviews

Submit a review after a rental ends.

**Auth:** Authenticated (tenant or landlord)

**Request body:**
```json
{
  "rentalId": "string (required)",
  "overallRating": "number (required, 1–5, one decimal allowed)",
  "categories": {
    "communication": "number (1–5)",
    "cleanliness": "number (1–5, tenant reviews landlord)",
    "maintenance": "number (1–5, tenant reviews landlord)",
    "valueForMoney": "number (1–5, tenant reviews property)",
    "onTimePayment": "number (1–5, landlord reviews tenant)",
    "propertyConditionLeft": "number (1–5, landlord reviews tenant)"
  },
  "title": "string (optional, max 100 chars)",
  "text": "string (required, 50–1000 chars)",
  "isAnonymous": "boolean (optional, default false)"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Review submitted.",
  "data": { "review": { "...ReviewDocument..." } }
}
```

**Errors:**
- `400` — Validation failed
- `403` — Rental does not belong to authenticated user
- `404` — Rental not found
- `409` — Review already submitted for this rental by this user
- `422` — Rental is not in `completed` status

---

### GET /api/reviews/:id

Get a single review.

**Auth:** None (public)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "review": {
      "...ReviewDocument...",
      "reviewer": {
        "fullName": "string (or 'Anonymous')",
        "avatar": "string | null"
      }
    }
  }
}
```

---

### PUT /api/reviews/:id

Landlord responds to a review left about them.

**Auth:** Authenticated (role: landlord, must be the reviewee)

**Request body:**
```json
{ "landlordResponse": "string (required, 10–500 chars)" }
```

**Response 200:**
```json
{
  "success": true,
  "message": "Response added.",
  "data": { "review": { "...updated ReviewDocument..." } }
}
```

---

## Verification Routes

### POST /api/verifications

Submit verification documents.

**Auth:** Authenticated (tenant or landlord)

**Request body:**
```json
{
  "type": "identity | income | employment | property | background | bank (required)",
  "documentUrls": [
    {
      "type": "aadhaar_front | aadhaar_back | passport | pan_card | salary_slip | itr | offer_letter | property_deed | bank_statement | police_noc | other",
      "url": "string (S3 URL, required)",
      "fileName": "string (required)",
      "fileSizeBytes": "number (required)"
    }
  ]
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Documents submitted for review.",
  "data": { "verification": { "...VerificationDocument..." } }
}
```

**Errors:**
- `409` — Verification of this type already pending or approved

---

### GET /api/verifications

Get all verifications submitted by the authenticated user.

**Auth:** Authenticated

**Response 200:**
```json
{
  "success": true,
  "data": {
    "verifications": [
      {
        "_id": "string",
        "type": "string",
        "status": "pending | under_review | approved | rejected | expired",
        "submittedAt": "ISO date",
        "reviewedAt": "ISO date | null",
        "rejectionReason": "string | null",
        "expiresAt": "ISO date | null",
        "documentCount": "number"
      }
    ]
  }
}
```

---

### GET /api/verifications/:id

Get a single verification (including document access URLs).

**Auth:** Authenticated (must be the submitting user or an admin)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "verification": {
      "...VerificationDocument...",
      "documents": [
        {
          "type": "string",
          "fileName": "string",
          "fileSizeBytes": "number",
          "mimeType": "string",
          "uploadedAt": "ISO date",
          "accessUrl": "string (presigned S3 GET URL, 15-min expiry)"
        }
      ]
    }
  }
}
```

---

## Dispute Routes

### POST /api/disputes

Raise a dispute related to a rental.

**Auth:** Authenticated (tenant or landlord)

**Request body:**
```json
{
  "rentalId": "string (required)",
  "type": "deposit_refund | property_damage | rent_payment | maintenance_neglect | unlawful_eviction | false_review | other (required)",
  "title": "string (required, 10–100 chars)",
  "description": "string (required, 100–3000 chars)",
  "evidenceUrls": ["string (S3 URLs, optional, max 10 files)"]
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Dispute raised. Our team will review within 2 business days.",
  "data": { "dispute": { "...DisputeDocument..." } }
}
```

**Errors:**
- `404` — Rental not found
- `422` — Rental must be active or within 30 days of completion to raise a dispute

---

### GET /api/disputes/:id

Get a dispute (including message thread).

**Auth:** Authenticated (must be one of the two parties or an admin)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "dispute": {
      "_id": "string",
      "type": "string",
      "title": "string",
      "description": "string",
      "status": "DisputeStatus string",
      "priority": "low | medium | high | urgent",
      "raisedBy": {
        "_id": "string",
        "fullName": "string",
        "role": "tenant | landlord"
      },
      "against": {
        "_id": "string",
        "fullName": "string",
        "role": "tenant | landlord"
      },
      "evidenceUrls": ["string (presigned access URLs)"],
      "messages": [
        {
          "_id": "string",
          "senderId": "string",
          "senderName": "string",
          "senderRole": "tenant | landlord | admin",
          "message": "string",
          "attachmentUrls": ["string"],
          "sentAt": "ISO date"
        }
      ],
      "resolution": "string | null",
      "resolvedAt": "ISO date | null",
      "createdAt": "ISO date"
    }
  }
}
```

---

### POST /api/disputes/:id/messages

Add a message to a dispute thread.

**Auth:** Authenticated (must be a party to the dispute or an admin)

**Request body:**
```json
{
  "message": "string (required, 10–2000 chars)",
  "attachmentUrls": ["string (S3 URLs, optional, max 5)"]
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "message": {
      "_id": "string",
      "senderId": "string",
      "message": "string",
      "sentAt": "ISO date"
    }
  }
}
```

---

## Notification Routes

### GET /api/notifications

Get paginated notifications for the authenticated user.

**Auth:** Authenticated

**Query params:** `page`, `limit`, `isRead` (boolean filter), `type` (NotificationType filter)

**Response 200:** Paginated list of `NotificationDocument` objects.

---

### PUT /api/notifications/:id/read

Mark a single notification as read.

**Auth:** Authenticated (must own the notification)

**Request body:** None

**Response 200:**
```json
{ "success": true, "data": { "isRead": true, "readAt": "ISO date" } }
```

---

### PUT /api/notifications/read-all

Mark all unread notifications as read.

**Auth:** Authenticated

**Request body:** None

**Response 200:**
```json
{ "success": true, "message": "All notifications marked as read." }
```

---

### GET /api/notifications/unread-count

Get unread notification count (for badge display).

**Auth:** Authenticated

**Response 200:**
```json
{
  "success": true,
  "data": {
    "total": "number",
    "byType": {
      "payment_due": "number",
      "application_received": "number"
    }
  }
}
```

---

### GET /api/notifications/preferences

Get the user's notification preferences.

**Auth:** Authenticated

**Response 200:**
```json
{
  "success": true,
  "data": {
    "preferences": {
      "paymentReminders": "boolean",
      "applicationUpdates": "boolean",
      "reviewRequests": "boolean",
      "disputeAlerts": "boolean",
      "scoreChanges": "boolean",
      "systemAnnouncements": "boolean",
      "channels": {
        "email": "boolean",
        "sms": "boolean",
        "push": "boolean",
        "inApp": "boolean"
      }
    }
  }
}
```

---

### PUT /api/notifications/preferences

Update notification preferences.

**Auth:** Authenticated

**Request body (all fields optional — partial update):**
```json
{
  "paymentReminders": "boolean",
  "applicationUpdates": "boolean",
  "reviewRequests": "boolean",
  "disputeAlerts": "boolean",
  "scoreChanges": "boolean",
  "systemAnnouncements": "boolean",
  "channels": {
    "email": "boolean",
    "sms": "boolean",
    "push": "boolean",
    "inApp": "boolean"
  }
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Preferences saved.",
  "data": { "preferences": { "...updated NotificationPreferences..." } }
}
```

---

## File Upload Routes

### POST /api/uploads/presign

Request a presigned S3 URL to upload a file directly from the client.

**Auth:** Authenticated  
**Rate limit:** 30 requests / min per user

**Request body:**
```json
{
  "fileName": "string (required)",
  "mimeType": "image/jpeg | image/png | image/webp | application/pdf (required)",
  "fileSizeBytes": "number (required)",
  "bucket": "images | documents (required)",
  "folder": "avatars | properties | verifications | disputes (required)"
}
```

**Validation rules:**
- `images` bucket: JPEG/PNG/WebP only, max 10 MB
- `documents` bucket: JPEG/PNG/WebP/PDF, max 25 MB
- Avatars: max 5 MB

**Response 200:**
```json
{
  "success": true,
  "data": {
    "uploadUrl": "string (presigned S3 PUT URL, 5-min expiry)",
    "fileUrl": "string (permanent URL to reference after upload)",
    "expiresAt": "ISO date"
  }
}
```

**Errors:**
- `400` — Unsupported file type or file too large
- `429` — Rate limit exceeded

---

## Admin Routes

All admin routes require `role: "admin"`.

---

### GET /api/admin/stats

Get platform-wide statistics for the admin dashboard.

**Auth:** Authenticated (role: admin)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "users": {
      "total": "number",
      "tenants": "number",
      "landlords": "number",
      "newThisMonth": "number"
    },
    "properties": {
      "total": "number",
      "active": "number",
      "rented": "number"
    },
    "rentals": {
      "active": "number",
      "completedThisMonth": "number"
    },
    "verifications": {
      "pending": "number",
      "approvedThisMonth": "number"
    },
    "disputes": {
      "open": "number",
      "resolvedThisMonth": "number"
    }
  }
}
```

---

### GET /api/admin/users

List all users with search and filter.

**Auth:** Authenticated (role: admin)

**Query params:** `page`, `limit`, `search` (name/email), `role`, `isBlocked` (boolean), `isEmailVerified` (boolean)

**Response 200:** Paginated list of `UserDocument` objects (no passwordHash).

---

### PUT /api/admin/users/:id/block

Block or unblock a user account.

**Auth:** Authenticated (role: admin)

**Request body:**
```json
{
  "isBlocked": "boolean (required)",
  "reason": "string (required if isBlocked=true)"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "User account blocked. | User account unblocked.",
  "data": { "userId": "string", "isBlocked": "boolean" }
}
```

---

### GET /api/admin/verifications

List the verification queue.

**Auth:** Authenticated (role: admin)

**Query params:** `page`, `limit`, `status` (`pending | under_review | approved | rejected`), `type`

**Response 200:** Paginated list of `VerificationQueueItem` objects.

---

### PUT /api/admin/verifications/:id

Approve or reject a verification submission.

**Auth:** Authenticated (role: admin)

**Request body:**
```json
{
  "status": "approved | rejected (required)",
  "rejectionReason": "string (required if status=rejected)",
  "adminNotes": "string (optional)"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Verification approved. | Verification rejected.",
  "data": { "verification": { "...updated VerificationDocument..." } }
}
```

**Side effects on approval:**
- Updates user's `verificationStatus` on their profile
- Creates `ScoreLog` entry (`verification_approved`, +10 delta)
- Sends `verification_approved` notification to user

---

### GET /api/admin/disputes

List all disputes for admin management.

**Auth:** Authenticated (role: admin)

**Query params:** `page`, `limit`, `status`, `priority`, `assignedTo`

**Response 200:** Paginated list of `DisputeDocument` objects with party summaries.

---

### PUT /api/admin/disputes/:id/resolve

Resolve a dispute and apply score impacts.

**Auth:** Authenticated (role: admin)

**Request body:**
```json
{
  "resolution": "resolved_tenant_favor | resolved_landlord_favor | resolved_mutual | closed (required)",
  "notes": "string (required, 50–2000 chars)",
  "scoreImpactTenant": "number (optional, override default delta)",
  "scoreImpactLandlord": "number (optional, override default delta)"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Dispute resolved.",
  "data": {
    "dispute": { "...updated DisputeDocument..." },
    "scoreChanges": {
      "tenantDelta": "number",
      "landlordDelta": "number"
    }
  }
}
```

**Side effects:**
- Updates dispute status to resolved state
- Creates `ScoreLog` for both parties
- Sends `dispute_resolved` notification to both parties

---

## Error Reference

### Standard Error Codes

| Scenario | HTTP Status | `error` message |
|----------|-------------|-----------------|
| Token missing | 401 | `Authentication required` |
| Token expired | 401 | `Session expired. Please log in again.` |
| Token invalid | 401 | `Invalid token` |
| Insufficient role | 403 | `Access denied` |
| Not resource owner | 403 | `You do not have permission to access this resource` |
| Not found | 404 | `<Resource> not found` |
| Duplicate record | 409 | `<Resource> already exists` |
| Input validation | 400 | `Validation failed` + `errors` map |
| Rate limit | 429 | `Too many requests. Please try again in X minutes.` |
| Unexpected error | 500 | `An unexpected error occurred. Please try again.` |

---

## Mobile Integration Notes

1. **Always send** `X-Client-Type: mobile` on login and refresh requests.
2. **Store tokens** in `expo-secure-store` (Expo) or `react-native-keychain` (bare React Native). Never in `AsyncStorage`.
3. **All other endpoints** behave identically for web and mobile — only the auth token delivery differs.
4. **Auto-refresh:** On any `401` response, call `POST /api/auth/refresh` with the stored refresh token, update storage, and retry the original request.
5. **Deep links:** Notification payloads include `data.screen` and `data.entityId` for in-app navigation.

---

> Last updated: Pre-implementation planning  
> Implementation tracker: See `BACKEND_PLAN.md` → Section 10 (Integration Phases)
