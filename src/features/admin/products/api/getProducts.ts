import { adminFetch } from "@/api";
import { ProductListResponse, ProductQueryParams } from "../types/display";

/**
 * Clean query params by removing undefined, null, or empty string values.
 */
function buildQueryString(params: ProductQueryParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * Fetch a paginated list of products with optional search, status, and sorting filters.
 */
export async function getProducts(
  params: ProductQueryParams = {}
): Promise<ProductListResponse> {
  const queryString = buildQueryString(params);

  return await adminFetch<ProductListResponse>(`/products${queryString}`, {
    method: "GET",
  });
}
