import api from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface FetchUsersParams {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  role?: string;
}

export const fetchUsers = (params: FetchUsersParams = {}): Promise<User[]> =>
  api.get("/users", { params }).then((res) => res.data);

export const fetchUser = (id: string): Promise<User> =>
  api.get(`/users/${id}`).then((res) => res.data);

export const updateUser = (id: string, data: UpdateUserPayload): Promise<User> =>
  api.put(`/users/${id}`, data).then((res) => res.data);
