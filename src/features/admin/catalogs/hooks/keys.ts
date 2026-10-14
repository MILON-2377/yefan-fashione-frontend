import { GetCatalogsParams } from "../types/catalogTypes";

export const catalogQueryKeys = {
  all: ["catalogs"] as const,
  lists: () => [...catalogQueryKeys.all, "list"] as const,
  list: (params?: GetCatalogsParams) => [...catalogQueryKeys.lists(), params] as const,
  details: () => [...catalogQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...catalogQueryKeys.details(), id] as const,
};
