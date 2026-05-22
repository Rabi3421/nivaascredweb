import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import Image from "@/components/ui/AppImage";
import Link from "next/link";

export const metadata = {
  title: "Safety & Trust | NivaasCred - Secure Rental Platform",
  description: "Learn about our comprehensive safety measures, trust & verification systems that make NivaasCred the most secure rental platform in India.",
};

export default function SafetyAndTrustPage() {
  const safetyFeatures = [
    {
      title: "Identity Verification",
      description: "Multi-level verification using Aadhaar, PAN, and biometric authentication",
      icon: "IdentificationIcon",
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: [
        "Government ID verification",
        "Biometric authentication", 
        "Address proof validation",
        "Phone number verification"
      ]
    },
    {
      title: "Financial Security",
      description: "Bank-grade encryption and secure payment processing",
      icon: "ShieldCheckIcon",
      color: "text-success",
      bgColor: "bg-success/10",
      features: [
        "256-bit SSL encryption",
        "PCI DSS compliance",
        "Secure payment gateway",
        "Fraud detection system"
      ]
    },
    {
      title: "Property Verification",
      description: "Comprehensive property and ownership verification process",
      icon: "BuildingOffice2Icon",
      color: "text-accent",
      bgColor: "bg-accent/10",
      features: [
        "Property title verification",
        "Legal document check",
        "Physical property inspection",
        "Ownership validation"
      ]
    },
    {
      title: "Background Checks",
      description: "Thorough background verification for all users",
      icon: "DocumentMagnifyingGlassIcon",
      color: "text-warning",
      bgColor: "bg-warning/10",
      features: [
        "Criminal background check",
        "Employment verification",
        "Previous rental history",
        "Reference validation"
      ]
    }
  ];

  const trustMetrics = [
    {
      title: "Verified Users",
      value: "25,000+",
      description: "Users successfully verified",
      icon: "UsersIcon"
    },
    {
      title: "Safe Transactions",
      value: "₹50Cr+",
      description: "Secure payments processed",
      icon: "CurrencyRupeeIcon"
    },
    {
      title: "Zero Fraud",
      value: "99.9%",
      description: "Fraud prevention rate",
      icon: "ShieldExclamationIcon"
    },
    {
      title: "Dispute Resolution",
      value: "24hrs",
      description: "Average resolution time",
      icon: "ClockIcon"
    }
  ];

  const safetySteps = [
    {
      step: "1",
      title: "Profile Creation",
      description: "Create your profile with basic information and upload required documents",
      details: [
        "Personal information verification",
        "Document upload (ID, address proof)",
        "Profile photo verification",
        "Contact details confirmation"
      ]
    },
    {
      step: "2", 
      title: "Document Verification",
      description: "Our team verifies all submitted documents within 24 hours",
      details: [
        "AI-powered document analysis",
        "Manual verification by experts",
        "Cross-reference with government databases",
        "Real-time status updates"
      ]
    },
    {
      step: "3",
      title: "Background Check",
      description: "Comprehensive background verification including credit and criminal history",
      details: [
        "Credit score assessment",
        "Criminal record verification",
        "Employment status check",
        "Previous landlord references"
      ]
    },
    {
      step: "4",
      title: "Trust Score",
      description: "Get your personalized trust score based on verification results",
      details: [
        "Dynamic scoring algorithm",
        "Continuous score updates",
        "Transparent scoring criteria",
        "Score improvement recommendations"
      ]
    }
  ];

  const communityGuidelines = [
    {
      category: "Respectful Communication",
      rules: [
        "Use polite and professional language",
        "Respect privacy and personal boundaries",
        "Respond promptly to messages and inquiries",
        "Be honest in all communications"
      ]
    },
    {
      category: "Property Listings",
      rules: [
        "Provide accurate property information",
        "Use genuine, recent photos",
        "Disclose all relevant property conditions",
        "Update availability status promptly"
      ]
    },
    {
      category: "Financial Transactions",
      rules: [
        "Use only platform-approved payment methods",
        "Never share financial information outside platform",
        "Report suspicious payment requests",
        "Keep transaction records for reference"
      ]
    },
    {
      category: "Meeting & Viewing",
      rules: [
        "Meet in safe, public locations when possible",
        "Bring a trusted friend for property viewings",
        "Verify identity before sharing personal information",
        "Report inappropriate behavior immediately"
      ]
    }
  ];

  const reportingOptions = [
    {
      type: "Suspicious Activity",
      description: "Report any suspicious behavior or fraudulent activities",
      icon: "ExclamationTriangleIcon",
      action: "Report Now",
      urgency: "high"
    },
    {
      type: "Harassment",
      description: "Report harassment, inappropriate messages, or behavior",
      icon: "ShieldExclamationIcon", 
      action: "Report Issue",
      urgency: "high"
    },
    {
      type: "Fake Listing",
      description: "Report properties that seem fake or misrepresented",
      icon: "DocumentTextIcon",
      action: "Flag Listing",
      urgency: "medium"
    },
    {
      type: "Payment Issues",
      description: "Report payment-related problems or suspicious requests",
      icon: "CreditCardIcon",
      action: "File Complaint",
      urgency: "high"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full mb-8">
              <Icon name="ShieldCheckIcon" size={20} className="text-success" />
              <span className="text-sm font-semibold text-success">Trusted & Secure Platform</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Your Safety is Our Priority
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              NivaasCred implements industry-leading security measures and verification processes to ensure a safe, trustworthy rental experience for everyone.
            </p>

            {/* Trust Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {trustMetrics.map((metric, index) => (
                <div key={index} className="glass rounded-2xl p-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon name={metric.icon} size={20} className="text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.description}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Icon name="ShieldCheckIcon" size={20} />
                <span>Get Verified Now</span>
              </Link>
              <Link
                href="/support"
                className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={20} />
                <span>Report an Issue</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Comprehensive Security Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Multiple layers of protection to keep you safe at every step.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {safetyFeatures.map((feature, index) => (
                <div key={index} className="glass rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon name={feature.icon} size={32} className={feature.color} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-3">
                        <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Process */}
        <section className="py-20 px-4 bg-gradient-to-br from-muted/30 to-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                How We Keep You Safe
              </h2>
              <p className="text-lg text-muted-foreground">
                Our step-by-step verification process ensures every user is authentic and trustworthy.
              </p>
            </div>

            <div className="space-y-8">
              {safetySteps.map((step, index) => (
                <div key={index} className="glass rounded-2xl p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
                    <div className="flex-shrink-0 mb-6 lg:mb-0">
                      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{step.step}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground mb-6">{step.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-3">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center space-x-3">
                            <Icon name="ArrowRightIcon" size={16} className="text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Community Guidelines
              </h2>
              <p className="text-lg text-muted-foreground">
                Building a safe and respectful community for all users.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {communityGuidelines.map((guideline, index) => (
                <div key={index} className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">{guideline.category}</h3>
                  <ul className="space-y-3">
                    {guideline.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="flex items-start space-x-3">
                        <Icon name="CheckIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reporting Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-destructive/5 to-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Report Safety Issues
              </h2>
              <p className="text-lg text-muted-foreground">
                Help us maintain a safe community by reporting any concerning behavior or activities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reportingOptions.map((option, index) => (
                <div key={index} className="glass rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                    option.urgency === 'high' ? 'bg-destructive/10' : 'bg-warning/10'
                  }`}>
                    <Icon name={option.icon} size={28} className={
                      option.urgency === 'high' ? 'text-destructive' : 'text-warning'
                    } />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3">{option.type}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{option.description}</p>
                  
                  <button className={`w-full px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    option.urgency === 'high' 
                      ? 'bg-destructive text-white hover:bg-destructive/80'
                      : 'bg-warning text-white hover:bg-warning/80'
                  }`}>
                    {option.action}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="glass rounded-2xl p-6 max-w-2xl mx-auto">
                <Icon name="ExclamationTriangleIcon" size={32} className="text-destructive mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-3">Emergency Situations</h3>
                <p className="text-muted-foreground mb-4">
                  If you're in immediate danger or experiencing an emergency, contact local authorities first.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="tel:100" className="px-6 py-2 bg-destructive text-white rounded-xl font-semibold hover:bg-destructive/80 transition-colors">
                    Call Police: 100
                  </a>
                  <Link href="/support" className="px-6 py-2 border-2 border-destructive text-destructive rounded-xl font-semibold hover:bg-destructive hover:text-white transition-colors">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="glass rounded-2xl p-12">
              <Icon name="ShieldCheckIcon" size={48} className="text-success mx-auto mb-6" />
              
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to Join Our Secure Community?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Experience the safest way to find and rent properties with complete peace of mind.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signup"
                  className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Icon name="UserPlusIcon" size={20} />
                  <span>Sign Up Securely</span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Icon name="InformationCircleIcon" size={20} />
                  <span>Learn More</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}