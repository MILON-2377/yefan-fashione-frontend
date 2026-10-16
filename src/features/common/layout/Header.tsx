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
    fixed top-0 left-0 right-0 z-40
    bg-[#FAF8F4]/95 backdrop-blur-md
    transition-transform duration-300 ease-in-out
    ${isVisible ? "translate-y-0" : "-translate-y-full"}
    ${
      isScrolled
        ? "border-b border-[#E7E1D9] shadow-sm"
        : "border-b border-transparent"
    }
  `}
    >
      {/* Top Utility Bar */}
      <div className="border-b border-[#E7E1D9]/80 bg-[#F0ECE6]/70 text-xs text-[#625D57]">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-6">
            <a
              href="tel:+8612345678900"
              className="flex items-center gap-1.5 transition-colors hover:text-[#211F1C]"
            >
              <Phone className="h-3.5 w-3.5 text-[#9D8974]" />
              <span>+86 123 4567 8900</span>
            </a>

            <a
              href="mailto:sales@company.com"
              className="hidden items-center gap-1.5 transition-colors hover:text-[#211F1C] sm:flex"
            >
              <Mail className="h-3.5 w-3.5 text-[#9D8974]" />
              <span>sales@company.com</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="minimal" />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        {/* Brand Logo */}

        {/* Brand Logo */}
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-3 py-1 transition-opacity duration-200 hover:opacity-80"
          aria-label="Yee Fans Haute Couture - Home"
        >
          <Image
            src="/Yee_Fan_Logo.jpg"
            alt="Yee Fans Haute Couture"
            unoptimized
            width={320}
            height={320}
            priority
            className="h-14 w-auto max-w-[180px] object-contain sm:h-16 sm:max-w-[200px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav categories={categories} />

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* WhatsApp */}
          <a
            href="https://wa.me/8612345678900"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg border border-[#D8C9B8] bg-[#F0ECE6] px-3 py-2 text-xs font-medium text-[#51463B] transition-colors hover:bg-[#E9E0D5] md:inline-flex"
          >
            <MessageSquareText className="h-3.5 w-3.5 text-[#82705C]" />
            <span>WhatsApp</span>
          </a>

          {/* Primary CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#211F1C] px-4 py-2 text-xs font-medium text-white shadow-xs transition-colors hover:bg-[#51463B] active:scale-[0.98]"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{dict.nav.inquireNow}</span>
          </Link>

          {/* Mobile Navigation */}
          <MobileNav categories={categories} />
        </div>
      </div>
    </header>
  );
}
