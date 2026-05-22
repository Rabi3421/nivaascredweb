# NivaasCred MVP Testing Checklist

Use this checklist before Phase 9 or any demo build. Test in a clean browser profile so cookie-based auth is easy to reason about.

## Full Browser Flow

- Register a landlord from `/auth/signup`.
- Confirm the landlord is redirected to onboarding, then navigate to `/landlord/dashboard`.
- Confirm wrong-role routes redirect the landlord away from `/tenant/dashboard`.
- Add a property at `/landlord/property-management/add`.
- Confirm the property appears in the landlord dashboard portfolio.
- Open the portfolio "View" action and confirm it opens `/property-details/[id]`.
- Confirm the property appears in `/property-listings`.
- Log out from the header menu.
- Register a tenant from `/auth/signup`.
- Confirm the tenant is redirected to onboarding, then navigate to `/tenant/dashboard`.
- Confirm wrong-role routes redirect the tenant away from `/landlord/dashboard`.
- Browse `/property-listings`.
- Open the landlord-created property detail page.
- Apply as the tenant and confirm duplicate submit is disabled while submitting.
- Confirm duplicate application attempts show the already-applied state.
- Confirm the application appears in `/tenant/applications`.
- Log out as tenant.
- Log in as landlord.
- Confirm the application appears in `/landlord/tenant-requests`.
- Shortlist and approve the application; confirm the UI uses "approved" wording and the backend status is `approved`.
- Confirm approving one application auto-rejects other pending/shortlisted applications for the same property.
- Create rental history from the approved application.
- Confirm duplicate rental history creation is blocked and surfaced as an error.
- Confirm the rental history appears in `/landlord/rental-history`.
- Update rental history status and confirm the change persists after reload.
- Review the tenant from `/landlord/rental-history`.
- Request a tenant review.
- Confirm the review appears in `/landlord/reviews` as given.
- Log out as landlord.
- Log in as tenant.
- Confirm rental history appears in `/tenant/rental-history`.
- Review the landlord.
- Confirm the landlord review request can be marked completed or is completed after submitting the matching review.
- Confirm `/tenant/reviews` shows received and given reviews.
- Confirm `/tenant/dashboard` and `/tenant/score` show an updated NivaasCred Score.
- Log out as tenant.
- Log in as landlord.
- Confirm `/landlord/dashboard` and `/landlord/score` show an updated NivaasCred Score.
- Log in as admin or superadmin.
- Open `/admin/scores`, confirm users load, role filter works, pagination works, and user recalculation updates the row.

## API Testing Checklist

- `POST /api/auth/register` creates only `tenant` or `landlord` users publicly.
- `POST /api/auth/login` sets httpOnly cookies and does not return password or refresh token hashes.
- `POST /api/auth/logout` clears auth cookies.
- `GET /api/auth/me` returns a safe user object and role profile.
- `POST /api/landlord/properties` rejects unauthenticated and non-landlord users.
- `GET /api/properties` returns public properties without sensitive landlord fields.
- `GET /api/properties/[id]` returns public detail without sensitive landlord fields.
- `POST /api/applications` allows only tenants and prevents duplicate applications per property.
- `PATCH /api/landlord/applications/[id]` allows only the owning landlord and uses `approved`, not `accepted`.
- `POST /api/landlord/rental-histories` allows only the owning landlord and only for approved applications.
- `GET /api/landlord/rental-histories` returns only the logged-in landlord's records.
- `GET /api/tenant/rental-histories` returns only the logged-in tenant's records.
- `PATCH /api/landlord/rental-histories/[id]` rejects unrelated landlords.
- `POST /api/reviews` allows only rental participants and prevents duplicate reviews.
- `POST /api/reviews` marks the matching pending review request completed without failing review creation if that update fails.
- `GET /api/reviews/me` returns only reviews received by the current user.
- `GET /api/reviews/given` returns only reviews written by the current user.
- `POST /api/review-requests` allows only rental participants and prevents duplicate pending requests.
- `GET /api/review-requests` returns only requests received by the current user.
- `PATCH /api/review-requests/[id]` allows only the recipient to update the request.
- `GET /api/score/me` returns current user's score only.
- `POST /api/score/recalculate` recalculates only the current user's score.
- `GET /api/admin/scores/users` rejects non-admin users.
- `POST /api/admin/scores/recalculate-user` rejects non-admin users and validates `userId`.

## Role-Based Security Checklist

- Tenant cannot access `/landlord/*` pages.
- Tenant cannot access `/admin/*` pages.
- Landlord cannot access `/tenant/*` pages.
- Landlord cannot access `/admin/*` pages.
- Admin or superadmin cannot access tenant/landlord dashboards as a normal user.
- Unauthenticated users are redirected to `/auth/login` for protected role dashboards.
- No API response exposes `passwordHash`.
- No API response exposes `refreshTokenHash`.
- No frontend code uses `localStorage` or `sessionStorage` for auth tokens.
- All protected fetches use the shared API client with `credentials: "include"`.
- User-controlled IDs such as `tenantId`, `landlordId`, `reviewerId`, and `revieweeId` are derived server-side.

## UX Checklist

- Property listing has loading, error, and empty states.
- Property detail has not-found handling and a tenant-only apply CTA.
- Tenant applications has loading, error, and empty states.
- Landlord tenant requests has loading, error, empty states, and approval confirmation.
- Landlord property deletion has confirmation.
- Rental history pages have loading, error, empty states, disabled duplicate submits, and status badges.
- Reviews pages have loading, error, empty states, and request status badges.
- Score dashboard cards and score detail pages have loading and error states.
- Important non-MVP actions such as payments and chat are visibly disabled rather than linked to missing pages.
- Mobile layouts should be checked at 390px, 768px, and desktop width.

## Known Limitations

- Payment collection is not implemented.
- Chat and real-time notifications are not implemented.
- Disputes are not implemented.
- Admin review moderation is not implemented.
- Verification upload/review workflows are not implemented; score uses existing profile/document status data when present.
- Public tenant/landlord profile detail pages are not implemented.
- Dashboard revenue/payment/task widgets still include placeholder data where those modules are outside MVP scope.
- Email/SMS delivery is not implemented.
