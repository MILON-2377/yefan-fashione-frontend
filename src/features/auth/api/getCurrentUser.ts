import { authFetch } from "@/api";

import { CurrentUser } from "../types";


export function getCurrentUser(): Promise<CurrentUser> {
  return authFetch<CurrentUser>("/me");
}
