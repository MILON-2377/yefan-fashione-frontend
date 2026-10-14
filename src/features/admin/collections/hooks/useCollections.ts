import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../api/getCollections";
import { CollectionListResponse, GetCollectionsParams } from "../types";

export const COLLECTIONS_QUERY_KEY = ["collections"] as const;

export function useCollections(params?: GetCollectionsParams) {
    return useQuery<CollectionListResponse, Error>({
        queryKey: [...COLLECTIONS_QUERY_KEY, params],
        queryFn: () => getCollections(params),
    });
}
