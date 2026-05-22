"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import Link from "next/link";

export default function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const supportCategories = [
    {
      title: "Account & Profile",
      description: "Login issues, profile verification, account settings",
      icon: "UserCircleIcon",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Property Listings",
      description: "Add, edit, or remove property listings",
      icon: "BuildingOfficeIcon",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Payments & Billing",
      description: "Payment issues, billing questions, refunds",
      icon: "CreditCardIcon",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Trust & Safety",
      description: "Report suspicious activity, verification issues",
      icon: "ShieldExclamationIcon",
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      title: "Technical Issues",
      description: "App bugs, website problems, feature requests",
      icon: "ComputerDesktopIcon",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "General Inquiry",
      description: "Other questions or feedback",
      icon: "QuestionMarkCircleIcon",
      color: "text-muted-foreground",
      bgColor: "bg-muted"
    }
  ];

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I create an account on RentTrust?",
          a: "Visit our sign-up page, choose whether you're a tenant or landlord, and complete the registration process. You'll need to verify your email and phone number to get started."
        },
        {
          q: "Is RentTrust free to use?",
          a: "Basic features like creating an account, browsing properties, and messaging are free. Premium features may have associated costs, which are clearly displayed."
        },
        {
          q: "How does the verification process work?",
          a: "We verify identities using government-issued IDs, phone numbers, and email addresses. Additional verification for income, employment, or property ownership may be required for certain features."
        }
      ]
    },
    {
      category: "For Tenants",
      questions: [
        {
          q: "How do I search for properties?",
          a: "Use our search filters to narrow down properties by location, rent range, property type, and amenities. You can save properties you like and contact landlords directly."
        },
        {
          q: "What is a RentTrust Credit Score?",
          a: "It's our proprietary rating system that helps landlords assess tenant reliability based on rental history, payment records, and reviews from previous landlords."
        },
        {
          q: "How do I apply for a property?",
          a: "Click 'Apply' on any property listing, complete the application form, and submit required documents. The landlord will review and respond to your application."
        }
      ]
    },
    {
      category: "For Landlords",
      questions: [
        {
          q: "How do I list my property?",
          a: "Create a landlord account, complete property verification, and use our listing tool to add photos, descriptions, and rental terms. Properties are reviewed before going live."
        },
        {
          q: "How do I screen potential tenants?",
          a: "View tenant profiles, credit scores, rental history, and reviews. You can also request additional documents or references before making a decision."
        },
        {
          q: "What happens if there's a dispute with a tenant?",
          a: "We offer mediation services to help resolve disputes fairly. Our support team can facilitate communication and help reach mutually agreeable solutions."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      method: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Mon-Fri, 9 AM - 6 PM IST",
      icon: "ChatBubbleLeftRightIcon",
      action: "Start Chat",
      primary: true
    },
    {
      method: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      icon: "EnvelopeIcon",
      action: "Send Email",
      primary: false
    },
    {
      method: "Phone Support",
      description: "Speak directly with our team",
      availability: "Mon-Fri, 10 AM - 5 PM IST",
      icon: "PhoneIcon",
      action: "Call Now",
      primary: false
    },
    {
      method: "Help Center",
      description: "Browse our knowledge base",
      availability: "Available 24/7",
      icon: "BookOpenIcon",
      action: "Browse Articles",
      primary: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
              <Icon name="LifebuoyIcon" size={20} className="text-primary" />
              <span className="text-sm font-semibold text-primary">We're Here to Help</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Support & Help Center
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Get the help you need with our comprehensive support resources and dedicated team.
            </p>

            {/* Quick Search */}
            <div className="glass rounded-2xl p-4 max-w-2xl mx-auto">
              <div className="relative">
                <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-3 top-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for help articles, FAQs, or guides..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Choose How You'd Like to Get Help
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We offer multiple ways to get support based on your needs and urgency.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className={`glass rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 ${
                    method.primary ? 'ring-2 ring-primary/20' : ''
                  }`}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon name={method.icon} size={28} className="text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2">{method.method}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
                  <p className="text-xs text-muted-foreground mb-6">{method.availability}</p>
                  
                  <button
                    className={`w-full px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      method.primary
                        ? 'bg-primary text-white hover:bg-secondary'
                        : 'border border-primary text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    {method.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Categories */}
        <section className="py-20 px-4 bg-gradient-to-br from-muted/30 to-background">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                What Do You Need Help With?
              </h2>
              <p className="text-lg text-muted-foreground">
                Select a category to get specific help and resources.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportCategories.map((category, index) => (
                <div
                  key={index}
                  className={`glass rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 ${
                    selectedCategory === category.title ? 'ring-2 ring-primary/20' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.title)}
                >
                  <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon name={category.icon} size={24} className={category.color} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2">{category.title}</h3>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                      >
                        <option value="">Select category</option>
                        {supportCategories.map((cat) => (
                          <option key={cat.title} value={cat.title}>{cat.title}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background resize-none"
                      placeholder="Please provide as much detail as possible to help us assist you better..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Icon name="PaperAirplaneIcon" size={20} />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="EnvelopeIcon" size={20} className="text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <p className="text-muted-foreground">support@renttrust.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Icon name="PhoneIcon" size={20} className="text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Phone</p>
                        <p className="text-muted-foreground">1800-RENTTRUST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPinIcon" size={20} className="text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Address</p>
                        <p className="text-muted-foreground">
                          RentTrust India Pvt. Ltd.<br />
                          123 Tech Park, Outer Ring Road<br />
                          Bangalore 560037, Karnataka
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Business Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-semibold text-foreground">9:00 AM - 6:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-semibold text-foreground">10:00 AM - 4:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-semibold text-foreground">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Emergency Contact</h3>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="ExclamationTriangleIcon" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Safety Emergency</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          For urgent safety issues, call our emergency line:
                        </p>
                        <p className="font-bold text-destructive">+91-9876543210</p>
                        <p className="text-xs text-muted-foreground mt-1">Available 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                Find quick answers to common questions.
              </p>
            </div>

            <div className="space-y-8">
              {faqs.map((section, sectionIndex) => (
                <div key={sectionIndex} className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">{section.category}</h3>
                  
                  <div className="space-y-6">
                    {section.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                        <h4 className="text-lg font-semibold text-foreground mb-3">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* More Help */}
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/help-center"
                  className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Icon name="BookOpenIcon" size={20} />
                  <span>Browse Help Center</span>
                </Link>
                <button className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
                  <Icon name="ChatBubbleLeftRightIcon" size={20} />
                  <span>Start Live Chat</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}