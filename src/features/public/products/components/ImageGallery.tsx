"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppButton } from "@/features/common/ui/AppButton";
import { ProductMediaAsset } from "../types/productDetailTypes";

interface ImageGalleryProps {
  media?: ProductMediaAsset[];
  productName: string;
}

export function ImageGallery({ media = [], productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fallback to placeholder logo if no media assets are provided
  const galleryItems =
    media.length > 0
      ? media
      : [
          {
            id: "fallback-1",
            media_asset_id: "fallback",
            url: "/Yee_Fan_Logo.jpg",
            alt_text: productName,
            sort_order: 0,
            is_primary: true,
          },
        ];

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1,
    );
  };

  const activeMedia = galleryItems[selectedIndex] || galleryItems[0];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnail List */}
      {galleryItems.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar shrink-0 max-h-130">
          {galleryItems.map((item, index) => {
            const isSelected = selectedIndex === index;
            return (
              <button
                key={item.id || index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  isSelected
                    ? "border-blue-600 ring-2 ring-blue-600/20 opacity-100"
                    : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={item.url}
                  alt={item.alt_text || `${productName} view ${index + 1}`}
                  fill
                  unoptimized
                  className="object-cover object-top"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Primary Display Area */}
      <div className="relative flex-1 aspect-3/4 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 group">
        <Image
          src={activeMedia.url}
          alt={activeMedia.alt_text || productName}
          fill
          unoptimized
          priority
          className="object-cover object-top transition-all duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Navigation Arrows for Multiple Media Items */}
        {galleryItems.length > 1 && (
          <>
            <AppButton
              onClick={handlePrev}
              variant="outline"
              iconOnly
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md opacity-0 group-hover:opacity-100 transition-all border-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </AppButton>

            <AppButton
              onClick={handleNext}
              variant="outline"
              iconOnly
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md opacity-0 group-hover:opacity-100 transition-all border-none"
            >
              <ChevronRight className="w-5 h-5" />
            </AppButton>
          </>
        )}
      </div>
    </div>
  );
}
