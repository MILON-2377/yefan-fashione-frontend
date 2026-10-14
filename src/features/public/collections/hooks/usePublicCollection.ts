import { useQuery } from "@tanstack/react-query";
import {
  PublicCollectionsResponse,
  GetPublicCollectionsParams,
} from "../types/collectionTypes";
import { getPublicCollections } from "../api/collectionApi";

export function usePublicCollections(params?: GetPublicCollectionsParams) {
  return useQuery<PublicCollectionsResponse>({
    queryKey: ["public-collections", params],
    queryFn: () => getPublicCollections(params),
  });
}
