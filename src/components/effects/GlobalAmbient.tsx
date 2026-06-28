"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const GLOW_ORBS: Array<{ top?: string; bottom?: string; left?: string; right?: string; size: number; color: string }> = [
  { top: "8%", left: "15%", size: 280, color: "rgba(37, 99, 235, 0.18)" },
  { top: "45%", right: "10%", size: 220, color: "rgba(56, 189, 248, 0.14)" },
  { bottom: "12%", left: "25%", size: 200, color: "rgba(59, 130, 246, 0.12)" },
];

export function GlobalAmbient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !ref.current) return;

    const orbs = ref.current.querySelectorAll(".ambient-orb");
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: i % 2 === 0 ? 30 : -25,
        y: i % 2 === 0 ? -20 : 25,
        duration: 8 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <div ref={ref} className="ambient-layer fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div className="ambient-mesh" />
      <div className="ambient-grid" />
      {GLOW_ORBS.map((orb, i) => (
        <div
          key={i}
          className="ambient-orb absolute rounded-full"
          style={{
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />
      ))}
    </div>
  );
}
