"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  Building2,
  Globe,
  Sparkles,
  PackageCheck,
} from "lucide-react";
import { useHomeReviews } from "../reviews/hooks/useHomeReviews";
import { useLanguage } from "@/context/LanguageContext";

export function ClientReviewsSection() {
  const { dict } = useLanguage();
  const content = dict.clientReviewsSection;

  const { data, isLoading, isError } = useHomeReviews({
    page: 1,
    page_size: 10,
  });
  const reviews = data?.items ?? [];
  const [isHovered, setIsHovered] = useState(false);

  const marqueeItems = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section className="w-full bg-white text-slate-800 py-16 sm:py-24 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {content.heading}
            </h2>

            <p className="text-sm text-slate-500 leading-relaxed">
              {content.subheading}
            </p>
          </div>

          {/* Score Badge */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center gap-4 shrink-0">
            <div className="text-center pr-4 border-r border-slate-200">
              <span className="text-3xl font-black text-slate-900 leading-none block">
                4.9
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1 block">
                {content.scoreOutOf}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-600 block">
                {content.satisfiedPartners}
              </span>
            </div>
          </div>
        </div>

        {/* --- Framer Motion Smooth Auto Marquee --- */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 h-56 animate-pulse"
              />
            ))}
          </div>
        ) : isError || reviews.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500 font-mono">
            {content.noReviews}
          </div>
        ) : (
          <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Fade Overlays on Edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-20 bg-linear-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-20 bg-linear-to-l from-white to-transparent z-10" />

            {/* Framer Motion Track */}
            <motion.div
              className="flex gap-6 w-max py-2"
              animate={{ x: isHovered ? undefined : ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: Math.max(25, reviews.length * 6),
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {marqueeItems.map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  className="
                    w-75 sm:w-95 lg:w-105
                    bg-white border border-slate-200/90 rounded-2xl p-6
                    shadow-xs hover:shadow-md hover:border-blue-300
                    transition-all flex flex-col justify-between shrink-0 relative space-y-4
                  "
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100 z-0" />

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      {review.country && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          <Globe className="w-3 h-3 text-slate-400" />
                          {review.country}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic line-clamp-4">
                      {review.message}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2 relative z-10">
                    <div className="flex items-center gap-3">
                      {review.avatar?.url ? (
                        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0">
                          <Image
                            src={review.avatar.url}
                            alt={review.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-100">
                          {review.name ? review.name.charAt(0) : "C"}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {review.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{review.job_title}</span>
                          {review.company_name ? (
                            <span>{review.company_name}</span>
                          ) : null}
                        </p>
                      </div>
                    </div>

                    {review.product && (
                      <div className="text-[10px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 flex items-center gap-1.5">
                        <PackageCheck className="w-3 h-3 text-blue-600 shrink-0" />
                        <span className="text-slate-400">
                          {content.productLabel}
                        </span>
                        <Link
                          href={`/products/${review.product.slug}`}
                          className="text-slate-700 hover:text-blue-600 font-semibold truncate transition"
                        >
                          {review.product.name}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
