import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChallenge, getAllChallenges, getChallengeById, GetChallengesParams } from "@/services/challengeService";
import toast from "react-hot-toast";
import api from "@/lib/api";


// All Challenges Hook
export const useAllChallenges = (params: GetChallengesParams) => {
  return useQuery({
    queryKey: ["challenges", params],
    queryFn: () => getAllChallenges(params),

    placeholderData: (previousData) => previousData,
  });
}

// export const useChallenge = (id: string) => {
//   return useQuery({
//     queryKey: ["challenge", id],
//     queryFn: () => getChallengeById(id),
//     enabled: !!id,
//   });
// };

export const useChallenge = (id: string) => {
  return useQuery({
    queryKey: ["challenge", id],
    queryFn: async () => {
      const res = await api.get(`/api/admin/challenges/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export function useDeleteChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      toast.success("Challenge deleted successfully");
    },
  });
}