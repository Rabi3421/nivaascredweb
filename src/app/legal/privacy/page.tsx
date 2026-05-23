import { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - RentTrust",
  description: "RentTrust's Privacy Policy. Learn how we collect, use, and protect your personal information on our rental platform.",
  keywords: ["privacy policy", "data protection", "personal information", "privacy rights", "data security"],
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
              <Icon name="ShieldCheckIcon" size={20} className="text-primary" />
              <span className="text-sm font-semibold text-primary">Your Privacy Matters</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: February 15, 2026
            </p>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <Icon name="InformationCircleIcon" size={24} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-lg font-bold text-foreground mb-2">Our Commitment to Privacy</h3>
                  <p className="text-muted-foreground text-sm">
                    At RentTrust, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Quick Summary */}
            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Privacy at a Glance</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">We don't sell your data</h4>
                      <p className="text-sm text-muted-foreground">Your personal information is never sold to third parties</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Secure by design</h4>
                      <p className="text-sm text-muted-foreground">Industry-standard encryption and security measures</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">You control your data</h4>
                      <p className="text-sm text-muted-foreground">Access, update, or delete your information anytime</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Transparent practices</h4>
                      <p className="text-sm text-muted-foreground">Clear information about how we use your data</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">GDPR compliant</h4>
                      <p className="text-sm text-muted-foreground">Following international privacy standards</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Regular updates</h4>
                      <p className="text-sm text-muted-foreground">We notify you of any policy changes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">1. Information We Collect</h2>
                <div className="space-y-4 text-muted-foreground">
                  <h4 className="text-lg font-semibold text-foreground">Personal Information</h4>
                  <p>
                    When you create an account or use our services, we collect information you provide directly to us:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Name, email address, and phone number</li>
                    <li>• Profile information and photos</li>
                    <li>• Employment and income details (for verification)</li>
                    <li>• Government-issued ID (for identity verification)</li>
                    <li>• Bank account details (for payment processing)</li>
                    <li>• Property information (for landlords)</li>
                  </ul>

                  <h4 className="text-lg font-semibold text-foreground">Automatically Collected Information</h4>
                  <p>
                    We automatically collect certain information when you use our platform:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Device information (IP address, browser type, operating system)</li>
                    <li>• Usage data (pages visited, time spent, clicks)</li>
                    <li>• Location information (with your consent)</li>
                    <li>• Cookies and tracking technologies</li>
                  </ul>

                  <h4 className="text-lg font-semibold text-foreground">Information from Third Parties</h4>
                  <p>
                    We may receive information from third parties to enhance our services:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Identity verification services</li>
                    <li>• Credit reporting agencies</li>
                    <li>• Social media platforms (if you choose to connect)</li>
                    <li>• Employment verification services</li>
                  </ul>
                </div>
              </div>

              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">2. How We Use Your Information</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We use the information we collect to provide, maintain, and improve our services:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-foreground">Service Provision</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                          Create and manage your account
                        </li>
                        <li className="flex items-start">
                          <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                          Verify your identity and credentials
                        </li>
                        <li className="flex items-start">
                          <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                          Process payments and transactions
                        </li>
                        <li className="flex items-start">
                          <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                          Calculate credit scores and ratings
                        </li>
                        <li className="flex items-start">
                          <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                          Facilitate communication between users
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-foreground">Service Improvement</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                          Analyze usage patterns and trends
                        </li>
                        <li className="flex items-start">
                          <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                          Develop new features and services
                        </li>
                        <li className="flex items-start">
                          <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                          Prevent fraud and abuse
                        </li>
                        <li className="flex items-start">
                          <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                          Provide customer support
                        </li>
                        <li className="flex items-start">
                          <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-1 flex-shrink-0" />
                          Send important updates and notifications
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">3. Information Sharing</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="bg-success/10 border border-success/20 rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="ShieldCheckIcon" size={20} className="text-success" />
                      <h4 className="font-semibold text-foreground">We never sell your personal information</h4>
                    </div>
                  </div>

                  <p>
                    We only share your information in the following limited circumstances:
                  </p>

                  <h4 className="text-lg font-semibold text-foreground">With Other Users (Limited)</h4>
                  <p>
                    To facilitate connections between landlords and tenants, we share:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Public profile information (name, photo, basic details)</li>
                    <li>• Verification status and credit score tier</li>
                    <li>• Reviews and ratings (with reviewer's consent)</li>
                    <li>• Property information (for landlords)</li>
                  </ul>

                  <h4 className="text-lg font-semibold text-foreground">With Service Providers</h4>
                  <p>
                    We work with trusted third parties to provide our services:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Payment processors (for secure transactions)</li>
                    <li>• Identity verification services</li>
                    <li>• Cloud hosting and data storage providers</li>
                    <li>• Analytics and marketing platforms</li>
                    <li>• Customer support tools</li>
                  </ul>

                  <h4 className="text-lg font-semibold text-foreground">Legal Requirements</h4>
                  <p>
                    We may disclose information when required by law or to:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Comply with legal processes or government requests</li>
                    <li>• Protect our rights, property, or safety</li>
                    <li>• Prevent fraud or investigate violations of our terms</li>
                    <li>• Protect the safety of our users or the public</li>
                  </ul>
                </div>
              </div>

              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">4. Data Security</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We implement robust security measures to protect your information:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-foreground">Technical Safeguards</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Icon name="LockClosedIcon" size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                          256-bit SSL encryption for data transmission
                        </li>
                        <li className="flex items-start">
                          <Icon name="LockClosedIcon" size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                          Encrypted data storage and databases
                        </li>
                        <li className="flex items-start">
                          <Icon name="LockClosedIcon" size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                          Two-factor authentication options
                        </li>
                        <li className="flex items-start">
                          <Icon name="LockClosedIcon" size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                          Regular security audits and testing
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-foreground">Operational Safeguards</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Icon name="UserGroupIcon" size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                          Limited access on a need-to-know basis
                        </li>
                        <li className="flex items-start">
                          <Icon name="UserGroupIcon" size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                          Employee background checks and training
                        </li>
                        <li className="flex items-start">
                          <Icon name="UserGroupIcon" size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                          Incident response and monitoring systems
                        </li>
                        <li className="flex items-start">
                          <Icon name="UserGroupIcon" size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                          Regular backup and recovery procedures
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="ExclamationTriangleIcon" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Security Notice</h4>
                        <p className="text-sm">
                          While we implement strong security measures, no system is 100% secure. 
                          We encourage you to use strong passwords and enable two-factor authentication.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">5. Your Privacy Rights</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    You have several rights regarding your personal information:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-xl">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <Icon name="EyeIcon" size={18} className="mr-2" />
                          Right to Access
                        </h4>
                        <p className="text-sm">View and download your personal data we have on file</p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-xl">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <Icon name="PencilIcon" size={18} className="mr-2" />
                          Right to Rectification
                        </h4>
                        <p className="text-sm">Correct or update inaccurate information</p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-xl">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <Icon name="TrashIcon" size={18} className="mr-2" />
                          Right to Erasure
                        </h4>
                        <p className="text-sm">Request deletion of your personal data</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-xl">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <Icon name="PauseIcon" size={18} className="mr-2" />
                          Right to Restrict Processing
                        </h4>
                        <p className="text-sm">Limit how we use your information</p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-xl">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <Icon name="ArrowRightIcon" size={18} className="mr-2" />
                          Right to Data Portability
                        </h4>
                        <p className="text-sm">Export your data to another service</p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-xl">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <Icon name="XMarkIcon" size={18} className="mr-2" />
                          Right to Object
                        </h4>
                        <p className="text-sm">Opt-out of certain types of processing</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Cog6ToothIcon" size={20} className="text-primary" />
                      <span className="font-semibold text-foreground">
                        Manage your privacy settings in your account dashboard or contact our support team.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">6. Cookies and Tracking</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We use cookies and similar technologies to enhance your experience:
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/30 rounded-xl text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="Cog6ToothIcon" size={24} className="text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Essential Cookies</h4>
                      <p className="text-sm">Required for basic platform functionality</p>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-xl text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="ChartBarIcon" size={24} className="text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Analytics Cookies</h4>
                      <p className="text-sm">Help us understand how you use our platform</p>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-xl text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="MegaphoneIcon" size={24} className="text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Marketing Cookies</h4>
                      <p className="text-sm">Personalize ads and content (with consent)</p>
                    </div>
                  </div>

                  <p>
                    You can control cookies through your browser settings. Note that disabling certain cookies 
                    may affect your ability to use some features of our platform.
                  </p>

                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="ComputerDesktopIcon" size={20} className="text-primary" />
                      <Link href="/legal/privacy" className="text-primary font-semibold hover:underline">
                        Read our detailed Cookie Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">7. Contact Us</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    If you have questions about this Privacy Policy or our privacy practices:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Icon name="EnvelopeIcon" size={20} className="text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Privacy Team</p>
                        <p>privacy@renttrust.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPinIcon" size={20} className="text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Postal Address</p>
                        <p>RentTrust Privacy Office<br />123 Tech Park, Bangalore 560001</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Links */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Link href="/legal/terms" className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <Icon name="DocumentTextIcon" size={24} className="text-primary mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-2">Terms & Conditions</h3>
                <p className="text-muted-foreground text-sm">Our complete terms of service</p>
              </Link>
              
              <Link href="/legal/privacy" className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <Icon name="CircleStackIcon" size={24} className="text-primary mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-2">Data Usage Policy</h3>
                <p className="text-muted-foreground text-sm">How we use and process your data</p>
              </Link>
              
              <Link href="/support" className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <Icon name="QuestionMarkCircleIcon" size={24} className="text-primary mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-2">Privacy Support</h3>
                <p className="text-muted-foreground text-sm">Get help with privacy questions</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
