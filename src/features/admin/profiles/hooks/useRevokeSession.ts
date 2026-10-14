import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revokeSession } from "../api/revokeSession";
import { PROFILE_QUERY_KEYS } from "./keys";

export function useRevokeSession() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (sessionId: string) => revokeSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.sessions() });
    },
  });
}
