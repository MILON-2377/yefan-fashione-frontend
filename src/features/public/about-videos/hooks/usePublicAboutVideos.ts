import { useQuery } from "@tanstack/react-query";
import { getPublicAboutVideos } from "../api/getPublictAboutVideos";
import { PublicAboutVideoItem } from "../types/aboutVideoTypes";

export function usePublicAboutVideos() {
  return useQuery<PublicAboutVideoItem[], Error>({
    queryKey: ["public-about-videos"],
    queryFn: getPublicAboutVideos,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
