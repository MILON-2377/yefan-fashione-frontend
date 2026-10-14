import { useQuery } from "@tanstack/react-query";
import { getBrandById } from "../api/getBrandById";
import { Brand } from "../types";
import { BRANDS_QUERY_KEY } from "./useBrands";

export function useBrand(brandId: string) {
    return useQuery<Brand, Error>({
        queryKey: [...BRANDS_QUERY_KEY, brandId],
        queryFn: () => getBrandById(brandId),
        enabled: Boolean(brandId),
        staleTime: 1000 * 60 * 5,
    });
}
