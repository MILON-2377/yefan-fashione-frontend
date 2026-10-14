import { adminFetch } from "@/api";
import { ResetPasswordRequest } from "../types";

export async function resetPassword(
    userId: string,
    data?: ResetPasswordRequest
): Promise<void> {
    await adminFetch<void>(`/users/${userId}/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data || {}),
    });
}
