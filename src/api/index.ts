
import { baseFetch, type ApiFetchOptions } from "./baseClient";

/**
 * Client for admin API endpoints.
 * Routes requests through the same-origin Next.js server proxy.
 */
export function adminFetch<T>(
    endpoint: string,
    options?: ApiFetchOptions,
): Promise<T> {
    return baseFetch<T>(endpoint, {
        ...options,
        prefix: "admin",
    });
}

/**
 * Client for authentication API endpoints.
 * Routes requests through the same-origin Next.js server proxy.
 */
export function authFetch<T>(
    endpoint: string,
    options?: ApiFetchOptions,
): Promise<T> {
    return baseFetch<T>(endpoint, {
        ...options,
        prefix: "auth",
    });
}

/**
 * Client for public API endpoints.
 * Routes requests through the same-origin public proxy.
 */
export function publicFetch<T>(
    endpoint: string,
    options?: ApiFetchOptions,
): Promise<T> {
    return baseFetch<T>(endpoint, {
        ...options,
        prefix: "public",
        skipRefresh: true
    });
}
