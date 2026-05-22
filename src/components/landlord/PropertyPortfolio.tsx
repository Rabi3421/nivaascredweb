"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import {
  getMyProperties,
  deleteProperty,
  type ApiProperty,
} from "@/lib/api/properties";
import { ApiClientError } from "@/lib/api/client";

export default function PropertyPortfolio() {
  const [properties, setProperties] = useState<ApiProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getMyProperties();
      setProperties(data);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError("Failed to load properties. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      if (err instanceof ApiClientError) {
        alert(err.message);
      } else {
        alert("Failed to delete property. Please try again.");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const statusLabel = (status: ApiProperty["availabilityStatus"]) => {
    switch (status) {
      case "available": return "Available";
      case "rented": return "Rented";
      case "inactive": return "Inactive";
      case "pending_review": return "Pending Review";
    }
  };

  const statusStyle = (status: ApiProperty["availabilityStatus"]) => {
    switch (status) {
      case "available": return "bg-success/10 text-success";
      case "rented": return "bg-primary/10 text-primary";
      case "inactive": return "bg-muted text-muted-foreground";
      case "pending_review": return "bg-warning/10 text-warning";
    }
  };

  const primaryImage = (p: ApiProperty) =>
    p.images.find((img) => img.isPrimary)?.url ?? p.images[0]?.url;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-border rounded-xl p-4 animate-pulse">
            <div className="flex gap-4">
              <div className="w-32 h-24 bg-muted rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-muted rounded w-2/3" />
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <Icon name="ExclamationCircleIcon" size={40} className="text-destructive mx-auto mb-3" />
        <p className="text-destructive font-medium mb-4">{error}</p>
        <button
          onClick={load}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-10">
        <Icon name="BuildingOfficeIcon" size={48} className="text-muted-foreground mx-auto mb-3" />
        <p className="text-foreground font-semibold mb-1">No properties yet</p>
        <p className="text-muted-foreground text-sm mb-5">
          Add your first property to get started.
        </p>
        <Link
          href="/landlord/property-management/add"
          className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300"
        >
          Add Property
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="border border-border rounded-xl p-4 hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                {primaryImage(property) ? (
                  <AppImage
                    src={primaryImage(property)!}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="PhotoIcon" size={28} className="text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{property.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {property.address.locality}, {property.city}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-foreground">
                      ₹{property.rentAmount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyle(property.availabilityStatus)}`}
                    >
                      {statusLabel(property.availabilityStatus)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {property.propertyType} • {property.bedrooms}BR/{property.bathrooms}BA
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      href={`/property-details/${property._id}`}
                      className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-medium hover:bg-secondary transition-colors"
                    >
                      View
                    </Link>
                    <Link
                      href={`/landlord/property-management/edit/${property._id}`}
                      className="px-3 py-1 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setConfirmDeleteId(property._id)}
                      className="px-3 py-1 border border-destructive/50 rounded-lg text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {property.amenities.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {property.amenities.slice(0, 4).map((a) => (
                      <span
                        key={a}
                        className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                      >
                        {a}
                      </span>
                    ))}
                    {property.amenities.length > 4 && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                        +{property.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="TrashIcon" size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Delete Property?</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 px-4 py-2 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={deletingId === confirmDeleteId}
                className="flex-1 px-4 py-2 bg-destructive text-white rounded-xl text-sm font-semibold hover:bg-destructive/90 transition-colors disabled:opacity-60"
              >
                {deletingId === confirmDeleteId ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
