"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { DEFAULT_TOPICS, TOPIC_COLORS } from "@/lib/topics";
import SiteHeader from "@/components/SiteHeader";
import type { Topic } from "@/types";

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
    setNewTitle(""); setNewChapter(""); setNewSummary("");
    setShowAdd(false);
  }

  function handleStartQuiz() {
    sessionStorage.setItem("quiz_topics", JSON.stringify(topics));
  }

  const inputSt: React.CSSProperties = {
    width: "100%", background: "var(--bg)", border: "1px solid var(--border)",
    borderRadius: 8, padding: "9px 12px", color: "var(--text)", fontSize: 13, outline: "none",
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100%" }}>
      <SiteHeader />

      {/* ── Hero CTA ── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 24px 0" }}>
        <div style={{
          background: "linear-gradient(135deg, #0D1628 0%, var(--card) 100%)",
          border: "1px solid var(--border)",
          borderRadius: 16, padding: "32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 20,
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: 2, marginBottom: 8 }}>
              READY TO STUDY?
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", margin: "0 0 8px", lineHeight: 1.3 }}>
              Generate a fresh quiz in seconds
            </h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 420 }}>
              Claude reads your course summaries and writes original questions every time —
              no two quizzes are the same.
              {user
                ? ` Your scores are saved automatically, ${user.displayName?.split(" ")[0] || ""}!`
                : " Sign in to save your progress."}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/setup" onClick={handleStartQuiz}>
              <button type="button" style={{
                background: "var(--gold)", border: "none", borderRadius: 10,
                padding: "12px 28px", fontSize: 14, fontWeight: 700,
                color: "#0B1221", cursor: "pointer",
              }}>
                Start a Quiz →
              </button>
            </Link>
            {!user && (
              <Link href="/auth">
                <button type="button" style={{
                  background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10,
                  padding: "12px 20px", fontSize: 14, fontWeight: 600,
                  color: "var(--text-muted)", cursor: "pointer",
                }}>
                  Sign in
                </button>
              </Link>
            )}
            {user && (
              <Link href="/history">
                <button type="button" style={{
                  background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10,
                  padding: "12px 20px", fontSize: 14, fontWeight: 600,
                  color: "var(--text-muted)", cursor: "pointer",
                }}>
                  View History
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Topics ── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 24px 48px" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-dim)", letterSpacing: 2 }}>
            {topics.length} COURSE TOPICS
          </div>
          <Link href="/setup" onClick={handleStartQuiz} style={{ fontSize: 12, color: "var(--gold)", textDecoration: "none", fontWeight: 600 }}>
            Select topics →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 10 }}>
          {topics.map((t) => (
            <div key={t.id} style={{
              background: "var(--card)", borderRadius: 10, padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 14,
              border: "1px solid var(--border)",
              transition: "border-color 0.15s",
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10, background: t.color + "22",
                border: `1px solid ${t.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0,
              }}>
                {t.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {t.title}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>{t.chapter}</div>
              </div>
              <div style={{
                marginLeft: "auto", width: 6, height: 6, borderRadius: "50%",
                background: t.color, flexShrink: 0,
              }} />
            </div>
          ))}

          {/* Add topic */}
          {!showAdd ? (
            <button
              type="button"
              onClick={() => setShowAdd(true)}
              style={{
                background: "transparent", border: "2px dashed var(--border)", borderRadius: 10,
                padding: "14px", fontSize: 13, fontWeight: 600, color: "var(--text-dim)",
                cursor: "pointer", textAlign: "center", minHeight: 70,
              }}
            >
              + Add New Topic
            </button>
          ) : (
            <div style={{
              background: "var(--card)", border: "1px solid var(--gold)", borderRadius: 10,
              padding: 18, gridColumn: "1 / -1",
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)", marginBottom: 14 }}>Add New Topic</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                <input value={newChapter} onChange={(e) => setNewChapter(e.target.value)} placeholder="Chapter label (e.g. Chapter 6)" style={inputSt} />
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Topic title *" style={inputSt} />
              </div>
              <textarea
                value={newSummary} onChange={(e) => setNewSummary(e.target.value)}
                placeholder="Paste your lecture notes or summary here *"
                rows={5} style={{ ...inputSt, resize: "vertical" }}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button type="button" onClick={addTopic} disabled={!newTitle.trim() || !newSummary.trim()} style={{
                  flex: 1, background: "var(--gold)", border: "none", borderRadius: 8, padding: "10px",
                  fontWeight: 700, color: "#0B1221", cursor: "pointer", fontSize: 13,
                  opacity: !newTitle.trim() || !newSummary.trim() ? 0.5 : 1,
                }}>Add Topic</button>
                <button type="button" onClick={() => setShowAdd(false)} style={{
                  flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8,
                  padding: "10px", fontWeight: 600, color: "var(--text-muted)", cursor: "pointer", fontSize: 13,
                }}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
