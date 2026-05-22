"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { loginPageTestimonials } from "@/data/mockTestimonials";

interface LoginFormData {
  email: string;
  phone: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    phone: "",
    password: "",
    rememberMe: false,
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  // TODO: POST /api/auth/login — returns { token, user }
  // On success: store JWT in httpOnly cookie (set by server) or localStorage, redirect to dashboard
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const payload =
        loginMethod === "email"
          ? { email: formData.email, password: formData.password }
          : { phone: formData.phone, password: formData.password };

      // TODO: const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) });
      // TODO: if (!res.ok) throw new Error((await res.json()).message);
      // TODO: const { token, user } = await res.json();
      // TODO: redirect based on user.role: /tenant/dashboard | /landlord/dashboard | /admin/dashboard
      console.log("Login payload:", payload);

      await new Promise((r) => setTimeout(r, 800)); // remove after real API
      setError("Login API not yet connected. Backend integration coming soon.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: POST /api/auth/forgot-password — sends reset link to email
  const handleForgotPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // TODO: await fetch('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email: forgotEmail }) });
      console.log("Forgot password for:", forgotEmail);
      await new Promise((r) => setTimeout(r, 600)); // remove after real API
      setResetSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset link.");
    } finally {
      setIsLoading(false);
    }
  };

  const platformStats = [
    { value: "25K+", label: "Active Users" },
    { value: "1.8K+", label: "Properties" },
    { value: "4.2K+", label: "Successful Rentals" },
    { value: "4.8★", label: "Average Rating" },
  ];

  const benefits = [
    { icon: "ShieldCheckIcon", title: "100% Verified Profiles", desc: "Every user goes through identity verification" },
    { icon: "StarIcon", title: "Authentic Reviews Only", desc: "Reviews from real rental relationships only" },
    { icon: "BanknotesIcon", title: "Transparent Pricing", desc: "No hidden fees or surprise charges" },
    { icon: "ClockIcon", title: "24/7 Support", desc: "Get help whenever you need it" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column — Branding */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Welcome Back to <span className="gradient-text">RentTrust</span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Sign in to continue building trust in your rental journey.
                  </p>
                </div>

                {/* Platform Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {platformStats.map((stat) => (
                    <div key={stat.label} className="glass rounded-2xl p-4 text-center">
                      <p className="text-xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">Why Users Trust RentTrust</h2>
                  <div className="grid gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 glass rounded-xl">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={benefit.icon} size={20} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{benefit.title}</h3>
                          <p className="text-muted-foreground text-xs">{benefit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">What Our Users Say</h2>
                  <div className="space-y-4">
                    {loginPageTestimonials.slice(0, 2).map((testimonial, index) => (
                      <div key={index} className="glass rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                          <AppImage
                            src={testimonial.image}
                            alt={`${testimonial.name} profile photo`}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">
                              "{testimonial.text}"
                            </p>
                            <p className="font-semibold text-foreground text-sm">
                              {testimonial.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column — Login Form */}
              <div className="glass rounded-3xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Sign In to Your Account
                  </h2>
                  <p className="text-muted-foreground">Choose your preferred login method</p>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center space-x-3">
                    <Icon name="ExclamationTriangleIcon" size={20} className="text-destructive flex-shrink-0" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {!showForgotPassword ? (
                  <>
                    {/* Login Method Toggle */}
                    <div className="glass rounded-2xl p-2 mb-6 inline-flex w-full">
                      {(["email", "phone"] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setLoginMethod(method)}
                          className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm capitalize ${
                            loginMethod === method
                              ? "bg-primary text-white shadow-lg"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon
                            name={method === "email" ? "EnvelopeIcon" : "PhoneIcon"}
                            size={16}
                            className="inline mr-2"
                          />
                          {method === "email" ? "Email" : "Phone"}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-6">
                      {/* Email / Phone Input */}
                      <div>
                        <label
                          htmlFor="login-identity"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          {loginMethod === "email" ? "Email Address" : "Phone Number"}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon
                              name={loginMethod === "email" ? "EnvelopeIcon" : "PhoneIcon"}
                              size={20}
                              className="text-muted-foreground"
                            />
                          </div>
                          <input
                            id="login-identity"
                            type={loginMethod === "email" ? "email" : "tel"}
                            value={loginMethod === "email" ? formData.email : formData.phone}
                            onChange={(e) =>
                              handleInputChange(loginMethod === "email" ? "email" : "phone", e.target.value)
                            }
                            required
                            autoComplete={loginMethod === "email" ? "email" : "tel"}
                            className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                            placeholder={
                              loginMethod === "email"
                                ? "Enter your email address"
                                : "Enter your phone number"
                            }
                          />
                        </div>
                      </div>

                      {/* Password Input */}
                      <div>
                        <label
                          htmlFor="login-password"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="LockClosedIcon" size={20} className="text-muted-foreground" />
                          </div>
                          <input
                            id="login-password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            required
                            autoComplete="current-password"
                            className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                            placeholder="Enter your password"
                          />
                        </div>
                      </div>

                      {/* Remember Me & Forgot Password */}
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.rememberMe}
                            onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                          />
                          <span className="text-sm text-muted-foreground">Remember me</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setShowForgotPassword(true);
                            setError(null);
                          }}
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <LoadingSpinner size="sm" className="border-white/30 border-t-white" />
                            <span>Signing In…</span>
                          </>
                        ) : (
                          <>
                            <span>Sign In</span>
                            <Icon name="ArrowRightIcon" size={20} />
                          </>
                        )}
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    {/* Social Login */}
                    {/* TODO: Implement OAuth — GET /api/auth/google and GET /api/auth/otp */}
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-border rounded-xl hover:bg-muted/50 transition-colors">
                        <Icon name="UserIcon" size={20} className="text-foreground" />
                        <span className="text-sm font-medium text-foreground">Google</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-border rounded-xl hover:bg-muted/50 transition-colors">
                        <Icon name="PhoneIcon" size={20} className="text-foreground" />
                        <span className="text-sm font-medium text-foreground">OTP</span>
                      </button>
                    </div>
                  </>
                ) : (
                  /* Forgot Password Form */
                  <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
                    <div className="text-center">
                      <Icon name="LockClosedIcon" size={48} className="text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-foreground mb-2">Reset Your Password</h3>
                      <p className="text-muted-foreground text-sm">
                        Enter your email address and we'll send you a link to reset your password.
                      </p>
                    </div>

                    {resetSuccess ? (
                      <div className="p-4 bg-success/10 border border-success/20 rounded-xl text-center">
                        <Icon name="CheckCircleIcon" size={32} className="text-success mx-auto mb-2" />
                        <p className="text-sm font-semibold text-success">Reset link sent!</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Check your inbox for password reset instructions.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div>
                          <label
                            htmlFor="reset-email"
                            className="block text-sm font-medium text-foreground mb-2"
                          >
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Icon name="EnvelopeIcon" size={20} className="text-muted-foreground" />
                            </div>
                            <input
                              id="reset-email"
                              type="email"
                              value={forgotEmail}
                              onChange={(e) => setForgotEmail(e.target.value)}
                              required
                              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                              placeholder="Enter your registered email"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <LoadingSpinner size="sm" className="border-white/30 border-t-white" />
                          ) : (
                            "Send Reset Link"
                          )}
                        </button>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setResetSuccess(false);
                        setError(null);
                      }}
                      className="w-full text-sm text-primary hover:underline"
                    >
                      ← Back to Sign In
                    </button>
                  </form>
                )}

                {/* Sign Up Link */}
                <div className="text-center mt-6 pt-6 border-t border-border">
                  <p className="text-muted-foreground">
                    New to RentTrust?{" "}
                    <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
                      Create Account
                    </Link>
                  </p>
                </div>

                <div className="text-center mt-4">
                  <Link
                    href="/support"
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Need help? Contact Support
                  </Link>
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
