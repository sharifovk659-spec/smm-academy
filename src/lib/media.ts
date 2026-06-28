export interface ResponsiveImageData {
  default: string;
  sizes?: Record<string, string>;
  webp?: boolean;
  alt?: string;
}

export type ImageSource = string | ResponsiveImageData;

export const IMAGE_BREAKPOINTS = [1920, 1440, 768, 390] as const;

export const DEFAULT_IMAGE_SIZES =
  "(max-width: 390px) 390px, (max-width: 768px) 768px, (max-width: 1440px) 1440px, 1920px";

export function isResponsiveImage(src: ImageSource): src is ResponsiveImageData {
  return typeof src === "object" && src !== null && typeof src.default === "string";
}

export function resolveImageSrc(src: ImageSource): string {
  if (typeof src === "string") return src;
  if (src.default) return src.default;
  const sizes = src.sizes;
  if (!sizes) return "";
  return sizes["1920"] || sizes["1440"] || sizes["768"] || sizes["390"] || Object.values(sizes)[0] || "";
}

export function getImageSrcSet(src: ImageSource): string | undefined {
  if (!isResponsiveImage(src) || !src.sizes) return undefined;
  return Object.entries(src.sizes)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([w, url]) => `${url} ${w}w`)
    .join(", ");
}

export function getResponsiveSources(src: ImageSource): ResponsiveImageData["sizes"] | null {
  if (!isResponsiveImage(src) || !src.sizes) return null;
  return src.sizes;
}
