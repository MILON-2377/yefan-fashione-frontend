"use client";

import { useState, useCallback } from "react";
import { updateCategory } from "../api/updateCategory";
import { Category, UpdateCategoryRequest } from "../types";
import { ApiError } from "@/lib/errors/ApiError";

export function useUpdateCategory() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = useCallback(
    async (
      id: string,
      payload: UpdateCategoryRequest
    ): Promise<Category | null> => {
      setIsPending(true);
      setError(null);

      try {
        const data = await updateCategory(id, payload);
        return data;
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred while updating the category.");
        }
        return null;
      } finally {
        setIsPending(false);
      }
    },
    []
  );

  return {
    updateCategory: handleUpdate,
    isPending,
    error,
    clearError: () => setError(null),
  };
}
