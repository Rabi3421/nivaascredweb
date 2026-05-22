"use client";

import { useState } from "react";
import Icon from "@/components/ui/AppIcon";
import type { FilterValues } from "@/types/property";
import {
  FILTER_LOCATIONS,
  FILTER_PROPERTY_TYPES,
  FILTER_CREDIT_SCORES,
  FILTER_RATINGS,
  FILTER_DEFAULTS,
} from "@/data/mockProperties";

interface PropertyFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export default function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterValues>(FILTER_DEFAULTS);

  const handleFilterChange = (key: keyof FilterValues, value: FilterValues[keyof FilterValues]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters(FILTER_DEFAULTS);
    onFilterChange(FILTER_DEFAULTS);
  };

  return (
    <div className="glass rounded-2xl p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground flex items-center space-x-2">
          <Icon name="AdjustmentsHorizontalIcon" size={20} className="text-primary" />
          <span>Filters</span>
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden text-muted-foreground hover:text-primary transition-colors"
          aria-label={isExpanded ? "Collapse filters" : "Expand filters"}
        >
          <Icon name={isExpanded ? "ChevronUpIcon" : "ChevronDownIcon"} size={20} />
        </button>
      </div>

      <div className={`space-y-6 ${isExpanded ? "block" : "hidden lg:block"}`}>
        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Location</label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          >
            <option value="">All Locations</option>
            {FILTER_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Price Range: ₹{filters.priceRange[0].toLocaleString()} – ₹
            {filters.priceRange[1].toLocaleString()}
          </label>
          <input
            type="range"
            min="5000"
            max="50000"
            step="5000"
            value={filters.priceRange[1]}
            onChange={(e) =>
              handleFilterChange("priceRange", [filters.priceRange[0], parseInt(e.target.value)])
            }
            className="w-full accent-primary"
            aria-label="Maximum price"
          />
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Property Type</label>
          <div className="grid grid-cols-2 gap-2">
            {FILTER_PROPERTY_TYPES.map((type) => (
              <button
                key={type}
                onClick={() =>
                  handleFilterChange("propertyType", filters.propertyType === type ? "" : type)
                }
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  filters.propertyType === type
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-primary/10"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Landlord Credit Score */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Landlord Credit Score
          </label>
          <div className="space-y-2">
            {FILTER_CREDIT_SCORES.map((score) => (
              <button
                key={score}
                onClick={() =>
                  handleFilterChange("creditScore", filters.creditScore === score ? "" : score)
                }
                className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-all text-left ${
                  filters.creditScore === score
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-primary/10"
                }`}
              >
                {score}
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Minimum Rating</label>
          <div className="space-y-2">
            {FILTER_RATINGS.map((rating) => (
              <button
                key={rating}
                onClick={() =>
                  handleFilterChange("rating", filters.rating === rating ? "" : rating)
                }
                className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center space-x-2 ${
                  filters.rating === rating
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-primary/10"
                }`}
              >
                <Icon
                  name="StarIcon"
                  variant="solid"
                  size={16}
                  className={filters.rating === rating ? "text-white" : "text-warning"}
                />
                <span>{rating}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="w-full px-4 py-3 border-2 border-border rounded-xl font-semibold text-foreground hover:border-primary hover:text-primary transition-all"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
