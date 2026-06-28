"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const type = el.dataset.reveal || "up";
        const delay = parseFloat(el.dataset.revealDelay || "0");

        const from: gsap.TweenVars = { opacity: 0, duration: 0.8, ease: "power3.out", delay };
        if (type === "up") from.y = 50;
        if (type === "down") from.y = -50;
        if (type === "left") from.x = -50;
        if (type === "right") from.x = 50;
        if (type === "scale") from.scale = 0.9;

        gsap.from(el, {
          ...from,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.3");
        gsap.to(el, {
          y: () => speed * -100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    const onMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      gsap.to(glowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="mouse-glow fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 opacity-50"
        aria-hidden="true"
      />
      {children}
    </>
  );
}
