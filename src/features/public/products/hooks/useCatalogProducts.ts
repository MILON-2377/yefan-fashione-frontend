"use client";

import { useQuery } from "@tanstack/react-query";
import { getCatalogProducts } from "../api/productCatalogApi";
import type {
    CatalogProductsResponse,
    ProductQueryParams,
} from "../types/productCatalogTypes";

export const catalogProductKeys = {
    all: ["public", "products", "catalog"] as const,

    list: (params?: ProductQueryParams) =>
        [...catalogProductKeys.all, "list", params ?? {}] as const,
};

export function useCatalogProducts(params?: ProductQueryParams) {
    return useQuery<CatalogProductsResponse>({
        queryKey: catalogProductKeys.list(params),
        queryFn: () => getCatalogProducts(params),
        staleTime: 1000 * 60 * 5,
    });
}