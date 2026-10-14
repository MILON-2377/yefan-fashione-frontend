import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/getProduct";
import { adminProductKeys } from "./keys";
import { Product } from "../types/product.edit";


export function useProduct(id: string) {
    return useQuery<Product>({
        queryKey: adminProductKeys.detail(id),
        queryFn: () => getProduct(id),
        enabled: Boolean(id),
    });
}
