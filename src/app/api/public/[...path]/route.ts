
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL;
const PROXY_PREFIX = "/api/public";

const REQUEST_HEADERS = [
    "accept",
    "accept-language",
    "content-type",
    "if-none-match",
    "if-modified-since",
    "range",
] as const;

const RESPONSE_HEADERS = [
    "accept-ranges",
    "cache-control",
    "content-disposition",
    "content-type",
    "etag",
    "last-modified",
    "retry-after",
    "vary",
    "content-range",
] as const;

function getUpstreamUrl(request: NextRequest): URL | null {
    if (!API_BASE_URL) return null;

    let base: URL;

    try {
        base = new URL(API_BASE_URL);
    } catch {
        return null;
    }

    if (
        (base.protocol !== "http:" && base.protocol !== "https:") ||
        base.username ||
        base.password
    ) {
        return null;
    }

    const pathname = request.nextUrl.pathname;

    if (!pathname.startsWith(`${PROXY_PREFIX}/`)) {
        return null;
    }

    const endpointPath = pathname.slice(PROXY_PREFIX.length);
    const basePath = base.pathname.replace(/\/+$/, "");

    const url = new URL(base.origin);
    url.pathname = `${basePath}/public${endpointPath}`;
    url.search = request.nextUrl.search;

    return url;
}

async function proxy(request: NextRequest): Promise<NextResponse> {
    if (!API_BASE_URL) {
        return NextResponse.json(
            {
                error: {
                    code: "SERVER_CONFIGURATION_ERROR",
                    message: "API_BASE_URL is not configured.",
                },
            },
            { status: 500 },
        );
    }

    const url = getUpstreamUrl(request);

    if (!url) {
        return NextResponse.json(
            {
                error: {
                    code: "INVALID_PROXY_PATH",
                    message: "The requested public API path is invalid.",
                },
            },
            { status: 404 },
        );
    }

    const headers = new Headers();

    for (const name of REQUEST_HEADERS) {
        const value = request.headers.get(name);
        if (value !== null) headers.set(name, value);
    }

    // Never forward Cookie, Authorization, Proxy-Authorization,
    // or browser-controlled forwarding headers.

    const hasBody = !["GET", "HEAD"].includes(request.method);

    try {
        const upstream = await fetch(url, {
            method: request.method,
            headers,
            body: hasBody ? request.body : undefined,
            cache: "no-store",
            redirect: "manual",
            signal: request.signal,
            ...(hasBody ? { duplex: "half" as const } : {}),
        });

        const responseHeaders = new Headers();

        for (const name of RESPONSE_HEADERS) {
            const value = upstream.headers.get(name);
            if (value !== null) responseHeaders.set(name, value);
        }

        const noBody =
            request.method === "HEAD" ||
            upstream.status === 204 ||
            upstream.status === 205 ||
            upstream.status === 304;

        // Do not forward Set-Cookie or Content-Length.
        // The upstream fetch may decompress the response body.
        return new NextResponse(
            noBody ? null : upstream.body,
            {
                status: upstream.status,
                headers: responseHeaders,
            },
        );
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
