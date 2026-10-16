"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PublicCategoryItem } from "@/features/public/categories/types/categoryTypes";

interface ProductCatalogDropdownProps {
  categories: PublicCategoryItem[];
}

export function ProductCatalogDropdown({
  categories = [],
}: ProductCatalogDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center gap-2 rounded-none border-b px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974] focus-visible:ring-offset-2 ${
          isOpen
            ? "border-[#9D8974] text-[#51463B]"
            : "border-transparent text-[#51463B] hover:border-[#D8C9B8] hover:text-[#211F1C]"
        }`}
      >
        <span>Products</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[#9D8974] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mega Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full z-50 w-[min(90vw,620px)] pt-3"
          >
            <div className="border border-[#E7E1D9] bg-[#FAF8F4] p-4 shadow-[0_18px_50px_rgba(33,31,28,0.12)] sm:p-5">
              {/* Menu Header */}
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-[#E7E1D9] px-1 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center border border-[#D8C9B8] bg-white text-[#51463B]">
                    <Layers className="h-4 w-4" strokeWidth={1.5} />
                  </div>

                  <div className="space-y-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9D8974]">
                      Explore
                    </span>
                    <h3 className="font-serif text-lg font-medium text-[#211F1C]">
                      Product Catalog
                    </h3>
                  </div>
                </div>

                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#51463B] transition-colors hover:text-[#9D8974] focus-visible:outline-none focus-visible:underline"
                >
                  <span>View All</span>
                  <span className="text-[#9D8974]">({categories.length})</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Category Links */}
              <div className="grid max-h-[min(55vh,380px)] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                {categories.map((cat, idx) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.18,
                      delay: Math.min(idx * 0.025, 0.2),
                    }}
                  >
                    <Link
                      href={`/products?category_id=${encodeURIComponent(cat.id)}`}
                      onClick={() => setIsOpen(false)}
                      className="group flex min-h-[68px] items-center gap-3 border border-transparent bg-white p-2.5 transition-colors duration-200 hover:border-[#D8C9B8] hover:bg-[#F0ECE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974]"
                    >
                      {cat.image?.url ? (
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden bg-[#F0ECE6]">
                          <Image
                            src={cat.image.url}
                            alt={cat.name}
                            fill
                            unoptimized
                            sizes="44px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#E7E1D9] bg-[#FAF8F4]">
                          <Layers
                            className="h-4 w-4 text-[#9D8974]"
                            strokeWidth={1.5}
                          />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-[#211F1C] transition-colors group-hover:text-[#51463B]">
                          {cat.name}
                        </span>
                        <span className="mt-1 block text-[9px] uppercase tracking-[0.13em] text-[#9D8974]">
                          Explore Collection
                        </span>
                      </div>

                      <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-[#9D8974] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Callout */}
              <div className="mt-4 flex flex-col gap-3 border-t border-[#E7E1D9] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-[#211F1C]">
                    Custom manufacturing solutions
                  </p>
                  <p className="text-[11px] leading-5 text-[#81786F]">
                    Looking for OEM or private-label production?
                  </p>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 border border-[#51463B] bg-[#51463B] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#211F1C] hover:bg-[#211F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974] focus-visible:ring-offset-2"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
