import { useQuery } from "@tanstack/react-query";
import { Category } from "../types";
import { getCategoryById } from "../api/getCategoryById";

export const CATEGORY_QUERY_KEY = ["category"] as const;

export function useCategory(id: string,) {
    return useQuery<Category, Error>({
        queryKey: [...CATEGORY_QUERY_KEY, id],
        queryFn: () => getCategoryById(id),
        enabled: Boolean(id),
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
}
