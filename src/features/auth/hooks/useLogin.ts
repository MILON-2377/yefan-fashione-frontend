import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/login";
import { LoginCredentials } from "../types";
import { ApiError } from "@/lib/errors/ApiError";

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation<void, ApiError, LoginCredentials>({
        mutationFn: (credentials: LoginCredentials) => login(credentials),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authenticated-user"] });
        },
    });
}
