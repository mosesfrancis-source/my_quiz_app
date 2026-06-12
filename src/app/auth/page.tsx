"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthPage() {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        await signUp(email, password, displayName);
      }
      router.push("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setError(msg.replace("Firebase: ", "").replace(/\(auth\/.*\)\.?/, "").trim());
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google sign-in failed";
      setError(msg.replace("Firebase: ", "").replace(/\(auth\/.*\)\.?/, "").trim());
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "calc(100vh - 53px)", background: "#0F172A",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px", fontFamily: "Arial, sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Card */}
        <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 16, padding: "32px 28px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#F1F5F9", marginBottom: 6 }}>
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p style={{ fontSize: 13, color: "#64748B", marginBottom: 24 }}>
            {mode === "login"
              ? "Sign in to track your quiz history."
              : "Sign up to save your quiz scores and track progress."}
          </p>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            style={{
              width: "100%", background: "#fff", border: "1px solid #E2E8F0",
              borderRadius: 10, padding: "11px 16px", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 10, fontSize: 14, fontWeight: 600,
              color: "#1E293B", cursor: loading ? "not-allowed" : "pointer",
              marginBottom: 20, opacity: loading ? 0.7 : 1,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "#334155" }} />
            <span style={{ fontSize: 12, color: "#475569" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#334155" }} />
          </div>

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#94A3B8", display: "block", marginBottom: 6 }}>
                  Display name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  required
                  style={{
                    width: "100%", background: "#0F172A", border: "1px solid #334155",
                    borderRadius: 8, padding: "10px 12px", color: "#E2E8F0", fontSize: 14, outline: "none",
                  }}
                />
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#94A3B8", display: "block", marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: "100%", background: "#0F172A", border: "1px solid #334155",
                  borderRadius: 8, padding: "10px 12px", color: "#E2E8F0", fontSize: 14, outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#94A3B8", display: "block", marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                style={{
                  width: "100%", background: "#0F172A", border: "1px solid #334155",
                  borderRadius: 8, padding: "10px 12px", color: "#E2E8F0", fontSize: 14, outline: "none",
                }}
              />
            </div>

            {error && (
              <div style={{
                background: "#450a0a", border: "1px solid #991b1b", borderRadius: 8,
                padding: "10px 12px", color: "#fca5a5", fontSize: 13, marginBottom: 16,
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", background: "#C9A227", border: "none", borderRadius: 10,
                padding: "13px", fontSize: 15, fontWeight: 700, color: "#0F172A",
                cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <span style={{ fontSize: 13, color: "#64748B" }}>
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              type="button"
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
              style={{ background: "none", border: "none", color: "#C9A227", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
