"use client";

import { useState, useCallback } from "react";
import { createCategory } from "../api/createCategory";
import { Category, CreateCategoryRequest } from "../types";
import { ApiError } from "@/lib/errors/ApiError";

export function useCreateCategory() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = useCallback(
    async (payload: CreateCategoryRequest): Promise<Category | null> => {
      setIsPending(true);
      setError(null);

      try {
        const data = await createCategory(payload);
        return data;
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred while creating the category.");
        }
        return null;
      } finally {
        setIsPending(false);
      }
    },
    []
  );

  return {
    createCategory: handleCreate,
    isPending,
    error,
    clearError: () => setError(null),
  };
}
