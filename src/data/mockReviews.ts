import type { Review } from "@/types/review";

export const mockReviews: Review[] = [
  {
    id: "review_1",
    type: "landlord",
    reviewer: "Priya Mehta",
    reviewerImage:
      "https://img.rocket.new/generatedImages/rocket_gen_img_1565e8423-1763295004978.png",
    reviewerImageAlt: "Professional woman with long dark hair in business attire",
    rating: 5,
    property: "3BHK in Whitefield",
    date: "January 2026",
    text: "Excellent landlord! Very responsive and maintained the property well. Rent receipts always on time.",
    verified: true,
    paymentHistory: "12/12 on-time",
  },
  {
    id: "review_2",
    type: "tenant",
    reviewer: "Amit Kumar",
    reviewerImage:
      "https://img.rocket.new/generatedImages/rocket_gen_img_1ec92ba36-1763293689588.png",
    reviewerImageAlt: "Young professional man in casual business attire",
    rating: 5,
    property: "2BHK in Indiranagar",
    date: "December 2025",
    text: "Perfect tenant! Always paid rent on time, kept the property clean. Highly recommended.",
    verified: true,
    paymentHistory: "18/18 on-time",
  },
  {
    id: "review_3",
    type: "landlord",
    reviewer: "Sneha Reddy",
    reviewerImage: "https://images.unsplash.com/photo-1650603697000-18d771fe3a7e",
    reviewerImageAlt: "Smiling woman with medium length hair outdoors",
    rating: 4,
    property: "1BHK in Koramangala",
    date: "November 2025",
    text: "Good experience overall. Quick to address maintenance issues. Would rent again.",
    verified: true,
    paymentHistory: "8/8 on-time",
  },
  {
    id: "review_4",
    type: "tenant",
    reviewer: "Rajesh Patel",
    reviewerImage:
      "https://img.rocket.new/generatedImages/rocket_gen_img_1920f6efa-1763295241159.png",
    reviewerImageAlt: "Man with short dark hair in professional setting",
    rating: 5,
    property: "2BHK in HSR Layout",
    date: "October 2025",
    text: "Excellent tenant! Very respectful of property rules and neighbors. Clean and responsible.",
    verified: true,
    paymentHistory: "24/24 on-time",
  },
];
