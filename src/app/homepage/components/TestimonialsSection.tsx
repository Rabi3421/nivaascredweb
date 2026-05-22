import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import { mockTestimonials } from "@/data/mockTestimonials";
import type { Testimonial } from "@/types/testimonial";

function TenantMetrics({ metrics }: { metrics: Testimonial["metrics"] }) {
  return (
    <>
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">{metrics.creditScore}</p>
        <p className="text-xs text-muted-foreground mt-1">Credit Score</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">+{metrics.creditIncrease}</p>
        <p className="text-xs text-muted-foreground mt-1">Score Increase</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">{metrics.timeframe}m</p>
        <p className="text-xs text-muted-foreground mt-1">Time Frame</p>
      </div>
    </>
  );
}

function LandlordMetrics({ metrics }: { metrics: Testimonial["metrics"] }) {
  return (
    <>
      <div className="text-center">
        <p className="text-2xl font-bold text-accent">
          {metrics.properties ?? metrics.successfulRentals}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {metrics.properties ? "Properties" : "Rentals"}
        </p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-accent">
          {metrics.turnoverReduction
            ? `-${metrics.turnoverReduction}%`
            : `${metrics.zeroDefaultMonths}m`}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {metrics.turnoverReduction ? "Turnover" : "Zero Issues"}
        </p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-accent">
          {metrics.qualityInquiries ?? metrics.avgTenantDuration}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {metrics.qualityInquiries ? "Quality" : "Avg Duration"}
        </p>
      </div>
    </>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Icon name="ChatBubbleBottomCenterTextIcon" size={20} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Real Stories from <span className="gradient-text">Our Community</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how RentTrust is transforming rental relationships across India
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
          {mockTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-shrink-0">
                    <AppImage
                      src={testimonial.image}
                      alt={testimonial.imageAlt}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success border-2 border-white rounded-full flex items-center justify-center">
                      <Icon name="CheckIcon" size={12} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                    testimonial.userType === "Landlord"
                      ? "bg-accent/10 text-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {testimonial.userType}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Icon key={i} name="StarIcon" variant="solid" size={20} className="text-warning" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6 text-lg">
                "{testimonial.text}"
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                {testimonial.userType === "Tenant" ? (
                  <TenantMetrics metrics={testimonial.metrics} />
                ) : (
                  <LandlordMetrics metrics={testimonial.metrics} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in">
          {[
            { value: "24,500+", label: "Verified Users" },
            { value: "4,200+", label: "Successful Rentals" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "4.9/5", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold gradient-text mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">Join thousands of satisfied users</p>
          <button className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl">
            Start Your Success Story
          </button>
        </div>
      </div>
    </section>
  );
}
