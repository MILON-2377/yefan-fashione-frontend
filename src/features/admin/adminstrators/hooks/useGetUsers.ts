import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/getUsers";
import { ListAdminsParams, UserListResponse } from "../types";
import { ApiError } from "@/lib/errors/ApiError";
import { adminKeys } from "./keys";

export function useGetUsers(params?: ListAdminsParams) {
    return useQuery<UserListResponse, ApiError>({
        queryKey: adminKeys.userList(params),
        queryFn: () => getUsers(params),
    });
}
