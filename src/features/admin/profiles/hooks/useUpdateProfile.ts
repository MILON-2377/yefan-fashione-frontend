import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile } from "../api/updateMyProfile";
import { UpdateUserProfileRequest, UserProfileResponse } from "../types";
import { PROFILE_QUERY_KEYS } from "./keys";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation<UserProfileResponse, Error, UpdateUserProfileRequest>({
    mutationFn: (payload: UpdateUserProfileRequest) => updateMyProfile(payload),
    onSuccess: (updatedProfile) => {
      // Direct cache update for immediate UI reflection
      queryClient.setQueryData<UserProfileResponse>(
        PROFILE_QUERY_KEYS.me(),
        updatedProfile
      );
      // Invalidate to ensure consistency across active components
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.me() });
    },
  });
}
