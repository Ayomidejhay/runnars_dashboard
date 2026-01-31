"use client";

// "use client";

import api from "@/lib/api";
// import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
// import toast from "react-hot-toast";
// import { useCreateChallenge } from "./useCreateChallenge";
// import { useUpdateChallenge } from "./useUpdateChallenge";
// import { mapBasicInfo, mapGoalsAndMetrics, mapRewards, mapSchedule } from "@/lib/mappers";
// import { useRouter } from "next/navigation";

// import { useRouter } from "next/navigation";
// import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
// import { useCreateChallenge } from "@/hooks/useCreateChallenge";
// import { useUpdateChallenge } from "./useUpdateChallenge"; // new hook for PATCH
// import {
//   mapBasicInfo,
//   mapGoalsAndMetrics,
//   mapSchedule,
//   mapRewards,
// } from "@/lib/mappers";
// import toast from "react-hot-toast";

// export const useSubmitChallenge = ({
//   mode = "create",
//   challengeId,
// }: {
//   mode?: "create" | "edit";
//   challengeId?: string;
// } = {}) => {
//   const router = useRouter();

//   const {
//     basicInfo,
//     goalsAndMetrics,
//     schedule,
//     rewards,
//     reset,
//     getUpdatePayload,
//   } = useChallengeBuilderStore();

//   const createMutation = useCreateChallenge();
//   const updateMutation = useUpdateChallenge(); // PATCH mutation

//   const submit = async () => {
//     if (mode === "edit" && !challengeId) {
//       toast.error("Missing challenge ID");
//       return;
//     }

//     const toastId = toast.loading(
//       mode === "edit" ? "Updating challenge..." : "Creating challenge...",
//     );

//     try {
//       const formData = new FormData();

//       if (mode === "create") {
//         /* ---------------- CREATE (FULL PAYLOAD) ---------------- */

//         formData.append("basicInfo", JSON.stringify(mapBasicInfo(basicInfo)));
//         formData.append(
//           "goalsAndMetrics",
//           JSON.stringify(mapGoalsAndMetrics(goalsAndMetrics)),
//         );
//         formData.append(
//           "scheduleAndDuration",
//           JSON.stringify(mapSchedule(schedule)),
//         );
//         formData.append("rewards", JSON.stringify(mapRewards(rewards)));

//         if (basicInfo.coverImage instanceof File) {
//           formData.append("coverImage", basicInfo.coverImage);
//         }

//         if (rewards.rewardFile instanceof File) {
//           formData.append("badgeImage", rewards.rewardFile);
//         }

//         await createMutation.mutateAsync(formData);
//       } else {
//         /* ---------------- EDIT (FULL PAYLOAD - PUT) ---------------- */


        

//         formData.append("basicInfo", JSON.stringify(mapBasicInfo(basicInfo)));

//         formData.append(
//           "goalsAndMetrics",
//           JSON.stringify(mapGoalsAndMetrics(goalsAndMetrics)),
//         );

//         formData.append(
//           "scheduleAndDuration",
//           JSON.stringify(mapSchedule(schedule)),
//         );

//         formData.append("rewards", JSON.stringify(mapRewards(rewards)));

//         if (basicInfo.coverImage instanceof File) {
//           formData.append("coverImage", basicInfo.coverImage);
//         }

//         if (rewards.rewardFile instanceof File) {
//           formData.append("badgeImage", rewards.rewardFile);
//         }

//         await updateMutation.mutateAsync({
//           id: challengeId!,
//           data: formData,
//         });
//       }

//       toast.success(
//         mode === "edit"
//           ? "Challenge updated successfully!"
//           : "Challenge created successfully!",
//         { id: toastId },
//       );

//       reset();
//       router.push("/challenges");
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Something went wrong",
//         { id: toastId },
//       );
//     }
//   };

//   return {
//     submit,
//     isLoading:
//       mode === "edit" ? updateMutation.isPending : createMutation.isPending,
//     error: mode === "edit" ? updateMutation.error : createMutation.error,
//   };
// };



