"use client";

import { useState } from "react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FiPlay } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/AnimatedSection";
import { VideoModal, PlayableVideo } from "@/components/ui/VideoModal";
import { useSiteConfig } from "@/context/SiteConfigContext";
import type { SiteConfig } from "@/config/index";

import { SparkleField } from "@/components/effects/SparkleField";
import "swiper/css/pagination";
import "swiper/css/navigation";

type TestimonialItem = SiteConfig["testimonials"]["items"][number];

export function Testimonials() {
  const siteConfig = useSiteConfig();
  const { testimonials } = siteConfig;
  const layout = (siteConfig as { layout?: { videoReviewCategory?: string } }).layout;
  const videoCategory = layout?.videoReviewCategory || "Video Review";
  const [activeVideo, setActiveVideo] = useState<PlayableVideo | null>(null);

  const openVideo = (item: TestimonialItem) => {
    setActiveVideo({
      title: item.name,
      description: item.result,
      category: videoCategory,
      videoType: item.videoType as "youtube" | "mp4",
      videoUrl: item.videoUrl,
    });
  };

  return (
    <>
      <section id="video-reviews" className="section-luxury section-luxury-alt relative overflow-hidden">
        <SparkleField count={10} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#22d3ee]/8 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading
            badge={testimonials.badge}
            title={testimonials.title}
            titleHighlight={testimonials.titleHighlight}
          />

          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1.15}
            centeredSlides={false}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 3.5, spaceBetween: 28 },
            }}
            className="pb-14 testimonials-slider"
          >
            {testimonials.items.map((item) => (
              <SwiperSlide key={item.name}>
                <div className="testimonial-card luxury-card overflow-hidden h-full flex flex-col group">
                  {/* Video preview */}
                  <button
                    type="button"
                    className="relative aspect-video w-full overflow-hidden cursor-pointer"
                    onClick={() => openVideo(item)}
                    aria-label={`Video review: ${item.name}`}
                  >
                    <ResponsiveImage
                      src={item.thumbnail}
                      alt={item.name}
                      fill
                      className="group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 390px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#2563EB] group-hover:border-[#2563EB] group-hover:scale-110 transition-all duration-300">
                        <FiPlay className="text-white ml-0.5" size={18} />
                      </div>
                    </div>

                    <span className="absolute top-3 left-3 text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#2563EB]/20 text-accent border border-[#2563EB]/30">
                      Video Review
                    </span>
                  </button>

                  {/* Avatar + Name + Result */}
                  <div className="p-5 flex items-start gap-4 flex-1">
                    <div className="relative shrink-0 w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-[#2563EB]/30 group-hover:border-[#2563EB]/60 transition-colors">
                      <ResponsiveImage
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="52px"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#2563EB] border-2 border-[#0F172A]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white text-sm mb-1 truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-accent font-medium leading-relaxed">
                        {item.result}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
