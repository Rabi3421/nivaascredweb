"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "next/link";

type UserType = "tenant" | "landlord";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  city: string;
  profession: string;
  income: string;
  acceptTerms: boolean;
}

const CITIES = ["Bangalore", "Mumbai", "Delhi", "Pune", "Chennai", "Hyderabad"];

const TENANT_PROFESSIONS = [
  { value: "software-engineer", label: "Software Engineer" },
  { value: "business-analyst", label: "Business Analyst" },
  { value: "consultant", label: "Consultant" },
  { value: "student", label: "Student" },
  { value: "freelancer", label: "Freelancer" },
  { value: "other", label: "Other" },
];

const LANDLORD_BUSINESS_TYPES = [
  { value: "individual-investor", label: "Individual Investor" },
  { value: "real-estate-company", label: "Real Estate Company" },
  { value: "property-developer", label: "Property Developer" },
  { value: "family-owned", label: "Family-Owned Properties" },
  { value: "other", label: "Other" },
];

const TENANT_INCOME_RANGES = [
  { value: "under-30000", label: "Under ₹30,000" },
  { value: "30000-50000", label: "₹30,000 – ₹50,000" },
  { value: "50000-100000", label: "₹50,000 – ₹1,00,000" },
  { value: "100000-200000", label: "₹1,00,000 – ₹2,00,000" },
  { value: "above-200000", label: "Above ₹2,00,000" },
];

const LANDLORD_PROPERTY_COUNTS = [
  { value: "1-2", label: "1–2 Properties" },
  { value: "3-5", label: "3–5 Properties" },
  { value: "6-10", label: "6–10 Properties" },
  { value: "above-10", label: "10+ Properties" },
];

