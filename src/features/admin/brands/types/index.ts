
export type RecordStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface Brand {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    logo_media_url?: string | null;
    status: RecordStatus;
    created_at: string;
    updated_at: string;
}

export interface BrandListResponse {
    items: Brand[];
    total: number;
    page: number;
    page_size: number;
}
