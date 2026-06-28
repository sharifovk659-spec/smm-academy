"use client";

import { useMemo } from "react";

interface SparkleFieldProps {
  count?: number;
  className?: string;
}

export function SparkleField({ count = 8, className = "" }: SparkleFieldProps) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${8 + ((i * 17) % 80)}%`,
        left: `${5 + ((i * 23) % 90)}%`,
        size: 6 + (i % 3) * 4,
        delay: i * 0.6,
        duration: 4 + (i % 3),
      })),
    [count]
  );

  return (
    <div className={`sparkle-field pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle-diamond absolute"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
