"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ApiClientError } from "@/lib/api/client";
import {
  ApiScore,
  SCORE_GRADE_STYLES,
  getMyScore,
  recalculateMyScore,
} from "@/lib/api/score";

export default function ScoreCard({ role }: { role: "tenant" | "landlord" }) {
  const [score, setScore] = useState<ApiScore | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setScore(await getMyScore());
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to load score.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleRecalculate = async () => {
    try {
      setIsRecalculating(true);
      setError(null);
      setScore(await recalculateMyScore());
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to recalculate.");
    } finally {
      setIsRecalculating(false);
    }
  };

  const percent = score
    ? Math.round(((score.score - score.minScore) / (score.maxScore - score.minScore)) * 100)
    : 0;

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">NivaasCred Score</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Based on reviews, rental history,{" "}
            {role === "tenant" ? "applications" : "property trust"}, and verification.
          </p>
        </div>
        {score && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              SCORE_GRADE_STYLES[score.grade]
            }`}
          >
            {score.grade}
          </span>
        )}
      </div>

      {isLoading && <div className="h-28 animate-pulse rounded-xl bg-muted" />}

      {!isLoading && error && (
        <div className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {!isLoading && !error && score && (
        <>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold text-foreground">{score.score}</p>
              <p className="text-sm text-muted-foreground">out of {score.maxScore}</p>
            </div>
            <Link href={`/${role}/score`} className="text-sm font-semibold text-primary hover:underline">
              View details
            </Link>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <button
            onClick={handleRecalculate}
            disabled={isRecalculating}
            className="mt-5 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-secondary disabled:opacity-60"
          >
            {isRecalculating ? "Recalculating..." : "Recalculate"}
          </button>
        </>
      )}
    </div>
  );
}
