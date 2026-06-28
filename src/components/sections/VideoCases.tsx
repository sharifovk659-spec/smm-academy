"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/AnimatedSection";
import { VideoModal, VideoCard, PlayableVideo } from "@/components/ui/VideoModal";
import { useSiteConfig } from "@/context/SiteConfigContext";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

export function VideoCases() {
  const siteConfig = useSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeVideo, setActiveVideo] = useState<PlayableVideo | null>(null);
  const { videoCases } = siteConfig;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".video-cases-swiper", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="video-cases" ref={sectionRef} className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2563EB]/8 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={videoCases.badge}
            title={videoCases.title}
            titleHighlight={videoCases.titleHighlight}
          />

          <div className="video-cases-swiper relative">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1.2}
              centeredSlides={false}
              pagination={{ clickable: true }}
              navigation
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              breakpoints={{
                480: { slidesPerView: 1.5 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 3.5 },
              }}
              className="pb-14 video-cases-slider"
            >
              {videoCases.items.map((item) => (
                <SwiperSlide key={item.title}>
                  <VideoCard
                    item={item}
                    onPlay={(v) => setActiveVideo(v)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["Reels", "Кейс", "Instagram"].map((cat) => (
              <span
                key={cat}
                className="text-xs px-4 py-2 rounded-full glass-luxury text-muted border border-white/[0.06]"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
