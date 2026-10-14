import { authFetch } from "@/api";

export async function revokeSession(session_id: string): Promise<void> {
  return authFetch<void>(`/sessions/${session_id}`, {
    method: "DELETE",
  });
}
