"use client";

import { useEffect, useState } from "react";

interface UseCounterOptions {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  active?: boolean;
}

export function useCounter({
  end,
  duration = 2,
  start = 0,
  decimals = 0,
  active = true,
}: UseCounterOptions) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!active) return;

    let frame: number;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, start, decimals, active]);

  return count;
}
