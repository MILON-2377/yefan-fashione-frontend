import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/getCategories";
import { CategoryListResponse, CategoryQueryParams } from "../types";

export const CATEGORIES_QUERY_KEY = ["categories"] as const;

export function useCategories(params?: CategoryQueryParams,) {
    return useQuery<CategoryListResponse, Error>({
        queryKey: [...CATEGORIES_QUERY_KEY, params],
        queryFn: () => getCategories(params),
        staleTime: 1000 * 60 * 5,
    });
}
