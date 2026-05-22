import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import Link from "next/link";

export const metadata = {
  title: "Join NivaasCredit - Tenant or Landlord Onboarding",
  description: "Choose your path: Build your rental reputation as a tenant or find reliable tenants as a landlord.",
};

export default function OnboardingSelectionPage() {
  const tenantFeatures = [
    "Build rental reputation score",
    "Get approved faster by landlords",
    "Verified review system",
    "Payment history tracking",
    "Share trusted profile",
    "Priority property access"
  ];

  const landlordFeatures = [
    "Find reliable, verified tenants",
    "Access tenant credit scores",
    "Background check insights",
    "Reduced rental risk",
    "Streamlined screening",
    "Property management tools"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
              <Icon name="UserGroupIcon" size={20} className="text-primary" />
              <span className="text-sm font-semibold text-primary">Join Our Trusted Community</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Choose Your Path
            </h1>
            
            <p className="text-lg text-muted-foreground mb-12">
              Whether you're looking for a home or offering one, we have the perfect onboarding experience for you.
            </p>

            {/* Selection Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Tenant Card */}
              <div className="glass rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name="UserIcon" size={24} className="text-primary" />
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                    <span>🏠</span>
                    <span>For Tenants</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Build Your Rental Reputation
                  </h2>
                  
                  <p className="text-muted-foreground mb-6">
                    Get trusted faster and access better properties with your verified rental profile.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {tenantFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Link
                      href="/onboarding/tenant"
                      className="w-full px-6 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105"
                    >
                      <span>Start as Tenant</span>
                      <Icon name="ArrowRightIcon" size={20} />
                    </Link>
                    
                    <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="ClockIcon" size={12} className="text-primary" />
                        <span>30 sec setup</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="ShieldCheckIcon" size={12} className="text-primary" />
                        <span>No docs initially</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Landlord Card */}
              <div className="glass rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Icon name="BuildingOffice2Icon" size={24} className="text-accent" />
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                    <span>🏢</span>
                    <span>For Landlords</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Find Reliable Tenants
                  </h2>
                  
                  <p className="text-muted-foreground mb-6">
                    Reduce rental risks and connect with verified, trustworthy tenants.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {landlordFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Link
                      href="/onboarding/landlord"
                      className="w-full px-6 py-4 bg-accent text-white rounded-xl font-semibold hover:bg-accent/80 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105"
                    >
                      <span>Start as Landlord</span>
                      <Icon name="ArrowRightIcon" size={20} />
                    </Link>
                    
                    <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="EyeIcon" size={12} className="text-accent" />
                        <span>Credit insights</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="ShieldCheckIcon" size={12} className="text-accent" />
                        <span>Verified tenants</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Anti-Abuse Rules */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-destructive/10 border border-destructive/20 rounded-full mb-6">
                <Icon name="ShieldExclamationIcon" size={20} className="text-destructive" />
                <span className="text-sm font-semibold text-destructive">Platform Integrity</span>
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Anti-Abuse Rules
              </h2>
              
              <p className="text-muted-foreground">
                We maintain strict policies to ensure a trustworthy platform for everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* What's NOT Allowed */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="XCircleIcon" size={24} className="text-destructive" />
                  <h3 className="text-lg font-bold text-foreground">Not Allowed</h3>
                </div>
                
                <ul className="space-y-3">
                  {[
                    "Mid-tenancy reviews",
                    "Public tenant browsing", 
                    "Anonymous reviews",
                    "Fake relationships"
                  ].map((rule, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Icon name="XMarkIcon" size={16} className="text-destructive flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What IS Enforced */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="CheckCircleIcon" size={24} className="text-success" />
                  <h3 className="text-lg font-bold text-foreground">Enforced</h3>
                </div>
                
                <ul className="space-y-3">
                  {[
                    "Blind double-review system",
                    "Review weighting by tenure length",
                    "Verified relationships only",
                    "Post-tenancy reviews only"
                  ].map((rule, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Icon name="CheckIcon" size={16} className="text-success flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* UX Details */}
        <section className="py-16 px-4 bg-gradient-to-br from-muted/30 to-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                What Makes Our Onboarding Special
              </h2>
              <p className="text-muted-foreground">
                Every detail is designed to make your experience smooth and transparent.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "InformationCircleIcon",
                  title: "Transparent Process",
                  description: "\"Why we ask this\" tooltips everywhere"
                },
                {
                  icon: "ChartBarIcon", 
                  title: "Progress Tracking",
                  description: "Visual progress bars and completion status"
                },
                {
                  icon: "BookmarkIcon",
                  title: "Save & Resume",
                  description: "Continue your onboarding anytime"
                },
                {
                  icon: "ForwardIcon",
                  title: "Skip Non-Critical",
                  description: "Skip optional steps and complete later"
                }
              ].map((feature, index) => (
                <div key={index} className="glass rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name={feature.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Join India's Most Trusted Rental Platform?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands who have already built their rental reputation and found better matches.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link
                href="/onboarding/tenant"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 text-center"
              >
                I'm a Tenant
              </Link>
              <Link
                href="/onboarding/landlord"
                className="flex-1 px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/80 transition-all duration-300 text-center"
              >
                I'm a Landlord
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}