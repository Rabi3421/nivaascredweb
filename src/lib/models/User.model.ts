import mongoose, { Document, Model, Schema } from "mongoose";
import { UserRole, USER_ROLES } from "@/lib/constants/roles";

// ─── TypeScript interface ─────────────────────────────────────────

export interface IUser {
  fullName: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: UserRole;
  avatar?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  isBlocked: boolean;
  lastLoginAt?: Date;
  refreshTokenHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {}

export type IUserModel = Model<IUserDocument>;

// ─── Sub-schema (none needed here) ───────────────────────────────

// ─── Schema ───────────────────────────────────────────────────────

const UserSchema = new Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [100, "Full name must be at most 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    phone: {
      type: String,
      sparse: true, // allows null/undefined but enforces uniqueness when set
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid Indian mobile number"],
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
      select: false, // never returned in queries unless explicitly selected
    },
    role: {
      type: String,
      enum: {
        values: USER_ROLES,
        message: "{VALUE} is not a valid role",
      },
      required: [true, "Role is required"],
    },
    avatar: {
      type: String,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
    refreshTokenHash: {
      type: String,
      select: false, // never returned in queries
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ phone: 1 }, { unique: true, sparse: true });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1, isBlocked: 1 });

// ─── Model (singleton safe for Next.js hot-reload) ────────────────

const UserModel: IUserModel =
  (mongoose.models.User as IUserModel) ||
  mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export default UserModel;
