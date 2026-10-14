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
    <section className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          {content.videoSectionTitle || "Atelier Brand Showcases"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          {content.videoSectionDesc || "Explore our craftsmanship, sustainable sourcing, and tailoring operations in action."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayVideos.map((vid) => (
          <div key={vid.id} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-3 p-4">
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video border border-slate-200">
              {vid.video_url ? (
                <video
                  src={vid.video_url}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  <Film className="w-8 h-8" />
                </div>
              )}
            </div>
            <div className="space-y-1 px-1">
              <h4 className="text-sm font-bold text-slate-900">{vid.title}</h4>
              {vid.description && (
                <p className="text-xs text-slate-600 line-clamp-2">{vid.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
