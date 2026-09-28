import { categoryService } from "@/api/service/category.service";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => categoryService.getCategories(),
        staleTime: 1000 * 60 * 15, // 15 minutes cache window
    });
}