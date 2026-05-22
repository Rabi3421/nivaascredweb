"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import { ApiClientError } from "@/lib/api/client";
import { getMyProperties, type ApiProperty } from "@/lib/api/properties";
import {
  ApiVerification,
  VERIFICATION_STATUS_LABELS,
  VERIFICATION_STATUS_STYLES,
  VerificationType,
  createVerification,
  getMyVerifications,
  requestPropertyVerification,
} from "@/lib/api/verifications";

const USER_TYPES: VerificationType[] = [
  "identity",
  "income",
  "employment",
  "background",
  "bank",
];

const LANDLORD_TYPES: VerificationType[] = ["identity", "bank", "property"];

function latestByType(verifications: ApiVerification[]) {
  return verifications.reduce<Record<string, ApiVerification>>((acc, item) => {
    if (!item.propertyId && !acc[item.type]) acc[item.type] = item;
    return acc;
  }, {});
}

export default function UserVerificationPage({ role }: { role: "tenant" | "landlord" }) {
  const [verifications, setVerifications] = useState<ApiVerification[]>([]);
  const [properties, setProperties] = useState<ApiProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingPropertyId, setSubmittingPropertyId] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: "identity" as VerificationType,
    documentUrl: "",
    notes: "",
  });
  const [propertyForms, setPropertyForms] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [verificationData, propertyData] = await Promise.all([
        getMyVerifications(),
        role === "landlord" ? getMyProperties() : Promise.resolve([]),
      ]);
      setVerifications(verificationData);
      setProperties(propertyData);
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to load verifications.");
    } finally {
      setIsLoading(false);
    }
  }, [role]);

  useEffect(() => {
    load();
  }, [load]);

  const statusByType = useMemo(() => latestByType(verifications), [verifications]);
  const availableTypes = role === "tenant" ? USER_TYPES : LANDLORD_TYPES;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      await createVerification({
        type: form.type,
        documentUrl: form.documentUrl,
        notes: form.notes || undefined,
      });
      setForm((prev) => ({ ...prev, documentUrl: "", notes: "" }));
      setSuccess("Verification request submitted.");
      await load();
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Could not submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePropertySubmit = async (propertyId: string) => {
    const documentUrl = propertyForms[propertyId]?.trim();
    if (!documentUrl) {
      setError("Enter a property document URL before submitting.");
      return;
    }
    setSubmittingPropertyId(propertyId);
    setError(null);
    setSuccess(null);
    try {
      await requestPropertyVerification(propertyId, {
        documentUrl,
        notes: "Property document uploaded",
      });
      setPropertyForms((prev) => ({ ...prev, [propertyId]: "" }));
      setSuccess("Property verification request submitted.");
      await load();
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Could not request property verification.");
    } finally {
      setSubmittingPropertyId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Verification</h1>
              <p className="mt-1 text-muted-foreground">
                Verified details improve trust and can increase your NivaasCred Score.
              </p>
            </div>
            <Link
              href={`/${role}/score`}
              className="rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
            >
              View Score
            </Link>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-xl border border-success/30 bg-success/10 p-4 text-sm text-success">
              {success}
            </div>
          )}

          {isLoading ? (
            <div className="glass h-64 animate-pulse rounded-2xl" />
          ) : (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {availableTypes.map((type) => {
                  const verification = statusByType[type];
                  return (
                    <div key={type} className="glass rounded-2xl p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-bold capitalize text-foreground">{type}</h3>
                        <Icon name="ShieldCheckIcon" size={18} className="text-primary" />
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          verification
                            ? VERIFICATION_STATUS_STYLES[verification.status]
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {verification
                          ? VERIFICATION_STATUS_LABELS[verification.status]
                          : "Not Submitted"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="glass rounded-2xl p-6">
                <h2 className="mb-4 text-lg font-bold text-foreground">
                  Submit Verification
                </h2>
                <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-[180px_1fr]">
                  <select
                    value={form.type}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        type: event.target.value as VerificationType,
                      }))
                    }
                    className="rounded-xl border border-border bg-background px-4 py-3 text-sm"
                  >
                    {availableTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <input
                    value={form.documentUrl}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, documentUrl: event.target.value }))
                    }
                    placeholder="https://example.com/document.pdf"
                    className="rounded-xl border border-border bg-background px-4 py-3 text-sm"
                  />
                  <textarea
                    value={form.notes}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, notes: event.target.value }))
                    }
                    rows={3}
                    placeholder="Notes for admin"
                    className="md:col-span-2 rounded-xl border border-border bg-background px-4 py-3 text-sm"
                  />
                  <button
                    disabled={isSubmitting}
                    className="md:col-span-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Verification"}
                  </button>
                </form>
              </div>

              {role === "landlord" && (
                <div className="glass rounded-2xl p-6">
                  <h2 className="mb-4 text-lg font-bold text-foreground">
                    Property Verification
                  </h2>
                  {properties.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Add a property before requesting property verification.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {properties.map((property) => (
                        <div
                          key={property._id}
                          className="rounded-xl border border-border p-4"
                        >
                          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="font-semibold text-foreground">
                                {property.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {property.city}, {property.state}
                              </p>
                            </div>
                            <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold capitalize text-foreground">
                              {property.verificationStatus ?? "unverified"}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 sm:flex-row">
                            <input
                              value={propertyForms[property._id] ?? ""}
                              onChange={(event) =>
                                setPropertyForms((prev) => ({
                                  ...prev,
                                  [property._id]: event.target.value,
                                }))
                              }
                              placeholder="https://example.com/property-document.pdf"
                              className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm"
                            />
                            <button
                              onClick={() => handlePropertySubmit(property._id)}
                              disabled={submittingPropertyId === property._id}
                              className="rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white disabled:opacity-60"
                            >
                              {submittingPropertyId === property._id
                                ? "Submitting..."
                                : "Request Verification"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="glass rounded-2xl p-6">
                <h2 className="mb-4 text-lg font-bold text-foreground">History</h2>
                {verifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No verification requests yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {verifications.map((item) => {
                      const property =
                        item.propertyId && typeof item.propertyId === "object"
                          ? item.propertyId
                          : null;
                      return (
                        <div
                          key={item._id}
                          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-4"
                        >
                          <div>
                            <p className="font-semibold capitalize text-foreground">
                              {item.type}
                              {property ? ` • ${property.title}` : ""}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Submitted {new Date(item.createdAt).toLocaleDateString("en-IN")}
                            </p>
                            {item.rejectionReason && (
                              <p className="mt-1 text-xs text-destructive">
                                {item.rejectionReason}
                              </p>
                            )}
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              VERIFICATION_STATUS_STYLES[item.status]
                            }`}
                          >
                            {VERIFICATION_STATUS_LABELS[item.status]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
