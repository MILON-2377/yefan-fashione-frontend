"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES, MAIN_NAV_LINKS } from "./navigation-data";

// Helper function to check client-side rendering
const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // Client value
    () => false, // Server/SSR value
  );
}

export function MobileNav({ categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useIsMounted();

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
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-700 hover:text-blue-600 hover:bg-slate-100 h-9 w-9 rounded-md transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Render Drawer into document.body via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* 1. Backdrop Overlay */}
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleClose}
                  className="fixed inset-0 z-[999] bg-slate-900/60 backdrop-blur-sm"
                  aria-hidden="true"
                />

                {/* 2. Slide-over Drawer Panel */}
                <motion.div
                  key="drawer"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed top-0 right-0 z-[1000] h-full w-[300px] sm:w-[350px] bg-white border-l border-slate-200 text-slate-800 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Mobile Navigation"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <span className="font-black text-xl tracking-tight text-slate-900">
                        GLOBAL<span className="text-blue-600">EXPO</span>
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleClose}
                        className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 h-8 w-8 rounded-full"
                        aria-label="Close menu"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Staggered Nav Links */}
                    <nav className="flex flex-col gap-1 mt-6 text-sm font-medium text-slate-700">
                      {MAIN_NAV_LINKS.slice(0, 1).map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={handleClose}
                          className="py-2.5 px-3 hover:bg-slate-100 hover:text-blue-600 rounded-md transition-colors"
                        >
                          {link.title}
                        </Link>
                      ))}

                      {/* Section Label */}
                      <div className="py-2 px-3 font-semibold text-xs uppercase tracking-wider text-slate-500 border-t border-b border-slate-200 mt-3 mb-1 bg-slate-50/50">
                        Product Categories
                      </div>

                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={handleClose}
                          className="py-2 px-3 text-xs text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 rounded-md flex items-center justify-between transition-colors group"
                        >
                          <span>{cat.title}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                        </Link>
                      ))}

                      <div className="border-t border-slate-200 my-3" />

                      {MAIN_NAV_LINKS.slice(1).map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={handleClose}
                          className="py-2.5 px-3 hover:bg-slate-100 hover:text-blue-600 rounded-md transition-colors"
                        >
                          {link.title}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Bottom CTA Button */}
                  <div className="pt-6 border-t border-slate-200 mt-6">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-sm">
                      <Link href="/contact" onClick={handleClose}>
                        Request Quote
                      </Link>
                    </Button>
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
