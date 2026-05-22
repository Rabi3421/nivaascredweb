"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PageLoadingSkeleton } from "@/components/ui/LoadingSpinner";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace("/auth/login");
      return;
    }
    if (user?.role === "landlord") {
      router.replace("/landlord/dashboard");
    } else if (user?.role === "admin" || user?.role === "superadmin") {
      router.replace("/admin/dashboard");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !isAuthenticated || user?.role !== "tenant") {
    return <PageLoadingSkeleton />;
  }

  return <>{children}</>;
}
