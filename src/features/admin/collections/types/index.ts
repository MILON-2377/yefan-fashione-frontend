import { RecordStatus } from "../../brands/types";

export interface Collection {
    id: string;
    brand_id: string;
    name: string;
    slug: string;
    description?: string;
    cover_media_url?: string;
    status: RecordStatus;
    created_at: string;
    updated_at: string;
}

export interface CollectionListResponse {
    items: Collection[];
    total: number;
    page: number;
    page_size: number;
}

export interface GetCollectionsParams {
    brand_id?: string;
    search?: string;
    status?: string;
    page?: number;
    page_size?: number;
}
