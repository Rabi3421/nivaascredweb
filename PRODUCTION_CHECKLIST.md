# Production Checklist

## Required Environment Variables

- `NODE_ENV=production`
- `APP_URL`
- `NEXT_PUBLIC_API_URL`
- `MONGODB_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `ACCESS_TOKEN_EXPIRES_IN`
- `REFRESH_TOKEN_EXPIRES_IN`
- `SUPERADMIN_FULL_NAME`
- `SUPERADMIN_EMAIL`
- `SUPERADMIN_PHONE`
- `SUPERADMIN_PASSWORD`

Generate JWT secrets with:

```bash
openssl rand -base64 64
```

Do not reuse development secrets in production.

## MongoDB Atlas Setup

- Create a dedicated production cluster or database.
- Enable authentication and use a least-privilege database user.
- Restrict network access to deployment provider IPs where possible.
- Confirm indexes match `DATABASE_INDEXES.md`.
- Drop old unique verification indexes if present:
  - `userId_1_type_1`
  - `userId_1_type_1_propertyId_1`
- Run a backup before manual index cleanup.

## Superadmin Seed

Set the required `SUPERADMIN_*` variables in `.env`, then run:

```bash
npm run seed:superadmin
```

The seed is idempotent by email. It creates a `superadmin` only when that email does not already exist.

## Vercel Deployment Notes

- Add all production env variables in Vercel Project Settings.
- Do not expose server secrets with `NEXT_PUBLIC_`.
- Confirm `MONGODB_URI` points to the production database.
- Run `npm run type-check` before deploy.
- Run a production build before release:

```bash
npm run build
```

## Cookie Security Notes

- Auth uses httpOnly cookies.
- In production, cookies should be `Secure`.
- Use same-site settings appropriate to the deployed web app.
- If a separate frontend/mobile client is introduced later, revisit cookie domain, CORS, and CSRF strategy.

## CORS/API Notes For Future React Native App

- React Native will not automatically share browser cookies.
- Plan a mobile-safe auth flow before building the app.
- Consider a dedicated API base URL and strict allowed origins.
- Do not store long-lived tokens insecurely on-device.

## Operational Checks

- `GET /api/health` returns healthy.
- Register/login/logout work with production cookies.
- Superadmin can log in and access `/admin/dashboard`.
- Tenant and landlord role guards redirect correctly.
- Property listing and detail pages load from production MongoDB.
- Score recalculation completes without blocking reviews/rental history.
- Verification admin approval updates profile/property verification status.

## Known MVP Limitations

- No real document upload or object storage integration.
- No payment collection.
- No chat.
- No disputes workflow.
- No real-time notification system.
- No external KYC provider.
- React Native app exists, but app-store signing, deep links, push notifications, and file upload are not part of the MVP.
- Some dashboard analytics remain placeholder until payment/property analytics modules are built.
