"use client";

import { useState } from "react";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import { mockReviews } from "@/data/mockReviews";

const filters = [
  { id: "all", label: "All Reviews", icon: "StarIcon" },
  { id: "landlord", label: "Landlord Reviews", icon: "HomeIcon" },
  { id: "tenant", label: "Tenant Reviews", icon: "UserIcon" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export default function ReviewSystemSection() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filteredReviews =
    activeFilter === "all" ? mockReviews : mockReviews.filter((r) => r.type === activeFilter);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Icon name="ChatBubbleLeftRightIcon" size={20} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Review System</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Real Reviews from <span className="gradient-text">Verified Users</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what landlords and tenants say about each other. Every review is from a verified
            rental relationship.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-primary text-white shadow-lg"
                  : "bg-card border border-border text-foreground hover:border-primary"
              }`}
            >
              <Icon
                name={filter.icon as string}
                size={20}
                className={activeFilter === filter.id ? "text-white" : "text-primary"}
              />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0">
                    <AppImage
                      src={review.reviewerImage}
                      alt={review.reviewerImageAlt}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {review.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-2 border-white rounded-full flex items-center justify-center">
                        <Icon name="CheckIcon" size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{review.reviewer}</h4>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                    review.type === "landlord"
                      ? "bg-accent/10 text-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {review.type === "landlord" ? "Landlord Review" : "Tenant Review"}
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="StarIcon"
                    variant={i < review.rating ? "solid" : "outline"}
                    size={18}
                    className={i < review.rating ? "text-warning" : "text-muted"}
                  />
                ))}
                <span className="ml-2 text-sm font-semibold text-foreground">
                  {review.rating}.0
                </span>
              </div>

              {/* Property */}
              <div className="flex items-center space-x-2 mb-3 text-sm text-muted-foreground">
                <Icon name="HomeIcon" size={16} className="flex-shrink-0" />
                <span>{review.property}</span>
              </div>

              {/* Review Text */}
              <p className="text-foreground leading-relaxed mb-4">{review.text}</p>

              {/* Payment History */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="CreditCardIcon" size={16} className="text-success" />
                  <span className="text-sm font-semibold text-foreground">Payment History</span>
                </div>
                <span className="text-sm font-bold text-success">{review.paymentHistory}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Start building your rental reputation today
          </p>
          <button className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl">
            Create Your Profile
          </button>
        </div>
      </div>
    </section>
  );
}
