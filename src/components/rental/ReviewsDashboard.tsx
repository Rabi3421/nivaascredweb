"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import { ApiClientError } from "@/lib/api/client";
import {
  ApiReview,
  ApiReviewProperty,
  ApiReviewUser,
  getGivenReviews,
  getReceivedReviews,
} from "@/lib/api/reviews";
import {
  ApiReviewRequest,
  REVIEW_REQUEST_STATUS_LABELS,
  getReviewRequests,
  updateReviewRequestStatus,
} from "@/lib/api/review-requests";

function asUser(value: ApiReview["reviewerId"]): ApiReviewUser | null {
  return typeof value === "object" ? value : null;
}

function asProperty(value: ApiReview["propertyId"]): ApiReviewProperty | null {
  return value && typeof value === "object" ? value : null;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ReviewCard({
  review,
  mode,
}: {
  review: ApiReview;
  mode: "received" | "given";
}) {
  const user = asUser(mode === "received" ? review.reviewerId : review.revieweeId);
  const property = asProperty(review.propertyId);
  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-foreground">{review.title ?? "Review"}</h3>
          <p className="text-sm text-muted-foreground">
            {mode === "received" ? "From" : "For"} {user?.fullName ?? "User"}
            {property ? ` • ${property.title}, ${property.city}` : ""}
          </p>
        </div>
        <span className="rounded-full bg-warning/10 px-3 py-1 text-xs font-bold text-warning">
          {review.rating}/5
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{review.comment}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>{formatDate(review.createdAt)}</span>
        {review.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-muted px-2 py-1">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ReviewsDashboard({ role }: { role: "landlord" | "tenant" }) {
  const [received, setReceived] = useState<ApiReview[]>([]);
  const [given, setGiven] = useState<ApiReview[]>([]);
  const [requests, setRequests] = useState<ApiReviewRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [updatingRequestId, setUpdatingRequestId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [receivedReviews, givenReviews, reviewRequests] = await Promise.all([
        getReceivedReviews(),
        getGivenReviews(),
        getReviewRequests(),
      ]);
      setReceived(receivedReviews);
      setGiven(givenReviews);
      setRequests(reviewRequests);
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to load reviews.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleRequestStatus = async (id: string, status: "completed" | "declined") => {
    setUpdatingRequestId(id);
    setActionError(null);
    try {
      const updated = await updateReviewRequestStatus(id, { status });
      setRequests((prev) => prev.map((request) => (request._id === id ? updated : request)));
    } catch (err) {
      setActionError(err instanceof ApiClientError ? err.message : "Could not update request.");
    } finally {
      setUpdatingRequestId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
            <p className="mt-1 text-muted-foreground">
              Track reviews you have received, written, and been requested to write.
            </p>
          </div>

          {actionError && (
            <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {actionError}
            </div>
          )}

          {isLoading && <div className="glass h-64 animate-pulse rounded-2xl" />}

          {!isLoading && error && (
            <div className="py-12 text-center">
              <Icon name="ExclamationCircleIcon" size={48} className="mx-auto mb-3 text-destructive" />
              <p className="mb-4 font-semibold text-destructive">{error}</p>
              <button onClick={load} className="rounded-xl bg-primary px-6 py-2.5 font-semibold text-white">
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <section>
                <h2 className="mb-3 text-lg font-bold text-foreground">Received</h2>
                <div className="space-y-3">
                  {received.length === 0 ? (
                    <div className="glass rounded-2xl p-6 text-sm text-muted-foreground">
                      No reviews received yet.
                    </div>
                  ) : (
                    received.map((review) => (
                      <ReviewCard key={review._id} review={review} mode="received" />
                    ))
                  )}
                </div>
              </section>

              <section>
                <h2 className="mb-3 text-lg font-bold text-foreground">Given</h2>
                <div className="space-y-3">
                  {given.length === 0 ? (
                    <div className="glass rounded-2xl p-6 text-sm text-muted-foreground">
                      No reviews written yet.
                    </div>
                  ) : (
                    given.map((review) => (
                      <ReviewCard key={review._id} review={review} mode="given" />
                    ))
                  )}
                </div>
              </section>

              <section className="lg:col-span-2">
                <h2 className="mb-3 text-lg font-bold text-foreground">
                  Requests Received
                </h2>
                <div className="space-y-3">
                  {requests.length === 0 ? (
                    <div className="glass rounded-2xl p-6 text-sm text-muted-foreground">
                      No review requests right now.
                    </div>
                  ) : (
                    requests.map((request) => {
                      const requester =
                        typeof request.requesterId === "object"
                          ? request.requesterId
                          : null;
                      const property =
                        typeof request.propertyId === "object"
                          ? request.propertyId
                          : null;
                      return (
                        <div key={request._id} className="glass rounded-2xl p-5">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="font-bold text-foreground">
                                {requester?.fullName ?? "User"} requested a review
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {property
                                  ? `${property.title}, ${property.city}`
                                  : "Rental history"}
                              </p>
                            </div>
                            <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-foreground">
                              {REVIEW_REQUEST_STATUS_LABELS[request.status]}
                            </span>
                          </div>
                          {request.status === "pending" && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              <a
                                href={`/${role}/rental-history`}
                                className="rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white"
                              >
                                Write Review
                              </a>
                              <button
                                disabled={updatingRequestId === request._id}
                                onClick={() =>
                                  handleRequestStatus(request._id, "completed")
                                }
                                className="rounded-lg border border-success px-3 py-1.5 text-xs font-semibold text-success hover:bg-success hover:text-white disabled:opacity-60"
                              >
                                Mark Completed
                              </button>
                              <button
                                disabled={updatingRequestId === request._id}
                                onClick={() =>
                                  handleRequestStatus(request._id, "declined")
                                }
                                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-60"
                              >
                                Decline
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
