"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, logOut } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logOut();
    router.push("/");
  }

  return (
    <nav
      style={{
        background: "#0F172A",
        borderBottom: "1px solid #1E293B",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: "#C9A227", letterSpacing: -0.3 }}>
          QuizAI
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {user ? (
          <>
            <Link href="/history" style={{ fontSize: 13, color: "#94A3B8", textDecoration: "none", fontWeight: 600 }}>
              History
            </Link>
            <span style={{ fontSize: 13, color: "#475569" }}>
              {user.displayName || user.email?.split("@")[0]}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: "#1E293B",
                border: "1px solid #334155",
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 13,
                color: "#94A3B8",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <Link href="/auth">
            <button
              style={{
                background: "#C9A227",
                border: "none",
                borderRadius: 8,
                padding: "6px 16px",
                fontSize: 13,
                color: "#0F172A",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Sign in
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
