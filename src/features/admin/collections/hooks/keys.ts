import { GetCollectionsParams } from "../types";

export const collectionKeys = {
    all: ["collections"] as const,
    list: (params?: GetCollectionsParams) => [...collectionKeys.all, params] as const,
    detail: (id: string) => [...collectionKeys.all, id] as const,
} as const;