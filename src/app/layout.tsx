import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import "./premium-blocks.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { GlobalAmbient } from "@/components/effects/GlobalAmbient";
import { FloatingObjects } from "@/components/ui/FloatingObjects";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import siteConfig from "@/config/site.json";
import { resolveImageSrc } from "@/lib/media";
import { getSiteUrl } from "@/lib/site-url";

const ogImage = resolveImageSrc(siteConfig.hero.image);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.site.title,
    template: `%s | ${siteConfig.site.name}`,
  },
  description: siteConfig.site.description,
  keywords: siteConfig.site.keywords,
  authors: [{ name: siteConfig.site.name }],
  openGraph: {
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    url: getSiteUrl(),
    siteName: siteConfig.site.name,
    locale: siteConfig.site.locale,
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.site.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tg">
      <body className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased bg-background text-foreground`}>
        <SmoothScrollProvider>
          <SiteConfigProvider>
            <AnimationProvider>
              <GlobalAmbient />
              <FloatingObjects />
              {children}
            </AnimationProvider>
          </SiteConfigProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
