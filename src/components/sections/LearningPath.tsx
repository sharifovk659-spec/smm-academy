"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/AnimatedSection";
import { LuxuryCard } from "@/components/ui/LuxuryCard";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { useSiteConfig } from "@/context/SiteConfigContext";

gsap.registerPlugin(ScrollTrigger);

type PathItem = {
  step: string;
  title: string;
  description: string;
  image: string;
};

export function LearningPath() {
  const siteConfig = useSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const learningPath = (siteConfig as { learningPath?: {
    badge: string;
    title: string;
    titleHighlight: string;
    items: PathItem[];
  } }).learningPath;

  useEffect(() => {
    if (!learningPath?.items?.length) return;
    const ctx = gsap.context(() => {
      gsap.from(".path-step-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [learningPath?.items?.length]);

  if (!learningPath?.items?.length) return null;

  return (
    <section id="learning-path" ref={sectionRef} className="section-luxury section-luxury-alt relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={learningPath.badge}
          title={learningPath.title}
          titleHighlight={learningPath.titleHighlight}
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {learningPath.items.map((item) => (
            <LuxuryCard key={item.step} padding="p-0" className="path-step-card group overflow-hidden">
              <span className="path-step-num">{item.step}</span>
              <div className="relative h-44 overflow-hidden">
                <ResponsiveImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 font-display">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            </LuxuryCard>
          ))}
        </div>
      </div>
    </section>
  );
}
