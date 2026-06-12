"use client";

import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header style={{
      background: "linear-gradient(180deg, #0D1628 0%, var(--surface) 100%)",
      borderBottom: "1px solid var(--border)",
      padding: "48px 24px 40px",
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* ── Top row: logo + title + profile ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>

          {/* App identity */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: "linear-gradient(145deg, #A8822A 0%, #5C4310 100%)",
              border: "2px solid #A8822A40",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, fontWeight: 900, color: "#fff",
              boxShadow: "0 4px 24px #A8822A30",
              flexShrink: 0,
            }}>M</div>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 900, color: "#D4B862", letterSpacing: 2, textTransform: "uppercase", lineHeight: 1 }}>
                Mojo Quiz App
              </h1>
              <p style={{ fontSize: 12, color: "var(--text-dim)", letterSpacing: 2, marginTop: 5, textTransform: "uppercase" }}>
                AI-Powered Study Companion
              </p>
            </div>
          </div>

          {/* Profile card */}
          <div style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            minWidth: 220,
          }}>
            {/* Photo */}
            <div style={{
              width: 52, height: 52, borderRadius: "50%", overflow: "hidden",
              border: "2px solid var(--gold)", flexShrink: 0,
              background: "var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Image
                src="/mojo.jpg"
                alt="Mojo"
                width={52}
                height={52}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>Moses Francis</div>
              <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 600, marginTop: 2 }}>Computer Science Student</div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--border), transparent)", margin: "28px 0" }} />

        {/* ── School affiliations ── */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>

          {/* NDSU */}
          <div style={{
            flex: 1, minWidth: 240,
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, overflow: "hidden",
              background: "#1A2840", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Image
                src="/ndsu-logo.png"
                alt="NDSU"
                width={44}
                height={44}
                style={{ objectFit: "contain", width: "100%", height: "100%", padding: 4 }}
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = "none";
                  const parent = el.parentElement;
                  if (parent) parent.innerHTML = '<span style="font-size:11px;font-weight:800;color:#A8822A;text-align:center;line-height:1.2;">NDSU</span>';
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>North Dakota State University</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>Fargo, North Dakota · USA</div>
              <div style={{ fontSize: 10, color: "var(--gold)", marginTop: 3, fontWeight: 600, letterSpacing: 0.5 }}>B.S. Computer Science</div>
            </div>
          </div>

          {/* ETSL */}
          <div style={{
            flex: 1, minWidth: 240,
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, overflow: "hidden",
              background: "#1A2840", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Image
                src="/etsl-logo.png"
                alt="ETSL"
                width={44}
                height={44}
                style={{ objectFit: "contain", width: "100%", height: "100%", padding: 4 }}
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = "none";
                  const parent = el.parentElement;
                  if (parent) parent.innerHTML = '<span style="font-size:10px;font-weight:800;color:#A8822A;text-align:center;line-height:1.2;">ETSL</span>';
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>Eastern Technical University</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>Sierra Leone · West Africa</div>
              <div style={{ fontSize: 10, color: "var(--gold)", marginTop: 3, fontWeight: 600, letterSpacing: 0.5 }}>Information Technology</div>
            </div>
          </div>
        </div>

        {/* ── Tagline ── */}
        <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ height: 1, flex: 1, background: "var(--border)", minWidth: 40 }} />
          <span style={{ fontSize: 12, color: "var(--text-dim)", letterSpacing: 2, textTransform: "uppercase" }}>
            E-Commerce 2023 · Laudon &amp; Traver · 17th Edition
          </span>
          <div style={{ height: 1, flex: 1, background: "var(--border)", minWidth: 40 }} />
        </div>
      </div>
    </header>
  );
}
