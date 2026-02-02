import api from "@/lib/api";
import { getAllPets, GetPetsParams } from "@/services/petService";
import { useQuery } from "@tanstack/react-query";

export const useAllPets = (params: GetPetsParams) => {
    return useQuery({
        queryKey: ["pets", params],
        queryFn: () => getAllPets(params),
        placeholderData: (previousData) => previousData,
    });
}

export const usePet = (id: string) => {
  return useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const res = await api.get(`/api/admin/pets/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};