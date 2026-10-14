import { adminFetch } from "@/api";
import {
    AboutVideoListResponse,
    AboutVideoParams,
} from "../types/aboutVideoTypes";


export async function getAboutVideos(
    params: AboutVideoParams = {}
): Promise<AboutVideoListResponse> {
    const query = new URLSearchParams();

    if (params.page !== undefined) query.set("page", params.page.toString());
    if (params.page_size !== undefined) query.set("page_size", params.page_size.toString());
    if (params.search) query.set("search", params.search);
    if (params.status) query.set("status", params.status);

    const queryString = query.toString();
    const endpoint = `/about-videos${queryString ? `?${queryString}` : ""}`;

    return adminFetch<AboutVideoListResponse>(endpoint, {
        method: "GET",
    });
}
