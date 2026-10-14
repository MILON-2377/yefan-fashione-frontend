import { useQuery } from "@tanstack/react-query";
import { getInquiries } from "../api/inquiriesApi";
import { InquiryParams, InquiryListResponse } from "../types/inuiryTypes";
import { ApiError } from "@/lib/errors/ApiError";

export function useInquiries(params: InquiryParams = {}) {
  return useQuery<InquiryListResponse, ApiError>({
    queryKey: ["admin-inquiries", params],
    queryFn: () => getInquiries(params),
    placeholderData: (previousData) => previousData,
  });
}
