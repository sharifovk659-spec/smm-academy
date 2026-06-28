"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/media";
import { FiX, FiPlay } from "react-icons/fi";

export interface PlayableVideo {
  title: string;
  description?: string;
  category?: string;
  videoType: "youtube" | "mp4" | string;
  videoUrl: string;
}

interface VideoModalProps {
  video: PlayableVideo | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (video) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [video, handleKeyDown]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-4xl z-10"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full glass-luxury flex items-center justify-center text-white hover:border-[#2563EB]/50 transition-colors z-20"
              aria-label="Пӯшидан"
            >
              <FiX size={20} />
            </button>

            <div className="glass-luxury rounded-2xl overflow-hidden border border-white/[0.08]">
              <div className="relative aspect-video bg-black">
                {video.videoType === "youtube" ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoUrl}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <video
                    src={video.videoUrl}
                    controls
                    autoPlay
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="p-5 sm:p-6">
                {video.category && (
                  <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-[#2563EB]/15 text-accent border border-[#2563EB]/25 mb-3">
                    {video.category}
                  </span>
                )}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{video.title}</h3>
                {video.description && (
                  <p className="text-sm text-muted">{video.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface VideoCardProps {
  item: PlayableVideo & { thumbnail: ImageSource; category: string };
  onPlay: (item: PlayableVideo & { thumbnail: ImageSource; category: string }) => void;
}

export function VideoCard({ item, onPlay }: VideoCardProps) {
  const categoryColors: Record<string, string> = {
    Reels: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    Кейс: "bg-[#2563EB]/20 text-accent border-[#2563EB]/30",
    Instagram: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  return (
    <div
      className="video-case-card group cursor-pointer"
      onClick={() => onPlay(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onPlay(item)}
      aria-label={`Тамошо: ${item.title}`}
    >
      <div className="glass-luxury rounded-2xl overflow-hidden border border-white/[0.06] group-hover:border-[#2563EB]/40 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(37,99,235,0.2)]">
        <div className="relative aspect-[9/16] sm:aspect-video overflow-hidden">
          <ResponsiveImage
            src={item.thumbnail}
            alt={item.title}
            fill
            className="group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 390px) 280px, (max-width: 768px) 320px, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#2563EB] group-hover:border-[#2563EB] group-hover:scale-110 transition-all duration-300">
              <FiPlay className="text-white ml-1" size={22} />
            </div>
          </div>

          <span
            className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[item.category] ?? categoryColors["Кейс"]}`}
          >
            {item.category}
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-accent transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-muted line-clamp-2">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
