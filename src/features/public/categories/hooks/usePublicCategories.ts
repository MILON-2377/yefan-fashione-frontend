import { useQuery } from "@tanstack/react-query";
import { getPublicCategories } from "../api/categoriesApi";
import { PublicCategoriesResponse } from "../types/categoryTypes";

export const publicCategoryKeys = {
    all: ["public", "categories"] as const,
    list: () => [...publicCategoryKeys.all, "list"] as const,
};

export function usePublicCategories() {
    return useQuery<PublicCategoriesResponse>({
        queryKey: publicCategoryKeys.list(),
        queryFn: getPublicCategories,
        staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    });
}
