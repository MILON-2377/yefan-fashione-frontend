import { baseFetch, ApiFetchOptions } from "./baseClient";

/**
 * Client for /api/v1/admin/* endpoints
 */
export function adminFetch<T>(endpoint: string, options?: ApiFetchOptions): Promise<T> {
    return baseFetch<T>(endpoint, { ...options, prefix: "/admin" });
}

/**
 * Client for /api/v1/auth/* endpoints
 */
export function authFetch<T>(endpoint: string, options?: ApiFetchOptions): Promise<T> {
    return baseFetch<T>(endpoint, { ...options, prefix: "/auth" });
}

/**
 * Client for root/public endpoints without prefix
 */
export function publicFetch<T>(endpoint: string, options?: ApiFetchOptions): Promise<T> {
    return baseFetch<T>(endpoint, { ...options, prefix: "/public" });
}
