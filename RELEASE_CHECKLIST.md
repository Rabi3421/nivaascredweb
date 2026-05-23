# Release Checklist

Use this checklist before tagging or deploying the NivaasCred MVP.

## Code Health

- Run web TypeScript: `cd nivaascred && npx tsc --noEmit`.
- Run mobile TypeScript: `cd nivaasCredApp && npx tsc --noEmit`.
- Run mobile tests: `cd nivaasCredApp && npm test -- --runInBand`.
- Run configured lint/build commands when the environment supports them:
  - Web lint: `npm run lint`.
  - Web build: `npm run build`.
  - Mobile lint: `npm run lint`.
- Confirm no secrets are committed in `.env.example`, docs, screenshots, or logs.

## Route Audit

- Public web pages load: `/homepage`, `/property-listings`, `/property-details/:id`, `/about`, `/support`, `/help-center`, `/legal/terms`, `/legal/privacy`.
- Auth pages load: `/auth/login`, `/auth/signup`.
- Tenant pages are guarded and load for tenant users only.
- Landlord pages are guarded and load for landlord users only.
- Admin pages are guarded and load for `admin` or `superadmin` only.
- Mobile auth stack opens for logged-out users.
- Mobile tenant tabs open for tenant users only.
- Mobile landlord tabs open for landlord users only.
- Buttons that are not implemented are disabled or labeled `Coming Soon`.

## Security

- Web auth uses httpOnly cookies.
- Mobile auth uses bearer access token plus secure refresh token storage through `react-native-keychain`.
- Refresh tokens rotate on refresh.
- Logout clears web cookies or mobile secure tokens.
- API responses do not expose `passwordHash` or `refreshTokenHash`.
- Tenant/landlord requests cannot access unrelated records.
- Admin APIs reject tenant and landlord users.

## Database

- Confirm intended indexes in `DATABASE_INDEXES.md`.
- In MongoDB Atlas, confirm old unique verification indexes are absent:
  - `userId_1_type_1`
  - `userId_1_type_1_propertyId_1`
- Run a backup before dropping any old index.
- Seed superadmin once with `npm run seed:superadmin`.

## Final Smoke Flow

- Landlord: register/login, add property, request property verification, view tenant request, approve application, create rental history, review tenant, view score.
- Tenant: register/login, browse property, apply, view application status, view rental history, review landlord, view score, submit verification.
- Admin: login as seeded superadmin, review verification, recalculate score, confirm admin-only pages block non-admin users.

## Release Gate

- All required env variables are set in deployment provider.
- Production `APP_URL` and `NEXT_PUBLIC_API_URL` point to the deployed domain.
- Mobile `API_TARGET` and `PRODUCTION` URL point to the production backend before release builds.
- Known MVP limitations are documented in `DEPLOYMENT_GUIDE.md`.
