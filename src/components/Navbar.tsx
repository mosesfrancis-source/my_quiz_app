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
    <nav style={{
      background: "var(--surface)",
      borderBottom: "1px solid var(--border)",
      padding: "0 24px",
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(8px)",
    }}>
      {/* Brand */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, var(--gold) 0%, #7A5C18 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 900, color: "#fff", letterSpacing: -1,
        }}>M</div>
        <div>
          <span style={{ fontSize: 14, fontWeight: 800, color: "var(--gold-light)", letterSpacing: 1.5, textTransform: "uppercase" }}>
            Mojo Quiz
          </span>
          <span style={{ fontSize: 10, color: "var(--text-dim)", display: "block", letterSpacing: 2, lineHeight: 1, marginTop: 1 }}>
            AI STUDY APP
          </span>
        </div>
      </Link>

      {/* Nav links + auth */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Link href="/setup" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none", fontWeight: 600, padding: "6px 12px", borderRadius: 6 }}>
          Quiz
        </Link>
        {user && (
          <Link href="/history" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none", fontWeight: 600, padding: "6px 12px", borderRadius: 6 }}>
            History
          </Link>
        )}
        {user ? (
          <>
            <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 4px" }} />
            <span style={{ fontSize: 13, color: "var(--text-dim)" }}>
              {user.displayName?.split(" ")[0] || user.email?.split("@")[0]}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: "var(--card)", border: "1px solid var(--border)", borderRadius: 7,
                padding: "5px 12px", fontSize: 12, color: "var(--text-muted)", cursor: "pointer", fontWeight: 600,
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <Link href="/auth">
            <button type="button" style={{
              background: "var(--gold)", border: "none", borderRadius: 7,
              padding: "6px 16px", fontSize: 13, color: "#0B1221", cursor: "pointer", fontWeight: 700,
            }}>
              Sign in
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
