// /hooks/useChallengeAnalytics.ts
import { useQuery } from "@tanstack/react-query";
import { getChallengeAnalytics, getChallengeOverview } from "@/services/challengeAnalyticsService";

export const useChallengeAnalytics = (
  id: string,
  interval: "hourly" | "daily"
) => {
    return useQuery({
        queryKey: ["challenge-analytics", id, interval],
        queryFn: () => getChallengeAnalytics(id, interval),
        enabled: !!id,
    });
};

export const useChallengeOverview = (
  id: string,
//   interval: "hourly" | "daily"
) => {
    return useQuery({
        queryKey: ["challenge-overview", id],
        queryFn: () => getChallengeOverview(id),
        enabled: !!id,
    });
};


// export const useChallenge = (id: string) => {
//   return useQuery({
//     queryKey: ["challenge", id],
//     queryFn: async () => {
//       const res = await api.get(`/api/admin/challenges/${id}`);
//       return res.data;
//     },
//     enabled: !!id,
//   });
// };