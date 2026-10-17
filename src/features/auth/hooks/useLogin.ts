import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import type { LoginCredentials, LoginChallengeResponse } from "../types";
import { ApiError } from "@/lib/errors/ApiError";

export function useLogin() {
  return useMutation<LoginChallengeResponse, ApiError, LoginCredentials>({
    mutationFn: login,
  });
}