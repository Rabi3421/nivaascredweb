"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

export default function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
  { value: "24,500+", label: "Verified Users" },
  { value: "1,850+", label: "Properties Listed" },
  { value: "4,200+", label: "Successful Rentals" }];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats?.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [stats?.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12 px-4">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10" />
      {/* Floating Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <Icon name="ShieldCheckIcon" size={20} className="text-primary" />
              <span className="text-sm font-semibold text-primary">
                Verified Trust Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Find Your Perfect Match:{" "}
              <span className="gradient-text">Trusted Landlords</span>,{" "}
              <span className="gradient-text">Reliable Tenants</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              India's first rental platform with verified reviews and credit scoring for both sides. Build trust, find matches faster.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/property-listings"
                className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">

                <span>Find Properties</span>
                <Icon name="MagnifyingGlassIcon" size={20} />
              </Link>
              <Link
                href="/property-listings"
                className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">

                <span>List Your Property</span>
                <Icon name="HomeIcon" size={20} />
              </Link>
            </div>

            {/* Live Counter */}
            <div className="glass rounded-2xl p-6 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Live Stats
                </span>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-xs text-success font-medium">Active</span>
                </div>
              </div>
              <div className="relative h-20 overflow-hidden">
                {stats?.map((stat, index) =>
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                  currentStat === index ?
                  "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
                  }>

                    <p className="text-4xl font-bold text-foreground mb-1">{stat?.value}</p>
                    <p className="text-sm text-muted-foreground">{stat?.label}</p>
                  </div>
                )}
              </div>
              <div className="flex justify-center space-x-2 mt-4">
                {stats?.map((_, index) =>
                <button
                  key={index}
                  onClick={() => setCurrentStat(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStat === index ? "w-8 bg-primary" : "w-1.5 bg-muted"}`
                  }
                  aria-label={`View stat ${index + 1}`} />

                )}
              </div>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="relative h-[500px] lg:h-[600px] animate-fade-in">
            {/* Property Card */}
            <div className="absolute top-0 left-0 w-72 glass rounded-2xl p-4 shadow-2xl animate-float-slow hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="relative h-40 rounded-xl overflow-hidden mb-3">
                <AppImage
                  src="https://images.unsplash.com/photo-1613232218235-06b473107ca9"
                  alt="Modern apartment exterior with balcony and large windows"
                  className="w-full h-full object-cover" />

                <div className="absolute top-2 right-2 px-3 py-1 bg-success text-white text-xs font-bold rounded-full">
                  Verified
                </div>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">2BHK in Koramangala</h3>
              <p className="text-xs text-muted-foreground mb-2">₹25,000/month</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Icon name="StarIcon" variant="solid" size={14} className="text-warning" />
                  <span className="text-xs font-semibold text-foreground">4.8</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="ShieldCheckIcon" size={14} className="text-primary" />
                  <span className="text-xs font-semibold text-primary">High Credit</span>
                </div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="absolute top-32 right-0 w-72 glass rounded-2xl p-4 shadow-2xl animate-float-delayed hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png"
                    alt="Professional headshot of young man in business casual attire"
                    className="w-14 h-14 rounded-full object-cover" />

                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-2 border-white rounded-full flex items-center justify-center">
                    <Icon name="CheckIcon" size={12} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground">Rahul Sharma</h3>
                  <p className="text-xs text-muted-foreground">Verified Landlord</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">850</p>
                  <p className="text-xs text-muted-foreground">Credit Score</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">4.9</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">12</p>
                  <p className="text-xs text-muted-foreground">Properties</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                  ID Verified
                </span>
                <span className="px-2 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
                  Fast Response
                </span>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 glass rounded-2xl px-6 py-4 shadow-2xl animate-scale-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="ShieldCheckIcon" variant="solid" size={28} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Trust Score</p>
                  <p className="text-2xl font-bold text-foreground">98%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}