"use client";

import { useLanguage } from "@/context/LanguageContext";

export interface NavCategory {
  title: string;
  href: string;
  description: string;
}

export interface NavLinkItem {
  title: string;
  href: string;
}

export function useNavigationData() {
  const { dict } = useLanguage();

  const categoryHrefs = [
    "/products?category=evening-gowns",
    "/products?category=bridal-wear",
    "/products?category=cocktail-dresses",
    "/products?category=silk-slip-dresses",
    "/products?category=tailored-suits",
    "/products?category=custom-oem",
  ];

  // Map localized categories dynamically from dictionary
  const productCategories: NavCategory[] = (dict.nav.categories || []).map(
    (cat: { title: string; description: string }, index: number) => ({
      title: cat.title,
      href: categoryHrefs[index] || "/products",
      description: cat.description,
    })
  );

  // Main navigation items including Products and Reviews
  const mainNavLinks: NavLinkItem[] = [
    { title: dict.nav.home || "Home", href: "/" },
    { title: dict.nav.products || "Products", href: "/products" },
    { title: dict.nav.links.about || "About Us", href: "/about" },
    { title: dict.nav.reviews || "Reviews", href: "/reviews" },
    { title: dict.nav.links.downloads || "Downloads", href: "/downloads" },
    { title: dict.nav.links.faq || "FAQ", href: "/faq" },
    { title: dict.nav.links.contact || "Contact", href: "/contact" },
  ];

  return {
    productCategories,
    mainNavLinks,
    navLabels: dict.nav,
  };
}
