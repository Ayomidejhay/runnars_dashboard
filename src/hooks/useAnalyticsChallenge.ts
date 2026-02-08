// /hooks/useChallengeAnalytics.ts
import { useQuery } from "@tanstack/react-query";
import { getChallengeAnalytics, getChallengeOverview, getChallengePost, GetChallengePostParams, getChallengePosts } from "@/services/challengeAnalyticsService";

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


export const useChallengePosts = (
  id: string,
  params: GetChallengePostParams
) => {
  return useQuery({
    queryKey: ["challenge-posts", id, JSON.stringify(params)],
    queryFn: () => getChallengePost(id, params),
    enabled: !!id, // avoid firing when id is undefined
    
  });
};


export const useChallengePost = (
  challengeId: string,
  
) => {
  return useQuery({
    queryKey: ["challenge-posts", challengeId],
    queryFn: () => getChallengePosts(challengeId),
    enabled: !!challengeId, // avoid firing when id is undefined
    
  });
};