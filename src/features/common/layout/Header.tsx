"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MessageSquareText, Send } from "lucide-react";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { useEffect, useState } from "react";
import { usePublicCategories } from "@/features/public/categories/hooks/usePublicCategories";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

export function Header() {
  const { dict } = useLanguage();

  const { data: categoriesData } = usePublicCategories();
  const categories = categoriesData?.items ?? [];

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      // Hide header when scrolling DOWN, show when scrolling UP
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
              className="hidden sm:flex items-center gap-1.5 hover:text-blue-600 transition"
            >
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>sales@company.com</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* Reusable Language Switcher Component */}
            <LanguageSwitcher variant="minimal" />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <Link
          href="/"
          className="flex items-center shrink-0 transition-opacity hover:opacity-90 py-1"
          aria-label="Yee Fans Haute Couture - Home"
        >
          <Image
            src="/Yee_Fan_Logo.jpg"
            alt="Yee Fans Haute Couture"
            unoptimized
            width={160}
            height={160}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav categories={categories} />

        {/* Right Section: Fast Conversion CTA & Mobile Drawer */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Direct Chat Button (Hidden on tiny screens) */}
          <a
            href="https://wa.me/8612345678900"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold transition-colors"
          >
            <MessageSquareText className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          {/* Primary High-Impact CTA Button */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{dict.nav.inquireNow}</span>
          </Link>

          {/* Mobile Drawer Toggle */}
          <MobileNav categories={categories} />
        </div>
      </div>
    </header>
  );
}
