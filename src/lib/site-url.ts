import siteConfig from "@/config/site.json";

function normalizeUrl(url: string): string {
  return url.replace(/\/$/, "");
}

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL);
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return normalizeUrl(siteConfig.site.url || "http://localhost:3000");
}
