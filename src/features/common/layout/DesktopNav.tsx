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
        className="rounded-md px-3 py-2 text-xs font-medium uppercase tracking-wide text-[#51463B] transition-colors hover:bg-[#F0ECE6] hover:text-[#211F1C]"
      >
        {mainNavLinks[0]?.title ?? "Home"}
      </Link>

      <ProductCatalogDropdown categories={categories} />

      {mainNavLinks.slice(1).map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-md px-3 py-2 text-xs font-medium uppercase tracking-wide text-[#51463B] transition-colors hover:bg-[#F0ECE6] hover:text-[#211F1C]"
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
