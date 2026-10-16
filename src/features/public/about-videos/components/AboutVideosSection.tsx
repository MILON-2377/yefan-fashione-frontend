"use client";

import { usePublicAboutVideos } from "../hooks/usePublicAboutVideos";
import { Film } from "lucide-react";
import { AboutPageDictContent } from "../types/aboutVideoTypes";

interface AboutVideosSectionProps {
  content: AboutPageDictContent;
}

export function AboutVideosSection({ content }: AboutVideosSectionProps) {
  const { data: videos, isLoading } = usePublicAboutVideos();

  if (isLoading) {
    return (
      <div className="p-8 text-center text-xs font-mono text-slate-400">
        Loading showcase videos...
      </div>
    );
  }

  // Fallback if no videos are configured
  const displayVideos = videos && videos.length > 0 ? videos : [];

  return (
    <section className="space-y-7 sm:space-y-9">
      {/* Section Heading */}
      <div className="flex flex-col gap-3 border-b border-[#D8C9B8] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.24em] text-[#9D8974]">
            <span className="h-px w-6 bg-[#9D8974]" />
            Behind the Craft
          </span>

          <h3 className="font-serif text-2xl font-normal tracking-tight text-[#211F1C] sm:text-3xl">
            {content.videoSectionTitle || "Atelier Brand Showcases"}
          </h3>

          <p className="max-w-2xl text-xs leading-6 text-[#625D57] sm:text-sm sm:leading-7">
            {content.videoSectionDesc ||
              "Explore our craftsmanship, material selection, and tailoring operations in action."}
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-2 pb-1 text-[9px] font-medium uppercase tracking-[0.16em] text-[#817970] sm:flex">
          <Film className="h-4 w-4 text-[#9D8974]" />
          Atelier Films
        </div>
      </div>

      {/* Video Gallery */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {displayVideos.map((vid, index) => (
          <article
            key={vid.id}
            className="group overflow-hidden border border-[#E7E1D9] bg-white transition-all duration-500 hover:border-[#D8C9B8] hover:shadow-[0_16px_40px_rgba(33,31,28,0.06)]"
          >
            {/* Video */}
            <div className="relative aspect-video overflow-hidden bg-[#211F1C]">
              {vid.video_url ? (
                <video
                  src={vid.video_url}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#F0ECE6] text-[#9D8974]">
                  <Film className="h-8 w-8" />
                  <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#817970]">
                    Video Unavailable
                  </span>
                </div>
              )}

              {/* Editorial Index */}
              <div className="pointer-events-none absolute left-3 top-3 border border-white/50 bg-[#FAF8F4]/95 px-3 py-1.5 backdrop-blur-sm">
                <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#51463B]">
                  Film {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Video Information */}
            <div className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-5 bg-[#9D8974] transition-all duration-300 group-hover:w-9" />
                <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#9D8974]">
                  Yifan Atelier
                </span>
              </div>

              <h4 className="font-serif text-lg font-normal leading-snug text-[#211F1C] sm:text-xl">
                {vid.title}
              </h4>

              {vid.description && (
                <p className="mt-2 line-clamp-3 text-xs leading-6 text-[#625D57] sm:text-sm">
                  {vid.description}
                </p>
              )}

              <div className="mt-5 border-t border-[#F0ECE6] pt-4">
                <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#817970]">
                  Craftsmanship · Design · Detail
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
