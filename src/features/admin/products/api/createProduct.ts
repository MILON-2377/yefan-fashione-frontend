import { adminFetch } from "@/api";
import { CreateProductInput } from "../schemas/product";
import { ProductResponse } from "../types";

export async function createProduct(payload: CreateProductInput): Promise<ProductResponse> {
  return adminFetch<ProductResponse>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
