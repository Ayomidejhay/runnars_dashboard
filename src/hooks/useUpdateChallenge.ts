"use client";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "@/lib/api";

interface UpdateChallengeArgs {
  id: string;
   data: Record<string, any>;
}

// export const useUpdateChallenge = () =>
//   useMutation<void, any, UpdateChallengeArgs>({
//     mutationFn: async ({ id, data }) => {
//       const res = await fetch(`/api/admin/challenges/${id}`, {
//         method: "PUT",
//         body: data,
//       });
//       if (!res.ok) throw new Error("Failed to update challenge");
//       return;
//     },
//   });

// export const useUpdateChallenge = () =>
//   useMutation<void, any, UpdateChallengeArgs>({
    
//     mutationFn: async ({ id, data }) => {
//       await api.put(`/api/admin/challenges/${id}`, data);
//     },
//   });
export const useUpdateChallenge = () =>
  useMutation<void, any, UpdateChallengeArgs>({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`/api/admin/challenges/${id}`, data);
      if (!res.data) throw new Error("Failed to update challenge");
    },
  });
