import { adminFetch } from "@/api";
import { Product } from "../types";

/**
 * Retrieves a single product by its unique ID.
 */
export async function getProduct(product_id: string): Promise<Product> {
  if (!product_id) {
    throw new Error("Product ID is required.");
  }

  return adminFetch<Product>(`/products/${product_id}`, {
    method: "GET",
  });
}