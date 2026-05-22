import { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import DashboardPageHeader from "@/components/common/DashboardPageHeader";
import VerificationStatusWidget from "@/components/common/VerificationStatusWidget";
import UpcomingTasksWidget from "@/components/common/UpcomingTasksWidget";
import StatCard from "@/components/ui/StatCard";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tenant Dashboard - RentTrust",
  description:
    "Manage your rental profile, view properties, track rent payments, and access tenant services on RentTrust.",
  keywords: [
    "tenant dashboard",
    "rental management",
    "rent payments",
    "property search",
    "tenant profile",
  ],
};

// TODO: Replace with authenticated user data from GET /api/users/me
const mockUser = {
  name: "Rahul Kumar",
  email: "rahul.kumar@email.com",
  phone: "+91 98765 43210",
  location: "Koramangala, Bangalore",
  memberSince: "January 2024",
  creditScore: 780,
  creditTier: "Excellent",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png",
  verificationStatus: {
    identity: true,
    income: true,
    employment: false,
    references: true,
  },
};

// TODO: Replace with data from GET /api/tenants/me/rental
const mockCurrentRental = {
  property: "2BHK Apartment in Koramangala",
  landlord: "Priya Sharma",
  address: "123 HSR Layout, Koramangala 5th Block",
  monthlyRent: 28000,
  nextPaymentDue: "March 5, 2026",
  leaseEnd: "December 15, 2026",
  image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
};

// TODO: Replace with data from GET /api/tenants/me/saved-properties
const mockSavedProperties = [
  {
    id: 1,
    title: "3BHK in Indiranagar",
    location: "Indiranagar, Bangalore",
    rent: 45000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    landlordRating: 4.8,
    savedDate: "2 days ago",
  },
  {
    id: 2,
    title: "2BHK Near Metro",
    location: "Jayanagar, Bangalore",
    rent: 32000,
    image: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393",
    landlordRating: 4.6,
    savedDate: "1 week ago",
  },
];

// TODO: Replace with data from GET /api/tenants/me/payments?limit=3
const mockRecentPayments = [
  { date: "February 5, 2026", amount: 28000, status: "Paid", method: "UPI", id: "TXN001" },
  { date: "January 5, 2026", amount: 28000, status: "Paid", method: "Bank Transfer", id: "TXN002" },
  { date: "December 5, 2025", amount: 28000, status: "Paid", method: "UPI", id: "TXN003" },
];

// TODO: Replace with data from GET /api/tenants/me/tasks
const mockTasks = [
  { task: "Rent payment due", dueDate: "March 5", priority: "high" as const, icon: "CreditCardIcon" },
  { task: "Property inspection", dueDate: "March 10", priority: "medium" as const, icon: "MagnifyingGlassIcon" },
  { task: "Lease renewal discussion", dueDate: "March 15", priority: "medium" as const, icon: "DocumentTextIcon" },
  { task: "Submit electricity bill", dueDate: "March 20", priority: "low" as const, icon: "BoltIcon" },
];

// TODO: Replace with data from GET /api/tenants/me/activity?limit=4
const mockRecentActivity = [
  { action: "Viewed 3BHK in Indiranagar", timestamp: "2 hours ago", icon: "EyeIcon" },
  { action: "Saved property to favorites", timestamp: "1 day ago", icon: "BookmarkIcon" },
  { action: "Rent payment completed", timestamp: "5 days ago", icon: "CheckCircleIcon" },
  { action: "Applied to 2BHK property", timestamp: "1 week ago", icon: "PaperAirplaneIcon" },
];

const quickStats = [
  { label: "Credit Score", value: mockUser.creditScore, icon: "TrophyIcon", color: "text-success", bgColor: "bg-success/10" },
  { label: "Properties Saved", value: 8, icon: "BookmarkIcon", color: "text-warning", bgColor: "bg-warning/10" },
  { label: "Applications Sent", value: 3, icon: "DocumentTextIcon", color: "text-accent", bgColor: "bg-accent/10" },
  { label: "Reviews Given", value: 5, icon: "StarIcon", color: "text-primary", bgColor: "bg-primary/10" },
];

