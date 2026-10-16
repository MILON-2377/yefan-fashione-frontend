"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { HeroBanner } from "@/types";

interface HeroSlideProps {
  banner: HeroBanner;
  isActive: boolean;
}

export function HeroSlide({ banner, isActive }: HeroSlideProps) {
  if (!isActive) return null;

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#FAF8F4]">
      {/* Full-width campaign image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={banner.bgImageUrl}
          alt="Premium womenswear collection in a refined showroom"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] sm:object-[60%_center] lg:object-[center_45%]"
        />
      </div>

      {/* Gradient protects text readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#FAF8F4] via-[#FAF8F4]/90 to-transparent sm:via-[#FAF8F4]/80 lg:via-[#FAF8F4]/65" />

      {/* Responsive hero height */}
      <div className="mx-auto flex min-h-[600px] w-full max-w-[1920px] items-center px-5 py-20 sm:min-h-[680px] sm:px-10 lg:min-h-[min(760px,calc(100svh-80px))] lg:px-16 xl:px-24">
        <div className="w-full max-w-[620px]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center gap-3 sm:mb-6"
          >
            <span className="h-px w-8 shrink-0 bg-[#9D8974]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#5F574F] sm:text-xs sm:tracking-[0.24em]">
              {banner.badge || "Premium Womenswear Showroom"}
            </span>
          </motion.div>

          {/* Editorial headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-[600px] font-serif text-[42px] font-normal leading-[1.06] tracking-[-0.04em] text-[#211F1C] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {banner.title}
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 max-w-[430px] text-sm leading-7 text-[#625D57] sm:mt-6 sm:text-base sm:leading-8"
          >
            {banner.subtitle}
          </motion.p>

          {/* Single CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-7 sm:mt-8"
          >
            <Link
              href={banner.primaryCtaLink}
              className="group inline-flex min-h-12 items-center justify-center gap-5 bg-[#211F1C] px-7 py-4 text-[11px] font-medium uppercase tracking-[0.17em] text-white transition-colors duration-300 hover:bg-[#51463B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#51463B]"
            >
              <span>{banner.primaryCtaText || "Explore Collections"}</span>

              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
