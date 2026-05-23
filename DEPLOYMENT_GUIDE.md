# Deployment Guide

This guide covers the NivaasCred MVP web/backend deployment and React Native API configuration.

## Required Environment Variables

Set these in `.env.local` for local development and in Vercel Project Settings for production:

- `NODE_ENV`
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

Generate JWT secrets:

```bash
openssl rand -base64 64
```

Never reuse development JWT secrets in production.

## MongoDB Atlas

1. Create a production database or cluster.
2. Create a least-privilege database user for the app.
3. Restrict network access to Vercel or trusted IPs where possible.
4. Add the production URI to `MONGODB_URI`.
5. Confirm indexes against `DATABASE_INDEXES.md`.
6. If the database existed before the verification-system cleanup, check the `verifications` collection for old unique indexes:
   - `userId_1_type_1`
   - `userId_1_type_1_propertyId_1`
7. Drop those old indexes only if they are marked unique, and only after taking a backup.

## Vercel

1. Import the `nivaascred` Next.js project.
2. Set the project root to `nivaascred` if deploying from the parent workspace.
3. Add all required environment variables.
4. Set `APP_URL` to the production web URL.
5. Set `NEXT_PUBLIC_API_URL` to `${APP_URL}/api`.
6. Deploy.
7. Verify `GET /api/health`.
8. Run the web smoke checklist in `WEB_TESTING_CHECKLIST.md`.

## Superadmin Seed

After production env variables are set, run:

```bash
cd nivaascred
npm run seed:superadmin
```

The script is idempotent by email and prints only safe status messages.

## React Native API URL

Configure `nivaasCredApp/src/config/api.ts` before running or building mobile:

- Android emulator: `API_TARGET = 'local'`, uses `http://10.0.2.2:4028/api`.
- iOS simulator: `API_TARGET = 'local'`, uses `http://localhost:4028/api`.
- Physical device: set `PHYSICAL_DEVICE` to your LAN IP and `API_TARGET = 'physical-device'`.
- Production: set `PRODUCTION` to the deployed backend URL and `API_TARGET = 'production'`.

For production builds, do not leave `PRODUCTION` as the placeholder value.

## Cookie And Token Security

- Web auth uses httpOnly cookies.
- Mobile auth uses bearer access tokens and stores refresh tokens with `react-native-keychain`.
- Refresh token rotation is supported by `/api/auth/refresh-token`.
- Do not store access or refresh tokens in AsyncStorage, localStorage, or sessionStorage.

## Release Verification Commands

```bash
cd nivaascred
npx tsc --noEmit
npm run build

cd ../nivaasCredApp
npx tsc --noEmit
npm test -- --runInBand
```

Run lint commands where the local toolchain supports them.

## Known MVP Limitations

- No payment collection.
- No chat.
- No disputes workflow.
- No real file upload or object storage integration.
- No external KYC provider.
- No real-time notifications, email, SMS, or push notifications.
- Mobile app-store signing, release channels, crash reporting, and analytics are not configured yet.
