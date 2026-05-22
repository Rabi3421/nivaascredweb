import { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Credit Score Explanation - RentTrust",
  description: "Understand how RentTrust calculates your rental credit score. Learn about factors that affect your score and how to improve it.",
  keywords: ["rental credit score", "credit calculation", "tenant rating", "rental history", "credit improvement"],
};

export default function CreditScoreExplanationPage() {
  const scoreRanges = [
    {
      range: "800 - 850",
      grade: "A+",
      label: "Exceptional",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Outstanding rental history with perfect payment record and excellent landlord reviews."
    },
    {
      range: "740 - 799",
      grade: "A",
      label: "Excellent",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      description: "Very reliable tenant with consistent on-time payments and positive reviews."
    },
    {
      range: "670 - 739",
      grade: "B+",
      label: "Good",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "Good rental history with mostly on-time payments and satisfactory reviews."
    },
    {
      range: "580 - 669",
      grade: "B",
      label: "Fair",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      description: "Average rental history with occasional late payments but no major issues."
    },
    {
      range: "300 - 579",
      grade: "C",
      label: "Poor",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      description: "Limited or problematic rental history with frequent late payments or disputes."
    }
  ];

  const factors = [
    {
      factor: "Payment History",
      weight: "35%",
      description: "Your track record of rent payments - on time, late, or missed payments",
      icon: "CreditCardIcon",
      tips: ["Set up automatic rent payments", "Pay rent a few days before due date", "Communicate early if you'll be late"]
    },
    {
      factor: "Rental Duration",
      weight: "25%",
      description: "Length of previous tenancies and stability in rental relationships",
      icon: "ClockIcon",
      tips: ["Stay in properties for longer durations", "Avoid frequent moves", "Give proper notice when leaving"]
    },
    {
      factor: "Landlord Reviews",
      weight: "20%",
      description: "Feedback and ratings from previous and current landlords",
      icon: "StarIcon",
      tips: ["Maintain good relationships with landlords", "Be responsive to communication", "Keep properties well-maintained"]
    },
    {
      factor: "Income Stability",
      weight: "10%",
      description: "Consistency of employment and income verification",
      icon: "BanknotesIcon",
      tips: ["Maintain steady employment", "Keep income documents updated", "Build emergency savings"]
    },
    {
      factor: "Property Care",
      weight: "10%",
      description: "How well you maintain rental properties and handle deposits",
      icon: "HomeIcon",
      tips: ["Report maintenance issues promptly", "Keep properties clean", "Follow lease terms carefully"]
    }
  ];

  const benefits = [
    {
      scoreRange: "800+",
      benefits: [
        "Access to premium properties",
        "Reduced security deposits",
        "Faster application approvals",
        "Priority in competitive listings",
        "Better rental terms negotiation"
      ]
    },
    {
      scoreRange: "740-799",
      benefits: [
        "Wide selection of properties",
        "Standard security deposits",
        "Quick application processing",
        "Good negotiation leverage",
        "Landlord preference"
      ]
    },
    {
      scoreRange: "670-739",
      benefits: [
        "Most properties available",
        "Standard application process",
        "Reasonable rental terms",
        "Some negotiation options"
      ]
    }
  ];

  const improvementTips = [
    {
      title: "Pay Rent On Time",
      description: "Set up automatic payments or reminders to ensure you never miss a rent payment.",
      impact: "High Impact",
      timeframe: "Immediate"
    },
    {
      title: "Build Rental History",
      description: "Stay in properties for longer periods to demonstrate stability and reliability.",
      impact: "High Impact",
      timeframe: "6+ months"
    },
    {
      title: "Get Positive Reviews",
      description: "Maintain good relationships with landlords to earn positive reviews and ratings.",
      impact: "Medium Impact",
      timeframe: "3-6 months"
    },
    {
      title: "Verify Income",
      description: "Keep your employment and income information updated and verified.",
      impact: "Medium Impact",
      timeframe: "Immediate"
    },
    {
      title: "Resolve Disputes",
      description: "Address any rental disputes or issues through proper channels.",
      impact: "High Impact",
      timeframe: "1-3 months"
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
              <Icon name="TrophyIcon" size={20} className="text-primary" />
              <span className="text-sm font-semibold text-primary">RentTrust Credit Score</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Understanding Your <span className="gradient-text">Rental Credit Score</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Your RentTrust Credit Score is a comprehensive rating that helps landlords assess your reliability as a tenant. Learn how it's calculated and how to improve it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Check Your Score</span>
                <Icon name="ChartBarIcon" size={20} />
              </Link>
              <Link
                href="#factors"
                className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Learn More</span>
                <Icon name="ArrowDownIcon" size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Score Ranges */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Credit Score Ranges
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                RentTrust Credit Scores range from 300 to 850. Higher scores indicate better rental history and reliability.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {scoreRanges.map((range, index) => (
                <div key={index} className={`glass rounded-2xl p-6 border-2 ${range.borderColor} hover:shadow-lg transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 ${range.bgColor} rounded-2xl flex items-center justify-center`}>
                      <span className={`text-2xl font-bold ${range.color}`}>{range.grade}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Score Range</p>
                      <p className="text-lg font-bold text-foreground">{range.range}</p>
                    </div>
                  </div>
                  
                  <h3 className={`text-xl font-bold ${range.color} mb-2`}>{range.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{range.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calculation Factors */}
        <section id="factors" className="py-20 px-4 bg-gradient-to-br from-muted/30 to-background">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                How Your Score is Calculated
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your RentTrust Credit Score is calculated using multiple factors. Understanding these can help you improve your score.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Factors */}
              <div className="space-y-6">
                {factors.map((factor, index) => (
                  <div key={index} className="glass rounded-2xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name={factor.icon} size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-foreground">{factor.factor}</h3>
                          <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full">
                            {factor.weight}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-4">{factor.description}</p>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-foreground">Improvement Tips:</p>
                          <ul className="space-y-1">
                            {factor.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-sm text-muted-foreground flex items-center">
                                <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Score Benefits */}
              <div className="space-y-8">
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">Benefits by Score Range</h3>
                  
                  {benefits.map((benefit, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{benefit.scoreRange.charAt(0)}</span>
                        </div>
                        <h4 className="font-bold text-foreground">{benefit.scoreRange} Score</h4>
                      </div>
                      
                      <ul className="space-y-2 ml-10">
                        {benefit.benefits.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-muted-foreground flex items-center">
                            <Icon name="CheckCircleIcon" size={14} className="text-success mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Score Simulator */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Score Impact Simulator</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    See how different actions might affect your credit score:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">Pay rent on time for 12 months</span>
                        <span className="text-success font-bold">+50-80 points</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">Get positive landlord review</span>
                        <span className="text-success font-bold">+20-40 points</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">Late rent payment (1-30 days)</span>
                        <span className="text-destructive font-bold">-15-30 points</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">Unresolved rental dispute</span>
                        <span className="text-destructive font-bold">-40-80 points</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Improvement Guide */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                How to Improve Your Score
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Follow these proven strategies to build and maintain an excellent rental credit score.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {improvementTips.map((tip, index) => (
                <div key={index} className="glass rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground">{tip.title}</h3>
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        tip.impact === 'High Impact' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>
                        {tip.impact}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{tip.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Timeline:</span>
                    <span className="text-xs font-semibold text-foreground">{tip.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Common questions about RentTrust Credit Scores
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "How often is my credit score updated?",
                  a: "Your RentTrust Credit Score is updated monthly or whenever new information is available, such as rent payments or landlord reviews."
                },
                {
                  q: "Can I check my score for free?",
                  a: "Yes! All RentTrust members can view their credit score and detailed report for free in their dashboard."
                },
                {
                  q: "How long does it take to improve my score?",
                  a: "Improvements can be seen within 1-3 months for quick actions like rent payments, while longer-term improvements may take 6-12 months."
                },
                {
                  q: "What if I disagree with my score?",
                  a: "You can dispute any incorrect information through our support team. We investigate all disputes and make corrections when verified."
                },
                {
                  q: "Do landlords see my actual score or just a range?",
                  a: "Landlords see your score tier (Excellent, Good, etc.) and key highlights, not your exact numerical score."
                }
              ].map((faq, index) => (
                <div key={index} className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Ready to Build Your Rental Credit?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Join RentTrust today and start building a strong rental credit profile that opens doors to better properties.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Icon name="TrophyIcon" size={20} />
                <span>Get Started Free</span>
              </Link>
              <Link
                href="/property-listings"
                className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Icon name="HomeIcon" size={20} />
                <span>Browse Properties</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}