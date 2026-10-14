import { adminFetch } from "@/api";
import { AboutVideoItem } from "../types/aboutVideoTypes";


export async function getAboutVideoById(id: string): Promise<AboutVideoItem> {
  return adminFetch<AboutVideoItem>(`/about-videos/${id}`, { method: "GET" });
}
