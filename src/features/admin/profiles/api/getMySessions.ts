import { authFetch } from "@/api";
import {

    UserSessionResponse,
} from "../types";


export async function getMySessions(): Promise<UserSessionResponse[]> {
    return authFetch<UserSessionResponse[]>("/sessions", {
        method: "GET",
    });
}
