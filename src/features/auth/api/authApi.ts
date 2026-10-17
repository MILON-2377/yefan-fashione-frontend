import { ApiError } from "@/lib/errors/ApiError";
import type { CurrentUser } from "../types";
import { authFetch } from "@/api";

export async function fetchCurrentUser(): Promise<CurrentUser> {
    return authFetch<CurrentUser>("/me", {
        method: "GET",
        cache: "no-store",
    });
}

export async function authBootstrap(): Promise<CurrentUser | null> {
    try {
        return await fetchCurrentUser();
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            return null;
        }

        throw error;
    }
}