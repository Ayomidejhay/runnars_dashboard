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

export const getChallengeOverview = async (id: string) => {
  const { data } = await api.get(
    `/api/admin/challenges/${id}/analytics`, {
        params: {},
    });
    return data;
};

export interface GetChallengePostParams {
  page?: number;
  limit?: number;
  // search?: string;
  // status?: string;
  type?: string;
  // category?: "featured" | "community";
  // startDate?: string;
  // endDate?: string;
  hasHastags?: boolean 
}
export const getChallengePost = async (id: string, {page,limit,type,hasHastags}: GetChallengePostParams) => {
  const { data } = await api.get(
    `/api/admin/challenges/${id}/posts`, {
        params: {page, limit, type, hasHastags},
    });
    return data;
};

// export const getChallengePost = async (challengeId: string,{page, limit, type, hasHastags}:GetChallengePostParams) => {
//   const {data} = await api.get(`/api/admin/challenges/${challengeId}/posts`, {
//     params: {page, limit, type, hasHastags},
//   })
//   return data;
// }
export const getChallengePosts = async (challengeId: string) => {
  const {data} = await api.get(`/api/admin/challenges/${challengeId}/posts`, {
    params: {},
  })
  return data;
}
