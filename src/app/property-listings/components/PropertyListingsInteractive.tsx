"use client";

import { useState } from "react";
import PropertyFilters from "@/components/property/PropertyFilters";
import PropertyCard from "@/components/property/PropertyCard";
import EmptyState from "@/components/ui/EmptyState";
import Icon from "@/components/ui/AppIcon";
import { mockProperties, FILTER_DEFAULTS } from "@/data/mockProperties";
import type { FilterValues } from "@/types/property";

export default function PropertyListingsInteractive() {
  const [filters, setFilters] = useState<FilterValues>(FILTER_DEFAULTS);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProperties = mockProperties.filter((property) => {
    if (
      filters.location &&
      !property.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }
    if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
      return false;
    }
    if (filters.propertyType && property.type !== filters.propertyType) {
      return false;
    }
    if (filters.creditScore && filters.creditScore !== "All") {
      const minScore = parseInt(filters.creditScore.replace("+", ""));
      if (property.landlord.creditScore < minScore) return false;
    }
    if (filters.rating && filters.rating !== "All") {
      const minRating = parseFloat(filters.rating.replace("+", ""));
      if (property.landlord.rating < minRating) return false;
    }
    return true;
  });

  const resetFilters = () => setFilters(FILTER_DEFAULTS);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <PropertyFilters onFilterChange={setFilters} />
        </div>

        {/* Properties Grid */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {filteredProperties.length} Propert{filteredProperties.length === 1 ? "y" : "ies"}{" "}
                Found
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

          {/* Property Cards */}
          {filteredProperties.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
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
