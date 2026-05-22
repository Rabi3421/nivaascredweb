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
import PropertyPortfolio from "@/components/landlord/PropertyPortfolio";
import ScoreCard from "@/components/score/ScoreCard";

export const metadata: Metadata = {
  title: "Landlord Dashboard - RentTrust",
  description:
    "Manage your properties, view tenant applications, track rent payments, and access landlord services on RentTrust.",
  keywords: [
    "landlord dashboard",
    "property management",
    "tenant applications",
    "rent collection",
    "landlord profile",
  ],
};

// TODO: Replace with authenticated user data from GET /api/users/me
const mockUser = {
  name: "Priya Sharma",
  email: "priya.sharma@email.com",
  phone: "+91 98765 43210",
  location: "Bangalore, Karnataka",
  memberSince: "January 2023",
  businessType: "Individual Investor",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png",
  verificationStatus: {
    identity: true,
    properties: true,
    income: true,
    background: true,
  },
};

// TODO: Replace with data from GET /api/landlords/me/portfolio
const mockPortfolio = {
  totalProperties: 6,
  occupiedProperties: 4,
  vacantProperties: 2,
  totalValue: 2800000,
  monthlyRevenue: 185000,
  occupancyRate: 67,
};

const quickStats = [
  { label: "Properties", value: mockPortfolio.totalProperties, icon: "BuildingOfficeIcon", color: "text-primary", bgColor: "bg-primary/10" },
  { label: "Monthly Revenue", value: `₹${(mockPortfolio.monthlyRevenue / 1000).toFixed(0)}K`, icon: "BanknotesIcon", color: "text-success", bgColor: "bg-success/10" },
  { label: "Occupancy Rate", value: `${mockPortfolio.occupancyRate}%`, icon: "ChartBarIcon", color: "text-accent", bgColor: "bg-accent/10" },
  { label: "Pending Applications", value: 12, icon: "DocumentTextIcon", color: "text-warning", bgColor: "bg-warning/10" },
];


// TODO: Replace with data from GET /api/landlords/me/applications?limit=3
const mockRecentApplications = [
  {
    id: 1,
    tenant: {
      name: "Arjun Menon",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png",
      profession: "Software Engineer",
      creditScore: 820,
      income: "₹85,000",
    },
    property: "2BHK Near Metro",
    appliedDate: "2 days ago",
    status: "Under Review",
  },
  {
    id: 2,
    tenant: {
      name: "Kavya Singh",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png",
      profession: "Marketing Manager",
      creditScore: 750,
      income: "₹65,000",
    },
    property: "2BHK Near Metro",
    appliedDate: "3 days ago",
    status: "Shortlisted",
  },
  {
    id: 3,
    tenant: {
      name: "Rohit Gupta",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png",
      profession: "Business Analyst",
      creditScore: 680,
      income: "₹55,000",
    },
    property: "1BHK Studio Apartment",
    appliedDate: "1 week ago",
    status: "Rejected",
  },
];

// TODO: Replace with data from GET /api/landlords/me/revenue?months=5
const mockMonthlyRevenue = [
  { month: "Oct 2025", amount: 180000, properties: 4 },
  { month: "Nov 2025", amount: 175000, properties: 4 },
  { month: "Dec 2025", amount: 185000, properties: 4 },
  { month: "Jan 2026", amount: 162000, properties: 3 },
  { month: "Feb 2026", amount: 185000, properties: 4 },
];

// TODO: Replace with data from GET /api/landlords/me/tasks
const mockTasks = [
  { task: "Property inspection - HSR Layout", dueDate: "March 8", priority: "high" as const, icon: "MagnifyingGlassIcon" },
  { task: "Lease renewal discussion", dueDate: "March 12", priority: "medium" as const, icon: "DocumentTextIcon" },
  { task: "Maintenance request - Plumbing", dueDate: "March 15", priority: "high" as const, icon: "WrenchScrewdriverIcon" },
  { task: "Review tenant applications", dueDate: "March 18", priority: "medium" as const, icon: "UserGroupIcon" },
];

const applicationStatusStyle: Record<string, string> = {
  "Under Review": "bg-warning/10 text-warning",
  "Shortlisted": "bg-success/10 text-success",
  "Rejected": "bg-destructive/10 text-destructive",
};

