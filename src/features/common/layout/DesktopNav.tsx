"use client";

import Link from "next/link";
import { ProductCatalogDropdown } from "./ProductCatalogDropdown";
import { PublicCategoryItem } from "@/features/public/categories/types/categoryTypes";
import { useNavigationData } from "../hooks/useNavigationData";

interface DesktopNavProps {
  categories: PublicCategoryItem[];
}

export function DesktopNav({ categories = [] }: DesktopNavProps) {
  const { mainNavLinks } = useNavigationData();
  return (
    <nav
      className="hidden lg:flex items-center gap-1"
      aria-label="Main Navigation"
    >
      <Link
        href="/"
        className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium text-xs tracking-wide uppercase px-3 py-2 rounded-md transition-colors"
      >
        {mainNavLinks[0]?.title ?? "Home"}
      </Link>

      <ProductCatalogDropdown categories={categories} />

      {mainNavLinks.slice(1).map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium text-xs tracking-wide uppercase px-3 py-2 rounded-md transition-colors"
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
