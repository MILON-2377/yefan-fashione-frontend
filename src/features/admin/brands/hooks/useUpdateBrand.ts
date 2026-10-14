import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBrand } from "../api/updateBrand";
import { BrandFormValues } from "../schemas/brandSchema";
import { BRANDS_QUERY_KEY } from "./useBrands";
import { toast } from "@/features/common/ui/toast/toastStore";

export function useUpdateBrand(brandId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: Partial<BrandFormValues>) =>
            updateBrand(brandId, payload),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: BRANDS_QUERY_KEY });
            toast.success("Brand Updated", "Changes to brand identity saved successfully.");
        },
    });
}
