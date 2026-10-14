export const adminProductKeys = {
  all: ["admin", "products"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...adminProductKeys.all, "list", filters ?? {}] as const,
  detail: (id: string) => [...adminProductKeys.all, "detail", id] as const,
};
