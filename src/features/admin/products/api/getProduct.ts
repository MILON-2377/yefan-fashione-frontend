import { adminFetch } from "@/api";
import { ProductApiResponse, Product } from "../types/product.edit";

export async function getProduct(product_id: string): Promise<Product> {
    const result = await adminFetch<ProductApiResponse<Product>>(`/products/${product_id}`, {
        method: "GET",
    });

    console.log("product data", result.data)

    return result.data;
}
