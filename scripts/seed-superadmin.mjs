import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const REQUIRED_ENV = [
  "MONGODB_URI",
  "SUPERADMIN_FULL_NAME",
  "SUPERADMIN_EMAIL",
  "SUPERADMIN_PHONE",
  "SUPERADMIN_PASSWORD",
];

const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`Missing required env variables: ${missing.join(", ")}`);
  process.exit(1);
}

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, unique: true, sparse: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["superadmin", "admin", "landlord", "tenant"],
      required: true,
    },
    avatar: { type: String, default: null },
    isEmailVerified: { type: Boolean, default: true },
    isPhoneVerified: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    lastLoginAt: { type: Date, default: null },
    refreshTokenHash: { type: String, select: false, default: null },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  const email = process.env.SUPERADMIN_EMAIL.toLowerCase().trim();
  const existing = await User.findOne({ email }).select("_id email role").lean();

  if (existing) {
    console.log(
      `Superadmin seed skipped: user already exists for ${existing.email} with role ${existing.role}.`
    );
    return;
  }

  const passwordHash = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, 12);

  await User.create({
    fullName: process.env.SUPERADMIN_FULL_NAME.trim(),
    email,
    phone: process.env.SUPERADMIN_PHONE.trim(),
    passwordHash,
    role: "superadmin",
    isEmailVerified: true,
    isPhoneVerified: true,
    isActive: true,
    isBlocked: false,
  });

  console.log(`Superadmin created successfully for ${email}.`);
}

main()
  .catch((error) => {
    console.error("Failed to seed superadmin:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
