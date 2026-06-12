"use client";

import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      padding: "40px 24px 24px",
      marginTop: "auto",
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* ── Top row ── */}
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 32 }}>

          {/* Brand */}
          <div style={{ flex: "0 0 200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: "linear-gradient(145deg, #A8822A 0%, #5C4310 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 900, color: "#fff",
              }}>M</div>
              <span style={{ fontSize: 14, fontWeight: 800, color: "var(--gold-light)", letterSpacing: 1 }}>MOJO QUIZ APP</span>
            </div>
            <p style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.7 }}>
              AI-powered quiz platform for e-commerce studies. Built with Claude AI.
            </p>
          </div>

          {/* Quick links */}
          <div style={{ flex: "0 0 140px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-dim)", letterSpacing: 2, marginBottom: 12 }}>NAVIGATION</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[["Home", "/"], ["Start Quiz", "/setup"], ["History", "/history"], ["Sign In", "/auth"]].map(([label, href]) => (
                <Link key={label} href={href} style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Schools */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-dim)", letterSpacing: 2, marginBottom: 12 }}>AFFILIATED INSTITUTIONS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* NDSU */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, overflow: "hidden",
                  background: "#1A2840", border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Image
                    src="/ndsu-logo.png"
                    alt="NDSU"
                    width={36}
                    height={36}
                    style={{ objectFit: "contain", padding: 3 }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>North Dakota State University</div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)" }}>Fargo, ND — Computer Science</div>
                </div>
              </div>

              {/* ETSL */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, overflow: "hidden",
                  background: "#1A2840", border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Image
                    src="/etsl-logo.png"
                    alt="ETSL"
                    width={36}
                    height={36}
                    style={{ objectFit: "contain", padding: 3 }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>Eastern Technical University</div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)" }}>Sierra Leone — Information Technology</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}>
          <span style={{ fontSize: 12, color: "var(--text-dim)" }}>
            © {year} Mojo Quiz App · Moses Francis
          </span>
          <span style={{ fontSize: 11, color: "var(--text-dim)" }}>
            Powered by Claude AI · Firebase · Next.js
          </span>
        </div>
      </div>
    </footer>
  );
}
