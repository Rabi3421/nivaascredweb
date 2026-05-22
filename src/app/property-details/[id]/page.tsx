import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import connectDB from "@/lib/db";
import { PropertyModel } from "@/lib/models";
import PropertyApplyCTA from "./components/PropertyApplyCTA";
import type { ApiProperty } from "@/lib/api/properties";

type PageProps = { params: Promise<{ id: string }> };

async function fetchProperty(id: string): Promise<ApiProperty | null> {
  try {
    await connectDB();
    const property = await PropertyModel.findById(id)
      .populate({ path: "landlordId", select: "fullName avatar isEmailVerified" })
      .lean();
    return property ? (JSON.parse(JSON.stringify(property)) as ApiProperty) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await fetchProperty(id);
  if (!property) {
    return { title: "Property Not Found - NivaasCred" };
  }
  const landlord = typeof property.landlordId === "object" ? property.landlordId : null;
  return {
    title: `${property.title} - NivaasCred`,
    description: `${property.propertyType} in ${property.address.locality}, ${property.city}. ₹${property.rentAmount.toLocaleString()}/month. ${property.furnishingStatus.replace(/_/g, " ")}.`,
    keywords: [property.propertyType, property.city, property.state, "rental", "NivaasCred", landlord?.fullName ?? ""].filter(Boolean),
  };
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const property = await fetchProperty(id);

  if (!property) notFound();

  const landlord = typeof property.landlordId === "object" ? property.landlordId : null;
  const primaryImage =
    property.images?.find((img) => img.isPrimary)?.url ??
    property.images?.[0]?.url ??
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267";

  const furnishingLabel: Record<string, string> = {
    unfurnished: "Unfurnished",
    semi_furnished: "Semi-Furnished",
    fully_furnished: "Fully Furnished",
  };

  const statusLabel: Record<string, { text: string; cls: string }> = {
    available: { text: "Available", cls: "bg-success text-white" },
    rented: { text: "Rented", cls: "bg-warning text-white" },
    inactive: { text: "Inactive", cls: "bg-muted text-muted-foreground" },
    pending_review: { text: "Pending Review", cls: "bg-accent text-white" },
  };
  const badge = statusLabel[property.availabilityStatus] ?? statusLabel.available;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Image Gallery */}
        <section className="px-4 py-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-2xl overflow-hidden">
              <div className="md:col-span-2 md:row-span-2">
                <AppImage
                  src={primaryImage}
                  alt={`${property.title} main view`}
                  className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              {(property.images ?? []).slice(1, 5).map((image, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <AppImage
                    src={image.url}
                    alt={image.alt ?? `Property view ${index + 2}`}
                    className="w-full h-32 md:h-40 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {index === 3 && (property.images?.length ?? 0) > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                      +{(property.images?.length ?? 0) - 5} More
                    </div>
                  )}
                </div>
              ))}
              {/* Placeholder tiles if fewer than 4 extra images */}
              {Array.from({ length: Math.max(0, 4 - (property.images?.length ?? 1) + 1) }).map((_, i) => (
                <div key={`ph-${i}`} className="hidden md:block bg-muted h-32 md:h-40" />
              ))}
            </div>
          </div>
        </section>

        {/* Property Info */}
        <section className="px-4 py-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* ── Left Column ── */}
              <div className="lg:col-span-2 space-y-8">
                {/* Basic Info */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${badge.cls}`}>
                      {badge.text}
                    </span>
                    <span className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">
                      {property.propertyType}
                    </span>
                    {property.verificationStatus === "approved" && (
                      <span className="flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full">
                        <Icon name="ShieldCheckIcon" size={14} />
                        <span>Verified Property</span>
                      </span>
                    )}
                    {landlord?.isEmailVerified && (
                      <span className="flex items-center space-x-1 px-3 py-1 bg-success/10 text-success text-sm font-bold rounded-full">
                        <Icon name="ShieldCheckIcon" size={14} />
                        <span>Verified Landlord</span>
                      </span>
                    )}
                    {property.averageRating > 0 && (
                      <div className="flex items-center space-x-1">
                        <Icon name="StarIcon" variant="solid" size={16} className="text-warning" />
                        <span className="font-semibold text-foreground">
                          {property.averageRating.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">
                          ({property.totalReviews} review{property.totalReviews !== 1 ? "s" : ""})
                        </span>
                      </div>
                    )}
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {property.title}
                  </h1>

                  <div className="flex items-center text-muted-foreground mb-6">
                    <Icon name="MapPinIcon" size={20} className="mr-2 flex-shrink-0" />
                    <span>
                      {property.address.locality}, {property.address.city},{" "}
                      {property.address.state} — {property.address.pincode}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="glass rounded-xl p-4">
                      <p className="text-2xl font-bold text-foreground">
                        ₹{property.rentAmount.toLocaleString()}
                      </p>
                      <p className="text-muted-foreground text-sm">per month</p>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <p className="text-2xl font-bold text-foreground">
                        ₹{property.depositAmount.toLocaleString()}
                      </p>
                      <p className="text-muted-foreground text-sm">security deposit</p>
                    </div>
                    {property.areaSqFt ? (
                      <div className="glass rounded-xl p-4">
                        <p className="text-2xl font-bold text-foreground">
                          {property.areaSqFt} sq ft
                        </p>
                        <p className="text-muted-foreground text-sm">built-up area</p>
                      </div>
                    ) : (
                      <div className="glass rounded-xl p-4">
                        <p className="text-2xl font-bold text-foreground">
                          {property.bedrooms}BR / {property.bathrooms}BA
                        </p>
                        <p className="text-muted-foreground text-sm">bed & bath</p>
                      </div>
                    )}
                  </div>

                  {property.description && (
                    <p className="text-muted-foreground leading-relaxed">
                      {property.description}
                    </p>
                  )}
                </div>

                {/* Property Features */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Property Features
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: "Type", value: property.propertyType },
                      {
                        label: "Furnishing",
                        value: furnishingLabel[property.furnishingStatus] ?? property.furnishingStatus,
                      },
                      { label: "Bedrooms", value: String(property.bedrooms) },
                      { label: "Bathrooms", value: String(property.bathrooms) },
                      ...(property.areaSqFt
                        ? [{ label: "Area", value: `${property.areaSqFt} sq ft` }]
                        : []),
                      ...(property.noticePeriodDays !== undefined
                        ? [{ label: "Notice Period", value: `${property.noticePeriodDays} days` }]
                        : []),
                      ...(property.maintenanceCharges
                        ? [{ label: "Maintenance", value: `₹${property.maintenanceCharges.toLocaleString()}/mo` }]
                        : []),
                      { label: "Pets Allowed", value: property.petsAllowed ? "Yes" : "No" },
                      ...(property.availableFrom
                        ? [
                            {
                              label: "Available From",
                              value: new Date(property.availableFrom).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }),
                            },
                          ]
                        : []),
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between py-3 border-b border-border"
                      >
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-semibold text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                {(property.amenities ?? []).length > 0 && (
                  <div className="glass rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">Amenities</h2>
                    <div className="flex flex-wrap gap-3">
                      {property.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="flex items-center space-x-2 px-4 py-2 bg-muted/30 rounded-xl text-foreground text-sm"
                        >
                          <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0" />
                          <span>{amenity}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews placeholder */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">Tenant Reviews</h2>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Reviews will be available once tenants have completed their stay.
                  </p>
                </div>
              </div>

              {/* ── Right Column ── */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Landlord Card */}
                  <div className="glass rounded-2xl p-6">
                    <div className="text-center mb-6">
                      {landlord?.avatar ? (
                        <AppImage
                          src={landlord.avatar}
                          alt={landlord.fullName}
                          className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                          {landlord?.fullName?.charAt(0).toUpperCase() ?? "?"}
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-foreground">
                        {landlord?.fullName ?? "Landlord"}
                      </h3>
                      {landlord?.isEmailVerified && (
                        <span className="inline-flex items-center space-x-1 mt-1 text-xs text-success font-medium">
                          <Icon name="CheckBadgeIcon" size={14} />
                          <span>Email Verified</span>
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      {/* Apply CTA — client component handles auth + modal */}
                      <PropertyApplyCTA
                        propertyId={property._id}
                        propertyTitle={property.title}
                      />

                      <button className="w-full px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
                        <Icon name="CalendarIcon" size={20} />
                        <span>Schedule Visit</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-muted/50 rounded-xl text-left hover:bg-muted transition-colors flex items-center space-x-3">
                        <Icon name="BookmarkIcon" size={20} className="text-muted-foreground" />
                        <span className="text-foreground">Save Property</span>
                      </button>
                      <button className="w-full p-3 bg-muted/50 rounded-xl text-left hover:bg-muted transition-colors flex items-center space-x-3">
                        <Icon name="ShareIcon" size={20} className="text-muted-foreground" />
                        <span className="text-foreground">Share Property</span>
                      </button>
                    </div>
                  </div>

                  {/* Property summary card */}
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">Summary</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rent</span>
                        <span className="font-semibold text-foreground">
                          ₹{property.rentAmount.toLocaleString()}/mo
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Deposit</span>
                        <span className="font-semibold text-foreground">
                          ₹{property.depositAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-semibold text-foreground">
                          {property.propertyType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Furnishing</span>
                        <span className="font-semibold text-foreground">
                          {furnishingLabel[property.furnishingStatus] ?? property.furnishingStatus}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <Link
                        href="/property-listings"
                        className="text-primary text-sm hover:underline flex items-center space-x-1"
                      >
                        <Icon name="ArrowLeftIcon" size={14} />
                        <span>Back to Listings</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
