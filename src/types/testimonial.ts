export interface TestimonialMetrics {
  rentalsFound?: number;
  daysToFind?: number;
  creditScore?: number;
  creditIncrease?: number;
  timeframe?: number;
  propertiesInterested?: number;
  properties?: number;
  successfulRentals?: number;
  zeroDefaultMonths?: number;
  turnoverReduction?: number;
  avgTenantDuration?: number;
  qualityInquiries?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  userType: "Tenant" | "Landlord";
  image: string;
  imageAlt: string;
  rating: number;
  text: string;
  metrics: TestimonialMetrics;
}
