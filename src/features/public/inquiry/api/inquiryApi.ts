import { publicFetch } from "@/api";
import {
  CreateInquiryRequest,
  CreateInquiryResponse,
} from "../types/inquiryTypes";

export async function createInquiry(
  payload: CreateInquiryRequest
): Promise<CreateInquiryResponse> {
  return publicFetch<CreateInquiryResponse>("/inquiries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