export default function TenantDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <DashboardPageHeader
          name={mockUser.name}
          subtitle={`Member since ${mockUser.memberSince} • ${mockUser.location}`}
          avatar={mockUser.avatar}
          actions={[
            { label: "Find Home", href: "/tenant/find-home", icon: "MagnifyingGlassIcon", variant: "primary" },
            { label: "Edit Profile", href: "/tenant/profile", icon: "UserIcon", variant: "outline" },
          ]}
        />

        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {quickStats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>

              {/* Current Rental */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Current Rental</h2>
                  {/* TODO: Link to GET /api/tenants/me/rental */}
                  <Link href="/tenant/my-rentals" className="text-primary hover:underline text-sm">
                    View Details
                  </Link>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <AppImage
                      src={mockCurrentRental.image}
                      alt={mockCurrentRental.property}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {mockCurrentRental.property}
                    </h3>
                    <p className="text-muted-foreground mb-4">{mockCurrentRental.address}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly Rent</span>
                          <span className="font-semibold text-foreground">
                            ₹{mockCurrentRental.monthlyRent.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Landlord</span>
                          <span className="font-semibold text-foreground">
                            {mockCurrentRental.landlord}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Next Payment</span>
                          <span className="font-semibold text-warning">
                            {mockCurrentRental.nextPaymentDue}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lease Ends</span>
                          <span className="font-semibold text-foreground">
                            {mockCurrentRental.leaseEnd}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {/* TODO: POST /api/payments/initiate */}
                      <Link
                        href="/tenant/payments"
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                      >
                        Pay Rent
                      </Link>
                      {/* TODO: POST /api/messages/new */}
                      <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                        Contact Landlord
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Saved Properties */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Saved Properties</h2>
                  <Link
                    href="/tenant/find-home?tab=saved"
                    className="text-primary hover:underline text-sm"
                  >
                    View All ({mockSavedProperties.length + 6})
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {mockSavedProperties.map((property) => (
                    <div
                      key={property.id}
                      className="border border-border rounded-xl p-4 hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                        <AppImage
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        {/* TODO: DELETE /api/tenants/me/saved-properties/:id */}
                        <button
                          aria-label="Remove from saved"
                          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Icon name="BookmarkIcon" size={16} className="text-warning" variant="solid" />
                        </button>
                      </div>

                      <h3 className="font-bold text-foreground mb-1">{property.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{property.location}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-foreground">
                          ₹{property.rent.toLocaleString()}/mo
                        </span>
                        <div className="flex items-center space-x-1">
                          <Icon name="StarIcon" size={14} className="text-warning" variant="solid" />
                          <span className="text-sm font-medium">{property.landlordRating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Saved {property.savedDate}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Payments */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Recent Payments</h2>
                  {/* TODO: Link to GET /api/tenants/me/payments */}
                  <Link href="/tenant/payments" className="text-primary hover:underline text-sm">
                    View All
                  </Link>
                </div>

                <div className="space-y-4">
                  {mockRecentPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 border border-border rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="CheckCircleIcon" size={20} className="text-success" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Rent Payment</p>
                          <p className="text-sm text-muted-foreground">
                            {payment.date} • {payment.method}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">
                          ₹{payment.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-success">{payment.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Credit Score Widget */}
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {mockUser.creditTier.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Credit Score</h3>
                <p className="text-3xl font-bold text-foreground mb-1">{mockUser.creditScore}</p>
                <p className="text-sm text-success mb-4">{mockUser.creditTier} Rating</p>
                {/* TODO: Link to GET /api/credit-reports/me */}
                <Link
                  href="/credit-score"
                  className="w-full px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-colors block text-center"
                >
                  View Credit Report
                </Link>
              </div>

              <VerificationStatusWidget
                verificationStatus={mockUser.verificationStatus}
                actionHref="/tenant/profile?tab=verification"
                actionLabel="Complete Verification"
              />

              <UpcomingTasksWidget tasks={mockTasks} />

              {/* Recent Activity */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {mockRecentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={activity.icon} size={14} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
