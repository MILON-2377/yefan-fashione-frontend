import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminReviews,
  updateReviewStatus,
  deleteReview,
  AdminReviewsParams,
  UpdateReviewStatusPayload,
} from "../api/adminReviewsApis";

export const adminReviewKeys = {
  all: ["admin", "reviews"] as const,
  list: (params: AdminReviewsParams) => [...adminReviewKeys.all, "list", params] as const,
};

export function useAdminReviews(params: AdminReviewsParams) {
  return useQuery({
    queryKey: adminReviewKeys.list(params),
    queryFn: () => getAdminReviews(params),
    staleTime: 1000 * 30,
  });
}

export function useUpdateReviewStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      payload,
    }: {
      reviewId: string;
      payload: UpdateReviewStatusPayload;
    }) => updateReviewStatus(reviewId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminReviewKeys.all });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminReviewKeys.all });
    },
  });
}
