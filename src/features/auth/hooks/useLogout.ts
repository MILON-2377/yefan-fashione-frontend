
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logoutUser } from "../api/logout";
import { useAuth } from "../components/AuthProvider";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { clearUser } = useAuth();

  return useMutation({
    mutationFn: logoutUser,

    onSettled: () => {
      clearUser();
      queryClient.clear();
      router.replace("/login");
      router.refresh();
    },
  });
}
