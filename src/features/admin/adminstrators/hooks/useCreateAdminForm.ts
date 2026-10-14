import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAdminSchema, CreateAdminFormValues } from "../schemas/adminSchema";
import { useCreateAdmin } from "./useCreateAdmin";
import { ApiError } from "@/lib/errors/ApiError";

export function useCreateAdminForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm<CreateAdminFormValues>({
        resolver: zodResolver(createAdminSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const {
        mutate: createAdmin,
        isPending,
        error: serverError,
    } = useCreateAdmin({
        onSuccess: () => {
            router.push("/admin/administrators");
        },
        onError: (err: ApiError | Error) => {
            if (!(err instanceof ApiError) || !err.data) return;

            const { data } = err;

            // 1. Handle FastAPI / Pydantic validation error array: detail: [{ loc: ["body", "email"], msg: "..." }]
            if (Array.isArray(data.detail)) {
                data.detail.forEach((detailErr) => {
                    const field = detailErr.loc?.find(
                        (loc): loc is keyof CreateAdminFormValues => loc === "email" || loc === "password"
                    );

                    if (field && detailErr.msg) {
                        setError(field, {
                            type: "server",
                            message: detailErr.msg,
                        });
                    }
                });
                return;
            }

            // 2. Handle nested validation maps: errors: { email: ["Invalid email"] }
            if (data.errors && typeof data.errors === "object") {
                Object.entries(data.errors).forEach(([key, val]) => {
                    if (key === "email" || key === "password") {
                        const message = Array.isArray(val) ? val[0] : val;
                        if (message) {
                            setError(key as keyof CreateAdminFormValues, {
                                type: "server",
                                message,
                            });
                        }
                    }
                });
            }
        },
    });

    const onSubmit = (data: CreateAdminFormValues) => {
        createAdmin(data);
    };

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isValid,
        showPassword,
        toggleShowPassword,
        isPending,
        serverError: serverError as ApiError | null,
        handleCancel: () => router.back(),
    };
}
