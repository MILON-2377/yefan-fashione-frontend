import { authFetch } from "@/api";

export async function logoutUser(): Promise<void> {
    await authFetch<void>("/logout", {
        method: "POST",
    });
}