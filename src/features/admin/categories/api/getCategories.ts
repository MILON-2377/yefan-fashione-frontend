import { adminFetch } from '@/api';
import { CategoryListResponse, CategoryQueryParams } from "../types";

/**
 * Fetches a list of categories with optional pagination and filters.
 */
export async function getCategories(
    params?: CategoryQueryParams,
): Promise<CategoryListResponse> {
    const query = new URLSearchParams();

    if (params?.skip !== undefined) query.append("skip", params.skip.toString());
    if (params?.limit !== undefined) query.append("limit", params.limit.toString());
    if (params?.search) query.append("search", params.search);
    if (params?.is_active !== undefined) query.append("is_active", params.is_active.toString());

    if (params?.status) query.append("status", params.status);

    const queryString = query.toString();
    const endpoint = `/categories${queryString ? `?${queryString}` : ""}`;

    return adminFetch<CategoryListResponse>(endpoint, {
        method: "GET",
    });
}
