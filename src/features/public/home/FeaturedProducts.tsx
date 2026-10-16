"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Send } from "lucide-react";
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
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Automatic carousel movement
  useEffect(() => {
    if (!emblaApi || isHovered || products.length <= 1) return;

    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => window.clearInterval(interval);
  }, [emblaApi, isHovered, products.length]);

  return (
    <section className="relative overflow-hidden border-b border-[#E7E1D9] bg-[#FAF8F4] py-20 sm:py-24 lg:py-28">
      {/* Background accents */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#E9E0D5]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-white/80 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Editorial Header */}
        <div className="mb-10 flex items-end justify-between gap-5 sm:mb-14">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#9D8974]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#806B55] sm:text-xs">
                {content.tagline}
              </p>
            </div>

            <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-4xl lg:text-5xl">
              {content.heading}
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#625D57] sm:text-base">
              {content.subheading}
            </p>
          </div>

          {/* Carousel Controls */}
          {!isLoading && !isError && products.length > 1 && (
            <div className="flex shrink-0 items-center gap-2">
              <AppButton
                onClick={scrollPrev}
                variant="outline"
                iconOnly
                aria-label={content.prevProduct}
                className="h-10 w-10 rounded-full border-[#D8C9B8] bg-transparent text-[#51463B] shadow-none transition-all hover:border-[#211F1C] hover:bg-[#211F1C] hover:text-white sm:h-11 sm:w-11"
              >
                <ChevronLeft className="h-5 w-5" />
              </AppButton>

              <AppButton
                onClick={scrollNext}
                variant="outline"
                iconOnly
                aria-label={content.nextProduct}
                className="h-10 w-10 rounded-full border-[#D8C9B8] bg-transparent text-[#51463B] shadow-none transition-all hover:border-[#211F1C] hover:bg-[#211F1C] hover:text-white sm:h-11 sm:w-11"
              >
                <ChevronRight className="h-5 w-5" />
              </AppButton>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <FeaturedProductsSkeleton />
        ) : isError ? (
          <div
            role="alert"
            className="border border-[#E7E1D9] bg-white/70 px-6 py-14 text-center"
          >
            <p className="text-sm text-[#625D57]">{content.noProducts}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="border border-[#E7E1D9] bg-white/70 px-6 py-14 text-center">
            <p className="font-serif text-xl text-[#51463B]">
              {content.noProducts}
            </p>
          </div>
        ) : (
          /* Product Carousel */
          <div
            ref={emblaRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="overflow-hidden"
          >
            <div className="-ml-5 flex sm:-ml-6">
              {products.map((product, index) => {
                const imageUrl = product.image?.url || "/Yee_Fan_Logo.jpg";

                return (
                  <div
                    key={product.id}
                    className="min-w-0 shrink-0 basis-full pl-5 sm:basis-1/2 sm:pl-6 lg:basis-1/3"
                  >
                    <article className="group flex h-full flex-col bg-white">
                      {/* Product Image */}
                      <Link
                        href={`/products/${product.slug}`}
                        className="relative block overflow-hidden bg-[#F0ECE6]"
                        aria-label={product.name}
                      >
                        <div className="relative aspect-4/5 overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          />

                          {/* Image Overlay */}
                          <div className="absolute inset-0 bg-linear-to-t from-[#211F1C]/40 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                          {/* Product Number */}
                          <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-[#FAF8F4]/90 font-serif text-sm text-[#51463B] backdrop-blur-sm">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          {/* View Product */}
                          <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[#FAF8F4] text-[#211F1C] opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className="flex flex-1 flex-col border-b border-[#E7E1D9] px-1 pb-5 pt-5 sm:pt-6">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#9D8974] sm:text-[10px]">
                            {content.codeLabel} {product.product_code}
                          </span>

                          <span className="h-px flex-1 bg-[#E7E1D9]" />
                        </div>

                        <h3 className="mt-3 font-serif text-xl font-normal leading-snug text-[#211F1C] transition-colors group-hover:text-[#806B55] sm:text-2xl">
                          <Link href={`/products/${product.slug}`}>
                            {product.name}
                          </Link>
                        </h3>

                        <p className="mt-3 line-clamp-2 text-xs leading-6 text-[#756C62] sm:text-sm">
                          {product.description}
                        </p>

                        {/* Product Actions */}
                        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                          <Link
                            href={`/products/${product.slug}`}
                            className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#51463B] transition-colors hover:text-[#9D8974] sm:text-xs"
                          >
                            {content.viewDetails}
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>

                          <AppButton
                            render={
                              <Link href={`/contact?product=${product.id}`} />
                            }
                            variant="outline"
                            size="sm"
                            rightIcon={<Send className="h-3.5 w-3.5" />}
                            className="rounded-none border-[#D8C9B8] bg-transparent text-[10px] font-medium tracking-wide text-[#211F1C] shadow-none transition-colors hover:border-[#211F1C] hover:bg-[#211F1C] hover:text-white sm:text-xs"
                          >
                            {content.inquire}
                          </AppButton>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Collection Link */}
        {!isLoading && !isError && products.length > 0 && (
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              href="/all-catalogs"
              className="group inline-flex items-center gap-3 border-b border-[#B9A995] pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#51463B] transition-colors hover:border-[#211F1C] hover:text-[#211F1C] sm:text-xs"
            >
              {content.viewAll ?? "Explore All Collections"}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedProductsSkeleton() {
  return (
    <div
      className="grid animate-pulse grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Loading featured products"
    >
      {[1, 2, 3].map((item) => (
        <div key={item} className="space-y-4">
          <div className="aspect-4/5 rounded-sm bg-[#E7E1D9]" />
          <div className="space-y-3 px-1">
            <div className="h-3 w-24 rounded bg-[#E7E1D9]" />
            <div className="h-6 w-3/4 rounded bg-[#E7E1D9]" />
            <div className="h-3 w-full rounded bg-[#F0ECE6]" />
            <div className="h-3 w-2/3 rounded bg-[#F0ECE6]" />
          </div>
        </div>
      ))}
    </div>
  );
}
