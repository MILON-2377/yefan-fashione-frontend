import { NavCategory } from "@/types";
import { baseFetch } from "../baseClient";

// Fallback category dataset for apparel boutique
const FALLBACK_CATEGORIES: NavCategory[] = [
    {
        id: "cat-1",
        title: "Couture Evening Gowns",
        slug: "evening-gowns",
        href: "/products?category=evening-gowns",
        description: "Hand-draped silk, corseted bodices, and floor-length red carpet silhouettes.",
    },
    {
        id: "cat-2",
        title: "Bridal Wear & Veils",
        slug: "bridal-wear",
        href: "/products?category=bridal-wear",
        description: "French lace embroidery, beaded tulle dresses, and custom bridal gowns.",
    },
    {
        id: "cat-3",
        title: "Cocktail & Party Mini",
        slug: "cocktail-dresses",
        href: "/products?category=cocktail-dresses",
        description: "Satin bodycon cuts, feather trims, and high-margin boutique party wear.",
    },
    {
        id: "cat-4",
        title: "OEM Custom Tech-Packs",
        slug: "custom-oem",
        href: "/products?category=custom-oem",
        description: "Bespoke pattern making, tech-pack execution, and white-label manufacturing.",
    },
];

export const categoryService = {
    async getCategories(): Promise<NavCategory[]> {
        try {
            const data = await baseFetch<NavCategory[]>("/categories");
            return data && data.length > 0 ? data : FALLBACK_CATEGORIES;
        } catch {
            return FALLBACK_CATEGORIES;
        }
    },
};
