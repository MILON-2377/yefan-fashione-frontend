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
        className="text-slate-700 hover:text-blue-600 hover:bg-slate-100 h-9 w-9 rounded-md transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <Menu className="w-5 h-5" />
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
                  className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
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
                  className="fixed top-0 right-0 z-50 h-full w-80 sm:w-96 bg-white border-l border-slate-200 text-slate-800 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Mobile Navigation"
                >
                  <div className="space-y-6">
                    {/* Header Row */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <span className="font-black text-xl tracking-tight text-slate-900">
                        YEE<span className="text-blue-600">FANS</span>
                      </span>
                      <AppButton
                        type="button"
                        variant="ghost"
                        iconOnly
                        onClick={handleClose}
                        className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 h-8 w-8 rounded-full"
                        aria-label="Close menu"
                      >
                        <X className="w-4 h-4" />
                      </AppButton>
                    </div>

                    {/* Staggered Nav Links */}
                    <nav className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                      {mainNavLinks.slice(0, 1).map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={handleClose}
                          className="py-2.5 px-3 hover:bg-slate-100 hover:text-blue-600 rounded-lg transition-colors font-semibold"
                        >
                          {link.title}
                        </Link>
                      ))}

                      {/* Section Label: Categories */}
                      <div className="flex items-center justify-between py-2 px-3 font-bold text-xs uppercase tracking-wider text-slate-500 border-y border-slate-100 mt-2 mb-1 bg-slate-50/80 rounded-md">
                        <span>{navLabels.products}</span>
                        <Link
                          href="/products"
                          onClick={handleClose}
                          className="text-blue-600 hover:underline text-[11px] font-bold tracking-normal uppercase"
                        >
                          {navLabels.home === "首页" ? "查看全部" : "View All"}
                        </Link>
                      </div>

                      {/* Filter-linked Category Links */}
                      <div className="max-h-48 overflow-y-auto space-y-0.5 no-scrollbar pl-1">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/products?category_id=${encodeURIComponent(cat.id)}`}
                            onClick={handleClose}
                            className="flex items-center justify-between py-2 px-3 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all"
                          >
                            <span>{cat.name}</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                          </Link>
                        ))}
                      </div>

                      <div className="border-t border-slate-100 my-2" />

                      {mainNavLinks.slice(1).map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={handleClose}
                          className="py-2.5 px-3 hover:bg-slate-100 hover:text-blue-600 rounded-lg transition-colors font-semibold"
                        >
                          {link.title}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Bottom CTA Button */}
                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <AppButton
                      render={<Link href="/contact" onClick={handleClose} />}
                      variant="primary"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-xs"
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
