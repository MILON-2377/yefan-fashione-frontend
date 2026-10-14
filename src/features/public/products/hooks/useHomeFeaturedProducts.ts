import { useQuery } from "@tanstack/react-query";
import { getHomeFeaturedProducts } from "../api/homeFeaturedApi";
import { HomeFeaturedProductsResponse } from "../types/homeFeaturedTypes";

export const homeFeaturedKeys = {
    all: ["public", "home", "featured-products"] as const,
    list: (params?: { page?: number; page_size?: number }) =>
        [...homeFeaturedKeys.all, "list", params ?? {}] as const,
};

export function useHomeFeaturedProducts(params?: { page?: number; page_size?: number }) {
    return useQuery<HomeFeaturedProductsResponse>({
        queryKey: homeFeaturedKeys.list(params),
        queryFn: () => getHomeFeaturedProducts(params),
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
}
