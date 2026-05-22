import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import Link from "next/link";

export default function HelpCenterPage() {
  const helpCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of using RentTrust",
      icon: "RocketLaunchIcon",
      articles: [
        "Creating your account",
        "Completing profile verification",
        "Understanding our platform",
        "Setting up notifications",
        "Mobile app guide"
      ],
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "For Tenants",
      description: "Everything tenants need to know",
      icon: "UserIcon",
      articles: [
        "How to search for properties",
        "Applying for properties",
        "Understanding credit scores",
        "Communicating with landlords",
        "Payment and booking process"
      ],
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "For Landlords",
      description: "Guide for property owners",
      icon: "BuildingOffice2Icon",
      articles: [
        "Listing your property",
        "Property verification process",
        "Screening potential tenants",
        "Managing applications",
        "Setting rental terms"
      ],
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Trust & Safety",
      description: "Stay safe on our platform",
      icon: "ShieldCheckIcon",
      articles: [
        "Verification requirements",
        "Reporting suspicious activity",
        "Scam prevention tips",
        "Privacy and data protection",
        "Community guidelines"
      ],
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Payments & Billing",
      description: "Managing your finances",
      icon: "CreditCardIcon",
      articles: [
        "Payment methods accepted",
        "Understanding fees",
        "Processing refunds",
        "Invoice and receipts",
        "Subscription management"
      ],
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Technical Support",
      description: "Troubleshooting and bugs",
      icon: "ComputerDesktopIcon",
      articles: [
        "Common login issues",
        "App troubleshooting",
        "Browser compatibility",
        "Feature requests",
        "Reporting bugs"
      ],
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    }
  ];

  const popularArticles = [
    {
      title: "How to create a compelling tenant profile",
      category: "For Tenants",
      readTime: "5 min",
      views: "12.5K",
      rating: 4.8
    },
    {
      title: "Complete property listing guide",
      category: "For Landlords",
      readTime: "8 min",
      views: "8.2K",
      rating: 4.9
    },
    {
      title: "Understanding RentTrust Credit Scores",
      category: "Trust & Safety",
      readTime: "6 min",
      views: "15.1K",
      rating: 4.7
    },
    {
      title: "Payment security and protection",
      category: "Payments & Billing",
      readTime: "4 min",
      views: "9.8K",
      rating: 4.6
    },
    {
      title: "Troubleshooting mobile app issues",
      category: "Technical Support",
      readTime: "7 min",
      views: "6.4K",
      rating: 4.5
    },
    {
      title: "Setting up profile verification",
      category: "Getting Started",
      readTime: "3 min",
      views: "11.2K",
      rating: 4.9
    }
  ];

  const quickLinks = [
    {
      title: "Account Settings",
      description: "Manage your profile and preferences",
      href: "/user-profiles",
      icon: "Cog6ToothIcon"
    },
    {
      title: "Contact Support",
      description: "Get help from our support team",
      href: "/support",
      icon: "ChatBubbleLeftRightIcon"
    },
    {
      title: "Report an Issue",
      description: "Report bugs or safety concerns",
      href: "/support",
      icon: "ExclamationTriangleIcon"
    },
    {
      title: "Feature Requests",
      description: "Suggest new features or improvements",
      href: "/support",
      icon: "LightBulbIcon"
    }
  ];

  const videoTutorials = [
    {
      title: "Getting Started with RentTrust",
      duration: "3:45",
      thumbnail: "/api/placeholder/300/200",
      category: "New Users"
    },
    {
      title: "How to List Your Property",
      duration: "5:12",
      thumbnail: "/api/placeholder/300/200",
      category: "Landlords"
    },
    {
      title: "Finding Your Perfect Home",
      duration: "4:28",
      thumbnail: "/api/placeholder/300/200",
      category: "Tenants"
    },
    {
      title: "Understanding Credit Scores",
      duration: "6:15",
      thumbnail: "/api/placeholder/300/200",
      category: "Trust & Safety"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
              <Icon name="BookOpenIcon" size={20} className="text-primary" />
              <span className="text-sm font-semibold text-primary">Help Center</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              How can we help you today?
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to your questions, learn how to use RentTrust, and get the most out of our platform.
            </p>

            {/* Search Bar */}
            <div className="glass rounded-2xl p-4 max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-3 top-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search help articles, guides, and tutorials..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                />
                <button className="absolute right-2 top-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-secondary transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {["Property listing", "Credit score", "Verification", "Payment issues", "Account settings"].map((search, index) => (
                <button
                  key={index}
                  className="px-3 py-1 text-sm bg-muted rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Browse by Category
              </h2>
              <p className="text-lg text-muted-foreground">
                Find helpful articles organized by topic.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map((category, index) => (
                <div key={index} className="glass rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
                  <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name={category.icon} size={24} className={category.color} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                  
                  <div className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <Link
                        key={articleIndex}
                        href="#"
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        • {article}
                      </Link>
                    ))}
                  </div>
                  
                  <Link
                    href="#"
                    className="inline-flex items-center space-x-2 text-primary font-semibold mt-4 hover:text-secondary transition-colors"
                  >
                    <span>View all articles</span>
                    <Icon name="ArrowRightIcon" size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-20 px-4 bg-gradient-to-br from-muted/30 to-background">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Most Popular Articles
              </h2>
              <p className="text-lg text-muted-foreground">
                The articles our users find most helpful.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArticles.map((article, index) => (
                <div key={index} className="glass rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Icon name="StarIcon" size={16} className="text-warning fill-current" />
                      <span className="text-sm font-semibold text-foreground">{article.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="ClockIcon" size={16} />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="EyeIcon" size={16} />
                        <span>{article.views} views</span>
                      </div>
                    </div>
                    <Icon name="ArrowRightIcon" size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Video Tutorials
              </h2>
              <p className="text-lg text-muted-foreground">
                Watch step-by-step guides to get the most out of RentTrust.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoTutorials.map((video, index) => (
                <div key={index} className="glass rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative">
                    <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon name="PlayIcon" size={24} className="text-primary ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded mb-2 inline-block">
                      {video.category}
                    </span>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Quick Actions
              </h2>
              <p className="text-lg text-muted-foreground">
                Common tasks and helpful shortcuts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <div className="glass rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 group">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon name={link.icon} size={28} className="text-primary" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{link.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="glass rounded-2xl p-12">
              <Icon name="QuestionMarkCircleIcon" size={48} className="text-primary mx-auto mb-6" />
              
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Still need help?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Can't find what you're looking for? Our support team is here to help you with any questions or issues.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/support"
                  className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Icon name="ChatBubbleLeftRightIcon" size={20} />
                  <span>Contact Support</span>
                </Link>
                <button className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
                  <Icon name="PhoneIcon" size={20} />
                  <span>Schedule a Call</span>
                </button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Response Times:</strong> Live chat (instant) • Email (within 2 hours) • Phone (within 1 hour)
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}