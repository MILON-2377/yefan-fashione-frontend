"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AppButton } from "@/features/common/ui/AppButton";
import { useNavigationData } from "../hooks/useNavigationData";
import { useLanguage } from "@/context/LanguageContext";
import { PublicCategoryItem } from "@/features/public/categories/types/categoryTypes";

// Helper function to check client-side rendering
const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

interface MobileNavProps {
  categories?: PublicCategoryItem[];
}

export function MobileNav({ categories = [] }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useIsMounted();
  const { mainNavLinks, navLabels } = useNavigationData();
  const { dict } = useLanguage();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  return (
    <div className="lg:hidden">
      {/* Toggle Button */}
      <AppButton
        type="button"
        variant="ghost"
        iconOnly
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9 rounded-md text-[#51463B] transition-colors hover:bg-[#F0ECE6] hover:text-[#211F1C]"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <Menu className="h-5 w-5" />
      </AppButton>

      {/* Render Drawer into document.body via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop Overlay */}
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleClose}
                  className="fixed inset-0 z-50 bg-[#211F1C]/60 backdrop-blur-sm"
                  aria-hidden="true"
                />

                {/* Slide-over Drawer Panel */}
                <motion.div
                  key="drawer"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 32,
                  }}
                  className="fixed top-0 right-0 z-50 flex h-full w-80 flex-col justify-between overflow-y-auto border-l border-[#E7E1D9] bg-[#FAF8F4] p-6 text-[#211F1C] shadow-2xl sm:w-96"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Mobile Navigation"
                >
                  <div className="space-y-6">
                    {/* Header Row */}
                    <div className="flex items-center justify-between border-b border-[#E7E1D9] pb-4">
                      <span className="text-xl font-black tracking-tight text-[#211F1C]">
                        YEE<span className="text-[#9D8974]">FANS</span>
                      </span>

                      <AppButton
                        type="button"
                        variant="ghost"
                        iconOnly
                        onClick={handleClose}
                        className="h-8 w-8 rounded-full text-[#625D57] hover:bg-[#F0ECE6] hover:text-[#211F1C]"
                        aria-label="Close menu"
                      >
                        <X className="h-4 w-4" />
                      </AppButton>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-1 text-sm font-medium text-[#51463B]">
                      {mainNavLinks.slice(0, 1).map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={handleClose}
                          className="rounded-lg px-3 py-2.5 font-semibold transition-colors hover:bg-[#F0ECE6] hover:text-[#211F1C]"
                        >
                          {link.title}
                        </Link>
                      ))}

                      {/* Categories */}
                      <div className="mt-2 mb-1 flex items-center justify-between rounded-md border-y border-[#E7E1D9] bg-[#F0ECE6]/70 px-3 py-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#625D57]">
                          {navLabels.products}
                        </span>

                        <Link
                          href="/products"
                          onClick={handleClose}
                          className="text-[11px] font-bold uppercase tracking-normal text-[#51463B] hover:text-[#211F1C] hover:underline"
                        >
                          {navLabels.home === "首页" ? "查看全部" : "View All"}
                        </Link>
                      </div>

                      {/* Category Links */}
                      <div className="no-scrollbar max-h-48 space-y-0.5 overflow-y-auto pl-1">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/products?category_id=${encodeURIComponent(cat.id)}`}
                            onClick={handleClose}
                            className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-[#625D57] transition-all hover:bg-[#F0ECE6] hover:text-[#211F1C]"
                          >
                            <span>{cat.name}</span>
                            <ArrowRight className="h-3 w-3 text-[#9D8974]" />
                          </Link>
                        ))}
                      </div>

                      <div className="my-2 border-t border-[#E7E1D9]" />

                      {mainNavLinks.slice(1).map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={handleClose}
                          className="rounded-lg px-3 py-2.5 font-semibold transition-colors hover:bg-[#F0ECE6] hover:text-[#211F1C]"
                        >
                          {link.title}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-6 border-t border-[#E7E1D9] pt-6">
                    <AppButton
                      render={<Link href="/contact" onClick={handleClose} />}
                      variant="primary"
                      className="w-full rounded-lg bg-[#211F1C] py-3 text-xs font-medium text-white shadow-xs transition-colors hover:bg-[#51463B]"
                    >
                      {dict.hero.secondaryCta}
                    </AppButton>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
