import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

export default function CTASection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary -z-10" />{/* Overlay Pattern */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center space-y-8 animate-slide-up">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Icon name="SparklesIcon" size={40} className="text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Join 24,500+ Verified Users<br />Building Trust in Rentals
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Start building your rental reputation today. Whether you're a landlord or tenant, NivaasCredit makes finding the perfect match simple and secure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/property-listings"
              className="px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2"
            >
              <span>Get Started Free</span>
              <Icon name="ArrowRightIcon" size={20} />
            </Link>
            <Link
              href="/homepage"
              className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>See How It Works</span>
              <Icon name="PlayIcon" size={20} />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
            <div className="flex items-center space-x-2 text-white/90">
              <Icon name="CheckCircleIcon" size={20} />
              <span className="text-sm font-medium">Free to Sign Up</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Icon name="CheckCircleIcon" size={20} />
              <span className="text-sm font-medium">No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Icon name="CheckCircleIcon" size={20} />
              <span className="text-sm font-medium">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}