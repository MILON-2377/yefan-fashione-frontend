
import {
    ApiError,
    type BackendErrorPayload,
} from "@/lib/errors/ApiError";

export type ApiPrefix = "admin" | "auth" | "public";

export interface ApiFetchOptions extends RequestInit {
    prefix?: ApiPrefix;
    responseType?: "json" | "raw";
    skipRefresh?: boolean;
    retryAfterRefresh?: boolean;
}

const REFRESH_URL = "/api/server/auth/refresh";

let refreshPromise: Promise<boolean> | null = null;
let refreshGeneration = 0;

function normalizePrefix(prefix: string): string {
    return prefix.replace(/^\/+|\/+$/g, "");
}

function normalizeEndpoint(endpoint: string): string {
    return endpoint.replace(/^\/+/, "");
}

function buildUrl(endpoint: string, prefix: string): string {
    const normalizedPrefix = normalizePrefix(prefix);
    const cleanEndpoint = normalizeEndpoint(endpoint);

    switch (normalizedPrefix) {
        case "admin":
            return `/api/server/admin/${cleanEndpoint}`;

        case "auth":
            return `/api/server/auth/${cleanEndpoint}`;

        case "public":
            return `/api/public/${cleanEndpoint}`;

        default:
            throw new Error(
                `Unsupported API prefix "${prefix}". ` +
                "Expected admin, auth, or public.",
            );
    }
}

function buildHeaders(
    headers: HeadersInit | undefined,
    body: BodyInit | null | undefined,
): Headers {
    const result = new Headers(headers);

    if (!result.has("Accept")) {
        result.set("Accept", "application/json");
    }

    // Only infer JSON for string bodies. Do not set this for
    // FormData, Blob, URLSearchParams, or binary uploads.
    if (typeof body === "string" && !result.has("Content-Type")) {
        result.set("Content-Type", "application/json");
    }

    return result;
}

async function readResponseBody(
    response: Response,
): Promise<unknown> {
    if (
        response.status === 204 ||
        response.status === 205 ||
        response.status === 304
    ) {
        return null;
    }

    const text = await response.text();

    if (!text) return null;

    const contentType = (
        response.headers.get("content-type") ?? ""
    ).toLowerCase();

    if (
        contentType.includes("application/json") ||
        contentType.includes("+json")
    ) {
        try {
            return JSON.parse(text) as unknown;
        } catch {
            return text;
        }
    }

    return text;
}

function toErrorPayload(data: unknown): BackendErrorPayload {
    if (
        typeof data === "object" &&
        data !== null &&
        !Array.isArray(data)
    ) {
        return data as BackendErrorPayload;
    }

    return {
        message: typeof data === "string" ? data : undefined,
    };
}

function createApiError(response: Response, data: unknown): ApiError {
    return new ApiError(
        response.status,
        response.statusText,
        toErrorPayload(data),
    );
}

function isPublicRequest(prefix: string): boolean {
    return normalizePrefix(prefix) === "public";
}

function isRefreshExcludedEndpoint(
    endpoint: string,
    prefix: string,
): boolean {
    if (normalizePrefix(prefix) !== "auth") return false;

    const path = normalizeEndpoint(endpoint)
        .split("?")[0]
        .replace(/\/+$/, "");

    // Never recursively refresh login, logout, or refresh calls.
    return /^(login|logout|refresh)$/.test(path);
}

function isAutomaticallyRetryable(method: string): boolean {
    return ["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase());
}

async function performRefresh(): Promise<boolean> {
    try {
        const response = await fetch(REFRESH_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            credentials: "same-origin",
            cache: "no-store",
            redirect: "manual",
        });

        // A successful refresh endpoint may return either 200 or 204.
        return response.ok;
    } catch {
        return false;
    }
}

function refreshOnce(): Promise<boolean> {
    if (refreshPromise) return refreshPromise;

    const current = performRefresh().then((refreshed) => {
        if (refreshed) {
            refreshGeneration += 1;
        }

        return refreshed;
    });

    refreshPromise = current;

    void current.finally(() => {
        if (refreshPromise === current) {
            refreshPromise = null;
        }
    });

    return current;
}

async function sendRequest(
    url: string,
    requestOptions: RequestInit,
    headers: Headers,
): Promise<Response> {
    try {
        return await fetch(url, {
            ...requestOptions,
            headers,
            credentials: "same-origin",
        });
    } catch {
        throw new ApiError(0, "Network Error", {
            message: "Unable to connect to the server.",
        });
    }
}

async function parseResponse<T>(
    response: Response,
    responseType: "json" | "raw",
): Promise<T> {
    if (responseType === "raw") {
        if (!response.ok) {
            const data = await readResponseBody(response);
            throw createApiError(response, data);
        }

        return response as unknown as T;
    }

    const data = await readResponseBody(response);

    if (!response.ok) {
        throw createApiError(response, data);
    }

    // Preserve compatibility with existing callers expecting {} for
    // empty successful responses.
    if (data === null || data === "") {
        return {} as T;
    }

    return data as T;
}

export async function baseFetch<T>(
    endpoint: string,
    options: ApiFetchOptions = {},
): Promise<T> {
    const {
        prefix = "public",
        headers,
        responseType = "json",
        skipRefresh = false,
        retryAfterRefresh = false,
        ...requestOptions
    } = options;

    const url = buildUrl(endpoint, prefix);
    const requestHeaders = buildHeaders(
        headers,
        requestOptions.body,
    );

    const method = (requestOptions.method ?? "GET").toUpperCase();

    const canRefresh =
        !skipRefresh &&
        !isPublicRequest(prefix) &&
        !isRefreshExcludedEndpoint(endpoint, prefix);

    const canRetry =
        isAutomaticallyRetryable(method) || retryAfterRefresh;

    // First attempt.
    const requestGeneration = refreshGeneration;
    const firstResponse = await sendRequest(
        url,
        { ...requestOptions, method },
        requestHeaders,
    );

    if (
        firstResponse.status !== 401 ||
        !canRefresh ||
        !canRetry
    ) {
        return parseResponse<T>(firstResponse, responseType);
    }

    if (refreshGeneration === requestGeneration) {
        const refreshed = await refreshOnce();

        if (!refreshed) {
            return parseResponse<T>(firstResponse, responseType);
        }
    }


    // Exactly one retry. No recursive call to baseFetch.
    const retryResponse = await sendRequest(
        url,
        { ...requestOptions, method },
        requestHeaders,
    );

    return parseResponse<T>(retryResponse, responseType);
}
