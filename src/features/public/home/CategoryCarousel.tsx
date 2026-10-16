"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/features/common/ui/button";
import { PublicCategoryItem } from "@/features/public/categories/types/categoryTypes";

interface CategoryCarouselProps {
  categories: PublicCategoryItem[];
  autoPlayInterval?: number;
}

const GAP = 24;

export function CategoryCarousel({
  categories,
  autoPlayInterval = 5000,
}: CategoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const [slideWidth, setSlideWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  const viewportRef = useRef<HTMLDivElement>(null);
  const firstSlideRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const prefersReducedMotion = useReducedMotion();

  const maxIndex = Math.max(0, categories.length - visibleSlides);

  const pageCount = Math.max(1, Math.ceil(categories.length / visibleSlides));

  const pageStarts = useMemo(
    () =>
      Array.from({ length: pageCount }, (_, page) =>
        Math.min(page * visibleSlides, maxIndex),
      ).filter(
        (index, position, indexes) => indexes.indexOf(index) === position,
      ),
    [pageCount, visibleSlides, maxIndex],
  );

  // Responsive slide count. ResizeObserver tracks container changes,
  // including changes that do not originate from the browser window.
  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const updateLayout = () => {
      const width = viewport.clientWidth;

      const slides = width < 640 ? 1 : width < 1024 ? 2 : 3;

      setVisibleSlides(slides);

      const nextSlideWidth = (width - GAP * (slides - 1)) / slides;

      setSlideWidth(nextSlideWidth);
    };

    updateLayout();

    const observer = new ResizeObserver(updateLayout);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  // Pause autoplay when the tab is not visible.
  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentVisible(!document.hidden);
    };

    updateVisibility();

    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const nextSlide = useCallback(() => {
    if (categories.length <= visibleSlides) return;

    setCurrentIndex((index) =>
      index >= maxIndex ? 0 : Math.min(index + 1, maxIndex),
    );
  }, [categories.length, visibleSlides, maxIndex]);

  const prevSlide = useCallback(() => {
    if (categories.length <= visibleSlides) return;

    setCurrentIndex((index) => (index <= 0 ? maxIndex : index - 1));
  }, [categories.length, visibleSlides, maxIndex]);

  const goToPage = useCallback(
    (index: number) => {
      const targetIndex = pageStarts[index];

      if (targetIndex !== undefined) {
        setCurrentIndex(targetIndex);
      }
    },
    [pageStarts],
  );

  // Autoplay
  useEffect(() => {
    if (
      prefersReducedMotion ||
      isHovered ||
      !isDocumentVisible ||
      categories.length <= visibleSlides ||
      autoPlayInterval <= 0
    ) {
      return;
    }

    const timer = window.setInterval(nextSlide, autoPlayInterval);

    return () => window.clearInterval(timer);
  }, [
    nextSlide,
    isHovered,
    isDocumentVisible,
    prefersReducedMotion,
    categories.length,
    visibleSlides,
    autoPlayInterval,
  ]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX;

    if (touchEndX === undefined) {
      touchStartX.current = null;
      return;
    }

    const difference = touchStartX.current - touchEndX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) nextSlide();
      else prevSlide();
    }

    touchStartX.current = null;
  };

  if (categories.length === 0) return null;

  const translateX = currentIndex * (slideWidth + GAP);
  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Section Heading */}
      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#9D8974]">
            Product Range
          </span>

          <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#211F1C] sm:text-4xl">
            Explore Categories
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-6 text-[#625D57]">
            Discover thoughtfully curated collections for your boutique and
            retail business.
          </p>
        </div>

        {categories.length > visibleSlides && (
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="h-10 w-10 rounded-full border-[#E7E1D9] bg-white text-[#51463B] shadow-xs transition-colors hover:border-[#D8C9B8] hover:bg-[#F0ECE6] hover:text-[#211F1C]"
              aria-label="Previous categories"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="h-10 w-10 rounded-full border-[#E7E1D9] bg-white text-[#51463B] shadow-xs transition-colors hover:border-[#D8C9B8] hover:bg-[#F0ECE6] hover:text-[#211F1C]"
              aria-label="Next categories"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Carousel Viewport */}
      <div ref={viewportRef} className="overflow-hidden">
        <motion.div
          className="flex"
          style={{ gap: GAP }}
          animate={{ x: -translateX }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                }
          }
        >
          {categories.map((category, index) => (
            <div
              key={category.id}
              ref={index === 0 ? firstSlideRef : undefined}
              className="min-w-0 shrink-0"
              style={{
                width:
                  slideWidth > 0
                    ? `${slideWidth}px`
                    : `calc((100% - ${GAP * (visibleSlides - 1)}px) / ${visibleSlides})`,
              }}
            >
              <Link
                href={`/products`}
                className="group relative block overflow-hidden rounded-lg border border-[#E7E1D9] bg-white shadow-xs transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden bg-[#F0ECE6] sm:h-80 lg:h-[360px]">
                  <Image
                    src={category.image?.url || "/Yee_Fan_Logo.jpg"}
                    alt={category.name}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Readable image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211F1C]/75 via-[#211F1C]/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Arrow */}
                  <div className="absolute right-4 top-4 flex h-9 w-9 translate-x-2 items-center justify-center rounded-full bg-[#FAF8F4]/95 text-[#211F1C] opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>

                  {/* Category Name */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="font-serif text-xl font-normal tracking-wide text-white transition-colors group-hover:text-[#E9E0D5] sm:text-2xl">
                      {category.name}
                    </h3>

                    <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/85">
                      Explore Collection
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination */}
      {pageStarts.length > 1 && (
        <div
          className="mt-7 flex items-center justify-center gap-2"
          aria-label="Category carousel pagination"
        >
          {pageStarts.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToPage(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === pageStarts[index]
                  ? "w-8 bg-[#211F1C]"
                  : "w-1.5 bg-[#D8C9B8] hover:bg-[#9D8974]"
              }`}
              aria-label={`Go to category page ${index + 1}`}
              aria-current={
                currentIndex === pageStarts[index] ? "true" : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
