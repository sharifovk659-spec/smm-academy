import { ReactNode } from "react";

interface LuxuryCardProps {
  children: ReactNode;
  className?: string;
  padding?: string;
}

export function LuxuryCard({
  children,
  className = "",
  padding = "p-6 sm:p-8",
}: LuxuryCardProps) {
  return (
    <div className={`luxury-card ${padding} h-full ${className}`.trim()}>
      <div className="luxury-card-glow" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