import { useRouter } from "next/navigation";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
import { useCreateChallenge } from "@/hooks/useCreateChallenge";
import { useUpdateChallenge } from "./useUpdateChallenge"; // PATCH mutation
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

  const {
    basicInfo,
    goalsAndMetrics,
    schedule,
    rewards,
    reset,
  } = useChallengeBuilderStore();

  const createMutation = useCreateChallenge();
  const updateMutation = useUpdateChallenge();

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

      // Append all JSON fields
      formData.append("basicInfo", JSON.stringify(mapBasicInfo(basicInfo)));
      formData.append(
        "goalsAndMetrics",
        JSON.stringify(mapGoalsAndMetrics(goalsAndMetrics))
      );
      formData.append(
        "scheduleAndDuration",
        JSON.stringify(mapSchedule(schedule))
      );
      formData.append("rewards", JSON.stringify(mapRewards(rewards)));

      // Handle files
      if (basicInfo.coverImage instanceof File) {
        formData.append("coverImage", basicInfo.coverImage);
      }

      if (rewards.rewardFile instanceof File) {
        formData.append("badgeImage", rewards.rewardFile);
      }

      if (mode === "create") {
        await createMutation.mutateAsync(formData);
      } else {
        await updateMutation.mutateAsync({
          id: challengeId!,
          data: formData, // always FormData
        });
      }

      toast.success(
        mode === "edit"
          ? "Challenge updated successfully!"
          : "Challenge created successfully!",
        { id: toastId }
      );

      reset();
      router.push("/challenges");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error?.message || "Something went wrong",
        { id: toastId }
      );
    }
  };

  return {
    submit,
    isLoading:
      mode === "edit" ? updateMutation.isPending : createMutation.isPending,
    error: mode === "edit" ? updateMutation.error : createMutation.error,
  };
};


// 


// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
// import { useCreateChallenge } from "@/hooks/useCreateChallenge";
// import { useUpdateChallenge } from "@/hooks/useUpdateChallenge";
// import {
//   mapBasicInfo,
//   mapGoalsAndMetrics,
//   mapSchedule,
//   mapRewards,
// } from "@/lib/mappers";

// export const useSubmitChallenge = ({
//   mode = "create",
//   challengeId,
// }: {
//   mode?: "create" | "edit";
//   challengeId?: string;
// } = {}) => {
//   const router = useRouter();
//   const { basicInfo, goalsAndMetrics, schedule, rewards, reset } =
//     useChallengeBuilderStore();

//   const createMutation = useCreateChallenge();
//   const updateMutation = useUpdateChallenge();

//   const submit = async () => {
//     if (mode === "edit" && !challengeId) {
//       toast.error("Missing challenge ID");
//       return;
//     }

//     const toastId = toast.loading(
//       mode === "edit" ? "Updating challenge..." : "Creating challenge..."
//     );

//     try {
//       let updatedChallengeId = "";

//       // -----------------------
//       // 1️⃣ Prepare FormData for main challenge data (without files)
//       // -----------------------
//       const mainFormData = new FormData();
//       mainFormData.append("basicInfo", JSON.stringify(mapBasicInfo(basicInfo)));
//       mainFormData.append(
//         "goalsAndMetrics",
//         JSON.stringify(mapGoalsAndMetrics(goalsAndMetrics))
//       );
//       mainFormData.append("scheduleAndDuration", JSON.stringify(mapSchedule(schedule)));
//       mainFormData.append("rewards", JSON.stringify(mapRewards(rewards)));

//       // -----------------------
//       // 2️⃣ Send main FormData (without files)
//       // -----------------------
//       if (mode === "create") {
//         const created = await createMutation.mutateAsync(mainFormData);
//         updatedChallengeId = created.id;
//       } else {
//         await updateMutation.mutateAsync({
//           id: challengeId!,
//           data: mainFormData,
//         });
//         updatedChallengeId = challengeId!;
//       }

//       // -----------------------
//       // 3️⃣ Send files separately (FormData)
//       // -----------------------
//       if (basicInfo.coverImage instanceof File) {
//         const fd = new FormData();
//         fd.append("coverImage", basicInfo.coverImage);
//         await fetch(
//           `/api/admin/challenges/${updatedChallengeId}/coverImage`,
//           { method: "PUT", body: fd }
//         );
//       }

//       if (rewards.rewardFile instanceof File) {
//         const fd = new FormData();
//         fd.append("badgeImage", rewards.rewardFile);
//         await fetch(
//           `/api/admin/challenges/${updatedChallengeId}/badgeImage`,
//           { method: "PUT", body: fd }
//         );
//       }

//       toast.success(
//         mode === "edit"
//           ? "Challenge updated successfully!"
//           : "Challenge created successfully!",
//         { id: toastId }
//       );

//       reset();
//       router.push("/challenges");
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message || error?.message || "Something went wrong",
//         { id: toastId }
//       );
//     }
//   };

//   return {
//     submit,
//     isLoading:
//       mode === "edit" ? updateMutation.isPending : createMutation.isPending,
//     error: mode === "edit" ? updateMutation.error : createMutation.error,
//   };
// };
