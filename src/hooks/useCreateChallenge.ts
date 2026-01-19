import { useMutation } from "@tanstack/react-query";
import { createChallengeService } from "@/services/challengeService";

export const useCreateChallenge = () => {
  return useMutation({
    mutationFn: createChallengeService,
  });
};
