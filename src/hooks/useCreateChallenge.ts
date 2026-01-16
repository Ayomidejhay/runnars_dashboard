// hooks/useCreateChallenge.ts
import { useMutation } from "@tanstack/react-query";
import { createChallenge } from "@/services/challengeService";


import api from "@/lib/api";

export const useCreateChallenge = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post("/api/admin/challenge", payload);
      return data;
    },
  });
};
