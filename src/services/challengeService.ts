// services/challenge.service.ts
import api from "@/lib/api";





export interface CreateChallengePayload {
  basicInfo: any;
  goalsAndMetrics: any;
  scheduleAndDuration: any;
  rewards: any;
}

// export const createChallengeService = async (
//   payload: CreateChallengePayload
// ) => {
//   const { data } = await api.post(
//     "/api/admin/challenges",
//     payload
//   );

//   return data;
// };
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



