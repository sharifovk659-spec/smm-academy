"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import staticConfig from "@/config/site.json";
import type { SiteConfig } from "@/config/index";

const SiteConfigContext = createContext<SiteConfig>(staticConfig as SiteConfig);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(staticConfig as SiteConfig);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_CONTENT_API_URL || "/content/site.json";

    fetch(`${apiUrl}?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === "object" && data.site) {
          setConfig(data as SiteConfig);
        }
      })
      .catch(() => {
        // keep static fallback
      });
  }, []);

  return (
    <SiteConfigContext.Provider value={config}>{children}</SiteConfigContext.Provider>
  );
}

export function useSiteConfig(): SiteConfig {
  return useContext(SiteConfigContext);
}

export { staticConfig as defaultSiteConfig };
