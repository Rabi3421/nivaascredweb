import { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions - RentTrust",
  description: "Read RentTrust's Terms & Conditions. Understand our policies, user responsibilities, and service terms for both landlords and tenants.",
  keywords: ["terms and conditions", "user agreement", "rental platform terms", "legal policy", "service terms"],
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
              <Icon name="DocumentTextIcon" size={20} className="text-primary" />
              <span className="text-sm font-semibold text-primary">Legal Document</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Terms & Conditions
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: February 15, 2026
            </p>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <Icon name="InformationCircleIcon" size={24} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-lg font-bold text-foreground mb-2">Important Notice</h3>
                  <p className="text-muted-foreground text-sm">
                    By using RentTrust, you agree to these Terms & Conditions. Please read them carefully before using our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <div className="glass rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">1. Acceptance of Terms</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Welcome to RentTrust. These Terms and Conditions ("Terms") govern your use of the RentTrust platform, 
                    including our website, mobile applications, and related services (collectively, the "Service"). 
                    By accessing or using our Service, you agree to be bound by these Terms.
                  </p>
                  <p>
                    If you disagree with any part of these Terms, then you may not access the Service. 
                    These Terms apply to all visitors, users, and others who access or use the Service.
                  </p>
                </div>
              </div>

              <div className="glass rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">2. Description of Service</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    RentTrust is an online platform that connects landlords and tenants for residential rental properties. 
                    Our Service includes:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                      Property listing and search functionality
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                      User profile verification and credit scoring
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                      Review and rating system
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                      Communication tools between users
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                      Dispute resolution services
                    </li>
                  </ul>
                  <p>
                    RentTrust acts as an intermediary platform and does not own, manage, or control any properties listed on the Service.
                  </p>
                </div>
              </div>

              <div className="glass rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">3. User Accounts and Registration</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    To access certain features of the Service, you must create an account. You agree to provide accurate, 
                    current, and complete information during registration and to update this information as necessary.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-foreground">Account Security</h4>
                  <p>
                    You are responsible for safeguarding your account credentials and for all activities that occur under your account. 
                    You must notify us immediately of any unauthorized use of your account.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-foreground">Identity Verification</h4>
                  <p>
                    We may require identity verification for certain features. You agree to provide valid identification 
                    documents and authorize us to verify your identity through third-party services.
                  </p>
                </div>
              </div>

              <div className="glass rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">4. User Responsibilities</h2>
                <div className="space-y-4 text-muted-foreground">
                  <h4 className="text-lg font-semibold text-foreground">For All Users</h4>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start">
                      <Icon name="XCircleIcon" size={16} className="text-destructive mr-2 mt-1 flex-shrink-0" />
                      Do not provide false or misleading information
                    </li>
                    <li className="flex items-start">
                      <Icon name="XCircleIcon" size={16} className="text-destructive mr-2 mt-1 flex-shrink-0" />
                      Do not use the Service for illegal activities
                    </li>
                    <li className="flex items-start">
                      <Icon name="XCircleIcon" size={16} className="text-destructive mr-2 mt-1 flex-shrink-0" />
                      Do not harass, threaten, or discriminate against other users
                    </li>
                    <li className="flex items-start">
                      <Icon name="XCircleIcon" size={16} className="text-destructive mr-2 mt-1 flex-shrink-0" />
                      Do not attempt to circumvent our verification systems
                    </li>
                  </ul>

                  <h4 className="text-lg font-semibold text-foreground">For Landlords</h4>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                      Provide accurate property descriptions and photos
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                      Comply with fair housing laws and regulations
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                      Respond to tenant inquiries in a timely manner
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                      Honor rental agreements and local rental laws
                    </li>
                  </ul>

                  <h4 className="text-lg font-semibold text-foreground">For Tenants</h4>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                      Provide accurate financial and employment information
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                      Comply with lease terms and property rules
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                      Make rent payments as agreed
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                      Maintain the property in good condition
                    </li>
                  </ul>
                </div>
              </div>

              <div className="glass rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">5. Privacy and Data Protection</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information. 
                    By using the Service, you consent to our collection and use of information as described in the Privacy Policy.
                  </p>
                  <p>
                    We implement appropriate security measures to protect your personal information, but cannot guarantee 
                    absolute security of data transmitted over the internet.
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="ShieldCheckIcon" size={20} className="text-primary" />
                      <Link href="/legal/privacy" className="text-primary font-semibold hover:underline">
                        Read our Privacy Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">6. Payment Terms</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    RentTrust may charge fees for certain premium features. All fees are clearly disclosed before you incur them.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-foreground">Free Services</h4>
                  <p>
                    Basic account creation, property browsing, and profile creation are free for all users.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-foreground">Premium Services</h4>
                  <p>
                    Premium features may include enhanced verification, priority listing placement, and advanced analytics. 
                    Premium fees are non-refundable except as required by law.
                  </p>
                </div>
              </div>

              <div className="glass rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">7. Limitation of Liability</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    RentTrust provides the Service "as is" without warranties of any kind. We do not guarantee:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• The accuracy of property listings or user information</li>
                    <li>• The reliability or trustworthiness of users</li>
                    <li>• The successful completion of rental transactions</li>
                    <li>• Uninterrupted or error-free operation of the Service</li>
                  </ul>
                  
                  <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="ExclamationTriangleIcon" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Important Disclaimer</h4>
                        <p className="text-sm">
                          RentTrust is not responsible for disputes between landlords and tenants, property damage, 
                          or any losses incurred through use of the Service.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">8. Dispute Resolution</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We provide mediation services to help resolve disputes between users. Our dispute resolution process includes:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="ChatBubbleLeftRightIcon" size={24} className="text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Step 1: Communication</h4>
                      <p className="text-sm">Attempt direct resolution between parties</p>
                    </div>
                    
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="UserGroupIcon" size={24} className="text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Step 2: Mediation</h4>
                      <p className="text-sm">RentTrust facilitates mediation process</p>
                    </div>
                    
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="ScaleIcon" size={24} className="text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Step 3: Decision</h4>
                      <p className="text-sm">Binding decision for platform-related disputes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">9. Termination</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    You may terminate your account at any time by contacting our support team. 
                    We may terminate or suspend your account if you violate these Terms.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-foreground">Effect of Termination</h4>
                  <p>
                    Upon termination, your right to use the Service ceases immediately. 
                    We may retain certain information as required by law or for legitimate business purposes.
                  </p>
                </div>
              </div>

              <div className="glass rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">10. Changes to Terms</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We reserve the right to modify these Terms at any time. We will notify users of significant changes 
                    via email or platform notification. Continued use of the Service after changes constitutes acceptance.
                  </p>
                </div>
              </div>

              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">11. Contact Information</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    If you have questions about these Terms, please contact us:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Icon name="EnvelopeIcon" size={20} className="text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <p>legal@renttrust.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Icon name="PhoneIcon" size={20} className="text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Phone</p>
                        <p>1800-RENTTRUST</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Links */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Link href="/legal/privacy" className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <Icon name="ShieldCheckIcon" size={24} className="text-primary mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-2">Privacy Policy</h3>
                <p className="text-muted-foreground text-sm">Learn how we protect your personal information</p>
              </Link>
              
              <Link href="/legal/privacy" className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <Icon name="DocumentTextIcon" size={24} className="text-primary mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-2">Data Usage Policy</h3>
                <p className="text-muted-foreground text-sm">Understand how we use and share your data</p>
              </Link>
              
              <Link href="/legal/privacy" className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <Icon name="ComputerDesktopIcon" size={24} className="text-primary mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-2">Cookie Policy</h3>
                <p className="text-muted-foreground text-sm">Information about cookies and tracking</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
