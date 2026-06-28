"use client";

import { useEffect, useRef, useState } from "react";
import { useCounter } from "@/hooks/useCounter";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCounter({ end, duration, decimals, active });
  const formatted = decimals > 0 ? count.toFixed(decimals) : count.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
