export interface LoginCredentials {
    email: string;
    password: string;
    device_name: string;
}

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    role?: string;
    [key: string]: unknown;
}

export interface AuthResponse {
    user: UserProfile;
    message?: string;
    token?: string;
}

export enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
}

export interface CurrentUser {
    id: string;
    email: string;
    role: UserRole;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}



export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface CurrentUser {
    id: string;
    email: string;
    displayName?: string | null;
    role: UserRole;
}

export interface AuthContextValue {
    user: CurrentUser | null;
    status: AuthStatus;
    isLoading: boolean;
    isAuthenticated: boolean;
    refreshUser: () => Promise<void>;
    clearUser: () => void;
}
