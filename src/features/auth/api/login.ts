import type {
  LoginCredentials,
  LoginChallengeResponse,
  VerifyLoginCodePayload,
} from "../types";
import { authFetch } from "@/api";

export async function login(
  credentials: LoginCredentials,
): Promise<LoginChallengeResponse> {
  return authFetch<LoginChallengeResponse>("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function verifyLoginCode(
  payload: VerifyLoginCodePayload,
): Promise<void> {
  await authFetch<void>("/verify-login-code", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}