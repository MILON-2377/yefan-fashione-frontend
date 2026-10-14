import { adminFetch } from "@/api";

export async function revokeSessions(userId: string): Promise<void> {
  await adminFetch<void>(`/users/${userId}/revoke-sessions`, {
    method: "POST",
  });
}
