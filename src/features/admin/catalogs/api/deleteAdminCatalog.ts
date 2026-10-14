import { adminFetch } from "@/api";


export const deleteCatalog = async (id: string): Promise<void> => {
  return adminFetch(`/catalogs/${id}`, {
    method: "DELETE",
  });
};
