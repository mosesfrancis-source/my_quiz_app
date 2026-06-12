"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { saveQuizResult } from "@/lib/firestore";
import type { Answer, Question, TopicScore } from "@/types";

interface ResultData {
  answers: Answer[];
  questions: Question[];
  topicScores: Record<string, TopicScore>;
}

export default function ResultsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState<ResultData | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("quiz_result");
    if (!raw) { router.replace("/"); return; }
    const result: ResultData = JSON.parse(raw);
    setData(result);

    // Save to Firestore if logged in
    if (user) {
      const config = JSON.parse(sessionStorage.getItem("quiz_config") || "{}");
      const totalCorrect = result.answers.filter((a) => a.selected === a.correct).length;
      const pct = Math.round((totalCorrect / result.answers.length) * 100);
      const grade = pct >= 90 ? "A" : pct >= 80 ? "B" : pct >= 70 ? "C" : pct >= 60 ? "D" : "F";

      saveQuizResult({
        userId: user.uid,
        topics: config.selectedTopicNames || [],
        numQuestions: result.answers.length,
        difficulty: config.difficulty || "mixed",
        score: totalCorrect,
        percentage: pct,
        grade,
        topicScores: result.topicScores,
        answers: result.answers,
        questions: result.questions,
        createdAt: new Date(),
      })
        .then(() => setSaved(true))
        .catch(console.error);
    }
  }, [user, router]);

  if (!data) return null;

  const totalCorrect = data.answers.filter((a) => a.selected === a.correct).length;
  const pct = Math.round((totalCorrect / data.answers.length) * 100);
  const grade = pct >= 90 ? "A" : pct >= 80 ? "B" : pct >= 70 ? "C" : pct >= 60 ? "D" : "F";
  const gradeColor = pct >= 70 ? "#C9A227" : "#ef4444";
  const msg =
    pct >= 90 ? "Outstanding! You've mastered this material." :
    pct >= 80 ? "Great work — you know your stuff." :
    pct >= 70 ? "Good effort. A bit more review and you'll nail it." :
    "Keep studying — revisit the topics and try again.";

  return (
    <div style={{ minHeight: "calc(100vh - 53px)", background: "#0F172A", fontFamily: "Arial, sans-serif", padding: "24px 16px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        {/* Score card */}
        <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: "28px", textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 800, color: gradeColor, lineHeight: 1 }}>{grade}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginTop: 6 }}>{pct}%</div>
          <div style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>{totalCorrect} of {data.answers.length} correct</div>
          <div style={{ fontSize: 14, color: "#94A3B8", marginTop: 12, lineHeight: 1.5 }}>{msg}</div>
          {user && saved && (
            <div style={{ marginTop: 14, fontSize: 12, color: "#4ade80" }}>✓ Result saved to your history</div>
          )}
          {user && !saved && (
            <div style={{ marginTop: 14, fontSize: 12, color: "#64748B" }}>Saving…</div>
          )}
          {!user && (
            <div style={{ marginTop: 14, fontSize: 12, color: "#64748B" }}>
              <a href="/auth" style={{ color: "#C9A227", textDecoration: "none", fontWeight: 700 }}>Sign in</a> to save your scores
            </div>
          )}
        </div>

        {/* By topic */}
        {Object.keys(data.topicScores).length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: 2, marginBottom: 10 }}>
              BREAKDOWN BY TOPIC
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(data.topicScores).map(([topic, s]) => {
                const tp = Math.round((s.correct / s.total) * 100);
                return (
                  <div key={topic} style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ flex: 1, fontSize: 13, color: "#CBD5E1" }}>{topic}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>{s.correct}/{s.total}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: tp >= 70 ? "#4ade80" : "#f87171", minWidth: 40, textAlign: "right" }}>{tp}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Question review */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: 2, marginBottom: 10 }}>
            QUESTION REVIEW
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.questions.map((q, i) => {
              const a = data.answers[i];
              const correct = a?.selected === q.correct;
              return (
                <div key={i} style={{ background: "#1E293B", border: `1px solid ${correct ? "#16a34a40" : "#dc262640"}`, borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{correct ? "✅" : "❌"}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#E2E8F0", lineHeight: 1.4 }}>{q.q}</span>
                  </div>
                  {!correct && a && (
                    <div style={{ fontSize: 12, color: "#f87171", marginLeft: 26, marginBottom: 4 }}>
                      Your answer: {q.options[a.selected]}
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: "#86efac", marginLeft: 26, marginBottom: 4 }}>
                    Correct: {q.options[q.correct]}
                  </div>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginLeft: 26, lineHeight: 1.5 }}>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            type="button"
            onClick={() => router.push("/setup")}
            style={{ padding: "14px", background: "#C9A227", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, color: "#0F172A", cursor: "pointer" }}
          >
            Try Another Quiz →
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            style={{ padding: "14px", background: "#1E293B", border: "1px solid #334155", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "#94A3B8", cursor: "pointer" }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
