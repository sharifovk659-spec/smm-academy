"use client";

import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { motion } from "framer-motion";
import { FiInstagram, FiLinkedin } from "react-icons/fi";
import { AnimatedSection, SectionHeading } from "@/components/ui/AnimatedSection";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function Instructors() {
  const siteConfig = useSiteConfig();
  const { instructors } = siteConfig;

  return (
    <AnimatedSection id="instructors" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={instructors.badge}
          title={instructors.title}
          titleHighlight={instructors.titleHighlight}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {instructors.items.map((instructor, i) => (
            <motion.div
              key={instructor.name}
              className="glass-luxury rounded-2xl overflow-hidden group hover:border-[#2563EB]/20 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="relative h-64 overflow-hidden">
                <ResponsiveImage
                  src={instructor.image}
                  alt={instructor.name}
                  fill
                  className="group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 390px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{instructor.name}</h3>
                <p className="text-sm text-primary mb-3">{instructor.role}</p>
                <p className="text-sm text-muted leading-relaxed mb-4">{instructor.bio}</p>
                <div className="flex gap-3">
                  <a
                    href={instructor.social.instagram}
                    className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <FiInstagram />
                  </a>
                  <a
                    href={instructor.social.linkedin}
                    className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
