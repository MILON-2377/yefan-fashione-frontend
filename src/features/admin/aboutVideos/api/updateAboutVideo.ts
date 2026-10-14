import { adminFetch } from "@/api";
import { AboutVideoItem, UpdateAboutVideoPayload } from "../types/aboutVideoTypes";

export async function updateAboutVideo(
  id: string,
  payload: UpdateAboutVideoPayload
): Promise<AboutVideoItem> {
  return adminFetch<AboutVideoItem>(`/about-videos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
