"use client";

import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import CreditScoreDashboard from "./CreditScoreDashboard";
import ReviewTimeline from "./ReviewTimeline";
import RentalStatistics from "./RentalStatistics";

const mockProfile = {
  name: "Rahul Sharma",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11c395459-1763301246668.png",
  imageAlt: "Professional man in business casual attire",
  userType: "Landlord" as const,
  creditScore: 850,
  rating: 4.9,
  totalReviews: 24,
  verified: {
    id: true,
    phone: true,
    email: true,
    payment: true
  },
  joinedDate: "January 2024"
};

const mockCreditBreakdown = {
  onTimePayments: 360,
  verifications: 200,
  positiveReviews: 180,
  rentalHistory: 110
};

const mockReviews = [
{
  id: "review_1",
  reviewer: "Priya Mehta",
  reviewerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1965c6713-1763299935220.png",
  reviewerImageAlt: "Professional woman with long dark hair",
  reviewerType: "Tenant" as const,
  rating: 5,
  date: "January 2026",
  property: "2BHK in Koramangala",
  text: "Excellent landlord! Very responsive to maintenance requests and always professional. The property was exactly as described. Highly recommend!",
  paymentHistory: "12/12 on-time"
},
{
  id: "review_2",
  reviewer: "Amit Kumar",
  reviewerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1cb9d3445-1767783861537.png",
  reviewerImageAlt: "Man with glasses in professional setting",
  reviewerType: "Tenant" as const,
  rating: 5,
  date: "November 2025",
  property: "3BHK in Whitefield",
  text: "Great experience renting from Rahul. Clear communication, fair pricing, and quick resolution of any issues. Would definitely rent again.",
  paymentHistory: "18/18 on-time"
},
{
  id: "review_3",
  reviewer: "Sneha Reddy",
  reviewerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11b2b4576-1763301883979.png",
  reviewerImageAlt: "Smiling woman with shoulder-length hair",
  reviewerType: "Tenant" as const,
  rating: 5,
  date: "August 2025",
  property: "2BHK in Indiranagar",
  text: "Very professional and understanding landlord. Maintained the property well and was always available for any concerns. Highly trustworthy!",
  paymentHistory: "10/10 on-time"
},
{
  id: "review_4",
  reviewer: "Vikram Patel",
  reviewerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_115f04544-1763294281729.png",
  reviewerImageAlt: "Young professional man with short hair",
  reviewerType: "Tenant" as const,
  rating: 4,
  date: "May 2025",
  property: "1BHK in HSR Layout",
  text: "Good landlord overall. Property was clean and well-maintained. Minor delays in maintenance but nothing major. Would recommend.",
  paymentHistory: "8/8 on-time"
}];


const mockStats = {
  totalRentals: 24,
  onTimePayments: 100,
  responseRate: "< 2 hours",
  activeSince: "2024",
  propertiesManaged: 12,
  avgRentalDuration: 18
};

export default function UserProfileInteractive() {
  const [activeTab, setActiveTab] = useState<"overview" | "reviews">("overview");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Profile Header */}
        <ProfileHeader profile={mockProfile} />

        {/* Tab Navigation */}
        <div className="flex items-center space-x-4 border-b border-border">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-semibold transition-all ${
            activeTab === "overview" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`
            }>

            Overview
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 font-semibold transition-all ${
            activeTab === "reviews" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`
            }>

            Reviews ({mockProfile.totalReviews})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" ?
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <CreditScoreDashboard
              creditScore={mockProfile.creditScore}
              scoreBreakdown={mockCreditBreakdown} />

            </div>
            <div className="space-y-8">
              <RentalStatistics stats={mockStats} userType={mockProfile.userType} />
            </div>
          </div> :

        <ReviewTimeline reviews={mockReviews} />
        }
      </div>
    </div>);

}