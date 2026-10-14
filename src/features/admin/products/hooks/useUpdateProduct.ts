import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminProductKeys } from "./keys";
import { updateProduct } from "../api/updateProduct";
import { UpdateProductPayload } from "../types/product.edit";



export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductPayload) => updateProduct(id, data),
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({
        queryKey: adminProductKeys.all,
      });
      queryClient.setQueryData(adminProductKeys.detail(id), updatedProduct);
    },
  });
}
