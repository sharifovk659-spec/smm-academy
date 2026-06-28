"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { resolveImageSrc } from "@/lib/media";
import { gsap } from "gsap";
import { FiArrowRight, FiPlay, FiUser } from "react-icons/fi";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getIcon } from "@/components/ui/IconMap";
import { useSiteConfig } from "@/context/SiteConfigContext";

const SOCIAL_ORBIT = [
  "top-[4%] left-[-8%] sm:left-[-14%]",
  "top-[10%] right-[-8%] sm:right-[-14%]",
  "bottom-[22%] left-[-10%] sm:left-[-16%]",
  "bottom-[12%] right-[-8%] sm:right-[-14%]",
];

function renderHeroTitle(title: string) {
  const match = title.match(/^(.*?)(SMM-ро)$/i);
  if (!match) return title;

  return (
    <>
      {match[1]}
      <span className="whitespace-nowrap">{match[2]}</span>
    </>
  );
}

export function Hero() {
  const siteConfig = useSiteConfig();
  const heroRef = useRef<HTMLDivElement>(null);
  const trainerRef = useRef<HTMLDivElement>(null);
  const { hero } = siteConfig;
  const layout = (siteConfig as { layout?: { scrollLabel?: string } }).layout;
  const scrollLabel = layout?.scrollLabel || "Scroll";
  const statistics = (siteConfig as { statistics?: { items: { value: string; label: string }[] } }).statistics;
  const floatStats = statistics?.items?.slice(0, 2) ?? [];
  const moneySymbols = ["$", "€", "₽", "$"];

  const heroExt = hero as typeof hero & { badges?: string[]; badge?: string };
  const badges = heroExt.badges?.length
    ? heroExt.badges
    : heroExt.badge
      ? [heroExt.badge]
      : [];

  const bgSrc = resolveImageSrc(hero.image as string);
  const cta = hero.cta as typeof hero.cta & { primaryLink?: string; secondaryLink?: string };
  const primaryLink = cta?.primaryLink || "#pricing";
  const secondaryLink = cta?.secondaryLink || "#course-program";

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!trainerRef.current || window.innerWidth < 768) return;
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;

      gsap.to(trainerRef.current, {
        x: moveX * 16,
        y: moveY * 10,
        duration: 0.9,
        ease: "power2.out",
      });

      gsap.to(".hero-parallax-bg", {
        x: moveX * -22,
        y: moveY * -14,
        duration: 1.1,
        ease: "power2.out",
      });

      gsap.to(".hero-social-orbit", {
        x: moveX * 10,
        y: moveY * 7,
        duration: 1.3,
        ease: "power2.out",
        stagger: 0.04,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    const ctx = gsap.context(() => {
      gsap.from(".hero-fade-up", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".hero-scale-in", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.2)",
        delay: 0.2,
      });

      gsap.from(".hero-social-orbit, .hero-float-badge, .hero-float-stat, .hero-float-money", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(2)",
        delay: 0.8,
      });
    }, heroRef);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030303]"
    >
      {bgSrc && (
        <div className="absolute inset-0 z-0 hero-parallax-bg">
          <ResponsiveImage
            src={hero.image}
            alt=""
            fill
            className="object-cover opacity-[0.08]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505]/98 to-[#030303]" />
        </div>
      )}

      <div className="hero-aurora hero-parallax-bg">
        <div className="hero-aurora-blob hero-aurora-blob-1" />
        <div className="hero-aurora-blob hero-aurora-blob-2" />
        <div className="hero-aurora-blob hero-aurora-blob-3" />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,rgba(34,211,238,0.14),transparent)]" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 flex flex-col items-center text-center">
        <div className="hero-fade-up w-full">
          <p className="hero-role-label font-display">{hero.trainer.role}</p>
          <h1 className="hero-display-title font-display text-white">
            <span className="block">{renderHeroTitle(hero.title)}</span>
            <span className="gradient-text-cyan block">{hero.titleHighlight}</span>
          </h1>
        </div>

        <div ref={trainerRef} className="hero-scale-in hero-portrait-stage mb-6">
          <div className="hero-aurora-wisp" aria-hidden="true" />
          <div className="hero-portrait-aurora" aria-hidden="true" />
          <div className="hero-neon-gradient" aria-hidden="true" />
          <div className="hero-glow-ring-outer" aria-hidden="true" />
          <div className="hero-glow-ring-pulse" aria-hidden="true" />
          <div className="hero-glow-ring-rect" aria-hidden="true" />

          <div className="hero-float-badge hero-float-badge-left hero-float">
            <div className="hero-float-badge-icon">
              <FiUser className="text-[#38bdf8]" size={14} />
            </div>
            <span>{hero.trainer.name}</span>
          </div>

          {badges[0] && (
            <div className="hero-float-badge hero-float-badge-right hero-float-reverse hidden sm:flex">
              <span>{badges[0]}</span>
            </div>
          )}

          <div className="hero-portrait-frame">
            <ResponsiveImage
              src={hero.trainer.image}
              alt={hero.trainer.name}
              fill
              className="object-cover object-center fill-img"
              priority
              sizes="(max-width: 640px) 360px, 460px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/90 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#22d3ee]/8 via-transparent to-[#38bdf8]/5 mix-blend-overlay" />
          </div>

          {hero.socialIcons.map((social, i) => {
            const Icon = getIcon(social.icon);
            const position = SOCIAL_ORBIT[i] ?? SOCIAL_ORBIT[0];
            return (
              <motion.a
                key={`${social.icon}-${i}`}
                href={social.href}
                className={`hero-social-orbit absolute ${position}`}
                style={{
                  boxShadow: `0 0 32px ${social.color}66, 0 0 48px rgba(56,189,248,0.15)`,
                  animationDelay: `${i * 0.35}s`,
                }}
                aria-label={social.icon}
                whileHover={{ scale: 1.18, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon style={{ color: social.color }} size={22} />
              </motion.a>
            );
          })}

          {floatStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`hero-float-stat hero-float ${i === 0 ? "top-[2%] right-[8%] sm:right-[12%]" : "bottom-[4%] left-[6%] sm:left-[10%]"}`}
              style={{ animationDelay: `${0.5 + i * 0.2}s` }}
            >
              <span className="text-[#38bdf8] text-base block leading-none">{stat.value}</span>
              <span className="text-[10px] text-muted font-normal">{stat.label}</span>
            </div>
          ))}

          {moneySymbols.map((sym, i) => (
            <span
              key={`${sym}-${i}`}
              className={`hero-float-money hero-float-reverse text-lg font-display ${
                [
                  "top-[18%] left-[4%] sm:left-[8%]",
                  "top-[32%] right-[2%] sm:right-[6%]",
                  "bottom-[30%] right-[4%]",
                  "bottom-[18%] left-[2%] sm:left-[6%]",
                ][i]
              }`}
              style={{ animationDelay: `${0.7 + i * 0.15}s` }}
            >
              {sym}
            </span>
          ))}
        </div>

        {badges.length > 0 && (
          <div className="hero-fade-up flex flex-wrap gap-2 justify-center mb-5 sm:hidden">
            {badges.map((badge, i) => (
              <span key={i} className="section-badge-luxury text-[10px]">
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="hero-glass-bio hero-fade-up">
          <p className="text-readable">{hero.subtitle}</p>
        </div>

        <div className="hero-fade-up flex flex-col sm:flex-row flex-wrap gap-4 justify-center w-full max-w-md">
          <MagneticButton
            href={primaryLink}
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full btn-luxury text-white font-display font-semibold tracking-wider text-sm w-full sm:w-auto"
          >
            {hero.cta.primary}
            <FiArrowRight />
          </MagneticButton>
          <MagneticButton
            href={secondaryLink}
            strength={0.25}
            glow={false}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass-luxury border border-[#38bdf8]/25 hover:border-[#38bdf8]/50 font-medium w-full sm:w-auto"
          >
            <FiPlay size={16} className="text-[#38bdf8]" />
            {hero.cta.secondary}
          </MagneticButton>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#38bdf8]/50 font-display">
          {scrollLabel}
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#38bdf8]/70 to-transparent" />
      </motion.div>
    </section>
  );
}
