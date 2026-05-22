// ─── UI component types (PropertyCard, PropertyFilters) ───────────────────────

export interface PropertyLandlord {
  name: string;
  image: string;
  imageAlt: string;
  rating: number;
  creditScore: number;
  responseTime: string;
  verified: boolean;
}

/** Simplified shape used in listing cards and filters */
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: string;
  image: string;
  imageAlt: string;
  landlord: PropertyLandlord;
  amenities: string[];
  available: boolean;
}

export interface FilterValues {
  location: string;
  priceRange: [number, number];
  propertyType: string;
  creditScore: string;
  rating: string;
}

// ─── API / Database document types ────────────────────────────────────────────

export type PropertyType = "1BHK" | "2BHK" | "3BHK" | "4BHK" | "Studio" | "Villa" | "PG";
export type FurnishingType = "fully" | "semi" | "unfurnished";
export type PropertyStatus = "available" | "occupied" | "unlisted" | "pending_review";
export type PreferredTenantType = "family" | "bachelor" | "professional" | "any";

export interface PropertyAddress {
  street: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
}

export interface PropertyCoordinates {
  lat: number;
  lng: number;
}

export interface PropertyImage {
  _id: string;
  url: string; // S3 URL
  altText: string;
  isPrimary: boolean;
  order: number;
}

export interface NearbyPlace {
  name: string;
  type: "metro" | "bus" | "hospital" | "school" | "mall" | "restaurant" | "other";
  distanceKm: number;
}

/** Mirrors the `properties` MongoDB collection */
export interface PropertyDocument {
  _id: string;
  landlordId: string; // ref → users
  title: string;
  description: string;
  type: PropertyType;
  address: PropertyAddress;
  coordinates?: PropertyCoordinates;
  monthlyRent: number;
  maintenanceCharges?: number;
  securityDeposit: number;
  images: PropertyImage[];
  amenities: string[];
  furnishing: FurnishingType;
  floorNumber?: number;
  totalFloors?: number;
  carpetAreaSqft?: number;
  builtUpAreaSqft?: number;
  parkingAvailable: boolean;
  parkingType?: "covered" | "open";
  petsAllowed: boolean;
  bachelorAllowed: boolean;
  availableFrom: string; // ISO date
  status: PropertyStatus;
  minimumTenancyMonths: number;
  maximumTenancyMonths?: number;
  preferredTenantType: PreferredTenantType;
  nearbyPlaces: NearbyPlace[];
  averageRating: number;
  totalReviews: number;
  views: number;
  savedCount: number;
  currentTenantId?: string; // ref → users (if occupied)
  currentRentalId?: string; // ref → rental_histories
  createdAt: string;
  updatedAt: string;
}

/** Populated landlord info included in property list/detail responses */
export interface PropertyWithLandlord extends PropertyDocument {
  landlord: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    rentalTrustScore: number;
    averageRating: number;
    totalReviews: number;
    responseTime: string; // e.g., "< 2 hours"
    isVerified: boolean;
  };
  isSaved?: boolean; // populated for authenticated tenant requests
}

/** Payload for creating/updating a property */
export interface PropertyFormData {
  title: string;
  description: string;
  type: PropertyType;
  address: PropertyAddress;
  monthlyRent: number;
  maintenanceCharges?: number;
  securityDeposit: number;
  amenities: string[];
  furnishing: FurnishingType;
  floorNumber?: number;
  totalFloors?: number;
  carpetAreaSqft?: number;
  parkingAvailable: boolean;
  petsAllowed: boolean;
  bachelorAllowed: boolean;
  availableFrom: string;
  minimumTenancyMonths: number;
  preferredTenantType: PreferredTenantType;
}

/** Query params for GET /api/properties */
export interface PropertySearchParams {
  city?: string;
  locality?: string;
  type?: PropertyType;
  minRent?: number;
  maxRent?: number;
  furnished?: FurnishingType;
  minLandlordScore?: number;
  minLandlordRating?: number;
  petsAllowed?: boolean;
  availableFrom?: string;
  page?: number;
  limit?: number;
  sortBy?: "rent_asc" | "rent_desc" | "rating" | "newest" | "oldest";
}
