"use client";

import {
  resolveImageSrc,
  getImageSrcSet,
  getResponsiveSources,
  isResponsiveImage,
  DEFAULT_IMAGE_SIZES,
  type ImageSource,
} from "@/lib/media";

interface ResponsiveImageProps {
  src: ImageSource;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none";
}

export function ResponsiveImage({
  src,
  alt,
  fill,
  className = "",
  sizes = DEFAULT_IMAGE_SIZES,
  priority = false,
  objectFit = "cover",
}: ResponsiveImageProps) {
  const defaultSrc = resolveImageSrc(src);
  const srcSet = getImageSrcSet(src);
  const responsiveSources = getResponsiveSources(src);

  const fitClass =
    objectFit === "cover"
      ? "object-cover"
      : objectFit === "contain"
        ? "object-contain"
        : objectFit === "fill"
          ? "object-fill"
          : "";

  const baseImgClass = [
    fill ? "absolute inset-0 w-full h-full fill-img" : "w-full h-full",
    fitClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!isResponsiveImage(src) || !responsiveSources) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={defaultSrc}
        alt={alt}
        className={baseImgClass}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  const s = responsiveSources;

  return (
    <picture className={fill ? "absolute inset-0 block w-full h-full" : undefined}>
      {s["390"] && (
        <source media="(max-width: 390px)" srcSet={s["390"]} type="image/webp" />
      )}
      {s["768"] && (
        <source media="(max-width: 768px)" srcSet={s["768"]} type="image/webp" />
      )}
      {s["1440"] && (
        <source media="(max-width: 1440px)" srcSet={s["1440"]} type="image/webp" />
      )}
      {s["1920"] && (
        <source media="(min-width: 1441px)" srcSet={s["1920"]} type="image/webp" />
      )}
      <img
        src={defaultSrc}
        alt={alt}
        className={baseImgClass}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        srcSet={srcSet}
      />
    </picture>
  );
}
