import type { MetadataRoute } from "next";
import siteConfig from "@/config/site.json";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
