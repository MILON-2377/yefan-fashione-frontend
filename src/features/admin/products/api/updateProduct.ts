import { adminFetch } from "@/api";
import { UpdateProductPayload, ProductApiResponse, Product } from "../types/product.edit";


export async function updateProduct(
    id: string,
    data: UpdateProductPayload
): Promise<Product> {
    const result = await adminFetch<ProductApiResponse<Product>>(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });

    return result.data;
}
