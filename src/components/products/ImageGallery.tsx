"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePrev = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnail Bar */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar shrink-0 max-h-[520px]">
        {images.map((imgUrl, index) => {
          const isSelected = selectedImageIndex === index;
          return (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                isSelected
                  ? "border-blue-600 ring-2 ring-blue-600/20"
                  : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={imgUrl}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover object-top"
                sizes="80px"
              />
            </button>
          );
        })}
      </div>

      {/* Main Big Image View */}
      <div className="relative flex-1 aspect-[3/4] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 group">
        <Image
          src={images[selectedImageIndex]}
          alt={title}
          fill
          priority
          className="object-cover object-top transition-all duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Navigation Arrows for Quick Browsing */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}