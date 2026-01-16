// services/challenge.service.ts
import api from "@/lib/api";

export const createChallenge = async (payload: any) => {
  const { data } = await api.post(
    "/api/admin/challenges",
    payload
  );
  return data;
};
