// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//     CreateAdminRequest,
//     UpdateUserRequest,
//     ResetPasswordPayload,
//     UserResponse,
// } from "../types";
// import { ApiError } from "@/lib/errors/ApiError";
// import { createAdmin } from "../api/createAdmin";
// import { updateUser } from "../api/updateUser";
// import { resetPassword } from "../api/resetPassword";
// import { revokeSessions } from "../api/revokeSessions";
// import { deactivateAdmin } from "../api/deactivateAdmin";
// import { adminKeys } from "./keys";
// import { activateAdmin } from "../api/activateAdmin";

// interface UseAdminMutationsCallbacks {
//     onCreateSuccess?: (data: UserResponse) => void;
//     onUpdateSuccess?: (data: UserResponse) => void;
//     onResetPasswordSuccess?: () => void;
//     onActivateSuccess?: (data: UserResponse) => void;
//     onDeactivateSuccess?: (data: UserResponse) => void;
//     onToggleStatusSuccess?: (data: UserResponse) => void;
//     onRevokeSessionsSuccess?: () => void;
// }

// export function useAdminMutations(callbacks?: UseAdminMutationsCallbacks) {
//     const queryClient = useQueryClient();

//     const invalidateAdminsQuery = () => {
//         queryClient.invalidateQueries({ queryKey: adminKeys.users() });
//     };

//     const createAdminMutation = useMutation<
//         UserResponse,
//         ApiError | Error,
//         CreateAdminRequest
//     >({
//         mutationFn: (payload) => createAdmin(payload),
//         onSuccess: (data) => {
//             invalidateAdminsQuery();
//             callbacks?.onCreateSuccess?.(data);
//         },
//     });

//     const updateUserMutation = useMutation<
//         UserResponse,
//         ApiError | Error,
//         { userId: string; payload: UpdateUserRequest }
//     >({
//         mutationFn: ({ userId, payload }) => updateUser(userId, payload),
//         onSuccess: (data) => {
//             invalidateAdminsQuery();
//             callbacks?.onUpdateSuccess?.(data);
//         },
//     });

//     const resetPasswordMutation = useMutation<
//         void,
//         ApiError | null,
//         ResetPasswordPayload
//     >({
//         mutationFn: ({ userId, password }) => resetPassword(userId, { password }),
//         onSuccess: () => {
//             invalidateAdminsQuery();
//             callbacks?.onResetPasswordSuccess?.();
//         },
//     });

//     const deactivateAdminMutation = useMutation<
//         UserResponse,
//         ApiError | Error,
//         { userId: string }
//     >({
//         mutationFn: ({ userId }) => deactivateAdmin(userId),
//         onSuccess: (data) => {
//             invalidateAdminsQuery();
//             callbacks?.onDeactivateSuccess?.(data);
//         },
//     });


//     const activateAdminMutation = useMutation<
//         UserResponse,
//         ApiError | Error,
//         { userId: string }
//     >({
//         mutationFn: ({ userId }) => activateAdmin(userId),
//         onSuccess: (data) => {
//             invalidateAdminsQuery();
//             callbacks?.onActivateSuccess?.(data);
//             callbacks?.onToggleStatusSuccess?.(data);
//         },
//     });

//     const toggleStatusMutation = useMutation<
//         UserResponse,
//         ApiError | Error,
//         UserResponse
//     >({
//         mutationFn: (user) =>
//             updateUser(user.id, {
//                 email: user.email,
//             }),
//         onSuccess: (data) => {
//             invalidateAdminsQuery();
//             callbacks?.onToggleStatusSuccess?.(data);
//         },
//     });

//     const revokeSessionsMutation = useMutation<void, ApiError | null, string>({
//         mutationFn: (userId) => revokeSessions(userId),
//         onSuccess: () => {
//             invalidateAdminsQuery();
//             callbacks?.onRevokeSessionsSuccess?.();
//         },
//     });

//     return {
//         createAdminMutation,
//         updateUserMutation,
//         resetPasswordMutation,
//         deactivateAdminMutation,
//         activateAdminMutation,
//         toggleStatusMutation,
//         revokeSessionsMutation,
//     };
// }



