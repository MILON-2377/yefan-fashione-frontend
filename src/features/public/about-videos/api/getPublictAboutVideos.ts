import { publicFetch } from "@/api";
import { PublicAboutVideoItem } from "../types/aboutVideoTypes";


export async function getPublicAboutVideos(): Promise<PublicAboutVideoItem[]> {
    return publicFetch<PublicAboutVideoItem[]>("/about-videos", {
        method: "GET",
        next: { revalidate: 60 }, // ISR caching configuration
    });
}
