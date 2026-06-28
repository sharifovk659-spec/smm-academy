"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const DESKTOP_OBJECTS = [
  { size: 6, top: "12%", left: "4%", speed: 0.02, delay: 0 },
  { size: 10, top: "28%", right: "6%", speed: 0.03, delay: 1 },
  { size: 8, top: "55%", left: "3%", speed: 0.025, delay: 0.5 },
  { size: 12, top: "70%", right: "4%", speed: 0.035, delay: 1.5 },
  { size: 5, top: "85%", left: "8%", speed: 0.02, delay: 2 },
  { size: 7, top: "40%", right: "10%", speed: 0.028, delay: 0.8 },
];

const MOBILE_OBJECTS = [
  { size: 5, top: "15%", left: "6%", speed: 0.02, delay: 0 },
  { size: 8, top: "60%", right: "8%", speed: 0.025, delay: 0.5 },
  { size: 6, top: "80%", left: "10%", speed: 0.02, delay: 1 },
];

export function FloatingObjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [objects, setObjects] = useState(DESKTOP_OBJECTS);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setObjects(mq.matches ? MOBILE_OBJECTS : DESKTOP_OBJECTS);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const container = containerRef.current;
    if (!container || reduced) return;

    const floatObjs = container.querySelectorAll(".float-obj");

    floatObjs.forEach((obj, i) => {
      gsap.to(obj, {
        y: "+=18",
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: objects[i]?.delay ?? 0,
      });
    });

    const onMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (e.clientX - centerX) / centerX;
      const moveY = (e.clientY - centerY) / centerY;

      floatObjs.forEach((obj, i) => {
        const speed = objects[i]?.speed ?? 0.02;
        gsap.to(obj, {
          x: moveX * 60 * speed * 50,
          y: moveY * 40 * speed * 50,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [objects]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {objects.map((obj, i) => (
        <div
          key={i}
          className="float-obj absolute rounded-full border border-[#38bdf8]/25 bg-[#2563EB]/8"
          style={{
            width: obj.size,
            height: obj.size,
            top: obj.top,
            left: obj.left,
            right: obj.right,
            boxShadow: "0 0 16px rgba(56, 189, 248, 0.25)",
          }}
        />
      ))}
    </div>
  );
}
