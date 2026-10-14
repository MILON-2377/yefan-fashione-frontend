export interface BackendErrorPayload {
    message?: string;
    detail?: string | Array<{ loc: (string | number)[]; msg: string; type: string }>;
    errors?: Record<string, string[] | string>;
    error?: string | { message?: string; code?: string; [key: string]: unknown };
    code?: string;
    [key: string]: unknown;
}

const COMMON_STATUS_MESSAGES: Record<number, string> = {
    0: "Unable to connect to the server. Please check your internet connection.",
    400: "Bad request. Please check your input and try again.",
    401: "Authentication required. Please log in with valid credentials.",
    403: "Access denied. You do not have permission to perform this action.",
    404: "The requested resource could not be found.",
    405: "Method not allowed. Please contact technical support if this continues.",
    409: "A conflict occurred with the current state of the resource.",
    422: "Validation failed. Please verify that all input fields are correctly formatted.",
    429: "Too many requests. Please wait a moment before trying again.",
    500: "An internal server error occurred. Please try again later.",
    502: "Bad gateway. The service is temporarily unreachable.",
    503: "Service unavailable. Service is under maintenance.",
    504: "Gateway timeout. The server took too long to respond.",
};

export class ApiError extends Error {
    public status: number;
    public statusText: string;
    public data: BackendErrorPayload | null;

    constructor(status: number, statusText: string, data: BackendErrorPayload | null) {
        const message = extractErrorMessage(status, statusText, data);
        super(message);

        this.name = "ApiError";
        this.status = status;
        this.statusText = statusText;
        this.data = data;

        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

function extractErrorMessage(
    status: number,
    statusText: string,
    data: BackendErrorPayload | null
): string {
    if (data) {
        // 1. Check if backend error is a nested object (e.g. { error: { message: "...", code: "..." } })
        if (data.error && typeof data.error === "object" && data.error !== null) {
            if (typeof data.error.message === "string" && data.error.message.trim().length > 0) {
                return data.error.message;
            }
        }

        // 2. Check if error is a direct string (e.g. { error: "Some error" })
        if (typeof data.error === "string" && data.error.trim().length > 0) {
            return data.error;
        }

        // 3. Check direct top-level message property
        if (typeof data.message === "string" && data.message.trim().length > 0) {
            return data.message;
        }

        // 4. Check FastAPI 'detail' string property
        if (typeof data.detail === "string" && data.detail.trim().length > 0) {
            return data.detail;
        }

        // 5. FastAPI / Pydantic validation error array
        if (Array.isArray(data.detail) && data.detail.length > 0) {
            const firstErr = data.detail[0];
            if (firstErr?.msg) {
                const field = firstErr.loc ? firstErr.loc.slice(1).join(".") : "";
                return field ? `${field}: ${firstErr.msg}` : firstErr.msg;
            }
        }

        // 6. Key-value error map
        if (data.errors && typeof data.errors === "object") {
            const firstKey = Object.keys(data.errors)[0];
            if (firstKey) {
                const val = data.errors[firstKey];
                const msg = Array.isArray(val) ? val[0] : val;
                return `${firstKey}: ${msg}`;
            }
        }
    }

    if (COMMON_STATUS_MESSAGES[status]) {
        return COMMON_STATUS_MESSAGES[status];
    }

    return statusText || `Request failed with status ${status}`;
}
