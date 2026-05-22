import { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works - RentTrust",
  description: "Learn how RentTrust works for both landlords and tenants. Discover our verification process, review system, and credit scoring platform.",
  keywords: ["how it works", "rental platform", "verification process", "review system", "credit scoring", "landlord tenant matching"],
};

export default function HowItWorksPage() {
  const steps = [
    {
      id: 1,
      title: "Create & Verify Profile",
      description: "Sign up and complete identity verification with documents. Build trust from day one.",
      icon: "UserPlusIcon",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      title: "Search & Connect",
      description: "Browse verified listings or profiles. Use filters to find your perfect match.",
      icon: "MagnifyingGlassIcon",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: 3,
      title: "Review & Rate",
      description: "Share honest experiences to help others make informed decisions.",
      icon: "StarIcon",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 4,
      title: "Build Credit Score",
      description: "Maintain good rental history to improve your credit score and unlock better properties.",
      icon: "TrophyIcon",
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  const forTenants = [
    {
      title: "Verified Landlords",
      description: "All landlords complete identity verification and property ownership verification.",
      icon: "ShieldCheckIcon"
    },
    {
      title: "Honest Reviews",
      description: "Read authentic reviews from previous tenants about maintenance, behavior, and property condition.",
      icon: "ChatBubbleLeftRightIcon"
    },
    {
      title: "Credit Building",
      description: "Build your rental credit score by paying rent on time and maintaining good tenant relationships.",
      icon: "ArrowTrendingUpIcon"
    },
    {
      title: "Dispute Protection",
      description: "Fair dispute resolution process with documented communication and evidence.",
      icon: "ScaleIcon"
    }
  ];

  const forLandlords = [
    {
      title: "Screened Tenants",
      description: "Access tenant credit scores, rental history, and verified employment details.",
      icon: "DocumentMagnifyingGlassIcon"
    },
    {
      title: "Secure Payments",
      description: "Digital rent collection with automatic reminders and payment tracking.",
      icon: "CreditCardIcon"
    },
    {
      title: "Property Reviews",
      description: "Get feedback on your property and services to attract quality tenants.",
      icon: "BuildingOfficeIcon"
    },
    {
      title: "Legal Support",
      description: "Access to legal templates, agreements, and expert advice when needed.",
      icon: "DocumentTextIcon"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-7xl text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
              <Icon name="LightBulbIcon" size={20} className="text-primary" />
              <span className="text-sm font-semibold text-primary">Simple & Transparent Process</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              How <span className="gradient-text">RentTrust</span> Works
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Our platform connects verified landlords with reliable tenants through a transparent review system and credit scoring. Here's how we make renting safer and easier for everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/property-listings"
                className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Browse Properties</span>
                <Icon name="ArrowRightIcon" size={20} />
              </Link>
              <Link
                href="/auth/signup"
                className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Join RentTrust</span>
                <Icon name="UserPlusIcon" size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Main Steps */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                4 Simple Steps to Get Started
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're a landlord or tenant, our process is designed to be straightforward and secure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  <div className="glass rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300">
                    <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <Icon name={step.icon} size={28} className={step.color} />
                    </div>
                    
                    <div className="mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-bold mb-3">
                        {step.id}
                      </span>
                      <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 -right-4 z-10">
                      <Icon name="ArrowRightIcon" size={24} className="text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Tenants */}
        <section className="py-20 px-4 bg-gradient-to-br from-muted/30 to-background">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
                    <Icon name="HomeIcon" size={20} className="text-accent" />
                    <span className="text-sm font-semibold text-accent">For Tenants</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Find Your Perfect Home with Confidence
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-8">
                    Our platform helps tenants make informed decisions with verified landlords, honest reviews, and transparent rental processes.
                  </p>
                </div>

                <div className="grid gap-6">
                  {forTenants.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name={feature.icon} size={24} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/property-listings"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-all duration-300"
                >
                  <span>Start House Hunting</span>
                  <Icon name="ArrowRightIcon" size={20} />
                </Link>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <AppImage
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                    alt="Happy tenant moving into new apartment with boxes"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                {/* Floating Stats Card */}
                <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">4.8★</p>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 glass rounded-2xl p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">95%</p>
                    <p className="text-sm text-muted-foreground">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Landlords */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <AppImage
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                    alt="Professional landlord showing apartment to potential tenants"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                {/* Floating Stats Card */}
                <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">2.3x</p>
                    <p className="text-sm text-muted-foreground">Faster Filling</p>
                  </div>
                </div>
                
                <div className="absolute -top-6 -left-6 glass rounded-2xl p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">₹0</p>
                    <p className="text-sm text-muted-foreground">Broker Fee</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8 order-1 lg:order-2">
                <div>
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                    <Icon name="BuildingOfficeIcon" size={20} className="text-primary" />
                    <span className="text-sm font-semibold text-primary">For Landlords</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Find Reliable Tenants Faster
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-8">
                    Connect with pre-screened, verified tenants and manage your properties more efficiently with our comprehensive platform.
                  </p>
                </div>

                <div className="grid gap-6">
                  {forLandlords.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name={feature.icon} size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/auth/signup"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300"
                >
                  <span>List Your Property</span>
                  <Icon name="ArrowRightIcon" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Safety */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-7xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Trust & Safety First
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              We've built comprehensive safety measures and verification processes to ensure every interaction on our platform is secure and trustworthy.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass rounded-2xl p-8">
                <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon name="ShieldCheckIcon" size={32} className="text-success" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Identity Verification</h3>
                <p className="text-muted-foreground">
                  Government-issued ID verification for all users. Background checks available for premium members.
                </p>
              </div>

              <div className="glass rounded-2xl p-8">
                <div className="w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon name="DocumentTextIcon" size={32} className="text-warning" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Verified Reviews</h3>
                <p className="text-muted-foreground">
                  Only verified rental relationships can leave reviews. Fake reviews are automatically detected and removed.
                </p>
              </div>

              <div className="glass rounded-2xl p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon name="ScaleIcon" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Fair Dispute Resolution</h3>
                <p className="text-muted-foreground">
                  Expert mediation service for rental disputes with documented evidence and fair outcomes for all parties.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/safety-and-trust"
                className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300"
              >
                <span>Learn More About Safety</span>
                <Icon name="ArrowRightIcon" size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of verified landlords and tenants who trust RentTrust for their rental needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/property-listings"
                className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Icon name="HomeIcon" size={20} />
                <span>Find Properties</span>
              </Link>
              <Link
                href="/auth/signup"
                className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Icon name="UserPlusIcon" size={20} />
                <span>Join as Landlord</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}