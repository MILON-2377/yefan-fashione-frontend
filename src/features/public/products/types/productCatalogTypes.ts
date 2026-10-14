export interface ProductMediaItem {
    id: string;
    url: string;
}

export interface CatalogProductItem {
    id: string;
    product_code: string;
    name: string;
    slug: string;
    description: string;
    media: ProductMediaItem[];
}

export interface CatalogProductsResponse {
    items: CatalogProductItem[];
    next_cursor?: string | null;
    has_more: boolean;
}

export interface ProductQueryParams {
    category_id?: string;
    brand_id?: string;
    collection_id?: string;
    cursor?: string;
    limit?: number;
    search?: string;
}
