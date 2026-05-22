"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import { ApiClientError } from "@/lib/api/client";
import {
  ApiRentalHistory,
  ApiRentalProperty,
  ApiRentalUser,
  RENTAL_STATUS_LABELS,
  RENTAL_STATUS_STYLES,
  RentalHistoryStatus,
  getLandlordRentalHistories,
  getTenantRentalHistories,
  updateRentalHistory,
} from "@/lib/api/rental-histories";
import { createReview } from "@/lib/api/reviews";
import { createReviewRequest } from "@/lib/api/review-requests";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267";
const STATUS_OPTIONS: RentalHistoryStatus[] = ["active", "completed", "terminated"];

type Role = "landlord" | "tenant";

function asUser(value: ApiRentalHistory["tenantId"]): ApiRentalUser | null {
  return typeof value === "object" ? value : null;
}

function asProperty(value: ApiRentalHistory["propertyId"]): ApiRentalProperty | null {
  return typeof value === "object" ? value : null;
}

function formatDate(value?: string | null) {
  if (!value) return "Open";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function primaryImage(property: ApiRentalProperty | null) {
  return (
    property?.images?.find((image) => image.isPrimary)?.url ??
    property?.images?.[0]?.url ??
    PLACEHOLDER_IMAGE
  );
}

export default function RentalHistoryDashboard({ role }: { role: Role }) {
  const [items, setItems] = useState<ApiRentalHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [reviewRental, setReviewRental] = useState<ApiRentalHistory | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [requestingId, setRequestingId] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: "",
    comment: "",
    tags: "",
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data =
        role === "landlord"
          ? await getLandlordRentalHistories()
          : await getTenantRentalHistories();
      setItems(data);
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to load rental history.");
    } finally {
      setIsLoading(false);
    }
  }, [role]);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (id: string, status: RentalHistoryStatus) => {
    setUpdatingId(id);
    setActionError(null);
    try {
      const updated = await updateRentalHistory(id, { status });
      setItems((prev) => prev.map((item) => (item._id === id ? updated : item)));
    } catch (err) {
      setActionError(err instanceof ApiClientError ? err.message : "Could not update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRequestReview = async (rentalHistoryId: string) => {
    setRequestingId(rentalHistoryId);
    setActionError(null);
    try {
      await createReviewRequest({
        rentalHistoryId,
        message: "Please review my rental experience.",
      });
    } catch (err) {
      setActionError(err instanceof ApiClientError ? err.message : "Could not request review.");
    } finally {
      setRequestingId(null);
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewRental) return;
    setIsSubmittingReview(true);
    setActionError(null);
    try {
      await createReview({
        rentalHistoryId: reviewRental._id,
        rating: reviewForm.rating,
        title: reviewForm.title,
        comment: reviewForm.comment,
        tags: reviewForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
      setReviewRental(null);
      setReviewForm({ rating: 5, title: "", comment: "", tags: "" });
      await load();
    } catch (err) {
      setActionError(err instanceof ApiClientError ? err.message : "Could not submit review.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const title = role === "landlord" ? "Rental History" : "My Rental History";
  const counterpartyLabel = role === "landlord" ? "Tenant" : "Landlord";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="mt-1 text-muted-foreground">
              Manage completed approvals, reviews, and rental records.
            </p>
          </div>

          {actionError && (
            <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {actionError}
            </div>
          )}

          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="glass h-36 animate-pulse rounded-2xl" />
              ))}
            </div>
          )}

          {!isLoading && error && (
            <div className="py-12 text-center">
              <Icon name="ExclamationCircleIcon" size={48} className="mx-auto mb-3 text-destructive" />
              <p className="mb-4 font-semibold text-destructive">{error}</p>
              <button onClick={load} className="rounded-xl bg-primary px-6 py-2.5 font-semibold text-white">
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !error && items.length === 0 && (
            <div className="glass rounded-2xl py-16 text-center">
              <Icon name="HomeModernIcon" size={56} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-bold text-foreground">No Rental History Yet</h2>
              <p className="mx-auto max-w-sm text-muted-foreground">
                Approved applications with rental records will appear here.
              </p>
            </div>
          )}

          {!isLoading && !error && items.length > 0 && (
            <div className="space-y-4">
              {items.map((item) => {
                const property = asProperty(item.propertyId);
                const counterparty = asUser(
                  role === "landlord" ? item.tenantId : item.landlordId
                );
                return (
                  <div key={item._id} className="glass rounded-2xl p-5">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="h-28 w-full overflow-hidden rounded-xl bg-muted sm:w-36">
                        <AppImage
                          src={primaryImage(property)}
                          alt={property?.title ?? "Property"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">
                              {property?.title ?? "Property"}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {property ? `${property.city}, ${property.state}` : "-"}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              RENTAL_STATUS_STYLES[item.status]
                            }`}
                          >
                            {RENTAL_STATUS_LABELS[item.status]}
                          </span>
                        </div>

                        <div className="mb-3 grid gap-3 text-sm sm:grid-cols-4">
                          <div>
                            <p className="text-xs text-muted-foreground">{counterpartyLabel}</p>
                            <p className="font-semibold text-foreground">
                              {counterparty?.fullName ?? "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Rent</p>
                            <p className="font-semibold text-foreground">
                              ₹{item.monthlyRent.toLocaleString()}/mo
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Deposit</p>
                            <p className="font-semibold text-foreground">
                              ₹{item.depositAmount.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Dates</p>
                            <p className="font-semibold text-foreground">
                              {formatDate(item.startDate)} - {formatDate(item.endDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {role === "landlord" && (
                            <select
                              value={item.status}
                              disabled={updatingId === item._id}
                              onChange={(event) =>
                                handleStatusChange(
                                  item._id,
                                  event.target.value as RentalHistoryStatus
                                )
                              }
                              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground"
                            >
                              {STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                  {RENTAL_STATUS_LABELS[status]}
                                </option>
                              ))}
                            </select>
                          )}
                          <button
                            onClick={() => setReviewRental(item)}
                            className="rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white"
                          >
                            Review {counterpartyLabel.toLowerCase()}
                          </button>
                          <button
                            onClick={() => handleRequestReview(item._id)}
                            disabled={requestingId === item._id}
                            className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-60"
                          >
                            {requestingId === item._id
                              ? "Requesting..."
                              : `Request review from ${counterpartyLabel.toLowerCase()}`}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {reviewRental && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="glass w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <h3 className="mb-4 text-lg font-bold text-foreground">Leave a Review</h3>
            <div className="space-y-3">
              <select
                value={reviewForm.rating}
                onChange={(event) =>
                  setReviewForm((prev) => ({ ...prev, rating: Number(event.target.value) }))
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              >
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} stars
                  </option>
                ))}
              </select>
              <input
                value={reviewForm.title}
                onChange={(event) =>
                  setReviewForm((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="Review title"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              />
              <textarea
                value={reviewForm.comment}
                onChange={(event) =>
                  setReviewForm((prev) => ({ ...prev, comment: event.target.value }))
                }
                rows={4}
                placeholder="Share your rental experience"
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm"
              />
              <input
                value={reviewForm.tags}
                onChange={(event) =>
                  setReviewForm((prev) => ({ ...prev, tags: event.target.value }))
                }
                placeholder="Tags separated by commas"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              />
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setReviewRental(null)}
                className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={isSubmittingReview}
                className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {isSubmittingReview ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
