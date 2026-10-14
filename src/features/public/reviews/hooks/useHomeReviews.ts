import { useQuery } from "@tanstack/react-query";
import { getHomeReviews } from "../api/homeReviewsApi";
import { HomeReviewsResponse } from "../types/homeReviewsTyeps";

export const homeReviewsKeys = {
    all: ["public", "home", "reviews"] as const,
    list: (params?: { page?: number; page_size?: number }) =>
        [...homeReviewsKeys.all, "list", params ?? {}] as const,
};

export function useHomeReviews(params?: { page?: number; page_size?: number }) {
    return useQuery<HomeReviewsResponse>({
        queryKey: homeReviewsKeys.list(params),
        queryFn: () => getHomeReviews(params),
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
}
