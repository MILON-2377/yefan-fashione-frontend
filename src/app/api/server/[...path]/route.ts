
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL;
const PROXY_PREFIX = "/api/server";


const REQUEST_HEADERS = [
    "accept",
    "accept-language",
    "content-type",
    "if-match",
    "if-none-match",
    "if-modified-since",
    "if-unmodified-since",
    "range",
    "idempotency-key",
] as const;

const RESPONSE_HEADERS = [
    "accept-ranges",
    "cache-control",
    "content-disposition",
    "content-language",
    "content-range",
    "content-type",
    "etag",
    "last-modified",
    "retry-after",
    "vary",
    "www-authenticate",
] as const;

function backendBaseUrl(): URL | null {
    if (!API_BASE_URL) return null;

    try {
        const url = new URL(API_BASE_URL);

        if (
            url.protocol !== "http:" &&
            url.protocol !== "https:"
        ) {
            return null;
        }

        if (url.username || url.password) return null;

        return url;
    } catch {
        return null;
    }
}

function getUpstreamUrl(request: NextRequest): URL | null {
    const base = backendBaseUrl();
    if (!base) return null;

    const incomingPath = request.nextUrl.pathname;

    if (!incomingPath.startsWith(`${PROXY_PREFIX}/`)) {
        return null;
    }

    const apiPath = incomingPath.slice(PROXY_PREFIX.length);
    const namespace = apiPath.split("/")[1];

    if (namespace !== "admin" && namespace !== "auth") {
        return null;
    }

    // Preserve /api/v1 from API_BASE_URL.
    // Example: /api/server/auth/me -> /api/v1/auth/me
    const upstreamPath = `${base.pathname.replace(/\/+$/, "")}${apiPath}`;

    const url = new URL(base.origin);
    url.pathname = upstreamPath;
    url.search = request.nextUrl.search;

    return url;
}

function buildUpstreamHeaders(request: NextRequest): Headers {
    const headers = new Headers();

    for (const name of REQUEST_HEADERS) {
        const value = request.headers.get(name);
        if (value !== null) headers.set(name, value);
    }

    // Authentication credentials are forwarded only by this
    // protected proxy, never by the public proxy.
    const cookie = request.headers.get("cookie");
    if (cookie) headers.set("cookie", cookie);

    // Forward the caller's bearer token only if your backend
    // explicitly supports Authorization-header authentication.
    const authorization = request.headers.get("authorization");
    if (authorization) headers.set("authorization", authorization);

    // Do not forward Host, Content-Length, Connection,
    // Transfer-Encoding, or browser-controlled forwarding headers.
    return headers;
}

function getSetCookies(headers: Headers): string[] {
    return typeof headers.getSetCookie === "function"
        ? headers.getSetCookie()
        : [];
}

function rewriteCookiePath(cookie: string): string {
    // Preserve all other attributes, including HttpOnly, Secure,
    // SameSite, Expires, and Max-Age.
    return cookie.replace(
        /;\s*Path=\/api\/v1\/auth(?=;|$)/i,
        `; Path=${PROXY_PREFIX}`,
    );
}

function buildResponse(upstream: Response): NextResponse {
    const headers = new Headers();

    for (const name of RESPONSE_HEADERS) {
        const value = upstream.headers.get(name);
        if (value !== null) headers.set(name, value);
    }

    const noBody =
        upstream.status === 204 ||
        upstream.status === 205 ||
        upstream.status === 304;

    const response = new NextResponse(
        noBody ? null : upstream.body,
        {
            status: upstream.status,
            headers,
        },
    );

    for (const cookie of getSetCookies(upstream.headers)) {
        response.headers.append(
            "Set-Cookie",
            rewriteCookiePath(cookie),
        );
    }

    return response;
}

async function proxy(request: NextRequest): Promise<NextResponse> {
    const url = getUpstreamUrl(request);

    if (!API_BASE_URL || !backendBaseUrl()) {
        return NextResponse.json(
            {
                error: {
                    code: "SERVER_CONFIGURATION_ERROR",
                    message: "API_BASE_URL is missing or invalid.",
                },
            },
            { status: 500 },
        );
    }

    if (!url) {
        return NextResponse.json(
            {
                error: {
                    code: "INVALID_PROXY_PATH",
                    message: "The requested API path is not allowed.",
                },
            },
            { status: 404 },
        );
    }

    const headers = buildUpstreamHeaders(request);
    const hasBody = !["GET", "HEAD"].includes(request.method);
    const body = hasBody ? request.body : undefined;

    try {
        const upstream = await fetch(url, {
            method: request.method,
            headers,
            body,
            cache: "no-store",
            redirect: "manual",
            signal: request.signal,
            // Node.js fetch supports streaming request bodies when
            // duplex is set. This option is required for streamed bodies.
            ...(body ? { duplex: "half" as const } : {}),
        });

        return buildResponse(upstream);
    } catch {
        return NextResponse.json(
            {
                error: {
                    code: "BACKEND_UNAVAILABLE",
                    message: "Unable to connect to the backend server.",
                },
            },
            { status: 502 },
        );
    }
}

export async function GET(request: NextRequest) {
    return proxy(request);
}
export async function HEAD(request: NextRequest) {
    return proxy(request);
}
export async function POST(request: NextRequest) {
    return proxy(request);
}
export async function PUT(request: NextRequest) {
    return proxy(request);
}
export async function PATCH(request: NextRequest) {
    return proxy(request);
}
export async function DELETE(request: NextRequest) {
    return proxy(request);
}
export async function OPTIONS(request: NextRequest) {
    return proxy(request);
}
