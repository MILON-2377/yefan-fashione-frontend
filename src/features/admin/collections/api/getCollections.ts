import { adminFetch } from '@/api';
import { CollectionListResponse, GetCollectionsParams } from "../types";

export async function getCollections(
    params?: GetCollectionsParams
): Promise<CollectionListResponse> {
    const queryParams = new URLSearchParams();

    if (params?.brand_id) queryParams.append("brand_id", params.brand_id);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.status && params.status !== "ALL")
        queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.page_size) queryParams.append("page_size", params.page_size.toString());

    const queryString = queryParams.toString();
    const endpoint = `/collections${queryString ? `?${queryString}` : ""}`;

    return adminFetch<CollectionListResponse>(endpoint, { method: "GET" });
}
