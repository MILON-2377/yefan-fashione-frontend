import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../api/getCollections";
import { CollectionListResponse, GetCollectionsParams } from "../types";
import { collectionKeys } from "./keys";


export function useCollections(params?: GetCollectionsParams) {
    return useQuery<CollectionListResponse, Error>({
        queryKey: collectionKeys.list(params),
        queryFn: () => getCollections(params),
    });
}
