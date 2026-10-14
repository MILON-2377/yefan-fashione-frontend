import { authFetch } from "@/api";
import {
    UserProfileResponse
} from "../types";


export async function getMyProfile(): Promise<UserProfileResponse> {
    return authFetch<UserProfileResponse>("/me/profile", {
        method: "GET",
    });
}
