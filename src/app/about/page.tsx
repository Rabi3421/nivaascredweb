import { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About RentTrust - India's Trusted Rental Platform",
  description: "Learn about RentTrust's mission to make rental housing safer and more transparent in India. Our story, team, and commitment to building trust.",
  keywords: ["about renttrust", "rental platform", "company story", "team", "mission", "rental trust"],
};

export default function AboutPage() {
  const stats = [
    { value: "25,000+", label: "Verified Users", icon: "UsersIcon" },
    { value: "1,850+", label: "Properties Listed", icon: "BuildingOfficeIcon" },
    { value: "4,200+", label: "Successful Rentals", icon: "HandshakeIcon" },
    { value: "15+", label: "Cities Covered", icon: "MapPinIcon" }
  ];

  const values = [
    {
      title: "Trust & Transparency",
      description: "We believe every rental interaction should be built on verified information and honest communication.",
      icon: "ShieldCheckIcon",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Equal Opportunity",
      description: "Fair housing for all - we're committed to eliminating discrimination in the rental process.",
      icon: "ScaleIcon",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Innovation for Good",
      description: "Using technology to solve real problems and make renting easier for everyone.",
      icon: "LightBulbIcon",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Community First",
      description: "Building strong rental communities where landlords and tenants support each other.",
      icon: "HeartIcon",
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  const team = [
    {
      name: "Arjun Sharma",
      role: "CEO & Co-Founder",
      bio: "Former real estate exec with 12+ years experience. Passionate about making rentals transparent.",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png",
      linkedin: "#"
    },
    {
      name: "Priya Patel",
      role: "CTO & Co-Founder", 
      bio: "Ex-tech leader from Bangalore startups. Building scalable platforms for rental trust.",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png",
      linkedin: "#"
    },
    {
      name: "Rohit Kumar",
      role: "Head of Operations",
      bio: "Operations expert focused on user experience and platform growth across India.",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png",
      linkedin: "#"
    },
    {
      name: "Sneha Verma",
      role: "Head of Trust & Safety",
      bio: "Legal and compliance expert ensuring platform safety and regulatory adherence.",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png",
      linkedin: "#"
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Founded RentTrust",
      description: "Started with a vision to make rental housing transparent and trustworthy in India."
    },
    {
      year: "2024",
      title: "Platform Launch",
      description: "Launched our beta platform in Bangalore with verified landlords and tenants."
    },
    {
      year: "2024",
      title: "Credit Scoring",
      description: "Introduced India's first rental credit scoring system for tenants and landlords."
    },
    {
      year: "2025",
      title: "Multi-City Expansion", 
      description: "Expanded to 15 major cities including Mumbai, Delhi, Chennai, and Pune."
    },
    {
      year: "2026",
      title: "25K+ Users",
      description: "Reached 25,000+ verified users with 4,200+ successful rental connections."
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
              <Icon name="BuildingOfficeIcon" size={20} className="text-primary" />
              <span className="text-sm font-semibold text-primary">About RentTrust</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Making Rental Housing <span className="gradient-text">Safer & Transparent</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              We're on a mission to transform India's rental market by building trust between landlords and tenants through verification, transparency, and community.
            </p>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="glass rounded-2xl p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name={stat.icon} size={24} className="text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Our Story
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    RentTrust was born from personal frustration with India's rental market. Our founders experienced 
                    the challenges firsthand - fake listings, unreliable landlords, problematic tenants, and lack of 
                    transparency in rental transactions.
                  </p>
                  
                  <p>
                    After years in real estate and technology, we realized the solution wasn't just about listing 
                    properties - it was about building trust. We created RentTrust to be India's first rental 
                    platform where trust is earned, verified, and rewarded.
                  </p>
                  
                  <p>
                    Today, we're proud to have connected thousands of verified landlords with reliable tenants, 
                    making the rental process safer, faster, and more transparent for everyone.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/how-it-works"
                    className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>How It Works</span>
                    <Icon name="ArrowRightIcon" size={20} />
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Join Us Today</span>
                    <Icon name="UserPlusIcon" size={20} />
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <AppImage
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43"
                    alt="Modern office space with team collaboration"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">2023</p>
                    <p className="text-sm text-muted-foreground">Founded</p>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 glass rounded-2xl p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">15+</p>
                    <p className="text-sm text-muted-foreground">Cities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 px-4 bg-gradient-to-br from-muted/30 to-background">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at RentTrust.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="glass rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <Icon name={value.icon} size={28} className={value.color} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate people building the future of rental housing in India.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="glass rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="relative mb-6">
                    <AppImage
                      src={member.image}
                      alt={`${member.name} profile photo`}
                      className="w-24 h-24 rounded-full object-cover mx-auto"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="CheckIcon" size={16} className="text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  
                  <Link
                    href={member.linkedin}
                    className="inline-flex items-center justify-center w-10 h-10 bg-accent/10 text-accent rounded-lg hover:bg-accent hover:text-white transition-colors"
                  >
                    <Icon name="UserIcon" size={20} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground">
                Key milestones in building India's most trusted rental platform.
              </p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{milestone.year}</span>
                    </div>
                  </div>
                  
                  <div className="glass rounded-2xl p-6 flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Ready to Join the RentTrust Community?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Be part of India's most trusted rental platform. Whether you're a landlord or tenant, 
              we're here to make your rental journey safer and more transparent.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/property-listings"
                className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Icon name="HomeIcon" size={20} />
                <span>Browse Properties</span>
              </Link>
              <Link
                href="/auth/signup"
                className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Icon name="UserPlusIcon" size={20} />
                <span>Join RentTrust</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}