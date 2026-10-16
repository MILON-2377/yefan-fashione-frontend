
import { ApiError } from "@/lib/errors/ApiError";
import { CurrentUser } from "../types";
import { authFetch } from "@/api";

export async function fetchCurrentUser(): Promise<CurrentUser> {
    return authFetch<CurrentUser>("/me", {
        skipRefresh: true,
    });
}

export async function authBootstrap(): Promise<CurrentUser | null> {
    try {
        return await fetchCurrentUser();
    } catch (error) {
        if (!(error instanceof ApiError) || error.status !== 401) {
            throw error;
        }
    }

    // Access token is missing, expired, or invalid.
    try {
        await authFetch<void>("/refresh", {
            method: "POST",
            skipRefresh: true,
        });
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            return null;
        }

        // Network failures, server errors, and other failures
        // should not automatically be interpreted as logout.
        throw error;
    }

    try {
        return await fetchCurrentUser();
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            return null;
        }

        throw error;
    }
}
