"use client";

import { useEffect, useRef } from "react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiCheck } from "react-icons/fi";
import { useSiteConfig } from "@/context/SiteConfigContext";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const siteConfig = useSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { about } = siteConfig;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-text-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        x: 60,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -40,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-[#2563EB]/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Text */}
          <div>
            <span className="about-text-item inline-block px-4 py-1.5 rounded-full text-sm font-medium text-accent bg-[#0F172A] border border-[#2563EB]/25 mb-6 tracking-wide">
              {about.badge}
            </span>

            <h2 className="about-text-item text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight text-white">
              {about.title}{" "}
              <span className="gradient-text">{about.titleHighlight}</span>
            </h2>

            <div className="space-y-4 mb-8">
              {about.paragraphs.map((paragraph, i) => (
                <p key={i} className="about-text-item text-muted text-base sm:text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="space-y-3">
              {about.highlights.map((item) => (
                <li key={item} className="about-text-item flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <FiCheck className="text-primary text-xs" />
                  </span>
                  <span className="text-sm sm:text-base text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Premium Image */}
          <div ref={imageRef} className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#2563EB]/20 via-[#3B82F6]/10 to-transparent blur-2xl opacity-50" />

            <div className="relative rounded-2xl overflow-hidden border border-white/10 glass aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] glow-primary">
              <ResponsiveImage
                src={about.image}
                alt={about.imageAlt}
                fill
                sizes="(max-width: 390px) 100vw, (max-width: 768px) 100vw, (max-width: 1440px) 50vw, 640px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 glass rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    12
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Модулҳои амалӣ</div>
                    <div className="text-xs text-muted">Аз сифр то касб</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 glass-luxury rounded-xl px-4 py-3 hero-float hidden sm:block">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-muted">Амалӣ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
