import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { verifyLoginCode } from "../api/login";
import type { VerifyLoginCodePayload } from "../types";
import { ApiError } from "@/lib/errors/ApiError";

export function useVerifyLoginCode() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, ApiError, VerifyLoginCodePayload>({
    mutationFn: verifyLoginCode,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["authenticated-user"],
      });
      router.replace("/admin");
      router.refresh();
    },
  });
}