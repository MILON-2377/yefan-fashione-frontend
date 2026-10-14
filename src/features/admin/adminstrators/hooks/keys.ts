import { ListAdminsParams } from "../types";

export const adminKeys = {
  all: ["admin"] as const,
  users: () => [...adminKeys.all, "users"] as const,
  userList: (filters?: ListAdminsParams) =>
    [...adminKeys.users(), "list", filters ?? {}] as const,
  userDetail: (id: string) => [...adminKeys.users(), "detail", id] as const,
};
