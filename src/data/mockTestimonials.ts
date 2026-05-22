import type { Testimonial } from "@/types/testimonial";

export const mockTestimonials: Testimonial[] = [
  {
    id: "testimonial_1",
    name: "Ananya Iyer",
    role: "Software Engineer",
    userType: "Tenant",
    image:
      "https://img.rocket.new/generatedImages/rocket_gen_img_115d61d2c-1765988781101.png",
    imageAlt: "Professional woman with long dark hair smiling in office setting",
    rating: 5,
    text: "Finding a trustworthy landlord was always a nightmare. RentTrust changed that completely. I could see verified reviews and payment history before even contacting landlords. Found my perfect place in just 3 days!",
    metrics: {
      rentalsFound: 1,
      daysToFind: 3,
      creditScore: 820,
    },
  },
  {
    id: "testimonial_2",
    name: "Vikram Malhotra",
    role: "Property Owner",
    userType: "Landlord",
    image:
      "https://img.rocket.new/generatedImages/rocket_gen_img_115f04544-1763294281729.png",
    imageAlt: "Professional man with short hair in business casual attire",
    rating: 5,
    text: "As a landlord with 5 properties, finding reliable tenants was my biggest challenge. RentTrust's credit scoring system is brilliant. I can now see payment history and reviews before finalizing tenants. Zero payment issues in 8 months!",
    metrics: {
      properties: 5,
      successfulRentals: 12,
      zeroDefaultMonths: 8,
    },
  },
  {
    id: "testimonial_3",
    name: "Priya Sharma",
    role: "Marketing Manager",
    userType: "Tenant",
    image:
      "https://img.rocket.new/generatedImages/rocket_gen_img_1124a4601-1763295240952.png",
    imageAlt: "Smiling woman with shoulder-length hair in casual professional attire",
    rating: 5,
    text: "The credit scoring feature motivated me to pay rent on time. My score went from 650 to 890 in 10 months. Now landlords reach out to ME! It's like having a rental credit card that actually helps you.",
    metrics: {
      creditIncrease: 240,
      timeframe: 10,
      propertiesInterested: 8,
    },
  },
  {
    id: "testimonial_4",
    name: "Rajesh Patel",
    role: "Real Estate Investor",
    userType: "Landlord",
    image:
      "https://img.rocket.new/generatedImages/rocket_gen_img_13c0e083b-1763295551716.png",
    imageAlt: "Man with short dark hair and glasses in professional setting",
    rating: 5,
    text: "RentTrust is a game-changer for the rental industry. The verification system and two-way reviews create accountability. My tenant turnover reduced by 60% and I'm getting quality inquiries. Worth every rupee!",
    metrics: {
      turnoverReduction: 60,
      avgTenantDuration: 18,
      qualityInquiries: "95%",
    },
  },
];

/** Shorter testimonial set for auth pages */
export const loginPageTestimonials = [
  {
    name: "Rajesh Kumar",
    role: "Software Engineer",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png",
    text: "Found my perfect apartment in just 2 days. The landlord verification gave me complete confidence.",
  },
  {
    name: "Priya Sharma",
    role: "Property Owner",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png",
    text: "RentTrust helped me find reliable tenants. The screening process is thorough and trustworthy.",
  },
  {
    name: "Arjun Patel",
    role: "Marketing Manager",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png",
    text: "Building my rental credit score has opened up better properties. Great platform for professionals.",
  },
];
