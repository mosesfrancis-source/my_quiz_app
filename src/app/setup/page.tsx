"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_TOPICS } from "@/lib/topics";
import type { Topic, Difficulty } from "@/types";

export default function SetupPage() {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>(DEFAULT_TOPICS);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty>("mixed");
  const [error, setError] = useState("");

  // Load any custom topics added on home page
  useEffect(() => {
    const stored = sessionStorage.getItem("quiz_topics");
    if (stored) {
      try {
        setTopics(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  function toggle(id: string) {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function handleGenerate() {
    if (selectedTopics.length === 0) return;
    setError("");

    const chosen = topics.filter((t) => selectedTopics.includes(t.id));
    const topicSummaries = chosen
      .map((t) => `=== ${t.chapter}: ${t.title} ===\n${t.summary}`)
      .join("\n\n");

    // Store config in sessionStorage for the quiz page
    sessionStorage.setItem(
      "quiz_config",
      JSON.stringify({ topicSummaries, numQuestions, difficulty, selectedTopicNames: chosen.map((t) => t.title) })
    );

    router.push("/quiz");
  }

  return (
    <div style={{ minHeight: "calc(100vh - 53px)", background: "#0F172A", fontFamily: "Arial, sans-serif", padding: "24px 20px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <button
          type="button"
          onClick={() => router.push("/")}
          style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", fontSize: 13, marginBottom: 20 }}
        >
          ← Back
        </button>

        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>Set up your quiz</h2>
        <p style={{ fontSize: 14, color: "#64748B", marginBottom: 28 }}>
          Claude will generate fresh questions from your selected topics.
        </p>

        {/* Topic selection */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: 2, marginBottom: 10 }}>
            SELECT TOPICS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {topics.map((t) => {
              const on = selectedTopics.includes(t.id);
              return (
                <div
                  key={t.id}
                  onClick={() => toggle(t.id)}
                  style={{
                    background: on ? t.color + "25" : "#1E293B",
                    border: `2px solid ${on ? t.color : "#334155"}`,
                    borderRadius: 10, padding: "12px 14px",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: 4,
                    border: `2px solid ${on ? t.color : "#475569"}`,
                    background: on ? t.color : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {on && <span style={{ fontSize: 12, color: "#fff" }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 13, color: "#E2E8F0" }}>
                    {t.icon} {t.chapter}: {t.title}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={() => setSelectedTopics(topics.map((t) => t.id))}
              style={{
                background: "#1E293B", border: "1px solid #334155", borderRadius: 6,
                padding: "6px 12px", fontSize: 12, color: "#64748B", cursor: "pointer",
              }}
            >
              Select All
            </button>
            <button
              type="button"
              onClick={() => setSelectedTopics([])}
              style={{
                background: "#1E293B", border: "1px solid #334155", borderRadius: 6,
                padding: "6px 12px", fontSize: 12, color: "#64748B", cursor: "pointer",
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Question count */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: 2, marginBottom: 10 }}>
            NUMBER OF QUESTIONS
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[5, 10, 15, 20].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNumQuestions(n)}
                style={{
                  flex: 1, padding: "10px 0", borderRadius: 8,
                  border: `2px solid ${numQuestions === n ? "#C9A227" : "#334155"}`,
                  background: numQuestions === n ? "#C9A22720" : "#1E293B",
                  color: numQuestions === n ? "#C9A227" : "#94A3B8",
                  fontWeight: 700, cursor: "pointer", fontSize: 14,
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: 2, marginBottom: 10 }}>
            DIFFICULTY
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {([["easy", "Easy 😊"], ["mixed", "Mixed 🎯"], ["hard", "Hard 🔥"]] as const).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setDifficulty(val)}
                style={{
                  flex: 1, padding: "10px 0", borderRadius: 8,
                  border: `2px solid ${difficulty === val ? "#C9A227" : "#334155"}`,
                  background: difficulty === val ? "#C9A22720" : "#1E293B",
                  color: difficulty === val ? "#C9A227" : "#94A3B8",
                  fontWeight: 700, cursor: "pointer", fontSize: 13,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div style={{
            background: "#450a0a", border: "1px solid #991b1b", borderRadius: 8,
            padding: "12px 14px", color: "#fca5a5", fontSize: 13, marginBottom: 16,
          }}>
            ⚠ {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGenerate}
          disabled={selectedTopics.length === 0}
          style={{
            width: "100%", padding: "16px",
            background: selectedTopics.length > 0 ? "#C9A227" : "#334155",
            border: "none", borderRadius: 10, fontSize: 16, fontWeight: 700,
            color: selectedTopics.length > 0 ? "#0F172A" : "#475569",
            cursor: selectedTopics.length > 0 ? "pointer" : "not-allowed",
          }}
        >
          Generate {numQuestions} Questions with AI →
        </button>
        {selectedTopics.length === 0 && (
          <div style={{ textAlign: "center", color: "#475569", fontSize: 12, marginTop: 8 }}>
            Select at least one topic to continue
          </div>
        )}
      </div>
    </div>
  );
}
