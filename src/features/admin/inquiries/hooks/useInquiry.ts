import { useQuery } from "@tanstack/react-query";
import { getInquiryById } from "../api/inquiriesApi";
import { InquiryItem } from "../types/inuiryTypes";
import { ApiError } from "@/lib/errors/ApiError";

export function useInquiry(id: string) {
  return useQuery<InquiryItem, ApiError>({
    queryKey: ["admin-inquiry", id],
    queryFn: () => getInquiryById(id),
    enabled: Boolean(id),
  });
}
