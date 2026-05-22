"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import {
  getLandlordApplications,
  updateApplicationStatus,
  STATUS_LABELS,
  STATUS_STYLES,
  type ApiApplication,
  type ApiApplicationUser,
  type ApiApplicationProperty,
  type ApplicationStatus,
} from "@/lib/api/applications";
import {
  createRentalHistory,
  getLandlordRentalHistories,
  type ApiRentalHistory,
  type RentalHistoryStatus,
  RENTAL_STATUS_LABELS,
} from "@/lib/api/rental-histories";
import { ApiClientError } from "@/lib/api/client";

const PLACEHOLDER_AVATAR =
  "https://img.rocket.new/generatedImages/rocket_gen_img_11c395459-1763301246668.png";

function getTenant(app: ApiApplication): ApiApplicationUser | null {
  return typeof app.tenantId === "object" ? app.tenantId : null;
}

function getProperty(app: ApiApplication): ApiApplicationProperty | null {
  return typeof app.propertyId === "object" ? app.propertyId : null;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type ConfirmAction = {
  appId: string;
  newStatus: "approved" | "rejected" | "shortlisted";
  tenantName: string;
} | null;

const ACTION_STYLES: Record<string, string> = {
  shortlisted: "border-primary text-primary hover:bg-primary hover:text-white",
  approved: "border-success text-success hover:bg-success hover:text-white",
  rejected: "border-destructive text-destructive hover:bg-destructive hover:text-white",
};

const ACTION_LABELS: Record<string, string> = {
  shortlisted: "Shortlist",
  approved: "Accept",
  rejected: "Reject",
};

type StatusFilter = "all" | ApplicationStatus;

type RentalHistoryForm = {
  applicationId: string;
  monthlyRent: number;
  depositAmount: number;
  startDate: string;
  endDate: string;
  status: RentalHistoryStatus;
} | null;

export default function LandlordTenantRequestsPage() {
  const [applications, setApplications] = useState<ApiApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [landlordNote, setLandlordNote] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [rentalHistories, setRentalHistories] = useState<ApiRentalHistory[]>([]);
  const [rentalForm, setRentalForm] = useState<RentalHistoryForm>(null);
  const [isCreatingRental, setIsCreatingRental] = useState(false);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [applicationData, rentalData] = await Promise.all([
        getLandlordApplications(),
        getLandlordRentalHistories(),
      ]);
      setApplications(applicationData);
      setRentalHistories(rentalData);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError("Failed to load applications. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusUpdate = async () => {
    if (!confirmAction) return;
    setIsUpdating(confirmAction.appId);
    setUpdateError(null);

    try {
      const updated = await updateApplicationStatus(confirmAction.appId, {
        status: confirmAction.newStatus,
        landlordNote: landlordNote.trim() || undefined,
      });
      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app._id === confirmAction.appId
            ? { ...app, status: updated.status }
            : // If this app was auto-rejected by the backend (on approve), refresh from server
              app
        )
      );
      // Re-fetch to reflect any cascade auto-rejections
      if (confirmAction.newStatus === "approved") {
        await load();
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        setUpdateError(err.message);
      } else {
        setUpdateError("Update failed. Please try again.");
      }
    } finally {
      setIsUpdating(null);
      setConfirmAction(null);
      setLandlordNote("");
    }
  };

  const handleCreateRentalHistory = async () => {
    if (!rentalForm) return;
    setIsCreatingRental(true);
    setUpdateError(null);
    try {
      await createRentalHistory({
        applicationId: rentalForm.applicationId,
        startDate: rentalForm.startDate,
        endDate: rentalForm.endDate || undefined,
        monthlyRent: rentalForm.monthlyRent,
        depositAmount: rentalForm.depositAmount,
        status: rentalForm.status,
      });
      setRentalForm(null);
      await load();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setUpdateError(err.message);
      } else {
        setUpdateError("Could not create rental history. Please try again.");
      }
    } finally {
      setIsCreatingRental(false);
    }
  };

  const filteredApplications =
    statusFilter === "all"
      ? applications
      : applications.filter((a) => a.status === statusFilter);

  const statusCounts = applications.reduce<Record<string, number>>(
    (acc, a) => {
      acc[a.status] = (acc[a.status] ?? 0) + 1;
      return acc;
    },
    {}
  );

  const activeStatuses: StatusFilter[] = [
    "all",
    "pending",
    "shortlisted",
    "approved",
    "rejected",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Tenant Applications</h1>
            <p className="text-muted-foreground mt-1">
              Review and manage applications for your properties.
            </p>
          </div>

          {/* Update error banner */}
          {updateError && (
            <div className="mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm flex items-center justify-between">
              <span>{updateError}</span>
              <button onClick={() => setUpdateError(null)} className="ml-3 flex-shrink-0">
                <Icon name="XMarkIcon" size={16} />
              </button>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass rounded-2xl p-5 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-muted rounded w-1/2" />
                      <div className="h-4 bg-muted rounded w-1/3" />
                      <div className="h-4 bg-muted rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!isLoading && error && (
            <div className="text-center py-12">
              <Icon
                name="ExclamationCircleIcon"
                size={48}
                className="text-destructive mx-auto mb-3"
              />
              <p className="text-destructive font-semibold mb-4">{error}</p>
              <button
                onClick={load}
                className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !error && applications.length === 0 && (
            <div className="text-center py-16 glass rounded-2xl">
              <Icon
                name="UserGroupIcon"
                size={56}
                className="text-muted-foreground mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-foreground mb-2">
                No Applications Yet
              </h2>
              <p className="text-muted-foreground max-w-xs mx-auto">
                When tenants apply to your properties, their applications will appear here.
              </p>
            </div>
          )}

          {/* Filter tabs + list */}
          {!isLoading && !error && applications.length > 0 && (
            <>
              {/* Status filter tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {activeStatuses.map((s) => {
                  const count = s === "all" ? applications.length : statusCounts[s] ?? 0;
                  return (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                        statusFilter === s
                          ? "bg-primary text-white"
                          : "bg-muted text-foreground hover:bg-primary/10"
                      }`}
                    >
                      {s === "all" ? "All" : STATUS_LABELS[s as ApplicationStatus] ?? s}{" "}
                      <span
                        className={`ml-1 text-xs ${
                          statusFilter === s ? "text-white/80" : "text-muted-foreground"
                        }`}
                      >
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>

              {filteredApplications.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No applications with status{" "}
                  <span className="font-semibold">
                    {STATUS_LABELS[statusFilter as ApplicationStatus] ?? statusFilter}
                  </span>
                  .
                </p>
              )}

              <div className="space-y-4">
                {filteredApplications.map((app) => {
                  const tenant = getTenant(app);
                  const property = getProperty(app);
                  const profile = app.tenantProfile;
                  const rentalHistory = rentalHistories.find(
                    (rental) => rental.applicationId === app._id
                  );

                  return (
                    <div
                      key={app._id}
                      className="glass rounded-2xl p-5 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row gap-5">
                        {/* Tenant avatar */}
                        <div className="flex-shrink-0">
                          <AppImage
                            src={tenant?.avatar ?? PLACEHOLDER_AVATAR}
                            alt={tenant?.fullName ?? "Tenant"}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                        </div>

                        {/* Main content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
                            <div>
                              <h3 className="font-bold text-foreground text-lg">
                                {tenant?.fullName ?? "Tenant"}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-0.5">
                                {tenant?.email && <span>{tenant.email}</span>}
                                {tenant?.phone && <span>{tenant.phone}</span>}
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                                STATUS_STYLES[app.status] ??
                                "bg-muted text-muted-foreground"
                              }`}
                            >
                              {STATUS_LABELS[app.status] ?? app.status}
                            </span>
                          </div>

                          {/* Property */}
                          {property && (
                            <div className="mt-2 p-3 bg-muted/30 rounded-xl text-sm">
                              <span className="font-semibold text-foreground">
                                {property.title}
                              </span>
                              <span className="text-muted-foreground">
                                {" "}
                                — {property.city}, {property.state} •{" "}
                                ₹{property.rentAmount.toLocaleString()}/mo
                              </span>
                            </div>
                          )}

                          {/* Tenant profile summary */}
                          {profile && (
                            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {profile.occupation && (
                                <div className="text-center p-2 bg-muted/20 rounded-lg">
                                  <p className="text-xs text-muted-foreground">Occupation</p>
                                  <p className="text-sm font-semibold text-foreground truncate">
                                    {profile.occupation}
                                  </p>
                                </div>
                              )}
                              {profile.monthlyIncome && (
                                <div className="text-center p-2 bg-muted/20 rounded-lg">
                                  <p className="text-xs text-muted-foreground">Income</p>
                                  <p className="text-sm font-semibold text-foreground">
                                    {profile.monthlyIncome}
                                  </p>
                                </div>
                              )}
                              {profile.rentalScore !== undefined && (
                                <div className="text-center p-2 bg-primary/10 rounded-lg">
                                  <p className="text-xs text-muted-foreground">Rental Score</p>
                                  <p className="text-sm font-bold text-primary">
                                    {profile.rentalScore}
                                  </p>
                                </div>
                              )}
                              {profile.verificationStatus && (
                                <div className="text-center p-2 bg-muted/20 rounded-lg">
                                  <p className="text-xs text-muted-foreground">Verified</p>
                                  <p className="text-sm font-semibold text-foreground">
                                    {
                                      Object.values(profile.verificationStatus).filter(
                                        Boolean
                                      ).length
                                    }
                                    /
                                    {
                                      Object.values(profile.verificationStatus).length
                                    }
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Application details */}
                          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Icon name="CalendarIcon" size={12} />
                              <span>Applied {formatDate(app.createdAt)}</span>
                            </span>
                            {app.moveInDate && (
                              <span className="flex items-center space-x-1">
                                <Icon name="HomeModernIcon" size={12} />
                                <span>Move-in {formatDate(app.moveInDate)}</span>
                              </span>
                            )}
                          </div>

                          {app.message && (
                            <blockquote className="mt-3 pl-3 border-l-2 border-primary/30 text-sm text-muted-foreground italic line-clamp-2">
                              {app.message}
                            </blockquote>
                          )}

                          {/* Action buttons — only show for actionable statuses */}
                          {["pending", "shortlisted"].includes(app.status) && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {(["shortlisted", "approved", "rejected"] as const).map(
                                (action) => {
                                  if (action === "shortlisted" && app.status === "shortlisted") {
                                    return null;
                                  }
                                  return (
                                    <button
                                      key={action}
                                      disabled={isUpdating === app._id}
                                      onClick={() =>
                                        setConfirmAction({
                                          appId: app._id,
                                          newStatus: action,
                                          tenantName: tenant?.fullName ?? "this tenant",
                                        })
                                      }
                                      className={`px-4 py-1.5 border rounded-lg text-xs font-semibold transition-all disabled:opacity-50 ${
                                        ACTION_STYLES[action]
                                      }`}
                                    >
                                      {isUpdating === app._id
                                        ? "Updating…"
                                        : ACTION_LABELS[action]}
                                    </button>
                                  );
                                }
                              )}
                            </div>
                          )}

                          {app.status === "approved" && (
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                              {rentalHistory ? (
                                <span className="rounded-lg bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
                                  Rental history {RENTAL_STATUS_LABELS[rentalHistory.status]}
                                </span>
                              ) : (
                                <button
                                  onClick={() =>
                                    setRentalForm({
                                      applicationId: app._id,
                                      monthlyRent: property?.rentAmount ?? 0,
                                      depositAmount: 0,
                                      startDate:
                                        app.moveInDate?.slice(0, 10) ??
                                        new Date().toISOString().slice(0, 10),
                                      endDate: "",
                                      status: "active",
                                    })
                                  }
                                  className="rounded-lg border border-success px-4 py-1.5 text-xs font-semibold text-success transition-all hover:bg-success hover:text-white"
                                >
                                  Create Rental History
                                </button>
                              )}
                            </div>
                          )}

                          {/* Note for rejected applications */}
                          {app.status === "rejected" && app.rejectionReason && (
                            <div className="mt-3 p-3 bg-destructive/10 rounded-lg text-sm text-destructive">
                              <span className="font-semibold">Note: </span>
                              {app.rejectionReason}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />

      {/* Confirmation modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center space-x-3 mb-5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  confirmAction.newStatus === "approved"
                    ? "bg-success/10"
                    : confirmAction.newStatus === "rejected"
                    ? "bg-destructive/10"
                    : "bg-primary/10"
                }`}
              >
                <Icon
                  name={
                    confirmAction.newStatus === "approved"
                      ? "CheckCircleIcon"
                      : confirmAction.newStatus === "rejected"
                      ? "XCircleIcon"
                      : "StarIcon"
                  }
                  size={20}
                  className={
                    confirmAction.newStatus === "approved"
                      ? "text-success"
                      : confirmAction.newStatus === "rejected"
                      ? "text-destructive"
                      : "text-primary"
                  }
                />
              </div>
              <div>
                <h3 className="font-bold text-foreground">
                  {confirmAction.newStatus === "approved"
                    ? "Accept Application"
                    : confirmAction.newStatus === "rejected"
                    ? "Reject Application"
                    : "Shortlist Tenant"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {confirmAction.newStatus === "approved"
                    ? "Other pending applications for this property will be automatically rejected."
                    : `For ${confirmAction.tenantName}`}
                </p>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Note{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                value={landlordNote}
                onChange={(e) => setLandlordNote(e.target.value)}
                rows={3}
                placeholder={
                  confirmAction.newStatus === "rejected"
                    ? "Reason for rejection (visible to tenant)"
                    : "Optional note for your records"
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-sm"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setConfirmAction(null);
                  setLandlordNote("");
                }}
                className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                disabled={!!isUpdating}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60 ${
                  confirmAction.newStatus === "approved"
                    ? "bg-success hover:bg-success/90"
                    : confirmAction.newStatus === "rejected"
                    ? "bg-destructive hover:bg-destructive/90"
                    : "bg-primary hover:bg-secondary"
                }`}
              >
                {isUpdating ? "Updating…" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {rentalForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="mb-5">
              <h3 className="font-bold text-foreground">Create Rental History</h3>
              <p className="text-sm text-muted-foreground">
                Confirm the commercial terms for this approved application.
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-foreground">Start date</span>
                  <input
                    type="date"
                    value={rentalForm.startDate}
                    onChange={(e) =>
                      setRentalForm((prev) =>
                        prev ? { ...prev, startDate: e.target.value } : prev
                      )
                    }
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-foreground">End date</span>
                  <input
                    type="date"
                    value={rentalForm.endDate}
                    onChange={(e) =>
                      setRentalForm((prev) =>
                        prev ? { ...prev, endDate: e.target.value } : prev
                      )
                    }
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-foreground">Monthly rent</span>
                <input
                  type="number"
                  min={1}
                  value={rentalForm.monthlyRent}
                  onChange={(e) =>
                    setRentalForm((prev) =>
                      prev ? { ...prev, monthlyRent: Number(e.target.value) } : prev
                    )
                  }
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-foreground">Deposit amount</span>
                <input
                  type="number"
                  min={0}
                  value={rentalForm.depositAmount}
                  onChange={(e) =>
                    setRentalForm((prev) =>
                      prev ? { ...prev, depositAmount: Number(e.target.value) } : prev
                    )
                  }
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-foreground">Status</span>
                <select
                  value={rentalForm.status}
                  onChange={(e) =>
                    setRentalForm((prev) =>
                      prev
                        ? { ...prev, status: e.target.value as RentalHistoryStatus }
                        : prev
                    )
                  }
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                >
                  {(["active", "completed", "terminated"] as const).map((status) => (
                    <option key={status} value={status}>
                      {RENTAL_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-5 flex space-x-3">
              <button
                onClick={() => setRentalForm(null)}
                className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRentalHistory}
                disabled={isCreatingRental}
                className="flex-1 rounded-xl bg-success px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {isCreatingRental ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
