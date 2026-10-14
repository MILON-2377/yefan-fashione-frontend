export interface UserProfileAvatarResponse {
    id: string;
    url: string;
    mime_type: string;
    width: number | null;
    height: number | null;
}


export interface UserProfileResponse {
    id: string;
    user_id: string;
    first_name: string | null;
    last_name: string | null;
    display_name: string | null;
    phone: string | null;
    job_title: string | null;
    bio: string | null;
    avatar_media_id: string | null;
    avatar: UserProfileAvatarResponse | null;
}

export interface UpdateUserProfileRequest {
    first_name?: string | null;
    last_name?: string | null;
    display_name?: string | null;
    phone?: string | null;
    job_title?: string | null;
    bio?: string | null;
    avatar_media_id?: string | null;
}

export interface PasswordChangeRequest {
    current_password: string;
    new_password: string;
}

export interface UserSessionResponse {
    id: string;
    ip_address: string | null;
    user_agent: string | null;
    is_current: boolean;
    created_at: string;
    last_active_at: string;
}
