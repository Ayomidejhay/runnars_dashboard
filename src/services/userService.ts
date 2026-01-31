import api from "@/lib/api";

// export interface GetChallengesParams {
//   page: number;
//   limit: number;
//   search?: string;
//   status?: string;
//   type?: string;
//   challengeCategory?: "featured" | "community";
//   startDate?: string;
//   endDate?: string;
// }

// export const getAllChallenges = async ({
//   page,
//   limit,
//   search,
//   status,
//   type,
//   challengeCategory,
//   startDate,
//   endDate
// }: GetChallengesParams) => {
//   const response = await api.get("/api/admin/challenges", {
//     params: { page, limit, search, status, type, challengeCategory, startDate, endDate },
//   });

//   return response.data;
// };
export interface GetUsersParams {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
}

export const getAllUsers = async ({ page, limit, search, status, startDate, endDate }: GetUsersParams) => {
    const response = await api.get("/api/admin/users", {
        params: { page, limit, search, status, startDate, endDate },
    });
    return response.data;
};

export const getUserById = async (id: string) => {
  const { data } = await api.get(`/api/admin/users/${id}`);
  return data;
};

