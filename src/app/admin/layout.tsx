"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PageLoadingSkeleton } from "@/components/ui/LoadingSpinner";

export default function AdminLayout({
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
    if (user?.role === "tenant") {
      router.replace("/tenant/dashboard");
    } else if (user?.role === "landlord") {
      router.replace("/landlord/dashboard");
    }
  }, [isLoading, isAuthenticated, user, router]);

  const isAdminRole =
    user?.role === "admin" || user?.role === "superadmin";

  if (isLoading || !isAuthenticated || !isAdminRole) {
    return <PageLoadingSkeleton />;
  }

  return <>{children}</>;
}
