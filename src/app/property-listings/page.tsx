import { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PropertyListingsInteractive from "./components/PropertyListingsInteractive";

export const metadata: Metadata = {
  title: "Property Listings - RentTrust",
  description: "Browse verified property listings with landlord reviews and ratings. Find your perfect rental with confidence.",
  keywords: ["property listings", "rental properties", "verified landlords", "property search", "rental listings"],
};

export default function PropertyListingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-12 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-7xl text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Find Your Perfect <span className="gradient-text">Rental Home</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse verified properties with transparent reviews and ratings from real tenants.
            </p>
          </div>
        </section>

        {/* Property Listings */}
        <PropertyListingsInteractive />
      </main>
      <Footer />
    </div>
  );
}
