"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import { ApiClientError } from "@/lib/api/client";
import {
  ApiScore,
  ApiScoreFactor,
  SCORE_GRADE_STYLES,
  getMyScore,
  recalculateMyScore,
} from "@/lib/api/score";

function FactorCard({ title, factor }: { title: string; factor?: ApiScoreFactor }) {
  if (!factor) return null;
  const percent = Math.round((factor.points / factor.maxPoints) * 100);
  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold text-foreground">{title}</h3>
        <span className="text-sm font-bold text-foreground">
          {factor.points}/{factor.maxPoints}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        {Object.entries(factor)
          .filter(([key]) => !["points", "maxPoints"].includes(key))
          .slice(0, 6)
          .map(([key, value]) => (
            <div key={key} className="rounded-lg bg-muted/40 px-2 py-1">
              <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}: </span>
              <span className="font-semibold text-foreground">{String(value)}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default function ScoreDetailPage({ role }: { role: "tenant" | "landlord" }) {
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

  const tips =
    role === "tenant"
      ? ["Complete verification", "Request reviews", "Maintain successful rental history", "Keep applications accurate"]
      : ["Complete verification", "Request reviews", "Maintain successful rental history", "Keep property information accurate"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">NivaasCred Score</h1>
              <p className="mt-1 text-muted-foreground">
                A platform trust score for rental relationships.
              </p>
            </div>
            <button
              onClick={handleRecalculate}
              disabled={isRecalculating}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {isRecalculating ? "Recalculating..." : "Recalculate"}
            </button>
          </div>

          {isLoading && <div className="glass h-64 animate-pulse rounded-2xl" />}

          {!isLoading && error && (
            <div className="py-12 text-center">
              <Icon name="ExclamationCircleIcon" size={48} className="mx-auto mb-3 text-destructive" />
              <p className="font-semibold text-destructive">{error}</p>
            </div>
          )}

          {!isLoading && !error && score && (
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current score</p>
                    <p className="text-5xl font-bold text-foreground">{score.score}</p>
                  </div>
                  <span
                    className={`rounded-full px-4 py-1.5 text-sm font-bold ${
                      SCORE_GRADE_STYLES[score.grade]
                    }`}
                  >
                    {score.grade}
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Last calculated {new Date(score.lastCalculatedAt).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FactorCard title="Reviews" factor={score.breakdown.reviews} />
                <FactorCard title="Rental History" factor={score.breakdown.rentalHistory} />
                <FactorCard
                  title={role === "tenant" ? "Applications" : "Property Trust"}
                  factor={
                    role === "tenant"
                      ? score.breakdown.applications
                      : score.breakdown.propertyTrust
                  }
                />
                <FactorCard title="Verification" factor={score.breakdown.verification} />
              </div>

              <div className="glass rounded-2xl p-6">
                <h2 className="mb-4 text-lg font-bold text-foreground">Improvement Tips</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {tips.map((tip) => (
                    <div key={tip} className="flex items-center gap-3 rounded-xl bg-muted/40 p-3">
                      <Icon name="CheckCircleIcon" size={18} className="text-success" />
                      <span className="text-sm font-medium text-foreground">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
