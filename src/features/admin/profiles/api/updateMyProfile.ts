import { authFetch } from "@/api";
import {
    UserProfileResponse,
    UpdateUserProfileRequest
} from "../types";




export async function updateMyProfile(
    payload: UpdateUserProfileRequest
): Promise<UserProfileResponse> {
    return authFetch<UserProfileResponse>("/me/profile", {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}
