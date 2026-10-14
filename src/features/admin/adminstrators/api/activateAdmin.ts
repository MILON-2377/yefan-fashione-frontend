import { adminFetch } from "@/api";
import { UserResponse } from "../types";

export async function activateAdmin(
    user_id: string,
): Promise<UserResponse> {
    const result = await adminFetch<UserResponse>(`/users/${user_id}/activate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return result;
}
