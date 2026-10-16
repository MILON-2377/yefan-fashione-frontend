
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "../api/login";
import type { LoginCredentials } from "../types";
import { ApiError } from "@/lib/errors/ApiError";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, ApiError, LoginCredentials>({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["authenticated-user"],
      });

      router.replace("/admin");
      router.refresh();
    },
  });
}
