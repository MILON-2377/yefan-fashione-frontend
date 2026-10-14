import { authFetch } from "@/api";
import { LoginCredentials } from "../types";

export async function login(credentials: LoginCredentials): Promise<void> {
  await authFetch<void>("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
