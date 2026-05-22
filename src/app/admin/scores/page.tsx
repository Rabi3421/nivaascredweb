"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import { ApiClientError } from "@/lib/api/client";
import {
  ApiAdminScoreUser,
  SCORE_GRADE_STYLES,
  getAdminScoreUsers,
  recalculateUserScore,
} from "@/lib/api/score";

export default function AdminScoresPage() {
  const [users, setUsers] = useState<ApiAdminScoreUser[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [role, setRole] = useState<"all" | "tenant" | "landlord">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recalculatingId, setRecalculatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAdminScoreUsers({
        page,
        limit: 20,
        role: role === "all" ? undefined : role,
      });
      setUsers(data.users);
      setTotalPages(data.pagination.totalPages || 1);
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to load scores.");
    } finally {
      setIsLoading(false);
    }
  }, [page, role]);

  useEffect(() => {
    load();
  }, [load]);

  const handleRecalculate = async (userId: string) => {
    setRecalculatingId(userId);
    setError(null);
    try {
      const updated = await recalculateUserScore(userId);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, score: updated.score, grade: updated.grade }
            : user
        )
      );
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to recalculate user.");
    } finally {
      setRecalculatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">User Scores</h1>
              <p className="mt-1 text-muted-foreground">
                Monitor NivaasCred scores across tenants and landlords.
              </p>
            </div>
            <select
              value={role}
              onChange={(event) => {
                setRole(event.target.value as "all" | "tenant" | "landlord");
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

          {isLoading && <div className="glass h-64 animate-pulse rounded-2xl" />}

          {!isLoading && users.length === 0 && !error && (
            <div className="glass rounded-2xl py-16 text-center">
              <Icon name="UsersIcon" size={56} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-bold text-foreground">No Users Found</h2>
            </div>
          )}

          {!isLoading && users.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Score</th>
                      <th className="px-4 py-3">Grade</th>
                      <th className="px-4 py-3">Verification</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.map((user) => {
                      const verificationCount = user.verificationStatus
                        ? Object.values(user.verificationStatus).filter(Boolean).length
                        : 0;
                      const verificationTotal = user.verificationStatus
                        ? Object.values(user.verificationStatus).length
                        : 0;
                      return (
                        <tr key={user._id}>
                          <td className="px-4 py-4">
                            <p className="font-semibold text-foreground">{user.fullName}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </td>
                          <td className="px-4 py-4 capitalize text-muted-foreground">
                            {user.role}
                          </td>
                          <td className="px-4 py-4 font-bold text-foreground">
                            {user.score}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-bold ${
                                SCORE_GRADE_STYLES[user.grade]
                              }`}
                            >
                              {user.grade}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-muted-foreground">
                            {verificationTotal > 0
                              ? `${verificationCount}/${verificationTotal}`
                              : "-"}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button
                              onClick={() => handleRecalculate(user._id)}
                              disabled={recalculatingId === user._id}
                              className="rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white disabled:opacity-60"
                            >
                              {recalculatingId === user._id ? "Recalculating..." : "Recalculate"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between border-t border-border px-4 py-3">
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
    </div>
  );
}
