"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiClock, FiBookOpen } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/AnimatedSection";
import { useSiteConfig } from "@/context/SiteConfigContext";

gsap.registerPlugin(ScrollTrigger);

export function CourseTimeline() {
  const siteConfig = useSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { courseProgram } = siteConfig;
  const layout = (siteConfig as { layout?: { modulePrefix?: string } }).layout;
  const modulePrefix = layout?.modulePrefix || "Модул";
  const totalModules = courseProgram.items.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (progressRef.current && lineRef.current) {
        gsap.fromTo(
          progressRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            },
          }
        );
      }

      gsap.from(".timeline-progress-bar", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        width: "100%",
        duration: 1.5,
        ease: "power2.out",
      });

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        });

        const dot = item.querySelector(".timeline-dot");
        if (dot) {
          gsap.from(dot, {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
            scale: 0,
            duration: 0.5,
            ease: "back.out(2)",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="course-program" ref={sectionRef} className="section-luxury relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#2563EB]/6 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={courseProgram.badge}
          title={courseProgram.title}
          titleHighlight={courseProgram.titleHighlight}
        />

        <div className="relative mt-16" ref={lineRef}>
          <div className="absolute left-6 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-white/[0.06]">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#2563EB] via-[#3B82F6] to-[#2563EB] origin-top"
              style={{ height: "0%" }}
            />
          </div>

          <div className="space-y-8 sm:space-y-12">
            {courseProgram.items.map((module, i) => (
              <div
                key={module.number}
                className={`timeline-item relative flex items-start gap-6 sm:gap-0 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 z-10 timeline-dot">
                  <div className="w-4 h-4 rounded-full bg-[#050505] border-2 border-[#2563EB] shadow-[0_0_12px_rgba(37,99,235,0.5)]">
                    <div className="absolute inset-0.5 rounded-full bg-[#2563EB]" />
                  </div>
                </div>

                <div className="hidden sm:block sm:w-1/2" />

                <div
                  className={`ml-14 sm:ml-0 sm:w-1/2 ${
                    i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:text-left"
                  }`}
                >
                  <div className="luxury-card p-5 sm:p-6 group">
                    <div
                      className={`flex items-center gap-3 mb-3 ${
                        i % 2 === 0 ? "sm:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="text-xs font-mono font-bold text-accent bg-[#2563EB]/10 px-2.5 py-1 rounded-lg border border-[#2563EB]/20">
                        {modulePrefix} {module.number}
                      </span>
                      <span className="text-xs text-muted flex items-center gap-1">
                        <FiClock size={12} />
                        {module.duration}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-4">{module.description}</p>

                    <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? "sm:justify-end" : ""}`}>
                      {module.topics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2.5 py-1 rounded-full bg-[#0F172A] border border-white/[0.06] text-muted group-hover:border-[#2563EB]/20 transition-colors"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6]"
                        style={{ width: `${((i + 1) / totalModules) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 luxury-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB]/15 flex items-center justify-center shrink-0">
            <FiBookOpen className="text-accent" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted">{courseProgram.progressLabel}</span>
              <span className="text-accent font-semibold">{totalModules} / {totalModules} {modulePrefix}</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
              <div className="timeline-progress-bar h-full w-0 rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
