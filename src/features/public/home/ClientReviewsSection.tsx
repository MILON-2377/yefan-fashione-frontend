"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Globe2,
  PackageCheck,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useHomeReviews } from "../reviews/hooks/useHomeReviews";

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
    <section className="relative w-full overflow-hidden border-t border-[#E7E1D9] bg-[#FAF8F4] py-20 text-[#211F1C] sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#E9E0D5]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-white/80 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-12 px-4 sm:px-8 lg:space-y-16">
        {/* Editorial heading */}
        <div className="flex flex-col gap-8 border-b border-[#D8C9B8] pb-8 md:flex-row md:items-end md:justify-between lg:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#9D8974]" />
              <Sparkles
                className="h-3.5 w-3.5 text-[#9D8974]"
                strokeWidth={1.5}
              />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#806B55] sm:text-xs">
                {content.badge}
              </span>
            </div>

            <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-4xl lg:text-5xl xl:text-6xl">
              {content.heading}
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#625D57] sm:text-base sm:leading-8">
              {content.subheading}
            </p>
          </motion.div>

          {/* Rating summary */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex shrink-0 items-center gap-5 border border-[#D8C9B8] bg-white/70 p-5 sm:p-6"
          >
            <div className="border-r border-[#E7E1D9] pr-5">
              <span className="block font-serif text-4xl font-normal leading-none text-[#51463B] sm:text-5xl">
                4.9
              </span>
              <span className="mt-2 block text-[9px] font-medium uppercase tracking-[0.18em] text-[#806B55]">
                {content.scoreOutOf}
              </span>
            </div>

            <div>
              <div
                className="mb-2 flex items-center gap-1 text-[#9D8974]"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="max-w-36 text-xs leading-5 text-[#625D57]">
                {content.satisfiedPartners}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Review cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-h-70 animate-pulse border border-[#E7E1D9] bg-white/70 p-7"
              >
                <div className="h-4 w-24 bg-[#E9E0D5]" />
                <div className="mt-8 h-3 w-full bg-[#F0ECE6]" />
                <div className="mt-3 h-3 w-5/6 bg-[#F0ECE6]" />
                <div className="mt-3 h-3 w-2/3 bg-[#F0ECE6]" />
                <div className="mt-12 border-t border-[#E7E1D9] pt-5">
                  <div className="h-9 w-36 bg-[#F0ECE6]" />
                </div>
              </div>
            ))}
          </div>
        ) : isError || reviews.length === 0 ? (
          <div className="border border-dashed border-[#D8C9B8] px-6 py-16 text-center">
            <Quote className="mx-auto mb-4 h-7 w-7 text-[#B9A995]" />
            <p className="font-serif text-xl text-[#51463B]">
              {content.noReviews}
            </p>
          </div>
        ) : (
          <div
            className="relative -mx-4 overflow-hidden sm:-mx-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8  bg-linear-to-r from-[#FAF8F4] to-transparent sm:w-16 lg:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-[#FAF8F4] to-transparent sm:w-16 lg:w-24" />

            <motion.div
              className="flex w-max gap-4 px-4 py-3 sm:gap-5 sm:px-8"
              animate={{
                x: isHovered ? undefined : ["0%", "-50%"],
              }}
              transition={{
                ease: "linear",
                duration: Math.max(30, reviews.length * 7),
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {marqueeItems.map((review, index) => (
                <article
                  key={`${review.id}-${index}`}
                  className="group relative flex w-72.5 shrink-0 flex-col justify-between border border-[#E7E1D9] bg-white/85 p-6 transition-all duration-300 hover:border-[#D8C9B8] hover:bg-white sm:w-87.5 sm:p-7 lg:w-95"
                >
                  <Quote className="absolute right-6 top-6 h-9 w-9 text-[#F0ECE6]" />

                  <div className="relative">
                    <div className="mb-6 flex items-center justify-between gap-3">
                      <div
                        className="flex items-center gap-1 text-[#9D8974]"
                        aria-label={`${review.rating || 5} out of 5 stars`}
                      >
                        {Array.from(
                          {
                            length: Math.min(
                              5,
                              Math.max(0, review.rating || 5),
                            ),
                          },
                          (_, starIndex) => (
                            <Star
                              key={starIndex}
                              className="h-3.5 w-3.5 fill-current"
                            />
                          ),
                        )}
                      </div>

                      {review.country && (
                        <span className="inline-flex max-w-36 items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-[#806B55]">
                          <Globe2 className="h-3 w-3 shrink-0" />
                          <span className="truncate">{review.country}</span>
                        </span>
                      )}
                    </div>

                    <p className="line-clamp-5 text-sm italic leading-7 text-[#625D57]">
                      “{review.message}”
                    </p>
                  </div>

                  <div className="mt-8 border-t border-[#E7E1D9] pt-5">
                    <div className="flex items-center gap-3">
                      {review.avatar?.url ? (
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#E7E1D9] bg-[#F0ECE6]">
                          <Image
                            src={review.avatar.url}
                            alt={review.name || "Customer"}
                            fill
                            unoptimized
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D8C9B8] bg-[#F0ECE6] font-serif text-lg text-[#51463B]">
                          {review.name?.charAt(0)?.toUpperCase() || "C"}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-medium text-[#211F1C]">
                          {review.name}
                        </h3>

                        <p className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-[#756C62]">
                          <Building2 className="h-3 w-3 shrink-0 text-[#9D8974]" />
                          <span className="truncate">
                            {[review.job_title, review.company_name]
                              .filter(Boolean)
                              .join(" · ")}
                          </span>
                        </p>
                      </div>
                    </div>

                    {review.product && (
                      <div className="mt-5 flex min-w-0 items-center gap-2 border-t border-[#F0ECE6] pt-4 text-xs">
                        <PackageCheck className="h-3.5 w-3.5 shrink-0 text-[#9D8974]" />

                        <span className="shrink-0 text-[#756C62]">
                          {content.productLabel}
                        </span>

                        <Link
                          href={`/products/${review.product.slug}`}
                          className="truncate font-medium text-[#51463B] underline decoration-[#D8C9B8] underline-offset-4 transition-colors hover:text-[#9D8974]"
                        >
                          {review.product.name}
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        )}

        {/* Closing note */}
        {!isLoading && !isError && reviews.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-[#D8C9B8] pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-xs leading-6 text-[#756C62] sm:text-sm">
              {content.footerNote}
            </p>

            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-[#211F1C] transition-colors hover:text-[#806B55]"
            >
              {content.primaryCta}
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8C9B8] transition-all duration-300 group-hover:border-[#211F1C] group-hover:bg-[#211F1C] group-hover:text-white">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
