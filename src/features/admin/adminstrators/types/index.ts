export type UserRole = "SUPER_ADMIN" | "ADMIN";

export interface UserResponse {
    id: string;
    email: string;
    role: UserRole | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface UserListResponse {
    items: UserResponse[];
    page: number;
    page_size: number;
    total: number;
}

export interface ListAdminsParams {
    page?: number;
    page_size?: number;
    search?: string;
    role?: UserRole;
    is_active?: boolean;
}

export interface CreateAdminRequest {
    email: string;
    password: string;
}

export interface UpdateUserRequest {
    email: string;
}

export interface ResetPasswordRequest {
    password?: string;
}



// Payload for resetting a user's password
export interface ResetPasswordPayload {
    userId: string;
    password?: string;
}

// Payload for updating user details
export interface UpdateUserPayload {
    email?: string;
    role?: UserRole;
    is_active?: boolean;
}

// Payload for creating a new admin
export interface CreateAdminPayload {
    email: string;
    role: UserRole;
    is_active?: boolean;
}

// List parameters for pagination/filtering
export interface ListAdminsParams {
    page?: number;
    page_size?: number;
    search?: string;
    role?: UserRole;
    is_active?: boolean;
}

// Paginated API response structure
export interface PaginatedUsersResponse {
    items: UserResponse[];
    total: number;
    page: number;
    page_size: number;
}
