"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getUserResults } from "@/lib/firestore";
import Spinner from "@/components/Spinner";
import type { QuizResult } from "@/types";

export default function HistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.replace("/auth"); return; }

    getUserResults(user.uid)
      .then(setResults)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, authLoading, router]);

  if (authLoading || loading) return (
    <div style={{ minHeight: "calc(100vh - 53px)", background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spinner />
    </div>
  );

  return (
    <div style={{ minHeight: "calc(100vh - 53px)", background: "#0F172A", fontFamily: "Arial, sans-serif", padding: "24px 16px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Quiz History</h2>
            <p style={{ fontSize: 13, color: "#64748B" }}>
              {results.length} quiz{results.length !== 1 ? "zes" : ""} completed
            </p>
          </div>
          <Link href="/setup">
            <button type="button" style={{ background: "#C9A227", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 700, color: "#0F172A", cursor: "pointer" }}>
              New Quiz →
            </button>
          </Link>
        </div>

        {results.length === 0 ? (
          <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: "48px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📚</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", marginBottom: 8 }}>No quizzes yet</div>
            <div style={{ fontSize: 14, color: "#64748B", marginBottom: 20 }}>
              Start your first quiz to see your results here.
            </div>
            <Link href="/setup">
              <button type="button" style={{ background: "#C9A227", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 700, color: "#0F172A", cursor: "pointer" }}>
                Start a Quiz
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Stats summary */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {[
                {
                  label: "Avg Score",
                  value: `${Math.round(results.reduce((s, r) => s + r.percentage, 0) / results.length)}%`,
                },
                {
                  label: "Best Score",
                  value: `${Math.max(...results.map((r) => r.percentage))}%`,
                },
                {
                  label: "Total Questions",
                  value: results.reduce((s, r) => s + r.numQuestions, 0).toString(),
                },
              ].map((stat) => (
                <div key={stat.label} style={{ flex: 1, background: "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#C9A227" }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Result cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {results.map((r) => {
                const gradeColor = r.percentage >= 70 ? "#4ade80" : "#f87171";
                const date = r.createdAt instanceof Date ? r.createdAt : new Date(r.createdAt);
                return (
                  <div key={r.id} style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12, padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#E2E8F0", marginBottom: 4 }}>
                          {r.topics.length > 0 ? r.topics.join(", ") : "Multiple topics"}
                        </div>
                        <div style={{ fontSize: 12, color: "#64748B" }}>
                          {date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} ·{" "}
                          {r.numQuestions} questions · {r.difficulty}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: gradeColor }}>{r.grade}</div>
                        <div style={{ fontSize: 12, color: "#64748B" }}>{r.percentage}%</div>
                      </div>
                    </div>

                    {/* Score bar */}
                    <div style={{ height: 4, background: "#334155", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${r.percentage}%`, background: gradeColor, borderRadius: 2, transition: "width 0.3s" }} />
                    </div>

                    <div style={{ marginTop: 8, fontSize: 12, color: "#64748B" }}>
                      {r.score} of {r.numQuestions} correct
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
