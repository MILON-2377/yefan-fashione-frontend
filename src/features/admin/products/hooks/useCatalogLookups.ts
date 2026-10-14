import { useCategories } from "@/features/admin/categories/hooks/useCategories";
import { useBrands } from "@/features/admin/brands/hooks/useBrands";
import { useCollections } from "@/features/admin/collections/hooks/useCollections";

/**
 * Custom hook fetching all filter lookup options (Categories, Brands, Collections)
 * concurrently using dedicated query hooks.
 */
export function useCatalogLookups() {
    const categoriesQuery = useCategories({
        status: "PUBLISHED",
        skip: 0,
        limit: 100,
    });

    const brandsQuery = useBrands({
        status: "PUBLISHED",
        page: 1,
        page_size: 100,
    });

    const collectionsQuery = useCollections({
        status: "PUBLISHED",
        page: 1,
        page_size: 100,
    });

    return {
        categories: categoriesQuery.data?.items || [],
        brands: brandsQuery.data?.items || [],
        collections: collectionsQuery.data?.items || [],
        isLoading:
            categoriesQuery.isLoading ||
            brandsQuery.isLoading ||
            collectionsQuery.isLoading,
        isError:
            categoriesQuery.isError ||
            brandsQuery.isError ||
            collectionsQuery.isError,
    };
}
