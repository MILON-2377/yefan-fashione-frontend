import { baseFetch } from "@/api/baseClient";
import { ApiError } from "@/lib/errors/ApiError";
import { CurrentUser } from "../types";


export async function fetchCurrentUser(): Promise<CurrentUser> {
    return baseFetch<CurrentUser>(
        "/auth/me",
        {
            skipRefresh: true,
        }
    );
}


export async function authBootstrap(): Promise<CurrentUser | null> {

    console.log(
        "AUTH BOOTSTRAP START"
    );

    try {

        return await fetchCurrentUser();

    } catch (error) {

        console.log(
            "AUTH ME FAILED",
            error
        );

        if (
            error instanceof ApiError &&
            error.status === 401
        ) {

            console.log(
                "CALLING REFRESH"
            );

            try {

                await baseFetch<void>(
                    "/auth/refresh",
                    {
                        method: "POST",
                        skipRefresh: true,
                    }
                );

                console.log(
                    "REFRESH SUCCESS"
                );

                return await fetchCurrentUser();

            } catch {

                return null;
            }
        }


        return null;
    }
}