import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    CreateAdminRequest,
    UpdateUserRequest,
    ResetPasswordPayload,
    UserResponse,
} from "../types";
import { ApiError } from "@/lib/errors/ApiError";
import { createAdmin } from "../api/createAdmin";
import { updateUser } from "../api/updateUser";
import { resetPassword } from "../api/resetPassword";
import { revokeSessions } from "../api/revokeSessions";
import { deactivateAdmin } from "../api/deactivateAdmin";
import { adminKeys } from "./keys";
import { activateAdmin } from "../api/activateAdmin";

interface UseAdminMutationsCallbacks {
    onCreateSuccess?: (data: UserResponse) => void;
    onUpdateSuccess?: (data: UserResponse) => void;
    onResetPasswordSuccess?: () => void;
    onActivateSuccess?: (data: UserResponse) => void;
    onDeactivateSuccess?: (data: UserResponse) => void;
    onToggleStatusSuccess?: (data: UserResponse) => void;
    onRevokeSessionsSuccess?: () => void;
}

export function useAdminMutations(callbacks?: UseAdminMutationsCallbacks) {
    const queryClient = useQueryClient();

    const invalidateAdminsQuery = () => {
        queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    };

    const createAdminMutation = useMutation<
        UserResponse,
        ApiError | Error,
        CreateAdminRequest
    >({
        mutationFn: (payload) => createAdmin(payload),
        onSuccess: (data) => {
            invalidateAdminsQuery();
            callbacks?.onCreateSuccess?.(data);
        },
    });

    const updateUserMutation = useMutation<
        UserResponse,
        ApiError | Error,
        { userId: string; payload: UpdateUserRequest }
    >({
        mutationFn: ({ userId, payload }) => updateUser(userId, payload),
        onSuccess: (data) => {
            invalidateAdminsQuery();
            callbacks?.onUpdateSuccess?.(data);
        },
    });

    const resetPasswordMutation = useMutation<
        void,
        ApiError | null,
        ResetPasswordPayload
    >({
        mutationFn: ({ userId, password }) => resetPassword(userId, { password }),
        onSuccess: () => {
            invalidateAdminsQuery();
            callbacks?.onResetPasswordSuccess?.();
        },
    });

    const deactivateAdminMutation = useMutation<
        UserResponse,
        ApiError | Error,
        { userId: string }
    >({
        mutationFn: ({ userId }) => deactivateAdmin(userId),
        onSuccess: (data) => {
            invalidateAdminsQuery();
            callbacks?.onDeactivateSuccess?.(data);
            callbacks?.onToggleStatusSuccess?.(data);
        },
    });

    const activateAdminMutation = useMutation<
        UserResponse,
        ApiError | Error,
        { userId: string }
    >({
        mutationFn: ({ userId }) => activateAdmin(userId),
        onSuccess: (data) => {
            invalidateAdminsQuery();
            callbacks?.onActivateSuccess?.(data);
            callbacks?.onToggleStatusSuccess?.(data);
        },
    });

    const toggleAdminStatusMutation = useMutation<
        UserResponse,
        ApiError | Error,
        UserResponse
    >({
        mutationFn: (user) =>
            user.is_active
                ? deactivateAdmin(user.id)
                : activateAdmin(user.id),
        onSuccess: (data) => {
            invalidateAdminsQuery();
            callbacks?.onToggleStatusSuccess?.(data);
            if (data.is_active) {
                callbacks?.onActivateSuccess?.(data);
            } else {
                callbacks?.onDeactivateSuccess?.(data);
            }
        },
    });

    const revokeSessionsMutation = useMutation<void, ApiError | null, string>({
        mutationFn: (userId) => revokeSessions(userId),
        onSuccess: () => {
            invalidateAdminsQuery();
            callbacks?.onRevokeSessionsSuccess?.();
        },
    });

    return {
        createAdminMutation,
        updateUserMutation,
        resetPasswordMutation,
        deactivateAdminMutation,
        activateAdminMutation,
        toggleAdminStatusMutation,
        revokeSessionsMutation,
    };
}
