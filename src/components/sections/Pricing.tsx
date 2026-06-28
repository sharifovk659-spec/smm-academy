"use client";

import { motion } from "framer-motion";
import { FiCheck, FiStar } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/AnimatedSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSiteConfig } from "@/context/SiteConfigContext";

const TIER_STYLES = {
  standard: {
    card: "pricing-card luxury-card",
    badge: null,
    btn: "glass-luxury hover:border-[#38bdf8]/40 text-white",
  },
  pro: {
    card: "pricing-card luxury-card",
    badge: null,
    btn: "glass-luxury hover:border-[#38bdf8]/40 text-white",
  },
  vip: {
    card: "pricing-card pricing-card-vip luxury-card",
    badge: "VIP",
    btn: "btn-luxury text-white",
  },
} as const;

export function Pricing() {
  const siteConfig = useSiteConfig();
  const { pricing } = siteConfig;

  return (
    <section id="pricing" className="section-luxury relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB]/8 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          badge={pricing.badge}
          title={pricing.title}
          titleHighlight={pricing.titleHighlight}
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-end mt-4">
          {pricing.plans.map((plan, i) => {
            const tier = plan.tier as keyof typeof TIER_STYLES;
            const styles = TIER_STYLES[tier] ?? TIER_STYLES.standard;
            const isVip = tier === "vip";

            return (
              <motion.div
                key={plan.name}
                className={`${styles.card} flex flex-col relative overflow-hidden ${
                  isVip
                    ? "md:col-span-1 md:scale-105 md:-translate-y-6 z-10 p-8 sm:p-10 min-h-[520px]"
                    : "p-6 sm:p-8 min-h-[460px]"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {isVip && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/15 via-transparent to-[#2563EB]/5 pointer-events-none" />
                    <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent" />
                  </>
                )}

                {styles.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white text-xs font-bold tracking-widest flex items-center gap-1.5 shadow-[0_4px_20px_rgba(37,99,235,0.4)]">
                    <FiStar size={12} className="fill-white" />
                    {styles.badge}
                  </span>
                )}

                <div className="relative z-10 flex flex-col flex-1">
                  <h3
                    className={`font-bold mb-1 ${isVip ? "text-2xl text-white" : "text-lg text-white"}`}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className={`font-bold ${isVip ? "text-5xl" : "text-4xl"} text-white`}>
                      {plan.price}
                    </span>
                    <span className="text-muted ml-2 text-sm">{plan.currency}</span>
                    <div className="text-xs text-muted mt-1">{plan.period}</div>
                  </div>

                  <ul className={`space-y-3 mb-8 flex-1 ${isVip ? "space-y-3.5" : ""}`}>
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <FiCheck
                          className={`mt-0.5 shrink-0 ${isVip ? "text-[#3B82F6]" : "text-[#2563EB]"}`}
                        />
                        <span className="text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <MagneticButton
                    href="#"
                    strength={isVip ? 0.4 : 0.3}
                    className={`block text-center py-3.5 rounded-full font-medium transition-all duration-300 ${styles.btn} ${
                      isVip ? "text-base" : "text-sm"
                    }`}
                  >
                    {plan.cta}
                  </MagneticButton>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
