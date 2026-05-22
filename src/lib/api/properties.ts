import { apiClient } from "@/lib/api/client";
import type { Property, PropertyLandlord } from "@/types/property";
import type { CreatePropertyInput, UpdatePropertyInput } from "@/lib/validations/property";

// ─── API shape (mirrors MongoDB lean() output) ────────────────────────────────

export interface ApiPropertyImage {
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export interface ApiPropertyAddress {
  line1: string;
  line2?: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
}

export interface ApiPropertyLandlord {
  _id: string;
  fullName: string;
  avatar?: string | null;
  isEmailVerified: boolean;
}

export interface ApiProperty {
  _id: string;
  landlordId: ApiPropertyLandlord | string;
  title: string;
  description: string;
  address: ApiPropertyAddress;
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
  images: ApiPropertyImage[];
  amenities: string[];
  preferredTenants: string[];
  petsAllowed: boolean;
  noticePeriodDays?: number;
  availableFrom?: string;
  availabilityStatus: "available" | "rented" | "inactive" | "pending_review";
  verificationStatus?: "unverified" | "pending" | "approved" | "rejected";
  averageRating: number;
  totalReviews: number;
  views: number;
  savedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PublicPropertyFilters {
  city?: string;
  propertyType?: string;
  furnishingStatus?: string;
  minRent?: number;
  maxRent?: number;
  search?: string;
  page?: number;
  limit?: number;
}

// ─── Transformer ─────────────────────────────────────────────────────────────

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267";
const PLACEHOLDER_AVATAR = "https://img.rocket.new/generatedImages/rocket_gen_img_11c395459-1763301246668.png";

export function toCardProperty(p: ApiProperty): Property {
  const landlord = typeof p.landlordId === "object" ? p.landlordId : null;

  const landlordCard: PropertyLandlord = {
    name: landlord?.fullName ?? "Unknown",
    image: landlord?.avatar ?? PLACEHOLDER_AVATAR,
    imageAlt: landlord?.fullName ?? "Landlord",
    rating: p.averageRating ?? 0,
    creditScore: 750, // TODO: replace with real score when tenant scoring is implemented
    responseTime: "< 24 hours",
    verified: landlord?.isEmailVerified ?? false,
  };

  const primaryImage = p.images.find((img) => img.isPrimary) ?? p.images[0];

  return {
    id: p._id,
    title: p.title,
    location: `${p.address.locality}, ${p.city}`,
    price: p.rentAmount,
    type: p.propertyType,
    image: primaryImage?.url ?? PLACEHOLDER_IMAGE,
    imageAlt: primaryImage?.alt ?? p.title,
    landlord: landlordCard,
    amenities: p.amenities ?? [],
    available: p.availabilityStatus === "available",
    verified: p.verificationStatus === "approved",
  };
}

// ─── Public API calls ─────────────────────────────────────────────────────────

export async function getPublicProperties(filters: PublicPropertyFilters = {}): Promise<{
  properties: ApiProperty[];
  pagination: PaginationMeta;
}> {
  const sp = new URLSearchParams();
  if (filters.city) sp.set("city", filters.city);
  if (filters.propertyType) sp.set("propertyType", filters.propertyType);
  if (filters.furnishingStatus) sp.set("furnishingStatus", filters.furnishingStatus);
  if (filters.minRent !== undefined) sp.set("minRent", String(filters.minRent));
  if (filters.maxRent !== undefined) sp.set("maxRent", String(filters.maxRent));
  if (filters.search) sp.set("search", filters.search);
  if (filters.page !== undefined) sp.set("page", String(filters.page));
  if (filters.limit !== undefined) sp.set("limit", String(filters.limit));

  const query = sp.toString();
  const res = await apiClient.get<{ properties: ApiProperty[]; pagination: PaginationMeta }>(
    `/properties${query ? `?${query}` : ""}`
  );
  return res.data!;
}

export async function getPropertyById(id: string): Promise<ApiProperty> {
  const res = await apiClient.get<{ property: ApiProperty }>(`/properties/${id}`);
  return res.data!.property;
}

// ─── Landlord API calls (authenticated) ──────────────────────────────────────

export async function getMyProperties(): Promise<ApiProperty[]> {
  const res = await apiClient.get<{ properties: ApiProperty[] }>("/landlord/properties");
  return res.data!.properties;
}

export async function createProperty(data: CreatePropertyInput): Promise<ApiProperty> {
  const res = await apiClient.post<{ property: ApiProperty }>("/landlord/properties", data);
  return res.data!.property;
}

export async function updateProperty(
  id: string,
  data: UpdatePropertyInput
): Promise<ApiProperty> {
  const res = await apiClient.patch<{ property: ApiProperty }>(`/landlord/properties/${id}`, data);
  return res.data!.property;
}

export async function deleteProperty(id: string): Promise<void> {
  await apiClient.delete(`/landlord/properties/${id}`);
}
