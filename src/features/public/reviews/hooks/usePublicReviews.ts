import { useQuery } from "@tanstack/react-query";
import { PublicReviewsParams, PublicReviewsResponse } from "../types/reviewTypes";
import { getPublicReviews } from "../api/getPublicReviews";


export const publicReviewsKeys = {
  all: ["public", "reviews"] as const,
  list: (params?: PublicReviewsParams) =>
    [...publicReviewsKeys.all, "list", params ?? {}] as const,
};

export function usePublicReviews(params?: PublicReviewsParams) {
  return useQuery<PublicReviewsResponse>({
    queryKey: publicReviewsKeys.list(params),
    queryFn: () => getPublicReviews(params),
    staleTime: 1000 * 60 * 5,
  });
}
