// services/challenge.service.ts
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


export interface CreateChallengePayload {
  basicInfo: any;
  goalsAndMetrics: any;
  scheduleAndDuration: any;
  rewards: any;
}


export const createChallengeService = async (payload: FormData) => {
  const { data } = await api.post(
    "/api/admin/challenges",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// export interface GetChallengesParams {
//   currentPage: number;
//   totalPages: number;
//   totalCount: number;

//   limit: number;
//   search?: string;
//   startDate?: string;
//   endDate?: string;
//   challengeCategory?: string;
//   type?: string;
//   status?: string;
// }

export interface GetChallengesParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  type?: string;
  category?: "featured" | "community";
  startDate?: string;
  endDate?: string;
}

export const getAllChallenges = async ({
  page,
  limit,
  search,
  status,
  type,
  category,
  startDate,
  endDate
}: GetChallengesParams) => {
  const response = await api.get("/api/admin/challenges", {
    params: { page, limit, search, status, type, category, startDate, endDate },
  });

  return response.data;
};


export const getChallengeById = async (id: string) => {
  const { data } = await api.get(`/api/admin/challenges/${id}`);
  return data;
};






export async function deleteChallenge(challengeId: string) {
  const { data } = await api.delete(`/api/admin/challenges/${challengeId}`);
  return data;
}
