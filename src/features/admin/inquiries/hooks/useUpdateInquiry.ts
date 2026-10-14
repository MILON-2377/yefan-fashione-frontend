import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInquiry } from "../api/inquiriesApi";
import { UpdateInquiryPayload, InquiryItem } from "../types/inuiryTypes";
import { ApiError } from "@/lib/errors/ApiError";

export function useUpdateInquiry(id: string) {
    const queryClient = useQueryClient();

    return useMutation<InquiryItem, ApiError, UpdateInquiryPayload>({
        mutationFn: (payload) => updateInquiry(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
            queryClient.invalidateQueries({ queryKey: ["admin-inquiry", id] });
        },
    });
}
