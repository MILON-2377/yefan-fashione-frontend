"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { usePathname, useRouter } from "next/navigation";

import {
  AuthContextValue,
  AuthStatus,
  CurrentUser,
} from "@/features/auth/types";

import { authBootstrap, fetchCurrentUser } from "../api/authApi";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<CurrentUser | null>(null);

  const [status, setStatus] = useState<AuthStatus>("loading");

  // Initialize the session when the provider mounts.
  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        const currentUser = await authBootstrap();

        if (!mounted) return;

        setUser(currentUser);
        setStatus(currentUser ? "authenticated" : "unauthenticated");
      } catch (error) {
        if (!mounted) return;

        setUser(null);
        setStatus("unauthenticated");
      }
    }

    void initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // Keep authenticated users away from the login page.
  useEffect(() => {
    if (status === "authenticated" && pathname === "/login") {
      router.replace("/admin");
    }
  }, [status, pathname, router]);

  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      const currentUser = await fetchCurrentUser();

      setUser(currentUser);
      setStatus("authenticated");
    } catch (error) {
      throw error;
    }
  }, []);

  const clearUser = useCallback((): void => {
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  // Handle a confirmed session-expiration event.
  useEffect(() => {
    const handleSessionExpired = () => {
      clearUser();

      if (pathname.startsWith("/admin")) {
        router.replace("/login");
      }
    };

    window.addEventListener("auth:session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("auth:session-expired", handleSessionExpired);
    };
  }, [clearUser, pathname, router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      isLoading: status === "loading",
      isAuthenticated: status === "authenticated",
      refreshUser,
      clearUser,
    }),
    [user, status, refreshUser, clearUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
