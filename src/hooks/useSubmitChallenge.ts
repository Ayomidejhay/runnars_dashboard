


"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
import { useCreateChallenge } from "@/hooks/useCreateChallenge";
import { useUpdateChallenge } from "./useUpdateChallenge";
import {
  mapBasicInfo,
  mapGoalsAndMetrics,
  mapSchedule,
  mapRewards,
} from "@/lib/mappers";
import toast from "react-hot-toast";

export const useSubmitChallenge = ({
  mode = "create",
  challengeId,
}: {
  mode?: "create" | "edit";
  challengeId?: string;
} = {}) => {
  const router = useRouter();

  const { basicInfo, goalsAndMetrics, schedule, rewards, reset } =
    useChallengeBuilderStore();

  const createMutation = useCreateChallenge();
  const updateMutation = useUpdateChallenge();

  // const submit = async () => {
  //   if (mode === "edit" && !challengeId) {
  //     toast.error("Missing challenge ID");
  //     return;
  //   }

  //   const toastId = toast.loading(
  //     mode === "edit" ? "Updating challenge..." : "Creating challenge..."
  //   );

  //   try {
  //     const formData = new FormData();

  //     /**
  //      * ---------------------------------------------------------
  //      * 🔥 NORMALIZATION LAYER (UI → Backend contract)
  //      * ---------------------------------------------------------
  //      */

  //     const isGlobal =
  //       goalsAndMetrics.selectedGoalTypes.includes("global");

  //     // Replace "global" with "distance" for backend
  //     const normalizedGoalTypes = goalsAndMetrics.selectedGoalTypes.map(
  //       (type) => (type === "global" ? "distance" : type)
  //     );

  //     const normalizedGoalsAndMetrics = {
  //       ...goalsAndMetrics,
  //       selectedGoalTypes: normalizedGoalTypes,
  //     };

  //     /**
  //      * ---------------------------------------------------------
  //      * APPEND JSON FIELDS
  //      * ---------------------------------------------------------
  //      */

  //     formData.append(
  //       "basicInfo",
  //       JSON.stringify(mapBasicInfo(basicInfo))
  //     );

  //     formData.append(
  //       "goalsAndMetrics",
  //       JSON.stringify(mapGoalsAndMetrics(normalizedGoalsAndMetrics))
  //     );

  //     // 🚨 Remove schedule if global configuration
  //     if (!isGlobal) {
  //       formData.append(
  //         "scheduleAndDuration",
  //         JSON.stringify(mapSchedule(schedule))
  //       );
  //     }

  //     formData.append(
  //       "rewards",
  //       JSON.stringify(mapRewards(rewards))
  //     );

  //     /**
  //      * ---------------------------------------------------------
  //      * HANDLE FILES
  //      * ---------------------------------------------------------
  //      */

  //     if (basicInfo.coverImage instanceof File) {
  //       formData.append("coverImage", basicInfo.coverImage);
  //     }

  //     if (rewards.rewardFile instanceof File) {
  //       formData.append("badgeImage", rewards.rewardFile);
  //     }

  //     /**
  //      * ---------------------------------------------------------
  //      * MUTATION
  //      * ---------------------------------------------------------
  //      */

  //     if (mode === "create") {
  //       await createMutation.mutateAsync(formData);
  //     } else {
  //       await updateMutation.mutateAsync({
  //         id: challengeId!,
  //         data: formData,
  //       });
  //     }

  //     toast.success(
  //       mode === "edit"
  //         ? "Challenge updated successfully!"
  //         : "Challenge created successfully!",
  //       { id: toastId }
  //     );

  //     reset();
  //     router.push("/challenges");
  //   } catch (error: any) {
  //     toast.error(
  //       error?.response?.data?.message ||
  //         error?.message ||
  //         "Something went wrong",
  //       { id: toastId }
  //     );
  //   }
  // };

  const submit = async () => {
  if (mode === "edit" && !challengeId) {
    toast.error("Missing challenge ID");
    return;
  }

  const toastId = toast.loading(
    mode === "edit" ? "Updating challenge..." : "Creating challenge..."
  );

  try {
    const formData = new FormData();

    const isGlobal =
      goalsAndMetrics.selectedGoalTypes.includes("global");

    const normalizedGoalTypes = goalsAndMetrics.selectedGoalTypes.map(
      (type) => (type === "global" ? "distance" : type)
    );

    const normalizedGoalsAndMetrics = {
      ...goalsAndMetrics,
      selectedGoalTypes: normalizedGoalTypes,
    };

    formData.append(
      "basicInfo",
      JSON.stringify(mapBasicInfo(basicInfo))
    );

    formData.append(
      "goalsAndMetrics",
      JSON.stringify(mapGoalsAndMetrics(normalizedGoalsAndMetrics))
    );

    if (!isGlobal) {
      formData.append(
        "scheduleAndDuration",
        JSON.stringify(mapSchedule(schedule))
      );
    }

    formData.append(
      "rewards",
      JSON.stringify(mapRewards(rewards))
    );

    if (basicInfo.coverImage instanceof File) {
      formData.append("coverImage", basicInfo.coverImage);
    }

    if (rewards.rewardFile instanceof File) {
      formData.append("badgeImage", rewards.rewardFile);
    }

    // ✅ ONLY mutation inside try
    if (mode === "create") {
      await createMutation.mutateAsync(formData);
    } else {
      await updateMutation.mutateAsync({
        id: challengeId!,
        data: formData,
      });
    }

    // ✅ success toast ONLY here
    toast.success(
      mode === "edit"
        ? "Challenge updated successfully!"
        : "Challenge created successfully!",
      { id: toastId }
    );

  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Something went wrong",
      { id: toastId }
    );
    return; // 🚨 VERY IMPORTANT: stop execution
  }

  // ✅ SIDE EFFECTS OUTSIDE TRY/CATCH
  reset();
  router.push("/challenges");
};
  return {
    submit,
    isLoading:
      mode === "edit"
        ? updateMutation.isPending
        : createMutation.isPending,
    error:
      mode === "edit"
        ? updateMutation.error
        : createMutation.error,
  };
};