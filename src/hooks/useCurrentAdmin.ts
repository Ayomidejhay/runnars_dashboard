import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";

import {
  fetchCurrentAdmin,
  updateProfile,
  changePassword,
  verifyAccount,
} from "@/services/authService";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

export const useCurrentAdmin = () => {
  return useQuery({
    queryKey: ["current-admin"],
    queryFn: fetchCurrentAdmin,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};



export function useUpdateAdminProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateProfile(formData),

    onSuccess: (data) => {
      // Force refetch of the admin profile everywhere it is used
      queryClient.invalidateQueries({
        queryKey: ["current-admin"],
      });
      toast.success("Profile updated successfully");
    },

    onError: (error) => {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile");
    },
  });
}

interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const useChangePassword = (): UseMutationResult<
  any, // response type
  any, // error type
  ChangePasswordPayload, // variables
  unknown // context type
> => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),

    onSuccess: () => {
      toast.success("Password changed successfully");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to change password"
      );
    },
  });
};

// export const useVerifyAccount = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const submitOtp = async (payload: {
//     otp: string;
//     adminId: string | null;
//   }) => {
//     if (!payload.adminId) {
//       setError("Verification session expired. Please log in again.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await verifyAccount({
//         otp: payload.otp,
//         adminId: payload.adminId,
//       });

//       /**
//        * ✅ Verification complete → back to login
//        */
//       router.replace("/login");
//     } catch (err: any) {
//       setError(err.message || "Invalid verification code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { submitOtp, loading, error };
// };



type VerifyPayload = {
  email: string;
  code: string;
  newPassword: string;
};

type VerifyResponse = {
  success: boolean;
  message: string;
};

export const useVerifyAccount = () => {
  const router = useRouter();

  const mutation = useMutation<VerifyResponse, any, VerifyPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post<VerifyResponse>(
        "/api/admin/auth/verify",
        payload
      );
      return data;
    },

    onSuccess: () => {
      router.replace("/login");
    },

    onError: (error) => {
      console.error(
        error?.response?.data?.message || "Verification failed"
      );
    },
  });

  return {
    submitOtp: mutation.mutate,
    loading: mutation.isPending,
    error: errorMessage(mutation.error),
  };
};

/**
 * Normalizes backend error message safely
 */
function errorMessage(error: any): string | null {
  return error?.response?.data?.message ?? null;
}


export const useLogoutAdmin = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await api.post("/api/admin/logout");
      Cookies.remove("admin_token", { path: "/" });
      localStorage.removeItem("admin_token");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      Cookies.remove("admin_token", { path: "/" });
      localStorage.removeItem("admin_token");
      router.push("/login");
    }
  };

  return logout;
};
