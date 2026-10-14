import { useMutation } from "@tanstack/react-query";
import { createInquiry } from "../api/inquiryApi";
import {
  CreateInquiryRequest,
  CreateInquiryResponse,
} from "../types/inquiryTypes";

export function useCreateInquiry() {
  return useMutation<CreateInquiryResponse, Error, CreateInquiryRequest>({
    mutationFn: (payload: CreateInquiryRequest) => createInquiry(payload),
  });
}
