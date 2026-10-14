export type RecordStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type ProductSortField = "created_at" | "updated_at" | "name" | "product_code";
export type SortOrder = "asc" | "desc";

export interface ProductImage {
    id: string;
    url: string;
    mime_type: string;
    width: number;
    height: number;
}

export interface Product {
    id: string;
    product_code: string;
    name: string;
    slug: string;
    status: RecordStatus;
    description: string;
    brand_id: string | null;
    collection_id: string | null;
    category_id: string | null;
    image: ProductImage | null;
    created_at: string;
    updated_at: string;
}

export interface PaginationMeta {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
}

export interface ProductListResponse {
    items: Product[];
    pagination: PaginationMeta;
}

export interface ProductQueryParams {
    search?: string;
    status?: RecordStatus;
    brand_id?: string;
    collection_id?: string;
    category_id?: string;
    page?: number;
    page_size?: number;
    sort_by?: ProductSortField;
    sort_order?: SortOrder;
}
