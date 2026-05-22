import { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import ReviewSystemSection from "./components/ReviewSystemSection";
import CreditScoreSection from "./components/CreditScoreSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";

export const metadata: Metadata = {
  title: "NivaasCred - Trusted Landlords, Reliable Tenants",
  description: "India's first rental platform with verified reviews and credit scoring for both landlords and tenants. Find your perfect match with confidence.",
  keywords: ["rental platform", "verified landlords", "tenant reviews", "credit scoring", "rental trust", "India rentals"],
};

export default function Homepage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ReviewSystemSection />
        <CreditScoreSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}