"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { DEFAULT_TOPICS, TOPIC_COLORS } from "@/lib/topics";
import type { Topic } from "@/types";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#0F172A",
  border: "1px solid #334155",
  borderRadius: 8,
  padding: "10px 12px",
  color: "#E2E8F0",
  fontSize: 13,
  outline: "none",
};

export default function HomePage() {
  const { user } = useAuth();
  const [topics, setTopics] = useState<Topic[]>(DEFAULT_TOPICS);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newChapter, setNewChapter] = useState("");
  const [newSummary, setNewSummary] = useState("");

  function addTopic() {
    if (!newTitle.trim() || !newSummary.trim()) return;
    const id = "custom_" + Date.now();
    setTopics((prev) => [
      ...prev,
      {
        id,
        chapter: newChapter || "Custom",
        title: newTitle.trim(),
        color: TOPIC_COLORS[prev.length % TOPIC_COLORS.length],
        icon: "📖",
        summary: newSummary.trim(),
      },
    ]);
    setNewTitle("");
    setNewChapter("");
    setNewSummary("");
    setShowAdd(false);
  }

  // Store topics in sessionStorage so Setup page can read them
  function handleStartQuiz() {
    sessionStorage.setItem("quiz_topics", JSON.stringify(topics));
  }

  return (
    <div style={{ minHeight: "calc(100vh - 53px)", background: "#0F172A", fontFamily: "Arial, sans-serif", color: "#fff" }}>
      {/* Hero */}
      <div style={{ padding: "48px 20px 32px", maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <div style={{
          display: "inline-block", background: "#C9A22720", border: "1px solid #C9A22750",
          borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 700,
          color: "#C9A227", letterSpacing: 2, marginBottom: 20,
        }}>
          E-COMMERCE 2023 · LAUDON &amp; TRAVER
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, margin: "0 0 14px", letterSpacing: -0.5 }}>
          Your AI Quiz<br />
          <span style={{ color: "#C9A227" }}>Study Companion</span>
        </h1>
        <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.7, margin: "0 0 28px" }}>
          Claude generates fresh questions from your course summaries every session — no two quizzes are the same.
          {user
            ? ` Welcome back, ${user.displayName || user.email?.split("@")[0]}!`
            : " Sign in to save your quiz history."}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/setup" onClick={handleStartQuiz}>
            <button style={{
              background: "#C9A227", border: "none", borderRadius: 10, padding: "14px 32px",
              fontSize: 16, fontWeight: 700, color: "#0F172A", cursor: "pointer",
            }}>
              Start a Quiz →
            </button>
          </Link>
          {user && (
            <Link href="/history">
              <button style={{
                background: "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: "14px 24px",
                fontSize: 15, fontWeight: 600, color: "#94A3B8", cursor: "pointer",
              }}>
                View History
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Topic cards */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px 60px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", letterSpacing: 2, marginBottom: 14 }}>
          {topics.length} TOPICS AVAILABLE
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {topics.map((t) => (
            <div key={t.id} style={{
              background: "#1E293B", borderRadius: 10, padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 14,
              border: "1px solid #334155",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8, background: t.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, flexShrink: 0,
              }}>
                {t.icon}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#E2E8F0" }}>{t.title}</div>
                <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{t.chapter}</div>
              </div>
            </div>
          ))}

          {/* Add topic */}
          {!showAdd ? (
            <button
              onClick={() => setShowAdd(true)}
              style={{
                background: "transparent", border: "2px dashed #334155", borderRadius: 10,
                padding: "14px", fontSize: 13, fontWeight: 600, color: "#475569",
                cursor: "pointer", textAlign: "center",
              }}
            >
              + Add New Topic
            </button>
          ) : (
            <div style={{ background: "#1E293B", border: "1px solid #C9A227", borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#C9A227", marginBottom: 14 }}>Add New Topic</div>
              <input
                value={newChapter}
                onChange={(e) => setNewChapter(e.target.value)}
                placeholder="Chapter label (e.g. Chapter 6)"
                style={inputStyle}
              />
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Topic title *"
                style={{ ...inputStyle, marginTop: 8 }}
              />
              <textarea
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
                placeholder="Paste your lecture notes or summary here *"
                rows={6}
                style={{ ...inputStyle, marginTop: 8, resize: "vertical" }}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button
                  onClick={addTopic}
                  disabled={!newTitle.trim() || !newSummary.trim()}
                  style={{
                    flex: 1, background: "#C9A227", border: "none", borderRadius: 8,
                    padding: "10px", fontWeight: 700, color: "#0F172A", cursor: "pointer",
                    fontSize: 13, opacity: !newTitle.trim() || !newSummary.trim() ? 0.5 : 1,
                  }}
                >
                  Add Topic
                </button>
                <button
                  onClick={() => setShowAdd(false)}
                  style={{
                    flex: 1, background: "#334155", border: "none", borderRadius: 8,
                    padding: "10px", fontWeight: 600, color: "#94A3B8", cursor: "pointer", fontSize: 13,
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
