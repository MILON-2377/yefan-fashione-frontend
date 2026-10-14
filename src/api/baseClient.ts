import {
    ApiError,
    BackendErrorPayload,
} from "@/lib/errors/ApiError";


const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000/api/v1";


export interface ApiFetchOptions extends RequestInit {

    prefix?: string;

    _isRetry?: boolean;

    responseType?: "json" | "raw";

    skipRefresh?: boolean;
}


let refreshPromise: Promise<void> | null = null;



async function refreshAccessToken(): Promise<void> {

    console.count("[AUTH] Refresh request started");

    const response = await fetch(
        `${BASE_URL}/auth/refresh`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
            },
        }
    );


    if (!response.ok) {

        let data: unknown = null;

        try {
            data = await response.json();
        }
        catch {
            data = null;
        }


        console.error(
            "Refresh failed:",
            {
                status: response.status,
                data,
            }
        );


        throw new Error(
            "Failed to refresh access token."
        );
    }
}



async function refreshAccessTokenOnce(): Promise<void> {

    if (!refreshPromise) {

        refreshPromise =
            refreshAccessToken()
                .finally(() => {

                    refreshPromise = null;

                });
    }


    return refreshPromise;
}



function handleSessionExpiry(): void {

    if (typeof window !== "undefined") {

        window.dispatchEvent(
            new Event(
                "auth:session-expired"
            )
        );
    }
}



function isAuthEndpoint(
    endpoint: string
): boolean {

    const normalized =
        endpoint
            .replace(/^\/+/, "")
            .replace(/\/+$/, "");


    return (
        normalized === "auth/login" ||
        normalized === "auth/refresh" ||
        normalized === "auth/logout"
    );
}



function buildUrl(
    endpoint: string,
    prefix: string
): string {

    const cleanEndpoint =
        endpoint.startsWith("/")
            ? endpoint
            : `/${endpoint}`;


    const cleanPrefix =
        prefix
            ? prefix.startsWith("/")
                ? prefix
                : `/${prefix}`
            : "";


    return `${BASE_URL}${cleanPrefix}${cleanEndpoint}`;
}



function buildHeaders(
    headers: HeadersInit | undefined,
    body: BodyInit | null | undefined
): Headers {

    const requestHeaders =
        new Headers(headers);


    if (!requestHeaders.has("Accept")) {

        requestHeaders.set(
            "Accept",
            "application/json"
        );
    }


    const isFormData =
        typeof FormData !== "undefined" &&
        body instanceof FormData;



    if (
        body !== undefined &&
        body !== null &&
        !isFormData &&
        !requestHeaders.has("Content-Type")
    ) {

        requestHeaders.set(
            "Content-Type",
            "application/json"
        );
    }


    return requestHeaders;
}



export async function baseFetch<T>(
    endpoint: string,
    options: ApiFetchOptions = {}
): Promise<T> {


    const {

        headers,

        prefix = "",

        _isRetry = false,

        responseType = "json",

        skipRefresh = false,

        ...restOptions

    } = options;



    const url =
        buildUrl(
            endpoint,
            prefix
        );



    const requestHeaders =
        buildHeaders(
            headers,
            restOptions.body
        );



    let response: Response;



    try {


        response =
            await fetch(
                url,
                {

                    ...restOptions,

                    credentials:
                        "include",

                    headers:
                        requestHeaders,
                }
            );


    }
    catch {


        throw new ApiError(
            0,
            "Network Error",
            {
                message:
                    "Unable to connect to server.",
            }
        );
    }



    /*
        Access token expired
        Try refresh once
    */

    if (

        response.status === 401 &&

        !_isRetry &&

        !skipRefresh &&

        !isAuthEndpoint(endpoint)

    ) {


        try {


            await refreshAccessTokenOnce();



            return baseFetch<T>(
                endpoint,
                {

                    ...options,

                    _isRetry: true,

                }
            );


        }
        catch {


            const sessionError =
                new ApiError(
                    401,
                    "Unauthorized",
                    {

                        message:
                            "Your session has expired. Please log in again.",

                    }
                );


            handleSessionExpiry();


            throw sessionError;

        }
    }




    if (responseType === "raw") {


        if (!response.ok) {



            throw new ApiError(
                response.status,
                response.statusText,
                {
                    message:
                        await response.text(),
                }
            );
        }


        return response as unknown as T;
    }




    let responseData: unknown = null;



    const contentType =
        response.headers.get(
            "content-type"
        ) ?? "";



    if (

        contentType
            .toLowerCase()
            .includes("application/json")

    ) {


        try {

            responseData =
                await response.json();

        }
        catch {

            responseData = null;

        }

    }
    else {


        try {

            responseData =
                await response.text();

        }
        catch {

            responseData = null;

        }
    }





    if (!response.ok) {


        const errorPayload:

            BackendErrorPayload =

            typeof responseData === "object" &&
                responseData !== null

                ?

                responseData as BackendErrorPayload

                :

                {
                    message:
                        typeof responseData === "string"
                            ? responseData
                            : undefined,
                };

        console.error("API Error intercepted:", {
            url,
            status: response.status,
            errorPayload,
        });

        throw new ApiError(
            response.status,
            response.statusText,
            errorPayload
        );
    }




    if (

        response.status === 204 ||

        responseData === null ||

        responseData === ""

    ) {

        return {} as T;
    }



    return responseData as T;
}
