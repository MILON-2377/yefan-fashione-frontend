import { useQuery } from "@tanstack/react-query";
import { getCollection } from "../api/getCollection";

export function useCollection(id: string) {
    return useQuery({
        queryKey: ["collections", id],
        queryFn: () => getCollection(id),
        enabled: Boolean(id),
    });
}
