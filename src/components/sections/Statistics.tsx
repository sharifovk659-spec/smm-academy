"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getIcon } from "@/components/ui/IconMap";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { LuxuryCard } from "@/components/ui/LuxuryCard";
import { useSiteConfig } from "@/context/SiteConfigContext";

gsap.registerPlugin(ScrollTrigger);

export function Statistics() {
  const siteConfig = useSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-luxury-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        scale: 0.92,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { statistics } = siteConfig;

  return (
    <section id="results" ref={sectionRef} className="section-luxury relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statistics.items.map((item) => {
            const Icon = getIcon(item.icon);
            const counter = item.counter;
            return (
              <LuxuryCard key={item.label} className="stat-luxury-card group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-[#2563EB]/20 group-hover:border-[#38bdf8]/30 group-hover:scale-110 transition-all duration-300">
                  <Icon className="text-[#38bdf8] text-xl group-hover:text-white transition-colors duration-300" />
                </div>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                  {counter ? (
                    <AnimatedCounter
                      end={counter.end}
                      suffix={counter.suffix}
                      decimals={"decimals" in counter ? counter.decimals : 0}
                    />
                  ) : (
                    item.value
                  )}
                </div>

                <div className="text-sm sm:text-base font-semibold text-foreground mb-1">
                  {item.label}
                </div>

                <div className="text-xs text-muted opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </div>
              </LuxuryCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
