"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiCheck } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/AnimatedSection";
import { useCounter } from "@/hooks/useCounter";
import { useSiteConfig } from "@/context/SiteConfigContext";
import type { SiteConfig } from "@/config/index";

gsap.registerPlugin(ScrollTrigger);

function CounterDisplay({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  active,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  active: boolean;
}) {
  const count = useCounter({ end: value, duration: 2, decimals, active });
  const formatted = decimals > 0 ? count.toFixed(decimals) : count.toLocaleString();
  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

function ResultCard({
  item,
  index,
  labels,
}: {
  item: SiteConfig["studentResults"]["items"][number];
  index: number;
  labels: { result: string; before: string; after: string };
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const metrics = item.metrics;

  return (
    <div
      ref={cardRef}
      className="result-card luxury-card overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="p-5 sm:p-6 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">{item.name}</h3>
            <p className="text-xs text-muted mt-0.5">{item.role}</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[#2563EB]/15 text-accent border border-[#2563EB]/25">
            {item.period}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
        <div className="p-5 sm:p-6">
          <span className="text-[10px] uppercase tracking-widest text-muted/70 font-medium">{labels.before}</span>
          <div className="mt-4 space-y-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="text-xs text-muted mb-1">{m.label}</div>
                <div className="text-lg font-bold text-white/40">
                  {m.prefix ?? ""}
                  {m.before.toLocaleString()}
                  {m.suffix ?? ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6 bg-[#2563EB]/5">
          <span className="text-[10px] uppercase tracking-widest text-accent font-medium flex items-center gap-1">
            {labels.after} <FiCheck className="text-[10px]" />
          </span>
          <div className="mt-4 space-y-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="text-xs text-muted mb-1">{m.label}</div>
                <div className="text-lg font-bold text-accent">
                  <CounterDisplay
                    value={m.after}
                    suffix={m.suffix}
                    prefix={m.prefix}
                    decimals={m.decimals ?? 0}
                    active={active}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-6 py-3 bg-[#0F172A]/50 flex items-center justify-between">
        <span className="text-xs text-muted">{labels.result}</span>
        <span className="text-sm font-semibold text-white">
          +<CounterDisplay value={item.growthPercent} suffix="%" active={active} />
        </span>
      </div>
    </div>
  );
}

export function StudentResults() {
  const siteConfig = useSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const { studentResults } = siteConfig;
  const layout = (siteConfig as {
    layout?: { resultLabel?: string; beforeLabel?: string; afterLabel?: string };
  }).layout;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".result-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="student-results" ref={sectionRef} className="section-luxury section-luxury-alt relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/3 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          badge={studentResults.badge}
          title={studentResults.title}
          titleHighlight={studentResults.titleHighlight}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {studentResults.items.map((item, i) => (
            <ResultCard
              key={item.name}
              item={item}
              index={i}
              labels={{
                result: layout?.resultLabel || "Натиҷа",
                before: layout?.beforeLabel || "Пеш",
                after: layout?.afterLabel || "Баъд",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
