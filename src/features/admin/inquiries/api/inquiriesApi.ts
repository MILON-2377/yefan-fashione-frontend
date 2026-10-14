import {
    InquiryListResponse,
    InquiryItem,
    InquiryParams,
    UpdateInquiryPayload,
} from './../types/inuiryTypes';
import { adminFetch } from '@/api';


/**
 * GET /api/v1/admin/inquiries
 */
export async function getInquiries(
    params: InquiryParams = {}
): Promise<InquiryListResponse> {
    const query = new URLSearchParams();

    if (params.page !== undefined) query.set("page", params.page.toString());
    if (params.page_size !== undefined) query.set("page_size", params.page_size.toString());
    if (params.search) query.set("search", params.search);
    if (params.status) query.set("status", params.status);

    const queryString = query.toString();
    const endpoint = `/inquiries${queryString ? `?${queryString}` : ""}`;

    return adminFetch<InquiryListResponse>(endpoint, {
        method: "GET",
    });
}

/**
 * GET /api/v1/admin/inquiries/{id}
 */
export async function getInquiryById(id: string): Promise<InquiryItem> {
    return adminFetch<InquiryItem>(`/inquiries/${id}`, {
        method: "GET",
    });
}

/**
 * PATCH /api/v1/admin/inquiries/{id}
 */
export async function updateInquiry(
    id: string,
    payload: UpdateInquiryPayload
): Promise<InquiryItem> {
    return adminFetch<InquiryItem>(`/inquiries/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

/**
 * DELETE /api/v1/admin/inquiries/{id}
 */
export async function deleteInquiry(id: string): Promise<void> {
    return adminFetch<void>(`/inquiries/${id}`, {
        method: "DELETE",
    });
}
