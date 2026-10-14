import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts } from "../api/getProducts";
import { ProductQueryParams, ProductListResponse } from "../types/display";
import { adminProductKeys } from "./keys";


export function useProducts(params: ProductQueryParams = {}) {
    const normalizedParams: ProductQueryParams = {
        page: params.page ?? 1,
        page_size: params.page_size ?? 20,
        sort_by: params.sort_by ?? "created_at",
        sort_order: params.sort_order ?? "desc",
        ...params,
    };

    return useQuery<ProductListResponse, Error>({
        queryKey: adminProductKeys.list(normalizedParams as Record<string, unknown>), queryFn: () => getProducts(normalizedParams),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 2, // Cache fresh data for 2 minutes
    });
}
