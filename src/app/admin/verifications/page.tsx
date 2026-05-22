"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import { ApiClientError } from "@/lib/api/client";
import {
  ApiVerification,
  VERIFICATION_STATUS_LABELS,
  VERIFICATION_STATUS_STYLES,
  VerificationStatus,
  VerificationType,
  getAdminVerifications,
  updateVerificationStatus,
} from "@/lib/api/verifications";

type ActionState = {
  id: string;
  status: "approved" | "rejected";
  title: string;
} | null;

export default function AdminVerificationsPage() {
  const [verifications, setVerifications] = useState<ApiVerification[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<"all" | VerificationStatus>("pending");
  const [type, setType] = useState<"all" | VerificationType>("all");
  const [userRole, setUserRole] = useState<"all" | "tenant" | "landlord">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState<ActionState>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAdminVerifications({
        page,
        limit: 20,
        status: status === "all" ? undefined : status,
        type: type === "all" ? undefined : type,
        userRole: userRole === "all" ? undefined : userRole,
      });
      setVerifications(data.verifications);
      setTotalPages(data.pagination.totalPages || 1);
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to load verifications.");
    } finally {
      setIsLoading(false);
    }
  }, [page, status, type, userRole]);

  useEffect(() => {
    load();
  }, [load]);

  const confirmAction = async () => {
    if (!action) return;
    setIsUpdating(true);
    setError(null);
    try {
      const updated = await updateVerificationStatus(action.id, {
        status: action.status,
        rejectionReason:
          action.status === "rejected" ? rejectionReason || "Rejected by admin" : undefined,
      });
      setVerifications((prev) =>
        prev.map((item) => (item._id === action.id ? updated : item))
      );
      setAction(null);
      setRejectionReason("");
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Could not update verification.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Verification Review</h1>
            <p className="mt-1 text-muted-foreground">
              Review tenant, landlord, and property verification requests.
            </p>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value as "all" | VerificationStatus);
                setPage(1);
              }}
              className="rounded-xl border border-border bg-background px-4 py-2 text-sm"
            >
              <option value="all">All statuses</option>
              {(["pending", "under_review", "approved", "rejected", "expired"] as const).map(
                (item) => (
                  <option key={item} value={item}>
                    {VERIFICATION_STATUS_LABELS[item]}
                  </option>
                )
              )}
            </select>
            <select
              value={type}
              onChange={(event) => {
                setType(event.target.value as "all" | VerificationType);
                setPage(1);
              }}
              className="rounded-xl border border-border bg-background px-4 py-2 text-sm"
            >
              <option value="all">All types</option>
              {(["identity", "income", "employment", "property", "background", "bank"] as const).map(
                (item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
              )}
            </select>
            <select
              value={userRole}
              onChange={(event) => {
                setUserRole(event.target.value as "all" | "tenant" | "landlord");
                setPage(1);
              }}
              className="rounded-xl border border-border bg-background px-4 py-2 text-sm"
            >
              <option value="all">All roles</option>
              <option value="tenant">Tenants</option>
              <option value="landlord">Landlords</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="glass h-64 animate-pulse rounded-2xl" />
          ) : verifications.length === 0 ? (
            <div className="glass rounded-2xl py-16 text-center">
              <Icon name="ShieldCheckIcon" size={56} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-bold text-foreground">No Requests Found</h2>
            </div>
          ) : (
            <div className="space-y-3">
              {verifications.map((item) => {
                const user = typeof item.userId === "object" ? item.userId : null;
                const property =
                  item.propertyId && typeof item.propertyId === "object"
                    ? item.propertyId
                    : null;
                return (
                  <div key={item._id} className="glass rounded-2xl p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold capitalize text-foreground">
                            {item.type} Verification
                          </h3>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              VERIFICATION_STATUS_STYLES[item.status]
                            }`}
                          >
                            {VERIFICATION_STATUS_LABELS[item.status]}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {user
                            ? `${user.fullName} • ${user.email} • ${user.role}`
                            : "Unknown user"}
                        </p>
                        {property && (
                          <p className="text-sm text-muted-foreground">
                            Property: {property.title}, {property.city}
                          </p>
                        )}
                        {item.adminNotes && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            Notes: {item.adminNotes}
                          </p>
                        )}
                        {item.documents[0]?.fileUrl && (
                          <a
                            href={item.documents[0].fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-flex text-sm font-semibold text-primary hover:underline"
                          >
                            Open document
                          </a>
                        )}
                      </div>
                      {item.status === "pending" || item.status === "under_review" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setAction({
                                id: item._id,
                                status: "approved",
                                title: `${item.type} verification`,
                              })
                            }
                            className="rounded-lg border border-success px-3 py-1.5 text-xs font-semibold text-success hover:bg-success hover:text-white"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              setAction({
                                id: item._id,
                                status: "rejected",
                                title: `${item.type} verification`,
                              })
                            }
                            className="rounded-lg border border-destructive px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive hover:text-white"
                          >
                            Reject
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center justify-between pt-3">
                <button
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  disabled={page <= 1}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-xs text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                  disabled={page >= totalPages}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {action && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="glass w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <h3 className="mb-2 text-lg font-bold text-foreground">
              {action.status === "approved" ? "Approve" : "Reject"} Verification
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">{action.title}</p>
            {action.status === "rejected" && (
              <textarea
                value={rejectionReason}
                onChange={(event) => setRejectionReason(event.target.value)}
                rows={3}
                placeholder="Reason for rejection"
                className="mb-4 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm"
              />
            )}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setAction(null);
                  setRejectionReason("");
                }}
                className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                disabled={isUpdating}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60 ${
                  action.status === "approved" ? "bg-success" : "bg-destructive"
                }`}
              >
                {isUpdating ? "Updating..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
