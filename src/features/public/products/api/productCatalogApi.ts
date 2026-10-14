import { publicFetch } from "@/api";
import { CatalogProductsResponse, ProductQueryParams } from "../types/productCatalogTypes";

export async function getCatalogProducts(
    params?: ProductQueryParams
): Promise<CatalogProductsResponse> {
    const searchParams = new URLSearchParams();

    if (params?.category_id) searchParams.set("category_id", params.category_id);
    if (params?.cursor) searchParams.set("cursor", params.cursor);
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.search) searchParams.set("search", params.search);

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : "/products";

    return publicFetch<CatalogProductsResponse>(endpoint, {
        method: "GET",
    });
}
