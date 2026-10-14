import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { createAdmin } from "../api/createAdmin";
import { CreateAdminRequest, UserResponse } from "../types";
import { ApiError } from "@/lib/errors/ApiError";
import { adminKeys } from "./keys";

interface UseCreateAdminOptions {
    onSuccess?: (data: UserResponse) => void;
    onError?: (error: ApiError) => void;
}

export function useCreateAdmin(
    options?: UseCreateAdminOptions
): UseMutationResult<UserResponse, ApiError, CreateAdminRequest> {
    const queryClient = useQueryClient();

    return useMutation<UserResponse, ApiError, CreateAdminRequest>({
        mutationFn: (data: CreateAdminRequest) => createAdmin(data),
        onSuccess: (data) => {
            // Invalidate all admin user queries using key factory
            queryClient.invalidateQueries({ queryKey: adminKeys.users() });

            options?.onSuccess?.(data);
        },
        onError: (error) => {
            options?.onError?.(error);
        },
    });
}
