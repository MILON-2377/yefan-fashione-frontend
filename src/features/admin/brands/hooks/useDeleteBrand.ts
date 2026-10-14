import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBrand } from '../api/deleteBrand';
import { BRANDS_QUERY_KEY } from './useBrands';
import { toast } from '@/features/common/ui/toast/toastStore';
import { ApiError } from '@/lib/errors/ApiError';

export function useDeleteBrand(options?: { onSuccess?: () => void }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (brandId: string) => deleteBrand(brandId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: BRANDS_QUERY_KEY, exact: false });
            toast.success("Brand Deleted", "The brand record has been removed from catalog.");
            options?.onSuccess?.();
        },
        onError: (error: ApiError) => {
            if (error.status === 409) {
                toast.error(
                    "Cannot Delete Brand",
                    "This brand has associated collections or products that must be removed first."
                );
                return;
            }

            if (error.status === 404) {
                toast.error("Not Found", "The requested brand record does not exist.");
                return;
            }

            toast.error("Action Failed", error.message || "Failed to delete brand.");
        },
    });
}
