import api from "@/lib/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Admin {
  id: string;
  fullName: string;
  email: string;
  role: string;
  permissions: Record<string, boolean>;
  profilePicture: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    admin: Admin;
}

export const loginAdmin = async (data: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post("/api/admin/auth/login", data);
  return res.data;
};

export const login = (data: LoginPayload): Promise<{ token: string }> =>
  api.post("/auth/auth/login", data).then((res) => res.data);

export const fetchCurrentAdmin = (): Promise<Admin> =>
  api.get("/admin/current").then((res) => res.data);

export const updateProfile = (data: Partial<Admin>): Promise<Admin> =>
  api.put("/admin/profile", data).then((res) => res.data);

export const changePassword = (data: { oldPassword: string; newPassword: string }) =>
  api.put("/admin/change-password", data).then((res) => res.data);
