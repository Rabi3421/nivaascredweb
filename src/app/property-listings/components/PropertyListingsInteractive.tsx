"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import PropertyFilters from "@/components/property/PropertyFilters";
import PropertyCard from "@/components/property/PropertyCard";
import EmptyState from "@/components/ui/EmptyState";
import Icon from "@/components/ui/AppIcon";
import { FILTER_DEFAULTS } from "@/data/mockProperties";
import type { FilterValues } from "@/types/property";
import type { Property } from "@/types/property";
import {
  getPublicProperties,
  toCardProperty,
  type PaginationMeta,
} from "@/lib/api/properties";
import { ApiClientError } from "@/lib/api/client";
import { PROPERTY_TYPES } from "@/lib/validations/property";

export default function PropertyListingsInteractive() {
  const [filters, setFilters] = useState<FilterValues>(FILTER_DEFAULTS);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stable ref to latest filters to avoid stale closure in fetch
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const fetchProperties = useCallback(async (currentFilters: FilterValues, currentPage: number) => {
    try {
      setIsLoading(true);
      setError(null);

      // Map FilterValues → API params
      const apiType = PROPERTY_TYPES.includes(currentFilters.propertyType as typeof PROPERTY_TYPES[number])
        ? currentFilters.propertyType
        : undefined;

      const result = await getPublicProperties({
        search: currentFilters.location || undefined,
        propertyType: apiType,
        minRent: currentFilters.priceRange[0] > 0 ? currentFilters.priceRange[0] : undefined,
        maxRent: currentFilters.priceRange[1] < 50000 ? currentFilters.priceRange[1] : undefined,
        page: currentPage,
        limit: 12,
      });

      const cards = result.properties.map(toCardProperty);

      // Client-side filter by rating (API doesn't support it yet)
      const filtered = currentFilters.rating && currentFilters.rating !== "All"
        ? cards.filter((p) => p.landlord.rating >= parseFloat(currentFilters.rating.replace("+", "")))
        : cards;

      setProperties(filtered);
      setPagination(result.pagination);
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
    fetchProperties(filters, page);
  }, [filters, page, fetchProperties]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(FILTER_DEFAULTS);
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <PropertyFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Properties Grid */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {isLoading
                  ? "Loading…"
                  : `${pagination?.total ?? properties.length} Propert${(pagination?.total ?? properties.length) === 1 ? "y" : "ies"} Found`}
              </h2>
              <p className="text-sm text-muted-foreground">
                Showing verified properties with trusted landlords
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-primary/10"
                }`}
              >
                <Icon name="Squares2X2Icon" size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-primary/10"
                }`}
              >
                <Icon name="ListBulletIcon" size={20} />
              </button>
            </div>
          </div>

          {/* Loading skeleton */}
          {isLoading && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-56 bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-6 bg-muted rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {!isLoading && error && (
            <div className="text-center py-12">
              <Icon name="ExclamationCircleIcon" size={48} className="text-destructive mx-auto mb-3" />
              <p className="text-destructive font-semibold mb-4">{error}</p>
              <button
                onClick={() => fetchProperties(filters, page)}
                className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Property Cards */}
          {!isLoading && !error && properties.length > 0 && (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-10">
                  <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="p-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Icon name="ChevronLeftIcon" size={20} />
                  </button>
                  {Array.from({ length: pagination.totalPages }).map((_, i) => {
                    const p = i + 1;
                    if (
                      p === 1 ||
                      p === pagination.totalPages ||
                      Math.abs(p - page) <= 1
                    ) {
                      return (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                            p === page
                              ? "bg-primary text-white"
                              : "border border-border text-foreground hover:bg-muted"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    }
                    if (Math.abs(p - page) === 2) {
                      return <span key={p} className="text-muted-foreground">…</span>;
                    }
                    return null;
                  })}
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!pagination.hasNextPage}
                    className="p-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Icon name="ChevronRightIcon" size={20} />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Empty state */}
          {!isLoading && !error && properties.length === 0 && (
            <EmptyState
              icon="MagnifyingGlassIcon"
              title="No Properties Found"
              description="Try adjusting your filters to see more results"
              action={{ label: "Clear Filters", onClick: resetFilters }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
