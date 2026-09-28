"use client";

import { useEffect, useState } from "react";
import { CategoryCarousel } from "./CategoryCarousel";
import { fetchApi } from "@/lib/api";
import { Category } from "@/types";

const INITIAL_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Industrial Valves & Fittings",
    slug: "valves-fittings",
    description: "High-pressure stainless steel control valves for oil & gas.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    itemCount: 142,
  },
  {
    id: "2",
    name: "Automated CNC Machinery",
    slug: "cnc-machinery",
    description: "Precision 5-axis milling machines and lathe equipment.",
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    itemCount: 88,
  },
  {
    id: "3",
    name: "Hydraulic Pumps & Motors",
    slug: "hydraulic-pumps",
    description: "Heavy-duty axial piston pumps for agricultural machinery.",
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
    itemCount: 215,
  },
  {
    id: "4",
    name: "Electrical Distribution Panels",
    slug: "electrical-panels",
    description: "Modular low-voltage switchboards and circuit breakers.",
    imageUrl:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=800&auto=format&fit=crop",
    itemCount: 94,
  },
];

export function CategorySection() {
  // 1. Initialize state directly with initial fallback data so it displays immediately
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchApi<Category[]>("/categories");
        if (data && data.length > 0) {
          setCategories(data);
        }
      } catch {
        // Silent catch: if backend is down, keep INITIAL_CATEGORIES
      } finally {
        setLoading(false);
      }
    }

    // Only attempt fetch if an explicit API flag is present
    if (process.env.NEXT_PUBLIC_API_URL) {
      loadCategories();
    }
  }, []);

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {loading ? (
          <CategorySkeleton />
        ) : (
          <CategoryCarousel categories={categories} />
        )}
      </div>
    </section>
  );
}

function CategorySkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 w-28 bg-slate-200 rounded" />
        <div className="h-8 w-64 bg-slate-300 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-slate-200 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
