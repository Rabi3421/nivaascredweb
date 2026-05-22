"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import Image from "@/components/ui/AppImage";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: "Total Users",
      value: "25,847",
      change: "+12.5%",
      trend: "up",
      icon: "UsersIcon",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Active Properties",
      value: "1,892",
      change: "+8.2%",
      trend: "up",
      icon: "BuildingOfficeIcon",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Pending Verifications",
      value: "143",
      change: "-5.1%",
      trend: "down",
      icon: "ClockIcon",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Monthly Revenue",
      value: "₹2.4L",
      change: "+15.3%",
      trend: "up",
      icon: "CurrencyRupeeIcon",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Support Tickets",
      value: "87",
      change: "+3.2%",
      trend: "up",
      icon: "TicketIcon",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "System Health",
      value: "99.8%",
      change: "0%",
      trend: "neutral",
      icon: "HeartIcon",
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    }
  ];

  const recentActivity = [
    {
      type: "user_registration",
      user: "Priya Sharma",
      action: "New tenant account created",
      timestamp: "2 minutes ago",
      icon: "UserPlusIcon",
      color: "text-primary"
    },
    {
      type: "property_listing",
      user: "Rajesh Kumar",
      action: "Listed new property in Koramangala",
      timestamp: "15 minutes ago",
      icon: "HomeIcon",
      color: "text-accent"
    },
    {
      type: "verification",
      user: "Sneha Patel",
      action: "Profile verification completed",
      timestamp: "32 minutes ago",
      icon: "ShieldCheckIcon",
      color: "text-success"
    },
    {
      type: "dispute",
      user: "Admin Review",
      action: "Dispute resolved between tenant and landlord",
      timestamp: "1 hour ago",
      icon: "ExclamationTriangleIcon",
      color: "text-warning"
    },
    {
      type: "payment",
      user: "Amit Gupta",
      action: "Premium subscription activated",
      timestamp: "2 hours ago",
      icon: "CreditCardIcon",
      color: "text-purple-600"
    }
  ];

  const pendingVerifications = [
    {
      id: 1,
      name: "Kavya Reddy",
      type: "Tenant",
      documents: ["Aadhaar", "Pan Card", "Salary Slip"],
      submittedAt: "2024-01-15 14:30",
      priority: "high"
    },
    {
      id: 2,
      name: "Vikram Singh",
      type: "Landlord",
      documents: ["Property Deed", "ID Proof"],
      submittedAt: "2024-01-15 12:15",
      priority: "medium"
    },
    {
      id: 3,
      name: "Meera Joshi",
      type: "Tenant",
      documents: ["ID Proof", "Income Proof"],
      submittedAt: "2024-01-15 09:45",
      priority: "low"
    }
  ];

  const topPerformingProperties = [
    {
      id: 1,
      title: "Modern 2BHK in Whitefield",
      landlord: "Suresh Nair",
      views: 1247,
      applications: 23,
      rating: 4.9,
      revenue: "₹15,000"
    },
    {
      id: 2,
      title: "Luxury 3BHK in Indiranagar",
      landlord: "Deepika Roy",
      views: 987,
      applications: 18,
      rating: 4.8,
      revenue: "₹12,500"
    },
    {
      id: 3,
      title: "Cozy 1BHK in HSR Layout",
      landlord: "Ramesh Kumar",
      views: 756,
      applications: 15,
      rating: 4.7,
      revenue: "₹8,900"
    }
  ];

  const systemAlerts = [
    {
      type: "warning",
      title: "High Server Load",
      description: "API response time increased by 15% in the last hour",
      timestamp: "5 minutes ago",
      severity: "medium"
    },
    {
      type: "info",
      title: "Scheduled Maintenance",
      description: "Database maintenance scheduled for tonight at 2 AM",
      timestamp: "1 hour ago",
      severity: "low"
    },
    {
      type: "error",
      title: "Payment Gateway Issue",
      description: "Razorpay integration reporting intermittent failures",
      timestamp: "2 hours ago",
      severity: "high"
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'HomeIcon' },
    { id: 'users', label: 'Users', icon: 'UsersIcon' },
    { id: 'properties', label: 'Properties', icon: 'BuildingOfficeIcon' },
    { id: 'verifications', label: 'Verifications', icon: 'ShieldCheckIcon' },
    { id: 'reports', label: 'Reports', icon: 'ChartBarIcon' },
    { id: 'settings', label: 'Settings', icon: 'Cog6ToothIcon' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Admin Header */}
        <section className="py-8 px-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Icon name="ShieldExclamationIcon" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage and monitor the RentTrust platform</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </select>
                
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-secondary transition-colors flex items-center space-x-2">
                  <Icon name="ArrowPathIcon" size={16} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="py-4 px-4 border-b border-border sticky top-20 bg-background/80 backdrop-blur-md z-40">
          <div className="container mx-auto max-w-7xl">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-7xl">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="glass rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                          <Icon name={stat.icon} size={20} className={stat.color} />
                        </div>
                        <div className={`text-sm font-semibold ${
                          stat.trend === 'up' ? 'text-success' : 
                          stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                        }`}>
                          {stat.change}
                        </div>
                      </div>
                      
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.title}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Recent Activity */}
                  <div className="lg:col-span-2">
                    <div className="glass rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
                        <button className="text-primary hover:text-secondary transition-colors text-sm font-semibold">
                          View All
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                              <Icon name={activity.icon} size={20} className={activity.color} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-foreground truncate">
                                {activity.user}
                              </p>
                              <p className="text-sm text-muted-foreground truncate">
                                {activity.action}
                              </p>
                            </div>
                            
                            <div className="text-xs text-muted-foreground">
                              {activity.timestamp}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* System Alerts */}
                  <div>
                    <div className="glass rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-foreground">System Alerts</h2>
                        <div className="w-3 h-3 bg-warning rounded-full animate-pulse"></div>
                      </div>
                      
                      <div className="space-y-4">
                        {systemAlerts.map((alert, index) => (
                          <div key={index} className={`p-3 rounded-xl border-l-4 ${
                            alert.severity === 'high' ? 'border-destructive bg-destructive/5' :
                            alert.severity === 'medium' ? 'border-warning bg-warning/5' :
                            'border-primary bg-primary/5'
                          }`}>
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-foreground text-sm">{alert.title}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                alert.severity === 'high' ? 'bg-destructive/20 text-destructive' :
                                alert.severity === 'medium' ? 'bg-warning/20 text-warning' :
                                'bg-primary/20 text-primary'
                              }`}>
                                {alert.severity}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{alert.description}</p>
                            <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Dashboard Sections */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Top Performing Properties */}
                  <div className="glass rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">Top Performing Properties</h2>
                    
                    <div className="space-y-4">
                      {topPerformingProperties.map((property, index) => (
                        <div key={property.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-primary">#{index + 1}</span>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground truncate mb-1">
                              {property.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              by {property.landlord}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                              <span>{property.views} views</span>
                              <span>{property.applications} applications</span>
                              <div className="flex items-center space-x-1">
                                <Icon name="StarIcon" size={12} className="text-warning fill-current" />
                                <span>{property.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-bold text-success">{property.revenue}</div>
                            <div className="text-xs text-muted-foreground">revenue</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pending Verifications */}
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-foreground">Pending Verifications</h2>
                      <span className="px-3 py-1 bg-warning/20 text-warning text-sm font-semibold rounded-full">
                        {pendingVerifications.length} pending
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {pendingVerifications.map((verification) => (
                        <div key={verification.id} className="p-4 border border-border rounded-xl">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-foreground">{verification.name}</h4>
                              <p className="text-sm text-muted-foreground">{verification.type}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              verification.priority === 'high' ? 'bg-destructive/20 text-destructive' :
                              verification.priority === 'medium' ? 'bg-warning/20 text-warning' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {verification.priority} priority
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {verification.documents.map((doc, index) => (
                              <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                {doc}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Submitted: {verification.submittedAt}
                            </span>
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 bg-success text-white text-xs rounded hover:bg-success/80 transition-colors">
                                Approve
                              </button>
                              <button className="px-3 py-1 bg-destructive text-white text-xs rounded hover:bg-destructive/80 transition-colors">
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'overview' && (
              <div className="glass rounded-2xl p-12 text-center">
                <Icon name="Cog6ToothIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {tabs.find(tab => tab.id === activeTab)?.label} Section
                </h2>
                <p className="text-muted-foreground">
                  This section is currently under development. Content will be available soon.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}