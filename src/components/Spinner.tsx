"use client";

import { useEffect, useState } from "react";

export default function Spinner({ size = 52 }: { size?: number }) {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setAngle((a) => (a + 10) % 360), 30);
    return () => clearInterval(id);
  }, []);

  const r = size * 0.42;
  const cx = size / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <div style={{ width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="#1E293B" strokeWidth="4" />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="#C9A227"
          strokeWidth="4"
          strokeDasharray={`${circumference * 0.25} ${circumference * 0.75}`}
          strokeLinecap="round"
          transform={`rotate(${angle} ${cx} ${cx})`}
        />
      </svg>
    </div>
  );
}