export default function SignUpPage() {
  const [userType, setUserType] = useState<UserType>("tenant");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    profession: "",
    income: "",
    acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof SignUpFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const validateStep = (): string | null => {
    if (step === 1) {
      if (!formData.firstName.trim()) return "First name is required.";
      if (!formData.lastName.trim()) return "Last name is required.";
      if (!formData.email.trim()) return "Email address is required.";
      if (!formData.phone.trim()) return "Phone number is required.";
    }
    if (step === 2) {
      if (!formData.password) return "Password is required.";
      if (formData.password.length < 8) return "Password must be at least 8 characters.";
      if (formData.password !== formData.confirmPassword) return "Passwords do not match.";
      if (!formData.city) return "Please select your city.";
    }
    return null;
  };

  const nextStep = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // TODO: POST /api/auth/register — returns { token, user }
  // On success: store JWT, redirect to /onboarding/:userType
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      setError("You must accept the Terms & Conditions to continue.");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        city: formData.city,
        role: userType,
        profession: formData.profession,
        incomeOrProperties: formData.income,
      };

      // TODO: const res = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) });
      // TODO: if (!res.ok) throw new Error((await res.json()).message);
      // TODO: const { token, user } = await res.json();
      // TODO: router.push(`/onboarding/${user.role}`);
      console.log("Registration payload:", payload);

      await new Promise((r) => setTimeout(r, 800)); // remove after real API
      setError("Registration API not yet connected. Backend integration coming soon.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = {
    tenant: [
      { icon: "ShieldCheckIcon", title: "Verified Landlords", desc: "Connect with identity-verified property owners" },
      { icon: "StarIcon", title: "Honest Reviews", desc: "Read genuine reviews from previous tenants" },
      { icon: "TrophyIcon", title: "Build Credit Score", desc: "Improve your rental credit with timely payments" },
      { icon: "ScaleIcon", title: "Dispute Protection", desc: "Fair resolution process for rental conflicts" },
    ],
    landlord: [
      { icon: "DocumentMagnifyingGlassIcon", title: "Screened Tenants", desc: "Access verified tenant profiles and credit scores" },
      { icon: "CreditCardIcon", title: "Secure Payments", desc: "Digital rent collection with automatic tracking" },
      { icon: "ChatBubbleLeftRightIcon", title: "Tenant Feedback", desc: "Get reviews to attract quality tenants" },
      { icon: "DocumentTextIcon", title: "Legal Support", desc: "Access rental agreements and legal guidance" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column — Info */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Join <span className="gradient-text">RentTrust</span> Today
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Create your account and start connecting with verified{" "}
                    {userType === "tenant" ? "landlords" : "tenants"} in your area.
                  </p>
                </div>

                {/* User Type Toggle */}
                <div className="glass rounded-2xl p-2 inline-flex">
                  {(["tenant", "landlord"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setUserType(type)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 capitalize ${
                        userType === type
                          ? "bg-primary text-white shadow-lg"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      I'm a {type === "tenant" ? "Tenant" : "Landlord"}
                    </button>
                  ))}
                </div>

                {/* Benefits */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-foreground">
                    Why {userType === "tenant" ? "Tenants" : "Landlords"} Choose RentTrust
                  </h2>
                  <div className="grid gap-4">
                    {benefits[userType].map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 glass rounded-xl">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon name={benefit.icon} size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                          <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Stats */}
                <div className="glass rounded-2xl p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { value: "25K+", label: "Active Users" },
                      { value: "4.8★", label: "Average Rating" },
                      { value: "95%", label: "Satisfaction" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column — Multi-step Form */}
              <div className="glass rounded-3xl p-8">
                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    {[1, 2, 3].map((stepNum) => (
                      <div key={stepNum} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                            step >= stepNum
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step > stepNum ? (
                            <Icon name="CheckIcon" size={16} className="text-white" />
                          ) : (
                            stepNum
                          )}
                        </div>
                        {stepNum < 3 && (
                          <div
                            className={`w-16 h-1 mx-2 transition-all ${
                              step > stepNum ? "bg-primary" : "bg-muted"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Step {step} of 3</p>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center space-x-3">
                    <Icon
                      name="ExclamationTriangleIcon"
                      size={20}
                      className="text-destructive flex-shrink-0"
                    />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {/* Step 1 — Basic Info */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-foreground mb-2">Basic Information</h2>
                      <p className="text-muted-foreground">Let's start with your basic details</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                          First Name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        autoComplete="email"
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        autoComplete="tel"
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* Step 2 — Password & Location */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-foreground mb-2">Account Security</h2>
                      <p className="text-muted-foreground">
                        Create a secure password and add your location
                      </p>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        autoComplete="new-password"
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                        placeholder="Create a strong password"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Must be at least 8 characters with uppercase, lowercase, and a number
                      </p>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        autoComplete="new-password"
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                        placeholder="Confirm your password"
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                        City
                      </label>
                      <select
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                      >
                        <option value="">Select your city</option>
                        {CITIES.map((city) => (
                          <option key={city} value={city.toLowerCase()}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 — Professional Info */}
                {step === 3 && (
                  <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Professional Details
                      </h2>
                      <p className="text-muted-foreground">Help us understand your background</p>
                    </div>

                    <div>
                      <label htmlFor="profession" className="block text-sm font-medium text-foreground mb-2">
                        {userType === "tenant" ? "Profession" : "Business Type"}
                      </label>
                      <select
                        id="profession"
                        value={formData.profession}
                        onChange={(e) => handleInputChange("profession", e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                      >
                        <option value="">
                          Select {userType === "tenant" ? "profession" : "business type"}
                        </option>
                        {(userType === "tenant" ? TENANT_PROFESSIONS : LANDLORD_BUSINESS_TYPES).map(
                          (opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="income" className="block text-sm font-medium text-foreground mb-2">
                        {userType === "tenant" ? "Monthly Income" : "Number of Properties"}
                      </label>
                      <select
                        id="income"
                        value={formData.income}
                        onChange={(e) => handleInputChange("income", e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                      >
                        <option value="">
                          Select {userType === "tenant" ? "income range" : "property count"}
                        </option>
                        {(userType === "tenant" ? TENANT_INCOME_RANGES : LANDLORD_PROPERTY_COUNTS).map(
                          (opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
                        className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      />
                      <span className="text-sm text-muted-foreground">
                        I agree to RentTrust's{" "}
                        <Link href="/legal/terms" className="text-primary hover:underline">
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/legal/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!formData.acceptTerms || isLoading}
                        className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isLoading ? (
                          <LoadingSpinner size="sm" className="border-white/30 border-t-white" />
                        ) : (
                          <>
                            <span>Create Account</span>
                            <Icon name="CheckIcon" size={20} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Login Link */}
                <div className="text-center mt-6 pt-6 border-t border-border">
                  <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                      Log In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
