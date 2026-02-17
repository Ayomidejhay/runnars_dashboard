import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


export function useFlagPost() {
  return useMutation({
    mutationFn: async (postId: string) => {
      return api.put(`/api/admin/challenges/${postId}/hide`);
    },
    onSuccess: () => {
      toast.success("Post reported");
    },
    onError: () => {
      toast.error("Failed to report post");
    },
  });
}
