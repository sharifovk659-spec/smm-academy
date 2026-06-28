"use client";

import { useSiteConfig } from "@/context/SiteConfigContext";

export function Footer() {
  const siteConfig = useSiteConfig();
  const { footer, site } = siteConfig;

  return (
    <footer className="border-t border-white/[0.06] py-16 bg-[#0F172A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="text-xl font-bold gradient-text mb-4">{site.name}</div>
            <p className="text-sm text-muted max-w-sm leading-relaxed">{footer.description}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Курс</h4>
            <ul className="space-y-2">
              {footer.links.course.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Дастгирӣ</h4>
            <ul className="space-y-2">
              {footer.links.support.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-sm text-muted">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
