// src/features/catalog/brands/hooks/useCreateBrand.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createBrand } from '../api/createBrand';
import { BrandFormValues } from '../schemas/brandSchema';
import { toast } from '@/features/common/ui/toast/toastStore';

export function useCreateBrand() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (data: BrandFormValues) => createBrand(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });

            toast.success("Brand Created", "New brand record draft saved successfully.");
            router.push('/admin/catalog/brands');
            router.refresh();
        },
        onError: (error: Error) => {
            console.error('Error creating brand:', error.message);
        },
    });
}
