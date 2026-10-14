import { useQuery } from "@tanstack/react-query";
import { getMySessions } from "../api/getMySessions";
import { UserSessionResponse } from "../types";
import { PROFILE_QUERY_KEYS } from "./keys";

export function useSessions() {
  return useQuery<UserSessionResponse[], Error>({
    queryKey: PROFILE_QUERY_KEYS.sessions(),
    queryFn: getMySessions,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