export default function LandlordDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <DashboardPageHeader
          name={mockUser.name}
          subtitle={`${mockUser.businessType} • Member since ${mockUser.memberSince}`}
          avatar={mockUser.avatar}
          actions={[
            { label: "Add Property", href: "/landlord/property-management/add", icon: "PlusIcon", variant: "primary" },
            { label: "View Applications", href: "/landlord/tenant-requests", icon: "UserGroupIcon", variant: "outline" },
            { label: "Verification", href: "/landlord/verification", icon: "ShieldCheckIcon", variant: "outline" },
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

              {/* Property Portfolio */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Property Portfolio</h2>
                  <Link
                    href="/landlord/property-management/add"
                    className="flex items-center space-x-1 text-primary hover:underline text-sm"
                  >
                    <Icon name="PlusIcon" size={16} />
                    <span>Add Property</span>
                  </Link>
                </div>
                <PropertyPortfolio />
              </div>

              {/* Recent Applications */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Recent Applications</h2>
                  {/* TODO: Link to GET /api/landlords/me/applications */}
                  <Link
                    href="/landlord/tenant-requests"
                    className="text-primary hover:underline text-sm"
                  >
                    View All Applications
                  </Link>
                </div>

                <div className="space-y-4">
                  {mockRecentApplications.map((application) => (
                    <div
                      key={application.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-xl hover:shadow-md transition-all duration-300 gap-4"
                    >
                      <div className="flex items-center space-x-4">
                        <AppImage
                          src={application.tenant.avatar}
                          alt={application.tenant.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {application.tenant.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {application.tenant.profession} • {application.tenant.income}/month
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Applied to {application.property} • {application.appliedDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 flex-wrap gap-2">
                        <div className="text-center">
                          <p className="text-sm font-bold text-foreground">
                            {application.tenant.creditScore}
                          </p>
                          <p className="text-xs text-muted-foreground">Credit Score</p>
                        </div>

                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold ${applicationStatusStyle[application.status] ?? "bg-muted text-muted-foreground"}`}
                        >
                          {application.status}
                        </div>

                        <button
                          disabled
                          title="Public tenant profile pages are outside the MVP scope."
                          className="px-3 py-1 bg-muted text-muted-foreground rounded-lg text-xs font-medium cursor-not-allowed"
                        >
                          Profile Soon
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Trend */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Monthly Revenue Trend</h2>
                {/* TODO: Replace with Recharts BarChart using GET /api/landlords/me/revenue */}
                <div className="space-y-4">
                  {mockMonthlyRevenue.map((month, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{month.month}</p>
                        <p className="text-sm text-muted-foreground">{month.properties} properties</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">
                          ₹{month.amount.toLocaleString()}
                        </p>
                        {index > 0 && month.amount !== mockMonthlyRevenue[index - 1].amount && (
                          <p
                            className={`text-sm ${
                              month.amount > mockMonthlyRevenue[index - 1].amount
                                ? "text-success"
                                : "text-destructive"
                            }`}
                          >
                            {month.amount > mockMonthlyRevenue[index - 1].amount ? "↗" : "↘"}{" "}
                            {Math.abs(
                              ((month.amount - mockMonthlyRevenue[index - 1].amount) /
                                mockMonthlyRevenue[index - 1].amount) *
                                100
                            ).toFixed(1)}
                            %
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ScoreCard role="landlord" />

              {/* Portfolio Overview */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Portfolio Overview</h3>
                <div className="space-y-4">
                  {[
                    { label: "Total Properties", value: mockPortfolio.totalProperties, className: "font-bold text-foreground" },
                    { label: "Occupied", value: mockPortfolio.occupiedProperties, className: "font-bold text-success" },
                    { label: "Vacant", value: mockPortfolio.vacantProperties, className: "font-bold text-warning" },
                    { label: "Portfolio Value", value: `₹${(mockPortfolio.totalValue / 100000).toFixed(1)}L`, className: "font-bold text-foreground" },
                    { label: "Monthly Revenue", value: `₹${mockPortfolio.monthlyRevenue.toLocaleString()}`, className: "font-bold text-success" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className={item.className}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <VerificationStatusWidget
                verificationStatus={mockUser.verificationStatus}
                actionHref="/landlord/verification"
                actionLabel="Update Verification"
              />

              <UpcomingTasksWidget tasks={mockTasks} />

              {/* Quick Actions */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {/* TODO: Link to POST /api/properties */}
                  <Link
                    href="/landlord/property-management/add"
                    className="w-full p-3 bg-primary text-white rounded-xl text-left hover:bg-secondary transition-colors flex items-center space-x-3"
                  >
                    <Icon name="PlusIcon" size={20} />
                    <span className="font-medium">Add New Property</span>
                  </Link>
                  <Link
                    href="/landlord/tenant-requests"
                    className="w-full p-3 bg-muted/50 rounded-xl text-left hover:bg-muted transition-colors flex items-center space-x-3"
                  >
                    <Icon name="UserGroupIcon" size={20} className="text-muted-foreground" />
                    <span className="text-foreground font-medium">Review Applications</span>
                  </Link>
                  <Link
                    href="/landlord/verification"
                    className="w-full p-3 bg-muted/50 rounded-xl text-left hover:bg-muted transition-colors flex items-center space-x-3"
                  >
                    <Icon name="ShieldCheckIcon" size={20} className="text-muted-foreground" />
                    <span className="text-foreground font-medium">Verification</span>
                  </Link>
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
