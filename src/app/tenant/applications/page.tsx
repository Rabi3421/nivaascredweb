"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import {
  getMyTenantApplications,
  STATUS_LABELS,
  STATUS_STYLES,
  type ApiApplication,
  type ApiApplicationProperty,
  type ApiApplicationUser,
} from "@/lib/api/applications";
import { ApiClientError } from "@/lib/api/client";

function getProperty(app: ApiApplication): ApiApplicationProperty | null {
  return typeof app.propertyId === "object" ? app.propertyId : null;
}

function getLandlord(app: ApiApplication): ApiApplicationUser | null {
  return typeof app.landlordId === "object" ? app.landlordId : null;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267";

export default function TenantApplicationsPage() {
  const [applications, setApplications] = useState<ApiApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getMyTenantApplications();
      setApplications(data);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError("Failed to load applications. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          {/* Page header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Applications</h1>
              <p className="text-muted-foreground mt-1">
                Track all properties you have applied to.
              </p>
            </div>
            <Link
              href="/property-listings"
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-secondary transition-colors"
            >
              <Icon name="MagnifyingGlassIcon" size={16} />
              <span>Find More</span>
            </Link>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass rounded-2xl p-5 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-24 h-20 bg-muted rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-muted rounded w-2/3" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                      <div className="h-4 bg-muted rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!isLoading && error && (
            <div className="text-center py-12">
              <Icon
                name="ExclamationCircleIcon"
                size={48}
                className="text-destructive mx-auto mb-3"
              />
              <p className="text-destructive font-semibold mb-4">{error}</p>
              <button
                onClick={load}
                className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !error && applications.length === 0 && (
            <div className="text-center py-16 glass rounded-2xl">
              <Icon
                name="DocumentTextIcon"
                size={56}
                className="text-muted-foreground mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-foreground mb-2">
                No Applications Yet
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
                Browse available properties and apply to those that interest you.
              </p>
              <Link
                href="/property-listings"
                className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-colors inline-flex items-center space-x-2"
              >
                <Icon name="MagnifyingGlassIcon" size={18} />
                <span>Browse Properties</span>
              </Link>
            </div>
          )}

          {/* Application list */}
          {!isLoading && !error && applications.length > 0 && (
            <div className="space-y-4">
              {applications.map((app) => {
                const property = getProperty(app);
                const landlord = getLandlord(app);
                const primaryImage =
                  property?.images?.find((img) => img.isPrimary)?.url ??
                  property?.images?.[0]?.url ??
                  PLACEHOLDER_IMAGE;

                return (
                  <div
                    key={app._id}
                    className="glass rounded-2xl p-5 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Property image */}
                      <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                        <AppImage
                          src={primaryImage}
                          alt={property?.title ?? "Property"}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                          <div>
                            <h3 className="font-bold text-foreground text-lg leading-tight">
                              {property?.title ?? "Property"}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {property
                                ? `${property.city}, ${property.state}`
                                : "—"}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                              STATUS_STYLES[app.status] ??
                              "bg-muted text-muted-foreground"
                            }`}
                          >
                            {STATUS_LABELS[app.status] ?? app.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                          {property?.rentAmount && (
                            <span className="font-semibold text-foreground">
                              ₹{property.rentAmount.toLocaleString()}/mo
                            </span>
                          )}
                          {landlord?.fullName && (
                            <span className="text-muted-foreground flex items-center space-x-1">
                              <Icon name="UserIcon" size={14} className="flex-shrink-0" />
                              <span>{landlord.fullName}</span>
                            </span>
                          )}
                          <span className="text-muted-foreground flex items-center space-x-1">
                            <Icon name="CalendarIcon" size={14} className="flex-shrink-0" />
                            <span>Applied {formatDate(app.createdAt)}</span>
                          </span>
                        </div>

                        {app.moveInDate && (
                          <p className="text-xs text-muted-foreground mb-2">
                            Preferred move-in:{" "}
                            {formatDate(app.moveInDate)}
                          </p>
                        )}

                        {app.status === "rejected" && app.rejectionReason && (
                          <div className="mt-2 p-3 bg-destructive/10 rounded-lg text-sm text-destructive">
                            <span className="font-semibold">Note: </span>
                            {app.rejectionReason}
                          </div>
                        )}

                        {app.status === "approved" && (
                          <div className="mt-2 p-3 bg-success/10 rounded-lg text-sm text-success font-medium">
                            Congratulations! Your application has been approved. The landlord will contact you soon.
                          </div>
                        )}

                        <div className="mt-3 flex flex-wrap gap-2">
                          {property && (
                            <Link
                              href={`/property-details/${
                                typeof app.propertyId === "object"
                                  ? app.propertyId._id
                                  : app.propertyId
                              }`}
                              className="px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors"
                            >
                              View Property
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
