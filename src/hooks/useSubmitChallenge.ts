


"use client";

import { useRouter } from "next/navigation";
import { useCreateChallenge } from "@/hooks/useCreateChallenge";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
import {
  mapBasicInfo,
  mapGoalsAndMetrics,
  mapSchedule,
  mapRewards,
} from "@/lib/mappers";
import toast from "react-hot-toast";

export const useSubmitChallenge = () => {
  const router = useRouter();

  const {
    basicInfo,
    goalsAndMetrics,
    schedule,
    rewards,
    reset,
  } = useChallengeBuilderStore();

  const mutation = useCreateChallenge();

  const submit = async () => {
    if (mutation.isPending) return; // 🔒 hard guard

    const toastId = toast.loading("Creating challenge...");

    try {
      const formData = new FormData();

      const mappedBasicInfo = mapBasicInfo(basicInfo);
      const mappedGoals = mapGoalsAndMetrics(goalsAndMetrics);
      const mappedSchedule = mapSchedule(schedule);
      const mappedRewards = mapRewards(rewards);

      // Debug
    for (const [key, value] of formData.entries()) {
     console.log(key, value);
    }

      // Files
      if (basicInfo.coverImage instanceof File) {
        formData.append("coverImage", basicInfo.coverImage);
      }
      if (rewards.rewardFile instanceof File) {
        formData.append("badgeImage", rewards.rewardFile);
      }

      // Data
      formData.append("basicInfo", JSON.stringify(mappedBasicInfo));
      formData.append("goalsAndMetrics", JSON.stringify(mappedGoals));
      formData.append("scheduleAndDuration", JSON.stringify(mappedSchedule));
      formData.append("rewards", JSON.stringify(mappedRewards));

      await mutation.mutateAsync(formData);

      toast.success("Challenge created successfully!", { id: toastId });

      reset();
      router.push("/challenges");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create challenge.",
        { id: toastId }
      );
    }
  };

  return {
    submit,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
