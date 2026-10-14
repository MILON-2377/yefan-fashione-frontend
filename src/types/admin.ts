type UserRole = "SUPER_ADMIN" | "ADMIN";

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
}

export interface NavItem {
    label: string;
    href: string;
    iconName: string;
    badgeCount?: number;
    allowedRoles?: UserRole[];
}
