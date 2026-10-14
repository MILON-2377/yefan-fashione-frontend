import { useQuery } from "@tanstack/react-query";
import { getAboutVideos } from "../api/getAboutVideos";
import { AboutVideoParams, AboutVideoListResponse } from "../types/aboutVideoTypes";
import { ApiError } from "@/lib/errors/ApiError";

export function useAboutVideos(params: AboutVideoParams = {}) {
  return useQuery<AboutVideoListResponse, ApiError>({
    queryKey: ["admin-about-videos", params],
    queryFn: () => getAboutVideos(params),
    placeholderData: (previousData) => previousData,
  });
}
