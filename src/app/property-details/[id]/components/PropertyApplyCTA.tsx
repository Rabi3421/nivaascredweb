"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/AppIcon";
import { useAuth } from "@/context/AuthContext";
import { applyForProperty } from "@/lib/api/applications";
import { ApiClientError } from "@/lib/api/client";

interface Props {
  propertyId: string;
  propertyTitle: string;
}

type ModalState = "idle" | "form" | "success" | "alreadyApplied";

export default function PropertyApplyCTA({ propertyId, propertyTitle }: Props) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [modalState, setModalState] = useState<ModalState>("idle");
  const [message, setMessage] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isTenant = user?.role === "tenant";
  const isLandlordOrAdmin =
    user?.role === "landlord" ||
    user?.role === "admin" ||
    user?.role === "superadmin";

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?next=/property-details/${propertyId}`);
      return;
    }
    setModalState("form");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await applyForProperty({
        propertyId,
        message: message.trim() || undefined,
        moveInDate: moveInDate || undefined,
      });
      setModalState("success");
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (err.status === 409) {
          setModalState("alreadyApplied");
        } else {
          setError(err.message);
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setModalState("idle");
    setMessage("");
    setMoveInDate("");
    setError(null);
  };

  if (isLoading) {
    return <div className="h-12 bg-muted rounded-xl animate-pulse" />;
  }

  return (
    <>
      {/* CTA Button */}
      {!isAuthenticated ? (
        <button
          onClick={handleApplyClick}
          className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Icon name="PaperAirplaneIcon" size={20} />
          <span>Apply for this Property</span>
        </button>
      ) : isTenant ? (
        <button
          onClick={handleApplyClick}
          className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Icon name="PaperAirplaneIcon" size={20} />
          <span>Apply Now</span>
        </button>
      ) : isLandlordOrAdmin ? (
        <div className="w-full px-6 py-3 bg-muted text-muted-foreground rounded-xl font-semibold flex items-center justify-center space-x-2 cursor-not-allowed select-none">
          <Icon name="InformationCircleIcon" size={20} />
          <span>Only tenants can apply</span>
        </div>
      ) : null}

      {/* Apply form modal */}
      {(modalState === "form" ||
        modalState === "success" ||
        modalState === "alreadyApplied") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            {/* Success state */}
            {modalState === "success" && (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircleIcon" size={32} className="text-success" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Application Submitted!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your application for{" "}
                  <span className="font-semibold text-foreground">
                    {propertyTitle}
                  </span>{" "}
                  has been sent to the landlord.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => router.push("/tenant/applications")}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-secondary transition-colors"
                  >
                    View Applications
                  </button>
                </div>
              </div>
            )}

            {/* Already applied state */}
            {modalState === "alreadyApplied" && (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="ExclamationTriangleIcon" size={32} className="text-warning" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Already Applied
                </h3>
                <p className="text-muted-foreground mb-6">
                  You already have an application for this property.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => router.push("/tenant/applications")}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-secondary transition-colors"
                  >
                    View My Applications
                  </button>
                </div>
              </div>
            )}

            {/* Form state */}
            {modalState === "form" && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-foreground">
                    Apply for Property
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="XMarkIcon" size={20} />
                  </button>
                </div>

                <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
                  {propertyTitle}
                </p>

                {error && (
                  <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Message to Landlord
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Introduce yourself — your profession, family size, why you're interested… (min 20 chars if filled)"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Optional. If left empty, a default message will be sent.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Preferred Move-in Date
                    </label>
                    <input
                      type="date"
                      value={moveInDate}
                      onChange={(e) => setMoveInDate(e.target.value)}
                      min={new Date().toISOString().slice(0, 10)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-secondary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting…" : "Submit Application"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
