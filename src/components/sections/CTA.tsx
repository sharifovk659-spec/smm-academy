"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FaWhatsapp, FaTelegram } from "react-icons/fa6";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function CTA() {
  const siteConfig = useSiteConfig();
  const { cta, hero } = siteConfig;

  return (
    <section id="cta" className="section-luxury py-28 sm:py-32 relative overflow-hidden">
      <div className="cta-aurora absolute inset-0 pointer-events-none">
        <div className="cta-aurora-blob cta-aurora-blob-1" />
        <div className="cta-aurora-blob cta-aurora-blob-2" />
        <div className="cta-aurora-blob cta-aurora-blob-3" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F172A]/40 to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_30%,rgba(34,211,238,0.12),transparent)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          className="cta-expert-wrap"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "backOut" }}
        >
          <ResponsiveImage
            src={hero.trainer.image}
            alt={hero.trainer.name}
            fill
            className="cta-expert-img object-cover object-top"
            sizes="200px"
          />
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight text-white leading-tight font-display"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {cta.title}{" "}
          <span className="gradient-text-cyan">{cta.titleHighlight}</span>
        </motion.h2>

        <motion.p
          className="text-muted text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {cta.subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MagneticButton
            href="#pricing"
            strength={0.4}
            className="inline-flex items-center gap-3 px-10 sm:px-14 py-5 sm:py-6 rounded-full btn-luxury text-white font-semibold text-lg sm:text-xl shadow-[0_8px_40px_rgba(37,99,235,0.4)]"
          >
            {cta.button}
            <FiArrowRight size={22} />
          </MagneticButton>

          <p className="text-sm text-muted">{cta.guarantee}</p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
            <MagneticButton
              href={cta.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              strength={0.25}
              className="cta-social-btn w-full sm:w-auto items-center justify-center gap-3 px-8 py-4 rounded-full glass-luxury border border-[#25D366]/30 text-white font-medium hover:bg-[#25D366]/15 hover:border-[#25D366]/50"
            >
              <FaWhatsapp className="text-[#25D366] text-xl" />
              {cta.whatsapp.label}
            </MagneticButton>

            <MagneticButton
              href={cta.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              strength={0.25}
              className="cta-social-btn w-full sm:w-auto items-center justify-center gap-3 px-8 py-4 rounded-full glass-luxury border border-[#0088cc]/30 text-white font-medium hover:bg-[#0088cc]/15 hover:border-[#0088cc]/50"
            >
              <FaTelegram className="text-[#0088cc] text-xl" />
              {cta.telegram.label}
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
