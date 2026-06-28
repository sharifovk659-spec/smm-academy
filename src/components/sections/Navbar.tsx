"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { filterNavigation } from "@/components/sections/HomeSections";

export function Navbar() {
  const siteConfig = useSiteConfig();
  const layout = (siteConfig as { layout?: { navCta?: string; navCtaLink?: string } }).layout;
  const navCta = layout?.navCta || siteConfig.hero?.cta?.primary || "Сабти ном";
  const navCtaLink = layout?.navCtaLink || "#pricing";

  const logoSrc = siteConfig.hero?.logo
    ? (typeof siteConfig.hero.logo === "string" ? siteConfig.hero.logo : "")
    : "";
  const logoText = (siteConfig.hero as { logoText?: string })?.logoText || siteConfig.site.name;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigation = filterNavigation(siteConfig);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-luxury py-3 border-b border-white/[0.06] neon-border-bottom" : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold tracking-tight flex items-center gap-2">
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt={logoText} className="h-8 w-auto" />
          ) : (
            <span className="gradient-text">{logoText}</span>
          )}
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-muted hover:text-[#38bdf8] transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <MagneticButton
          href={navCtaLink}
          strength={0.3}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-luxury text-white text-sm font-medium"
        >
          {navCta}
        </MagneticButton>

        <button
          className="md:hidden p-2 text-foreground min-h-[44px] min-w-[44px]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Меню"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-luxury border-t border-white/5"
          >
            <ul className="px-4 py-4 space-y-3 safe-bottom">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block py-3 text-muted hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <MagneticButton
                  href={navCtaLink}
                  className="block w-full text-center px-5 py-3 rounded-full btn-luxury text-white text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {navCta}
                </MagneticButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
