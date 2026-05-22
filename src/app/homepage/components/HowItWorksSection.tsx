import Icon from "@/components/ui/AppIcon";

export default function HowItWorksSection() {
  const landlordSteps = [
    {
      icon: "HomeIcon",
      title: "List Property",
      description: "Add your property details and photos in 5 minutes",
    },
    {
      icon: "UserGroupIcon",
      title: "Get Verified",
      description: "Complete ID verification to build trust",
    },
    {
      icon: "MagnifyingGlassIcon",
      title: "Find Tenants",
      description: "Review tenant profiles with credit scores and ratings",
    },
    {
      icon: "CheckBadgeIcon",
      title: "Build Reputation",
      description: "Receive reviews to attract quality tenants",
    },
  ];

  const tenantSteps = [
    {
      icon: "MagnifyingGlassIcon",
      title: "Search Properties",
      description: "Filter by location, price, and landlord rating",
    },
    {
      icon: "UserCircleIcon",
      title: "Get Verified",
      description: "Complete verification to access verified properties",
    },
    {
      icon: "ChatBubbleLeftRightIcon",
      title: "Contact Landlords",
      description: "Message verified landlords directly",
    },
    {
      icon: "StarIcon",
      title: "Build Credit",
      description: "Pay rent on-time to boost your credit score",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Icon name="LightBulbIcon" size={20} className="text-primary" />
            <span className="text-sm font-semibold text-primary">How It Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple Process for <span className="gradient-text">Both Sides</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a landlord or tenant, building trust has never been easier
          </p>
        </div>

        {/* Dual Journey */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Landlords */}
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <Icon name="HomeModernIcon" variant="solid" size={24} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">For Landlords</h3>
            </div>

            <div className="space-y-4">
              {landlordSteps.map((step, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Icon name={step.icon as any} size={24} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-bold text-muted-foreground">
                          STEP {index + 1}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Tenants */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Icon name="UserGroupIcon" variant="solid" size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">For Tenants</h3>
            </div>

            <div className="space-y-4">
              {tenantSteps.map((step, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon name={step.icon as any} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-bold text-muted-foreground">
                          STEP {index + 1}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to experience trust-based renting?
          </p>
          <button className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
}