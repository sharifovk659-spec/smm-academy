"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getIcon } from "@/components/ui/IconMap";
import { SectionHeading } from "@/components/ui/AnimatedSection";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { resolveImageSrc, type ImageSource } from "@/lib/media";

gsap.registerPlugin(ScrollTrigger);

function CircleCard({
  title,
  description,
  icon,
  image,
}: {
  title: string;
  description: string;
  icon: string;
  image?: ImageSource;
}) {
  const Icon = getIcon(icon);
  const avatarSrc = image ? resolveImageSrc(image) : "";

  return (
    <div className="circle-card for-whom-card group">
      <div className="circle-card-ring">
        <div className="circle-card-inner">
          {avatarSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarSrc} alt={title} className="w-full h-full object-cover" />
          ) : (
            <Icon className="text-[#38bdf8] text-4xl" />
          )}
        </div>
        <div className="circle-card-icon-badge">
          <Icon className="text-[#38bdf8]" size={18} />
        </div>
      </div>
      <h3 className="text-lg font-bold text-white mb-2 font-display tracking-wide">{title}</h3>
      <p className="text-sm text-muted leading-relaxed max-w-[200px] mx-auto">{description}</p>
    </div>
  );
}

export function ForWhom() {
  const siteConfig = useSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const { forWhom } = siteConfig;

  const visibleItems = forWhom.items.filter(
    (item) => (item as { enabled?: boolean }).enabled !== false
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".for-whom-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 80,
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.4)",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="for-whom" ref={sectionRef} className="section-luxury relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={forWhom.badge}
          title={forWhom.title}
          titleHighlight={forWhom.titleHighlight}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {visibleItems.map((item) => (
            <CircleCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              image={(item as { image?: ImageSource }).image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
