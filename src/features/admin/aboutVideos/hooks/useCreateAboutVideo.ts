import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAboutVideo } from "../api/createAboutVideo";
import { CreateAboutVideoPayload, AboutVideoItem } from "../types/aboutVideoTypes";
import { ApiError } from "@/lib/errors/ApiError";

export function useCreateAboutVideo() {
    const queryClient = useQueryClient();

    return useMutation<AboutVideoItem, ApiError, CreateAboutVideoPayload>({
        mutationFn: (payload) => createAboutVideo(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-about-videos"] });
        },
    });
}
