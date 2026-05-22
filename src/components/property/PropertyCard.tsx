import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer">
      {/* Property Image */}
      <div className="relative h-56 overflow-hidden">
        <AppImage
          src={property.image}
          alt={property.imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {property.available && (
              <span className="px-3 py-1 bg-success text-white text-xs font-bold rounded-full">
                Available
              </span>
            )}
            <span className="px-3 py-1 bg-card/90 backdrop-blur-sm text-foreground text-xs font-bold rounded-full">
              {property.type}
            </span>
          </div>
          {property.landlord.verified && (
            <div className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full flex items-center space-x-1">
              <Icon name="ShieldCheckIcon" size={14} />
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* Landlord Preview on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex items-center space-x-3 w-full">
            <AppImage
              src={property.landlord.image}
              alt={property.landlord.imageAlt}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm truncate">{property.landlord.name}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  <Icon name="StarIcon" variant="solid" size={12} className="text-warning" />
                  <span className="text-white text-xs font-semibold">
                    {property.landlord.rating}
                  </span>
                </div>
                <span className="text-white/60 text-xs">•</span>
                <span className="text-white text-xs font-semibold">
                  Score: {property.landlord.creditScore}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {property.title}
        </h3>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Icon name="MapPinIcon" size={16} className="flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline space-x-2 mb-4">
          <span className="text-2xl font-bold text-primary">
            ₹{property.price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-foreground text-xs font-medium rounded-lg"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Trust Indicators & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="ClockIcon" size={14} className="text-success flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{property.landlord.responseTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="ChartBarIcon" size={14} className="text-primary flex-shrink-0" />
              <span className="text-xs font-semibold text-primary">
                {property.landlord.creditScore}
              </span>
            </div>
          </div>
          <Link
            href={`/property-details/${property.id}`}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-secondary transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
