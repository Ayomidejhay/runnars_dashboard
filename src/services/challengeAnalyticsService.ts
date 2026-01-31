import api from "@/lib/api";





export const getChallengeById = async (id: string) => {
  const { data } = await api.get(`/api/admin/challenges/${id}`);
  return data;
};


export const getChallengeAnalytics = async (id: string, interval: string) => {
  const { data } = await api.get(
    `/api/admin/challenges/${id}/analytics`, {
        params: {interval},
    });
    return data;
};
