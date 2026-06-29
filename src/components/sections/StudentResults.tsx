"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FaInstagram } from "react-icons/fa";
import { FiCheck, FiExternalLink } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/AnimatedSection";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { SparkleField } from "@/components/effects/SparkleField";
import { useCounter } from "@/hooks/useCounter";
import { useSiteConfig } from "@/context/SiteConfigContext";
import type { SiteConfig } from "@/config/index";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

type ResultItem = SiteConfig["studentResults"]["items"][number];

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
  labels,
}: {
  item: ResultItem;
  labels: { result: string; before: string; after: string };
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);

  const photo = (item as ResultItem & { photo?: string }).photo;
  const instagram = (item as ResultItem & { instagram?: string }).instagram;
  const instagramHandle = (item as ResultItem & { instagramHandle?: string }).instagramHandle;

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
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="result-card-unified luxury-card overflow-hidden h-full flex flex-col">
      {photo && (
        <div className="result-card-photo-wrap">
          <div className="result-card-photo-frame">
            <ResponsiveImage
              src={photo}
              alt={item.name}
              fill
              className="object-cover object-center fill-img"
              sizes="(max-width: 640px) 320px, 380px"
            />
            <div className="result-card-photo-overlay" aria-hidden="true" />

            <AnimatePresence>
              {showInstagram && instagram && (
                <motion.div
                  className="result-card-instagram-panel"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.25 }}
                >
                  <FaInstagram size={28} className="text-white mb-2" />
                  <p className="text-sm font-semibold text-white">
                    {instagramHandle || "Instagram"}
                  </p>
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="result-card-instagram-link"
                  >
                    Дидан дар Instagram
                    <FiExternalLink size={14} />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {instagram && (
              <button
                type="button"
                onClick={() => setShowInstagram((v) => !v)}
                className={`result-card-instagram-btn ${showInstagram ? "is-active" : ""}`}
                aria-label={`Instagram ${instagramHandle || item.name}`}
                aria-pressed={showInstagram}
              >
                <FaInstagram size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="p-4 sm:p-5 border-b border-white/[0.06]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-white font-display">{item.name}</h3>
            <p className="text-xs text-[#38bdf8] mt-0.5">{item.role}</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[#2563EB]/15 text-accent border border-[#2563EB]/25 shrink-0">
            {item.period}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-white/[0.06] flex-1">
        <div className="p-4 sm:p-5">
          <span className="text-[10px] uppercase tracking-widest text-muted/70 font-medium">
            {labels.before}
          </span>
          <div className="mt-3 space-y-3">
            {item.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-xs text-muted mb-0.5">{m.label}</div>
                <div className="text-base font-bold text-white/40">
                  {m.prefix ?? ""}
                  {m.before.toLocaleString()}
                  {m.suffix ?? ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-[#2563EB]/5">
          <span className="text-[10px] uppercase tracking-widest text-accent font-medium flex items-center gap-1">
            {labels.after} <FiCheck className="text-[10px]" />
          </span>
          <div className="mt-3 space-y-3">
            {item.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-xs text-muted mb-0.5">{m.label}</div>
                <div className="text-base font-bold text-accent">
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

      <div className="px-4 sm:px-5 py-3 bg-[#0F172A]/50 flex items-center justify-between mt-auto">
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
      gsap.from(".student-results-slider", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const labels = {
    result: layout?.resultLabel || "Натиҷа",
    before: layout?.beforeLabel || "Пеш",
    after: layout?.afterLabel || "Баъд",
  };

  return (
    <section id="student-results" ref={sectionRef} className="section-luxury section-luxury-alt relative overflow-hidden">
      <SparkleField count={10} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/3 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          badge={studentResults.badge}
          title={studentResults.title}
          titleHighlight={studentResults.titleHighlight}
        />

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          grabCursor
          loop
          slidesPerView={1.1}
          spaceBetween={20}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: { slidesPerView: 1.6, spaceBetween: 24 },
            1024: { slidesPerView: 2.2, spaceBetween: 28 },
            1280: { slidesPerView: 2.8, spaceBetween: 32 },
          }}
          className="student-results-slider pb-16"
        >
          {studentResults.items.map((item) => (
            <SwiperSlide key={item.name}>
              <ResultCard item={item} labels={labels} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
