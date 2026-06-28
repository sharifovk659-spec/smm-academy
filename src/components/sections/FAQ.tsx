"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/AnimatedSection";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function FAQ() {
  const siteConfig = useSiteConfig();
  const { faq } = siteConfig;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-luxury section-luxury-alt relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={faq.badge}
          title={faq.title}
          titleHighlight={faq.titleHighlight}
        />

        <div className="space-y-4 mt-4">
          {faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.question}
                layout
                className={`faq-accordion luxury-card overflow-hidden ${
                  isOpen ? "border-[#38bdf8]/40" : ""
                }`}
              >
                <button
                  type="button"
                  className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#2563EB] text-white"
                        : "bg-[#0F172A] text-muted group-hover:text-accent"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`flex-1 font-medium text-sm sm:text-base transition-colors duration-300 ${
                      isOpen ? "text-white" : "text-foreground/90 group-hover:text-white"
                    }`}
                  >
                    {item.question}
                  </span>

                  <motion.span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#2563EB]/20 text-accent"
                        : "bg-white/[0.04] text-muted group-hover:bg-[#2563EB]/10 group-hover:text-accent"
                    }`}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.25, delay: isOpen ? 0.05 : 0 },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        exit={{ y: -8 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0"
                      >
                        <div className="ml-12 sm:ml-12 pl-4 border-l border-[#2563EB]/30">
                          <p className="text-sm text-muted leading-relaxed">{item.answer}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
