import siteConfig from "@/config/site.json";

export type SiteConfig = typeof siteConfig;

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

export default siteConfig;
