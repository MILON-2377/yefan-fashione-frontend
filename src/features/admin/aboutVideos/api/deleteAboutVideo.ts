import { adminFetch } from "@/api";



export async function deleteAboutVideo(id: string): Promise<void> {
    return adminFetch<void>(`/about-videos/${id}`, {
        method: "DELETE",
    });
}
