import mongoose, { Document, Model, Schema, Types } from "mongoose";

// ─── TypeScript interfaces ─────────────────────────────────────────

interface IPropertyAddress {
  line1: string;
  line2?: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
}

interface IPropertyImage {
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export interface IProperty {
  landlordId: Types.ObjectId;
  title: string;
  description: string;
  address: IPropertyAddress;
  // Denormalized from address for fast query/filtering
  city: string;
  state: string;
  pincode: string;
  rentAmount: number;
  depositAmount: number;
  maintenanceCharges?: number;
  propertyType: "1BHK" | "2BHK" | "3BHK" | "4BHK" | "Studio" | "Villa" | "PG";
  furnishingStatus: "unfurnished" | "semi_furnished" | "fully_furnished";
  bedrooms: number;
  bathrooms: number;
  areaSqFt?: number;
  totalFloors?: number;
  floorNumber?: number;
  images: IPropertyImage[];
  amenities: string[];
  preferredTenants: string[];
  petsAllowed: boolean;
  noticePeriodDays?: number;
  availableFrom?: Date;
  availabilityStatus: "available" | "rented" | "inactive" | "pending_review";
  averageRating: number;
  totalReviews: number;
  views: number;
  savedCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPropertyDocument extends IProperty, Document {}

export type IPropertyModel = Model<IPropertyDocument>;

// ─── Sub-schemas ──────────────────────────────────────────────────

const PropertyAddressSchema = new Schema<IPropertyAddress>(
  {
    line1: { type: String, required: true, trim: true },
    line2: { type: String, trim: true },
    locality: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{6}$/, "Invalid pincode"],
    },
  },
  { _id: false }
);

const PropertyImageSchema = new Schema<IPropertyImage>(
  {
    url: { type: String, required: true },
    alt: { type: String, trim: true },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: false }
);

// ─── Schema ───────────────────────────────────────────────────────

const PropertySchema = new Schema<IPropertyDocument>(
  {
    landlordId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "landlordId is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [10, "Title must be at least 10 characters"],
      maxlength: [150, "Title must be at most 150 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [50, "Description must be at least 50 characters"],
      maxlength: [3000, "Description must be at most 3000 characters"],
    },
    address: {
      type: PropertyAddressSchema,
      required: [true, "Address is required"],
    },
    // Denormalized fields for efficient filtering
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      lowercase: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      trim: true,
      match: [/^\d{6}$/, "Invalid pincode"],
    },
    rentAmount: {
      type: Number,
      required: [true, "Rent amount is required"],
      min: [1000, "Rent must be at least ₹1,000"],
    },
    depositAmount: {
      type: Number,
      required: [true, "Deposit amount is required"],
      min: [0, "Deposit must be >= 0"],
    },
    maintenanceCharges: {
      type: Number,
      min: 0,
      default: 0,
    },
    propertyType: {
      type: String,
      enum: {
        values: ["1BHK", "2BHK", "3BHK", "4BHK", "Studio", "Villa", "PG"],
        message: "{VALUE} is not a valid property type",
      },
      required: [true, "Property type is required"],
    },
    furnishingStatus: {
      type: String,
      enum: {
        values: ["unfurnished", "semi_furnished", "fully_furnished"],
        message: "{VALUE} is not a valid furnishing status",
      },
      required: [true, "Furnishing status is required"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Bedrooms count is required"],
      min: 0,
      max: 20,
    },
    bathrooms: {
      type: Number,
      required: [true, "Bathrooms count is required"],
      min: 1,
      max: 20,
    },
    areaSqFt: {
      type: Number,
      min: 100,
    },
    totalFloors: {
      type: Number,
      min: 1,
    },
    floorNumber: {
      type: Number,
      min: 0,
    },
    images: {
      type: [PropertyImageSchema],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    preferredTenants: {
      type: [String],
      default: [],
    },
    petsAllowed: {
      type: Boolean,
      default: false,
    },
    noticePeriodDays: {
      type: Number,
      min: 0,
      default: 30,
    },
    availableFrom: {
      type: Date,
    },
    availabilityStatus: {
      type: String,
      enum: {
        values: ["available", "rented", "inactive", "pending_review"],
        message: "{VALUE} is not a valid availability status",
      },
      default: "available",
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    savedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────

PropertySchema.index({ landlordId: 1 });
PropertySchema.index({ city: 1, availabilityStatus: 1, rentAmount: 1 });
PropertySchema.index({ propertyType: 1 });
PropertySchema.index({ rentAmount: 1 });
PropertySchema.index({ averageRating: -1 });
PropertySchema.index({ createdAt: -1 });

// ─── Model ────────────────────────────────────────────────────────

const PropertyModel: IPropertyModel =
  (mongoose.models.Property as IPropertyModel) ||
  mongoose.model<IPropertyDocument, IPropertyModel>(
    "Property",
    PropertySchema
  );

export default PropertyModel;
