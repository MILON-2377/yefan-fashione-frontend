"use client";

import { useLanguage } from "@/context/LanguageContext";
import { HeroBanner } from "@/types";

export function useHeroBanners(): HeroBanner[] {
    const { dict } = useLanguage();
    return (dict.heroBanners as unknown as HeroBanner[]) ?? [];
}
