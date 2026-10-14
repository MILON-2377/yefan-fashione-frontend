import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAboutVideo } from "../api/deleteAboutVideo";
import { ApiError } from "@/lib/errors/ApiError";

export function useDeleteAboutVideo() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (id: string) => deleteAboutVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-about-videos"] });
    },
  });
}
