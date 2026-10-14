import { authFetch } from "@/api";
import {
    PasswordChangeRequest,
} from "../types";




export async function changeMyPassword(
    payload: PasswordChangeRequest
): Promise<{ message: string }> {
    return authFetch<{ message: string }>("/me/password", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
