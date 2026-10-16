import { useQuery } from "@tanstack/react-query";
import { getUnusedCollections } from "../api/getUnusedCollections";

export function useUnusedCollections() {
  return useQuery({
    queryKey: ["collections", "unused"],
    queryFn: getUnusedCollections,
    staleTime: 1000 * 60 * 5, 
  });
}