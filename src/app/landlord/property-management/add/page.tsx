"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import { createProperty } from "@/lib/api/properties";
import { ApiClientError } from "@/lib/api/client";
import {
  PROPERTY_TYPES,
  FURNISHING_STATUSES,
} from "@/lib/validations/property";

interface FormState {
  title: string;
  description: string;
  address: {
    line1: string;
    line2: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
  };
  rentAmount: string;
  depositAmount: string;
  maintenanceCharges: string;
  propertyType: string;
  furnishingStatus: string;
  bedrooms: string;
  bathrooms: string;
  areaSqFt: string;
  amenities: string;
  petsAllowed: boolean;
  availableFrom: string;
  noticePeriodDays: string;
  // TODO: replace with real image upload when cloud storage is integrated
  imageUrl: string;
}

const INITIAL: FormState = {
  title: "",
  description: "",
  address: { line1: "", line2: "", locality: "", city: "", state: "", pincode: "" },
  rentAmount: "",
  depositAmount: "",
  maintenanceCharges: "",
  propertyType: "",
  furnishingStatus: "",
  bedrooms: "",
  bathrooms: "",
  areaSqFt: "",
  amenities: "",
  petsAllowed: false,
  availableFrom: "",
  noticePeriodDays: "30",
  imageUrl: "",
};

