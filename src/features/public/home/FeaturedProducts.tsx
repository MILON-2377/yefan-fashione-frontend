"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { AppButton } from "@/features/common/ui/AppButton";
import { useHomeFeaturedProducts } from "../products/hooks/useHomeFeaturedProducts";
import { useLanguage } from "@/context/LanguageContext";

export function FeaturedProducts() {
  const { dict } = useLanguage();
  const content = dict.featuredProducts;

  const { data, isLoading, isError } = useHomeFeaturedProducts({
    page: 1,
    page_size: 10,
  });
  const products = data?.items ?? [];

  const [isHovered, setIsHovered] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Automatic slide mechanism
  useEffect(() => {
    if (!emblaApi || isHovered || products.length <= 1) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [emblaApi, isHovered, products.length]);

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Bar */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
              {content.tagline}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              {content.heading}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <AppButton
              onClick={scrollPrev}
              variant="outline"
              iconOnly
              aria-label={content.prevProduct}
              className="h-10 w-10 rounded-full border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </AppButton>
            <AppButton
              onClick={scrollNext}
              variant="outline"
              iconOnly
              aria-label={content.nextProduct}
              className="h-10 w-10 rounded-full border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </AppButton>
          </div>
        </div>

        {/* Loading Skeleton / Empty State / Carousel */}
        {isLoading ? (
          <FeaturedProductsSkeleton />
        ) : isError || products.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500 font-mono">
            {content.noProducts}
          </div>
        ) : (
          <div
            ref={emblaRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="overflow-hidden py-2"
          >
            <div className="flex -ml-6">
              {products.map((product) => {
                const imageUrl = product.image?.url || "/Yee_Fan_Logo.jpg";

                return (
                  <div
                    key={product.id}
                    className="pl-6 min-w-full sm:min-w-[50%] lg:min-w-[33.333%] shrink-0"
                  >
                    <div className="group h-full flex flex-col justify-between bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                      <div>
                        {/* Product Image Area */}
                        <div className="relative h-64 w-full bg-slate-50 overflow-hidden border-b border-slate-100">
                          <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Info Area */}
                        <div className="p-5 space-y-2">
                          <span className="text-[11px] font-mono font-semibold text-blue-600 uppercase tracking-wide">
                            {content.codeLabel} {product.product_code}
                          </span>
                          <h3 className="font-bold text-slate-900 text-lg leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
                            <Link href={`/products/${product.slug}`}>
                              {product.name}
                            </Link>
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Action Area */}
                      <div className="p-5 pt-0 mt-auto">
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
                          >
                            {content.viewDetails}
                          </Link>

                          <AppButton
                            render={
                              <Link href={`/contact?product=${product.id}`} />
                            }
                            variant="outline"
                            size="sm"
                            rightIcon={
                              <Send className="w-3.5 h-3.5 text-blue-600" />
                            }
                            className="border-slate-200 hover:bg-blue-50 hover:border-blue-200 text-slate-800 text-xs font-semibold"
                          >
                            {content.inquire}
                          </AppButton>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-96 bg-slate-100 rounded-2xl border border-slate-200"
        />
      ))}
    </div>
  );
}
