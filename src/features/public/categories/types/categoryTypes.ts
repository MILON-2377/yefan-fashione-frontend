export interface CategoryImage {
    id: string;
    url: string;
}

export interface PublicCategoryItem {
    id: string;
    name: string;
    slug: string;
    image?: CategoryImage | null;
}

export interface PublicCategoriesResponse {
    items: PublicCategoryItem[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
}
