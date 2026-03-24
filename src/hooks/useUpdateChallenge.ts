"use client";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "@/lib/api";

interface UpdateChallengeArgs {
  id: string;
   data: FormData;
}
``


export const useUpdateChallenge = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: FormData;
    }) => {
      return api.put(`/api/admin/challenges/${id}`, data);
    },
  });
};
