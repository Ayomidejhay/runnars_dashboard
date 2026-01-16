import api from "@/lib/api";


// Get All Admins
export interface GetAdminsParams {
  page: number;
  limit: number;
  search?: string;
}
export const getAllAdmins = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  const response = await api.get("api/admin/all", {
    params: { page, limit, search },
  });
  return response.data;
};


// Get Pending Admins
export const getPendingAdmins = async ({
    page,
    limit,
}: {
    page: number;
    limit: number;
}) => {
    const response = await api.get("api/admin/pending", {
        params: { page, limit },
    });
    return response.data;
}


// Invite Admin
export interface InviteAdminPayload {
  fullName: string;
  email: string;
  role: string;
}
export interface InviteAdminResponse {
  success: boolean;
  message: string;
  admin: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    permissions: Record<string, boolean>;
    isPending: boolean;
  };
  tempPassword: string;
}

export async function inviteAdmin(
  payload: InviteAdminPayload
): Promise<InviteAdminResponse> {
  const { data } = await api.post("/api/admin/invite", payload);
  return data;
}

export async function resendInvite(adminId: string) {
  const { data } = await api.post(`/api/admin/invite/${adminId}/resend`);
  return data;
}



export async function deleteAdmin(adminId: string) {
  const { data } = await api.delete(`/api/admin/admin/${adminId}`);
  return data;
}
