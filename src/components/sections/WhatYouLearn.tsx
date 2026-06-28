"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getIcon } from "@/components/ui/IconMap";
import { SectionHeading } from "@/components/ui/AnimatedSection";
import { useSiteConfig } from "@/context/SiteConfigContext";

gsap.registerPlugin(ScrollTrigger);

export function WhatYouLearn() {
  const siteConfig = useSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const { whatYouLearn } = siteConfig;
  const whatYouGet = (siteConfig as { whatYouGet?: { items: typeof whatYouLearn.items } }).whatYouGet;
  const getItems = whatYouGet?.items?.filter((i) => i.title) ?? [];
  const learnItems = whatYouLearn.items.filter((i) => i.title);
  const learnTitle = (whatYouLearn as { learnTitle?: string }).learnTitle || "Чӣ меомӯзед";
  const getTitle = (whatYouLearn as { getTitle?: string }).getTitle || "Чӣ мегиред";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".open-book", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const renderItems = (items: typeof learnItems) =>
    items.map((item) => {
      const Icon = getIcon(item.icon);
      return (
        <div key={item.title} className="open-book-item group">
          <div className="open-book-item-icon group-hover:scale-110 transition-transform">
            <Icon size={18} />
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-0.5">{item.title}</div>
            <div className="text-xs text-muted leading-relaxed">{item.description}</div>
          </div>
        </div>
      );
    });

  return (
    <section id="what-you-learn" ref={sectionRef} className="section-luxury section-luxury-alt relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(34,211,238,0.06),transparent)] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          badge={whatYouLearn.badge}
          title={whatYouLearn.title}
          titleHighlight={whatYouLearn.titleHighlight}
        />

        <div className="open-book">
          <div className="open-book-page open-book-page-left">
            <h3 className="open-book-page-title">{learnTitle}</h3>
            {renderItems(learnItems)}
          </div>
          <div className="open-book-spine" aria-hidden="true" />
          <div className="open-book-page open-book-page-right">
            <h3 className="open-book-page-title">{getTitle}</h3>
            {renderItems(getItems)}
          </div>
        </div>
      </div>
    </section>
  );
}
