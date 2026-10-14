import { adminFetch } from "@/api";
import { CreateAboutVideoPayload, AboutVideoItem } from "../types/aboutVideoTypes";


export async function createAboutVideo(
    payload: CreateAboutVideoPayload
): Promise<AboutVideoItem> {
    return adminFetch<AboutVideoItem>("/about-videos", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
