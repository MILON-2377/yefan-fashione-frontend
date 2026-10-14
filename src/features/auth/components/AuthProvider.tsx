"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";


import {
  AuthContextValue,
  AuthStatus,
  CurrentUser,
} from "@/features/auth/types";
import { authBootstrap, fetchCurrentUser } from "../api/authApi";


const AuthContext =
  createContext<AuthContextValue | undefined>(undefined);


interface AuthProviderProps {
  children: React.ReactNode;
}

let authInitializationPromise: Promise<CurrentUser | null> | null = null;


function initializeAuthOnce():
  Promise<CurrentUser | null> {

  if (!authInitializationPromise) {

    console.log(
      "CREATING AUTH INITIALIZATION PROMISE"
    );

    authInitializationPromise =
      authBootstrap();

  } else {

    console.log(
      "USING EXISTING AUTH INITIALIZATION PROMISE"
    );

  }

  return authInitializationPromise;
}


export function AuthProvider({
  children,
}: AuthProviderProps) {


  const router = useRouter();


  const [
    user,
    setUser,
  ] = useState<CurrentUser | null>(null);


  const [
    status,
    setStatus,
  ] = useState<AuthStatus>("loading");



  const refreshUser =
    useCallback(
      async (): Promise<void> => {

        try {

          const currentUser =
            await fetchCurrentUser();


          setUser(currentUser);

          setStatus(
            "authenticated"
          );


        } catch {


          setUser(null);

          setStatus(
            "unauthenticated"
          );


          router.push(
            "/login"
          );

        }

      },
      [
        router,
      ]
    );



  const clearUser =
    useCallback(
      (): void => {

        setUser(null);

        setStatus(
          "unauthenticated"
        );

      },
      []
    );



  useEffect(
    () => {

      let mounted = true;


      async function initializeAuth() {


        const currentUser =
          await initializeAuthOnce();



        if (!mounted) return;



        if (currentUser) {


          setUser(
            currentUser
          );


          setStatus(
            "authenticated"
          );


        } else {


          setUser(null);


          setStatus(
            "unauthenticated"
          );


          router.push(
            "/login"
          );

        }

      }



      void initializeAuth();



      return () => {

        mounted = false;

      };


    },
    [
      router,
    ]
  );



  useEffect(
    () => {


      const handleSessionExpired =
        () => {

          clearUser();

          router.push(
            "/login"
          );

        };



      window.addEventListener(
        "auth:session-expired",
        handleSessionExpired
      );



      return () => {

        window.removeEventListener(
          "auth:session-expired",
          handleSessionExpired
        );

      };


    },
    [
      clearUser,
      router,
    ]
  );



  const value =
    useMemo<AuthContextValue>(
      () => ({

        user,

        status,

        isLoading:
          status === "loading",

        isAuthenticated:
          status === "authenticated",

        refreshUser,

        clearUser,

      }),
      [
        user,
        status,
        refreshUser,
        clearUser,
      ]
    );



  return (

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>

  );

}



export function useAuth(): AuthContextValue {


  const context =
    useContext(
      AuthContext
    );



  if (!context) {

    throw new Error(
      "useAuth must be used within AuthProvider"
    );

  }



  return context;

}
