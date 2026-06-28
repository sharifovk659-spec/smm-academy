"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export function AnimatedSection({ children, className = "", id, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

interface SectionHeadingProps {
  badge: string;
  title: string;
  titleHighlight: string;
  className?: string;
}

export function SectionHeading({ badge, title, titleHighlight, className = "" }: SectionHeadingProps) {
  return (
    <div className={`text-center mb-14 sm:mb-16 ${className}`}>
      <motion.span
        className="section-badge-luxury mb-5"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {badge}
      </motion.span>
      <h2
        className="font-display heading-section text-white"
        data-reveal="up"
        data-reveal-delay="0.1"
      >
        {title}{" "}
        <span className="gradient-text-cyan">{titleHighlight}</span>
      </h2>
    </div>
  );
}
