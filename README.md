# Next.js

A modern Next.js 15 application built with TypeScript and Tailwind CSS.

## 🚀 Features

- **Next.js 15** - Latest version with improved performance and features
- **React 19** - Latest React version with enhanced capabilities
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

## 🛠️ Installation

1. Install dependencies:
  ```bash
  npm install
  # or
  yarn install
  ```

2. Start the development server:
  ```bash
  npm run dev
  # or
  yarn dev
  ```
3. Open [http://localhost:4028](http://localhost:4028) with your browser to see the result.

## 📁 Project Structure

```
nextjs/
├── public/             # Static assets
├── src/
│   ├── app/            # App router components
│   │   ├── layout.tsx  # Root layout component
│   │   └── page.tsx    # Main page component
│   ├── components/     # Reusable UI components
│   ├── styles/         # Global styles and Tailwind configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies and scripts
├── postcss.config.js   # PostCSS configuration
└── tailwind.config.js  # Tailwind CSS configuration

```

## 🧩 Page Editing

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## 🎨 Styling

This project uses Tailwind CSS for styling with the following features:
- Utility-first approach for rapid development
- Custom theme configuration
- Responsive design utilities
- PostCSS and Autoprefixer integration

## 📦 Available Scripts

- `npm run dev` - Start development server on port 4028
- `npm run build` - Build the application for production
- `npm run start` - Start the development server
- `npm run serve` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript without emitting build files
- `npm run seed:superadmin` - Create the configured superadmin if missing

## 📱 Deployment

Build the application for production:

  ```bash
  npm run build
  ```

## NivaasCred Environment

Required server variables:

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

Generate JWT secrets with `openssl rand -base64 64`. Keep real values only in `.env`, `.env.local`, or your deployment provider secret store. Do not commit production secrets.

## Deployment Notes

- MongoDB Atlas: create a dedicated database, configure a least-privilege user, whitelist the deployment environment, and confirm indexes against `DATABASE_INDEXES.md`.
- Vercel: set all required env variables in Project Settings, deploy from the `nivaascred` project folder, and verify `GET /api/health`.
- React Native: set `API_TARGET` and the corresponding URL in `nivaasCredApp/src/config/api.ts` before building for emulator, simulator, physical device, or production.
- Superadmin: after production env variables are set, run `npm run seed:superadmin` once. The script is idempotent by email.

More detailed release steps live in `DEPLOYMENT_GUIDE.md`, `RELEASE_CHECKLIST.md`, `WEB_TESTING_CHECKLIST.md`, and `MOBILE_TESTING_CHECKLIST.md`.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by Next.js and React
- Styled with Tailwind CSS

Built with ❤️ on Rocket.new
