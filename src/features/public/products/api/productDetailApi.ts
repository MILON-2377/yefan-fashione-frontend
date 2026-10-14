import { publicFetch } from "@/api";
import { ProductDetailResponse } from "../types/productDetailTypes";

export async function getProductById(id: string): Promise<ProductDetailResponse> {
    return publicFetch<ProductDetailResponse>(`/products/${id}`, {
        method: "GET",
    });
}
