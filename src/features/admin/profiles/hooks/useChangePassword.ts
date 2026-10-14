import { useMutation } from "@tanstack/react-query";
import { changeMyPassword } from "../api/changeMyPassword";
import { PasswordChangeRequest } from "../types";

export function useChangePassword() {
  return useMutation<{ message: string }, Error, PasswordChangeRequest>({
    mutationFn: (payload: PasswordChangeRequest) => changeMyPassword(payload),
  });
}
