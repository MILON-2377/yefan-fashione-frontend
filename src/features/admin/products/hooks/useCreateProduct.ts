import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/createProduct";
import { CreateProductInput } from "../schemas/product";
import { ProductResponse } from "../types";
import { ApiError } from "@/lib/errors/ApiError";
import { adminProductKeys } from "./keys";

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation<ProductResponse, ApiError, CreateProductInput>({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
        },
        onError: (error) => {
            console.log("product creation error: ", error)
        }
    });
}
