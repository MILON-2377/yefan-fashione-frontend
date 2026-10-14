import { adminFetch } from "@/api";
import { UpdateUserRequest, UserResponse } from "../types";

export async function updateUser(
    userId: string,
    data: UpdateUserRequest
): Promise<UserResponse> {
    const result = await adminFetch<UserResponse>(`/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return result;
}
