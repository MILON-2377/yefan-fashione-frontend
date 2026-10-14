import { adminFetch } from "@/api";
import { CreateAdminRequest, UserResponse } from "../types";



export async function createAdmin(data: CreateAdminRequest): Promise<UserResponse> {
    const result = await adminFetch<UserResponse>("/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return result;
}
