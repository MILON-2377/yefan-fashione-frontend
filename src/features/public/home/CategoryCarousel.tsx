// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Category } from "@/types";

// interface CategoryCarouselProps {
//   categories: Category[];
//   autoPlayInterval?: number;
// }

// export function CategoryCarousel({
//   categories,
//   autoPlayInterval = 3500,
// }: CategoryCarouselProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const touchStartX = useRef<number | null>(null);

//   const nextSlide = useCallback(() => {
//     if (categories.length === 0) return;
//     setCurrentIndex((prev) => (prev + 1) % categories.length);
//   }, [categories.length]);

//   const prevSlide = useCallback(() => {
//     if (categories.length === 0) return;
//     setCurrentIndex(
//       (prev) => (prev - 1 + categories.length) % categories.length,
//     );
//   }, [categories.length]);

//   // Auto-play loop (pauses when user hovers over cards)
//   useEffect(() => {
//     if (isHovered || categories.length <= 1) return;
//     const timer = setInterval(() => {
//       nextSlide();
//     }, autoPlayInterval);
//     return () => clearInterval(timer);
//   }, [nextSlide, isHovered, categories.length, autoPlayInterval]);

//   // Touch handlers for mobile swiping
//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e: React.TouchEvent) => {
//     if (touchStartX.current === null) return;
//     const touchEndX = e.changedTouches[0].clientX;
//     const diff = touchStartX.current - touchEndX;

//     if (Math.abs(diff) > 50) {
//       if (diff > 0) nextSlide();
//       else prevSlide();
//     }
//     touchStartX.current = null;
//   };

//   if (!categories || categories.length === 0) return null;

//   return (
//     <div
//       className="relative w-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onTouchStart={handleTouchStart}
//       onTouchEnd={handleTouchEnd}
//     >
//       {/* Navigation Controls */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
//             Product Range
//           </span>
//           <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
//             Explore Categories
//           </h2>
//         </div>

//         <div className="flex items-center gap-2">
//           <Button
//             type="button"
//             variant="outline"
//             size="icon"
//             onClick={prevSlide}
//             className="h-10 w-10 rounded-full border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition shadow-sm"
//             aria-label="Previous Category"
//           >
//             <ChevronLeft className="w-5 h-5" />
//           </Button>
//           <Button
//             type="button"
//             variant="outline"
//             size="icon"
//             onClick={nextSlide}
//             className="h-10 w-10 rounded-full border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition shadow-sm"
//             aria-label="Next Category"
//           >
//             <ChevronRight className="w-5 h-5" />
//           </Button>
//         </div>
//       </div>

//       {/* Carousel Track */}
//       <div className="overflow-hidden rounded-2xl py-2">
//         <motion.div
//           className="flex gap-6"
//           animate={{
//             x: `calc(-${currentIndex * (100 / getVisibleSlides())}% - ${
//               currentIndex * (24 / getVisibleSlides())
//             }px)`,
//           }}
//           transition={{ type: "spring", stiffness: 260, damping: 28 }}
//         >
//           {categories.map((cat) => (
//             <div
//               key={cat.id}
//               className="min-w-[85%] sm:min-w-[45%] lg:min-w-[28%] shrink-0"
//             >
//               <Link
//                 href={`/products?category=${cat.slug}`}
//                 className="group relative block overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300"
//               >
//                 {/* Category Image Container */}
//                 <div className="relative h-64 w-full overflow-hidden bg-slate-100">
//                   <Image
//                     src={cat.imageUrl || "/images/placeholder-category.jpg"}
//                     alt={cat.name}
//                     fill
//                     sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 28vw"
//                     className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

//                   {/* Badge & Quick Link */}
//                   <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 backdrop-blur-md text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 shadow-md">
//                     <ArrowUpRight className="w-4 h-4 text-blue-600" />
//                   </div>
//                 </div>

//                 {/* Content Overlay */}
//                 <div className="absolute bottom-0 inset-x-0 p-5 text-white">
//                   <span className="text-[11px] font-medium tracking-wider uppercase text-blue-300 bg-blue-950/60 px-2.5 py-1 rounded-md backdrop-blur-md inline-block mb-2">
//                     {cat.itemCount || 0} Products
//                   </span>
//                   <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">
//                     {cat.name}
//                   </h3>
//                   {cat.description && (
//                     <p className="text-xs text-slate-300 line-clamp-1 mt-1 font-normal opacity-90">
//                       {cat.description}
//                     </p>
//                   )}
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Pagination Dots */}
//       <div className="flex items-center justify-center gap-1.5 mt-6">
//         {categories.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`h-1.5 rounded-full transition-all duration-300 ${
//               currentIndex === idx
//                 ? "w-8 bg-blue-600"
//                 : "w-2 bg-slate-300 hover:bg-slate-400"
//             }`}
//             aria-label={`Go to category slide ${idx + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Helper function to calculate responsive slide offsets
// function getVisibleSlides() {
//   if (typeof window === "undefined") return 3;
//   if (window.innerWidth < 640) return 1;
//   if (window.innerWidth < 1024) return 2;
//   return 3;
// }




"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/features/common/ui/button";
import { PublicCategoryItem } from "@/features/public/categories/types/categoryTypes";

interface CategoryCarouselProps {
  categories: PublicCategoryItem[];
  autoPlayInterval?: number;
}

export function CategoryCarousel({
  categories,
  autoPlayInterval = 3500,
}: CategoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const touchStartX = useRef<number | null>(null);

  // Safely calculate responsive visible slides after mount (prevents SSR hydration error)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    if (categories.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  }, [categories.length]);

  const prevSlide = useCallback(() => {
    if (categories.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
  }, [categories.length]);

  // Auto-play loop
  useEffect(() => {
    if (isHovered || categories.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered, categories.length, autoPlayInterval]);

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  if (!categories || categories.length === 0) return null;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Controls */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
            Product Range
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Explore Categories
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="h-10 w-10 rounded-full border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition shadow-xs"
            aria-label="Previous Category"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="h-10 w-10 rounded-full border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition shadow-xs"
            aria-label="Next Category"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Carousel Track */}
      <div className="overflow-hidden rounded-2xl py-2">
        <motion.div
          className="flex gap-6"
          animate={{
            x: `calc(-${currentIndex * (100 / visibleSlides)}% - ${
              currentIndex * (24 / visibleSlides)
            }px)`,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="min-w-[85%] sm:min-w-[45%] lg:min-w-[28%] shrink-0"
            >
              <Link
                href={`/categories/${cat.slug}`}
                className="group relative block overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              >
                {/* Category Image Container */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={cat.image?.url || "/Yee_Fan_Logo.jpg"}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 28vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Quick Link Badge */}
                  <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 backdrop-blur-md text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 shadow-md">
                    <ArrowUpRight className="w-4 h-4 text-blue-600" />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {categories.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? "w-8 bg-blue-600"
                : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to category slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
