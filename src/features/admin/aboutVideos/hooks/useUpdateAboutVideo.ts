import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAboutVideo } from "../api/updateAboutVideo";
import { UpdateAboutVideoPayload, AboutVideoItem } from "../types/aboutVideoTypes";
import { ApiError } from "@/lib/errors/ApiError";

export function useUpdateAboutVideo(id: string) {
  const queryClient = useQueryClient();

  return useMutation<AboutVideoItem, ApiError, UpdateAboutVideoPayload>({
    mutationFn: (payload) => updateAboutVideo(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-about-videos"] });
      queryClient.invalidateQueries({ queryKey: ["admin-about-video", id] });
    },
  });
}
