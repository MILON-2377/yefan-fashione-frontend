import { useQuery } from "@tanstack/react-query";
import { getAboutVideoById } from "../api/getAboutVideo";
import { AboutVideoItem } from "../types/aboutVideoTypes";
import { ApiError } from "@/lib/errors/ApiError";

export function useAboutVideo(id: string) {
  return useQuery<AboutVideoItem, ApiError>({
    queryKey: ["admin-about-video", id],
    queryFn: () => getAboutVideoById(id),
    enabled: Boolean(id),
  });
}
