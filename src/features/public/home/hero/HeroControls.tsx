"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroControlsProps {
  total: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export function HeroControls({
  total,
  current,
  onPrev,
  onNext,
  onSelect,
}: HeroControlsProps) {
  if (total <= 1) return null;

  return (
    <div className="absolute bottom-6 right-6 sm:right-12 z-30 flex items-center gap-4">
      {/* Indicator Dots */}
      <div className="flex items-center gap-1.5 bg-white/90 border border-slate-200/80 rounded-full px-3 py-2 shadow-sm backdrop-blur-md">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === index
                ? "w-8 bg-blue-600"
                : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center gap-1 bg-white/90 border border-slate-200/80 rounded-lg p-1 shadow-sm backdrop-blur-md">
        <button
          onClick={onPrev}
          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={onNext}
          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
