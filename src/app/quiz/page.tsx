"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import type { Question, Answer } from "@/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function QuizPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "quiz" | "error">("loading");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function generate() {
      const raw = sessionStorage.getItem("quiz_config");
      if (!raw) { router.replace("/setup"); return; }

      const { topicSummaries, numQuestions, difficulty } = JSON.parse(raw);

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topicSummaries, numQuestions, difficulty }),
        });
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || "Generation failed");
        setQuestions(shuffle(data.questions));
        setStatus("quiz");
      } catch (e: unknown) {
        setErrorMsg(e instanceof Error ? e.message : "Failed to generate questions. Please try again.");
        setStatus("error");
      }
    }
    generate();
  }, [router]);

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
  }

  function handleNext() {
    const newAnswers = [...answers, { selected: selected!, correct: questions[current].correct }];
    setAnswers(newAnswers);

    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      // Build topic score breakdown
      const topicScores: Record<string, { correct: number; total: number }> = {};
      newAnswers.forEach((a, i) => {
        const key = questions[i]?.topic || "General";
        if (!topicScores[key]) topicScores[key] = { correct: 0, total: 0 };
        topicScores[key].total++;
        if (a.selected === a.correct) topicScores[key].correct++;
      });

      sessionStorage.setItem(
        "quiz_result",
        JSON.stringify({ answers: newAnswers, questions, topicScores })
      );
      router.push("/results");
    }
  }

  if (status === "loading") return (
    <div style={{ minHeight: "calc(100vh - 53px)", background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <Spinner />
        <div style={{ fontSize: 18, fontWeight: 700, color: "#E2E8F0", marginTop: 20 }}>Generating your quiz…</div>
        <div style={{ fontSize: 13, color: "#64748B", marginTop: 8 }}>
          Claude is reading your summaries and writing fresh questions
        </div>
      </div>
    </div>
  );

  if (status === "error") return (
    <div style={{ minHeight: "calc(100vh - 53px)", background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", marginBottom: 8 }}>Something went wrong</div>
        <div style={{ fontSize: 14, color: "#94A3B8", marginBottom: 24 }}>{errorMsg}</div>
        <button type="button" onClick={() => router.push("/setup")} style={{ background: "#C9A227", border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 700, fontSize: 14, color: "#0F172A", cursor: "pointer" }}>
          ← Back to Setup
        </button>
      </div>
    </div>
  );

  const q = questions[current];
  const isCorrect = submitted && selected === q.correct;
  const progress = (current / questions.length) * 100;

  return (
    <div style={{ minHeight: "calc(100vh - 53px)", background: "#0F172A", fontFamily: "Arial, sans-serif", padding: "20px 16px" }}>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        {/* Progress bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 4, background: "#1E293B", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "#C9A227", borderRadius: 2, transition: "width 0.3s" }} />
          </div>
          <div style={{ fontSize: 12, color: "#64748B", fontWeight: 600, whiteSpace: "nowrap" }}>
            {current + 1} / {questions.length}
          </div>
        </div>

        {/* Topic badge */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#C9A227", letterSpacing: 1.5, marginBottom: 12 }}>
          {q.topic?.toUpperCase()}
        </div>

        {/* Question */}
        <div style={{ background: "#1E293B", borderRadius: 12, padding: "20px", marginBottom: 16, border: "1px solid #334155" }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#F1F5F9", lineHeight: 1.5 }}>{q.q}</div>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {q.options.map((opt, i) => {
            let bg = "#1E293B";
            let border = "1px solid #334155";
            let color = "#CBD5E1";

            if (!submitted && i === selected) { bg = "#1C729320"; border = "2px solid #1C7293"; color = "#fff"; }
            if (submitted && i === q.correct) { bg = "#14532d30"; border = "2px solid #16a34a"; color = "#86efac"; }
            if (submitted && i === selected && i !== q.correct) { bg = "#450a0a30"; border = "2px solid #dc2626"; color = "#fca5a5"; }

            let circleColor = "#334155";
            if (submitted && i === q.correct) circleColor = "#16a34a";
            else if (submitted && i === selected) circleColor = "#dc2626";
            else if (i === selected) circleColor = "#1C7293";

            return (
              <div
                key={i}
                onClick={() => !submitted && setSelected(i)}
                style={{ background: bg, border, borderRadius: 10, padding: "13px 16px", cursor: submitted ? "default" : "pointer", display: "flex", alignItems: "flex-start", gap: 12, transition: "all 0.15s" }}
              >
                <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginTop: 1, background: circleColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>
                  {submitted && i === q.correct ? "✓" : submitted && i === selected && i !== q.correct ? "✗" : String.fromCharCode(65 + i)}
                </div>
                <span style={{ fontSize: 14, color, lineHeight: 1.5 }}>{opt}</span>
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        {submitted && (
          <div style={{
            background: isCorrect ? "#14532d30" : "#450a0a30",
            border: `1px solid ${isCorrect ? "#16a34a" : "#dc2626"}`,
            borderRadius: 10, padding: "14px 16px", marginBottom: 16,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: isCorrect ? "#86efac" : "#fca5a5", marginBottom: 6 }}>
              {isCorrect ? "✓ Correct!" : `✗ Correct answer: ${q.options[q.correct]}`}
            </div>
            <div style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.6 }}>{q.explanation}</div>
          </div>
        )}

        {/* Action button */}
        {!submitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={selected === null}
            style={{
              width: "100%", padding: "14px",
              background: selected !== null ? "#C9A227" : "#334155",
              border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700,
              color: selected !== null ? "#0F172A" : "#475569",
              cursor: selected !== null ? "pointer" : "not-allowed",
            }}
          >
            Submit Answer
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            style={{
              width: "100%", padding: "14px", background: "#C9A227",
              border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700,
              color: "#0F172A", cursor: "pointer",
            }}
          >
            {current < questions.length - 1 ? "Next Question →" : "See Results →"}
          </button>
        )}
      </div>
    </div>
  );
}
