import { useQuery } from "@tanstack/react-query";
import { UserProfileResponse } from "../types";
import { PROFILE_QUERY_KEYS } from "./keys";
import { getMyProfile } from "../api/getProfile";

export function useProfile() {
  return useQuery<UserProfileResponse, Error>({
    queryKey: PROFILE_QUERY_KEYS.me(),
    queryFn: getMyProfile,
    staleTime: 1000 * 60 * 10, // 10 minutes fresh time
  });
}
