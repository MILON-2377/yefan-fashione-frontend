"use client";

import Link from "next/link";
import { Phone, Mail, Globe } from "lucide-react";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { SearchBar } from "./SearchBar";
import { useEffect, useState } from "react";
import { useCategories } from "@/hooks/useCategories";

export function Header() {
  const { data: categories = [], isLoading } = useCategories();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add border/shadow styling once scrolled slightly past top
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide header when scrolling DOWN, show when scrolling UP
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        ${isScrolled ? "border-b border-slate-200/80 shadow-xs" : "border-b border-transparent"}
       `}
    >
      {/* Top Utility Bar */}
      <div className="border-b border-slate-100 bg-slate-50/80 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:+8612345678900"
              className="flex items-center gap-1.5 hover:text-blue-600 transition"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>+86 123 4567 8900</span>
            </a>
            <a
              href="mailto:sales@company.com"
              className="flex items-center gap-1.5 hover:text-blue-600 transition hidden sm:flex"
            >
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>sales@company.com</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-500">
              <Globe className="w-3.5 h-3.5" />
              <span>EN / Global</span>
            </div>
            <Link
              href="/contact"
              className="font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              Inquiry Desk
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 shrink-0"
        >
          GLOBAL<span className="text-blue-600">EXPO</span>
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav categories={categories} />

        {/* Right Section: Search & Mobile Drawer */}
        <div className="flex items-center gap-2">
          <SearchBar />
          <MobileNav categories={categories} />
        </div>
      </div>
    </header>
  );
}
