import api from "@/lib/api";
import { getAllPets, GetPetsParams } from "@/services/petService";
import { useQuery } from "@tanstack/react-query";
import { fetchPetChallenges } from "@/services/petService";

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

// export const useChallenges = (petId: string) => {
//   return useQuery({
//     queryKey: ["challenges", petId],
//     queryFn: () => fetchPetChallenges(petId),
//     enabled: !!petId, // prevents call when undefined
//   });
// };



export const useChallenges = (petId: string) => {
  return useQuery({
    queryKey: ["challenges", petId],
    queryFn: () => fetchPetChallenges(petId),
    enabled: !!petId,

    // 🔑 Important settings
    staleTime: 0, // always stale → forces refetch
    refetchOnMount: true,
    refetchOnWindowFocus: false,

    // optional but useful for UX
    retry: 1,
  });
};