"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiClock } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/AnimatedSection";
import { useSiteConfig } from "@/context/SiteConfigContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

gsap.registerPlugin(ScrollTrigger);

export function CourseProgramSlider() {
  const siteConfig = useSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const { courseProgram } = siteConfig;
  const layout = (siteConfig as { layout?: { modulePrefix?: string } }).layout;
  const modulePrefix = layout?.modulePrefix || "Модул";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".program-slider", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="course-program" ref={sectionRef} className="section-luxury relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#22d3ee]/6 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          badge={courseProgram.badge}
          title={courseProgram.title}
          titleHighlight={courseProgram.titleHighlight}
        />

        <Swiper
          modules={[Navigation, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={1.15}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2.2,
            slideShadows: false,
          }}
          navigation
          breakpoints={{
            640: { slidesPerView: 1.8 },
            1024: { slidesPerView: 2.4 },
          }}
          className="program-slider pb-16"
        >
          {courseProgram.items.map((module) => (
            <SwiperSlide key={module.number}>
              <div className="program-module-card luxury-card p-6 sm:p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-display tracking-widest text-[#38bdf8] bg-[#22d3ee]/10 px-3 py-1 rounded-full border border-[#38bdf8]/25">
                    {modulePrefix} {module.number}
                  </span>
                  <span className="text-xs text-muted flex items-center gap-1">
                    <FiClock size={12} />
                    {module.duration}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-display">
                  {module.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-5 flex-1">{module.description}</p>

                <div className="flex flex-wrap gap-2">
                  {module.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-[#38bdf8]/15 text-muted"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
