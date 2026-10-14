import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/productDetailApi";
import { ProductDetailResponse } from "../types/productDetailTypes";

export const productDetailKeys = {
    all: ["public", "products", "detail"] as const,
    byId: (id: string) => [...productDetailKeys.all, id] as const,
};

export function useProductDetail(id: string) {
    return useQuery<ProductDetailResponse>({
        queryKey: productDetailKeys.byId(id),
        queryFn: () => getProductById(id),
        enabled: Boolean(id),
        staleTime: 1000 * 60 * 5,
    });
}
