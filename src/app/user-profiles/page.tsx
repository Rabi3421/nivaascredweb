import { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import UserProfileInteractive from "./components/UserProfileInteractive";

export const metadata: Metadata = {
  title: "User Profile - RentTrust",
  description: "View complete rental reputation with credit score, verified reviews, and rental history. Build trust through transparency.",
  keywords: ["user profile", "rental reputation", "credit score", "verified reviews", "rental history"],
};

export default function UserProfilesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-12 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-7xl text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Complete <span className="gradient-text">Rental Reputation</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparency builds trust. View verified reviews, credit scores, and complete rental history.
            </p>
          </div>
        </section>

        {/* User Profile */}
        <UserProfileInteractive />
      </main>
      <Footer />
    </div>
  );
}