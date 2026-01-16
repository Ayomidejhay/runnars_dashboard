import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllAdmins, getPendingAdmins, inviteAdmin, resendInvite, deleteAdmin } from "@/services/adminService";


interface UseAdminsParams {
  page: number;
  limit: number;
  search?: string;
}

// Active Admins Hook
export const useAdmins = ({ page, limit, search }: UseAdminsParams) => {
  return useQuery({
    queryKey: ["admins", page, limit, search],
    queryFn: () => getAllAdmins({ page, limit, search }),

    
    placeholderData: (previousData) => previousData,
  });
};


// Pending Admins Hook
export const usePendingAdmins = ({ page, limit }: { page: number; limit: number }) => {
  return useQuery({
    queryKey: ["pending-admins", page, limit],
    queryFn: () => getPendingAdmins({ page, limit }),

    placeholderData: (previousData) => previousData,
  });
}


// Invite Admin Hook
export function useInviteAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inviteAdmin,
    onSuccess: () => {
      // Refresh admins list
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
}

export function useResendInvite() {
  return useMutation({
    mutationFn: resendInvite,
  });
}


export function useDeleteAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
}