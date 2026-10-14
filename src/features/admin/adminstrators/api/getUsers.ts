import { adminFetch } from "@/api";
import { ListAdminsParams, UserListResponse } from "../types";

export async function getUsers(params?: ListAdminsParams): Promise<UserListResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page !== undefined) queryParams.append("page", params.page.toString());
    if (params?.page_size !== undefined) queryParams.append("page_size", params.page_size.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.role) queryParams.append("role", params.role);
    if (params?.is_active !== undefined) queryParams.append("is_active", params.is_active.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/users?${queryString}` : "/users";

    return adminFetch<UserListResponse>(endpoint, {
        method: "GET",
    });
}
