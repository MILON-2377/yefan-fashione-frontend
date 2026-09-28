"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { fetchApi } from "@/lib/api";
import { Product } from "@/types";

// Initial fallback content loaded immediately if API fails or backend isn't ready
const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Precision Alloy Steel Valve Shell",
    slug: "precision-alloy-steel-valve-shell",
    sku: "PAS-V01",
    category: { id: "1", name: "Alloy Components", slug: "alloy-components" },
    description:
      "High-temperature resistant alloy casting for industrial pipe controls.",
    specifications: { Material: "Alloy Steel", Certification: "ISO 9001" },
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    ],
    priceRange: "$15.00 - $45.00",
    moq: "100 Units",
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Custom Brass Threaded Fitting Set",
    slug: "custom-brass-threaded-fitting-set",
    sku: "CBT-F02",
    category: {
      id: "2",
      name: "Custom Brass Parts",
      slug: "custom-brass-parts",
    },
    description: "Corrosion-resistant custom CNC machined brass fittings.",
    specifications: { Process: "CNC Milling", MOQ: "500 Pieces" },
    images: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
    ],
    priceRange: "$2.50 - $8.00",
    moq: "500 Units",
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Heavy-Duty Sealed Motor Housing",
    slug: "heavy-duty-sealed-motor-housing",
    sku: "HDS-MH03",
    category: { id: "3", name: "Motor Enclosures", slug: "motor-enclosures" },
    description:
      "IP67 waterproof aluminum housing for outdoor brushless motors.",
    specifications: { Rating: "IP67", Finish: "Anodized" },
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    ],
    priceRange: "$30.00 - $85.00",
    moq: "50 Units",
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Modular Industrial Circuit Terminal Box",
    slug: "modular-industrial-circuit-terminal-box",
    sku: "MIC-TB04",
    category: {
      id: "4",
      name: "Electrical Hardware",
      slug: "electrical-hardware",
    },
    description:
      "Flame-retardant junction box with pre-drilled cable entry points.",
    specifications: { Material: "ABS Plastic", Voltage: "Up to 600V" },
    images: [
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=800&auto=format&fit=crop",
    ],
    priceRange: "$8.00 - $22.00",
    moq: "200 Units",
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
];

export function FeaturedProducts() {
  // Initialize state directly with initial fallback products
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
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

  // Attempt backend fetch; keep INITIAL_PRODUCTS on error or empty response
  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const data = await fetchApi<Product[]>("/products?featured=true");
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.warn(
          "FastAPI offline or unreachable. Displaying initial product catalog.",
        );
      }
    }

    loadFeaturedProducts();
  }, []);

  // Automatic slide mechanism
  useEffect(() => {
    if (!emblaApi || isHovered) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [emblaApi, isHovered]);

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Bar */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
              Top Catalog Picks
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Featured Products
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <AppButton
              onClick={scrollPrev}
              variant="outline"
              iconOnly
              aria-label="Previous product"
              className="h-10 w-10 rounded-full border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </AppButton>
            <AppButton
              onClick={scrollNext}
              variant="outline"
              iconOnly
              aria-label="Next product"
              className="h-10 w-10 rounded-full border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </AppButton>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={emblaRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="overflow-hidden py-2"
        >
          <div className="flex -ml-6">
            {products.map((product) => {
              const imageUrl =
                product.images?.[0] || "/placeholder-product.jpg";

              return (
                <div
                  key={product.id}
                  className="pl-6 min-w-[100%] sm:min-w-[50%] lg:min-w-[33.333%] shrink-0"
                >
                  <div className="group h-full flex flex-col justify-between bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                    {/* Image Area */}
                    <div>
                      <div className="relative h-64 w-full bg-slate-50 overflow-hidden border-b border-slate-100">
                        <Image
                          src={imageUrl}
                          alt={product.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.category?.name && (
                          <span className="absolute top-3 left-3 text-[11px] font-semibold text-slate-800 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200/80 shadow-sm">
                            {product.category.name}
                          </span>
                        )}
                      </div>

                      {/* Info Area */}
                      <div className="p-5 space-y-2">
                        <span className="text-[11px] font-mono font-medium text-slate-400 uppercase">
                          SKU: {product.sku}
                        </span>
                        <h3 className="font-bold text-slate-900 text-lg leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
                          <Link href={`/products/${product.slug}`}>
                            {product.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="p-5 pt-0 mt-auto">
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          {product.priceRange && (
                            <p className="text-sm font-bold text-blue-600">
                              {product.priceRange}
                            </p>
                          )}
                          {product.moq && (
                            <p className="text-[11px] text-slate-400">
                              MOQ: {product.moq}
                            </p>
                          )}
                        </div>

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
                          Inquire
                        </AppButton>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
