"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
import { FaInstagram } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/AnimatedSection";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { SparkleField } from "@/components/effects/SparkleField";
import { useSiteConfig } from "@/context/SiteConfigContext";
import type { SiteConfig } from "@/config/index";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

gsap.registerPlugin(ScrollTrigger);

type StudentItem = SiteConfig["successfulStudents"]["items"][number];

function StudentCard({ student, index }: { student: StudentItem; index: number }) {
  return (
    <motion.article
      className="success-student-card h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="success-student-card-inner luxury-card h-full flex flex-col">
        <div className="success-student-photo-wrap">
          <div className="success-student-photo-glow" aria-hidden="true" />
          <div className="success-student-photo-frame">
            <ResponsiveImage
              src={student.photo}
              alt={student.name}
              fill
              className="object-cover object-center fill-img"
              sizes="(max-width: 640px) 280px, 320px"
            />
            <div className="success-student-photo-overlay" aria-hidden="true" />
          </div>

          <a
            href={student.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="success-student-instagram"
            aria-label={`Instagram ${student.instagramHandle || student.name}`}
            title={student.instagramHandle || "Instagram"}
          >
            <FaInstagram size={22} />
          </a>
        </div>

        <div className="success-student-body">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-lg font-bold text-white font-display tracking-wide">
                {student.name}
              </h3>
              <p className="text-xs text-[#38bdf8] mt-1 font-medium">{student.role}</p>
            </div>
            {student.instagramHandle && (
              <span className="success-student-handle">{student.instagramHandle}</span>
            )}
          </div>

          <div className="success-student-achievement">
            <FiTrendingUp className="text-[#4ade80] shrink-0" size={16} />
            <span>{student.achievement}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function SuccessfulStudents() {
  const siteConfig = useSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const { successfulStudents } = siteConfig;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".success-students-slider", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!successfulStudents?.items?.length) return null;

  return (
    <section
      id="successful-students"
      ref={sectionRef}
      className="section-luxury relative overflow-hidden"
    >
      <SparkleField count={12} />
      <div className="absolute top-1/3 left-0 w-[420px] h-[420px] bg-[#22d3ee]/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[360px] h-[360px] bg-[#6366f1]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          badge={successfulStudents.badge}
          title={successfulStudents.title}
          titleHighlight={successfulStudents.titleHighlight}
        />

        <Swiper
          modules={[Pagination, Autoplay, Navigation, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView={1.2}
          spaceBetween={20}
          autoplay={{
            delay: 4200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
            1280: { slidesPerView: 3.5, spaceBetween: 32 },
          }}
          className="success-students-slider pb-16"
        >
          {successfulStudents.items.map((student, index) => (
            <SwiperSlide key={`${student.name}-${index}`}>
              <StudentCard student={student} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