export default function AddPropertyPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const set = (field: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const setAddr = (field: keyof FormState["address"], value: string) =>
    setForm((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }));

  const clearFieldError = (key: string) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGlobalError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        title: form.title,
        description: form.description,
        address: {
          line1: form.address.line1,
          ...(form.address.line2 ? { line2: form.address.line2 } : {}),
          locality: form.address.locality,
          city: form.address.city,
          state: form.address.state,
          pincode: form.address.pincode,
        },
        rentAmount: Number(form.rentAmount),
        depositAmount: Number(form.depositAmount),
        ...(form.maintenanceCharges ? { maintenanceCharges: Number(form.maintenanceCharges) } : {}),
        propertyType: form.propertyType as (typeof PROPERTY_TYPES)[number],
        furnishingStatus: form.furnishingStatus as (typeof FURNISHING_STATUSES)[number],
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        ...(form.areaSqFt ? { areaSqFt: Number(form.areaSqFt) } : {}),
        amenities: form.amenities
          ? form.amenities.split(",").map((a) => a.trim()).filter(Boolean)
          : [],
        petsAllowed: form.petsAllowed,
        ...(form.availableFrom ? { availableFrom: form.availableFrom } : {}),
        ...(form.noticePeriodDays ? { noticePeriodDays: Number(form.noticePeriodDays) } : {}),
        ...(form.imageUrl
          ? { images: [{ url: form.imageUrl, isPrimary: true }] }
          : {}),
      };

      await createProperty(payload);
      router.push("/landlord/dashboard");
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (err.errors && Object.keys(err.errors).length > 0) {
          setErrors(err.errors);
        } else {
          setGlobalError(err.message);
        }
      } else {
        setGlobalError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-background border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
      errors[field] ? "border-destructive" : "border-border"
    }`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          {/* Page header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <Icon name="ArrowLeftIcon" size={18} />
              <span className="text-sm">Back</span>
            </button>
            <h1 className="text-2xl font-bold text-foreground">Add New Property</h1>
            <p className="text-muted-foreground mt-1">Fill in the details to list your property.</p>
          </div>

          {globalError && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm">
              {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="glass rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-foreground">Basic Information</h2>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => { set("title", e.target.value); clearFieldError("title"); }}
                  placeholder="e.g. Spacious 2BHK in Koramangala"
                  className={inputClass("title")}
                />
                {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => { set("description", e.target.value); clearFieldError("description"); }}
                  placeholder="Describe your property in detail (min 50 characters)"
                  rows={4}
                  className={inputClass("description")}
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-destructive">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Property Type <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={form.propertyType}
                    onChange={(e) => { set("propertyType", e.target.value); clearFieldError("propertyType"); }}
                    className={inputClass("propertyType")}
                  >
                    <option value="">Select type</option>
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.propertyType && (
                    <p className="mt-1 text-xs text-destructive">{errors.propertyType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Furnishing <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={form.furnishingStatus}
                    onChange={(e) => { set("furnishingStatus", e.target.value); clearFieldError("furnishingStatus"); }}
                    className={inputClass("furnishingStatus")}
                  >
                    <option value="">Select furnishing</option>
                    {FURNISHING_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s === "fully_furnished" ? "Fully Furnished" : s === "semi_furnished" ? "Semi Furnished" : "Unfurnished"}
                      </option>
                    ))}
                  </select>
                  {errors.furnishingStatus && (
                    <p className="mt-1 text-xs text-destructive">{errors.furnishingStatus}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Bedrooms <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={form.bedrooms}
                    onChange={(e) => { set("bedrooms", e.target.value); clearFieldError("bedrooms"); }}
                    className={inputClass("bedrooms")}
                  />
                  {errors.bedrooms && <p className="mt-1 text-xs text-destructive">{errors.bedrooms}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Bathrooms <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={form.bathrooms}
                    onChange={(e) => { set("bathrooms", e.target.value); clearFieldError("bathrooms"); }}
                    className={inputClass("bathrooms")}
                  />
                  {errors.bathrooms && <p className="mt-1 text-xs text-destructive">{errors.bathrooms}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Area (sq ft)
                  </label>
                  <input
                    type="number"
                    min="100"
                    value={form.areaSqFt}
                    onChange={(e) => set("areaSqFt", e.target.value)}
                    className={inputClass("areaSqFt")}
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="glass rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-foreground">Address</h2>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Address Line 1 <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.address.line1}
                  onChange={(e) => { setAddr("line1", e.target.value); clearFieldError("address.line1"); }}
                  placeholder="Flat no., Building name, Street"
                  className={inputClass("address.line1")}
                />
                {errors["address.line1"] && (
                  <p className="mt-1 text-xs text-destructive">{errors["address.line1"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Address Line 2
                </label>
                <input
                  type="text"
                  value={form.address.line2}
                  onChange={(e) => setAddr("line2", e.target.value)}
                  placeholder="Landmark (optional)"
                  className={inputClass("address.line2")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Locality <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.address.locality}
                    onChange={(e) => { setAddr("locality", e.target.value); clearFieldError("address.locality"); }}
                    placeholder="e.g. Koramangala 5th Block"
                    className={inputClass("address.locality")}
                  />
                  {errors["address.locality"] && (
                    <p className="mt-1 text-xs text-destructive">{errors["address.locality"]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    City <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.address.city}
                    onChange={(e) => { setAddr("city", e.target.value); clearFieldError("address.city"); }}
                    placeholder="e.g. Bangalore"
                    className={inputClass("address.city")}
                  />
                  {errors["address.city"] && (
                    <p className="mt-1 text-xs text-destructive">{errors["address.city"]}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    State <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.address.state}
                    onChange={(e) => { setAddr("state", e.target.value); clearFieldError("address.state"); }}
                    placeholder="e.g. Karnataka"
                    className={inputClass("address.state")}
                  />
                  {errors["address.state"] && (
                    <p className="mt-1 text-xs text-destructive">{errors["address.state"]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Pincode <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={form.address.pincode}
                    onChange={(e) => { setAddr("pincode", e.target.value.replace(/\D/g, "")); clearFieldError("address.pincode"); }}
                    placeholder="6-digit pincode"
                    className={inputClass("address.pincode")}
                  />
                  {errors["address.pincode"] && (
                    <p className="mt-1 text-xs text-destructive">{errors["address.pincode"]}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="glass rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-foreground">Pricing</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Monthly Rent (₹) <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    min="1000"
                    value={form.rentAmount}
                    onChange={(e) => { set("rentAmount", e.target.value); clearFieldError("rentAmount"); }}
                    placeholder="e.g. 25000"
                    className={inputClass("rentAmount")}
                  />
                  {errors.rentAmount && (
                    <p className="mt-1 text-xs text-destructive">{errors.rentAmount}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Security Deposit (₹) <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.depositAmount}
                    onChange={(e) => { set("depositAmount", e.target.value); clearFieldError("depositAmount"); }}
                    placeholder="e.g. 75000"
                    className={inputClass("depositAmount")}
                  />
                  {errors.depositAmount && (
                    <p className="mt-1 text-xs text-destructive">{errors.depositAmount}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Maintenance Charges (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.maintenanceCharges}
                    onChange={(e) => set("maintenanceCharges", e.target.value)}
                    placeholder="e.g. 2000"
                    className={inputClass("maintenanceCharges")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Notice Period (days)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.noticePeriodDays}
                    onChange={(e) => set("noticePeriodDays", e.target.value)}
                    className={inputClass("noticePeriodDays")}
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="glass rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-foreground">Additional Details</h2>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Amenities
                </label>
                <input
                  type="text"
                  value={form.amenities}
                  onChange={(e) => set("amenities", e.target.value)}
                  placeholder="Comma-separated: WiFi, Parking, Gym, Power Backup"
                  className={inputClass("amenities")}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Separate multiple amenities with commas
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Available From
                </label>
                <input
                  type="date"
                  value={form.availableFrom}
                  onChange={(e) => set("availableFrom", e.target.value)}
                  className={inputClass("availableFrom")}
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="petsAllowed"
                  checked={form.petsAllowed}
                  onChange={(e) => set("petsAllowed", e.target.checked)}
                  className="w-4 h-4 rounded border-border accent-primary"
                />
                <label htmlFor="petsAllowed" className="text-sm font-medium text-foreground">
                  Pets Allowed
                </label>
              </div>

              {/* TODO: replace with real image upload (cloud storage not yet integrated) */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Primary Image URL
                </label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => set("imageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={inputClass("imageUrl")}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Image upload coming soon. Enter a URL for now.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-secondary transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Adding Property…" : "Add Property"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
