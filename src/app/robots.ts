import type { MetadataRoute } from "next";
import siteConfig from "@/config/site.json";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.site.url}/sitemap.xml`,
  };
}
