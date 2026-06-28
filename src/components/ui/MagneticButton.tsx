"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  strength?: number;
  glow?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  glow = true,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <a
      ref={ref}
      className={`magnetic-btn ${glow ? "magnetic-glow" : ""} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </a>
  );
}
