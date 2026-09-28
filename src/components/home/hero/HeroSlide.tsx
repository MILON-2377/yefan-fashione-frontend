"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroBanner } from "@/types";

interface HeroSlideProps {
  banner: HeroBanner;
  isActive: boolean;
}

export function HeroSlide({ banner, isActive }: HeroSlideProps) {
  if (!isActive) return null;

  return (
    <div className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center bg-slate-50/60 overflow-hidden">
      {/* Background Image with Light Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={banner.bgImageUrl}
          alt={banner.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-15 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/95 to-white/40 z-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-16 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>{banner.badge}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]"
          >
            {banner.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
          >
            {banner.subtitle}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-6 text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all">
              <Link
                href={banner.primaryCtaLink}
                className="flex items-center gap-2"
              >
                <span>{banner.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="bg-white hover:bg-slate-50 text-slate-800 border-slate-300 font-semibold h-11 px-6 text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all"
            >
              <Link
                href={banner.secondaryCtaLink}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-blue-600" />
                <span>{banner.secondaryCtaText}</span>
              </Link>
            </Button>
          </motion.div>

          {/* Key Metrics Row */}
          {banner.metrics && banner.metrics.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/80 max-w-lg"
            >
              {banner.metrics.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                    {metric.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
