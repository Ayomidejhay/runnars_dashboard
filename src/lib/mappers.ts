import {
  BasicInfoState,
  GoalsAndMetricsState,
  RewardState,
  ScheduleState,
} from "@/stores/useChallengeBuilderStore";

/* =========================
   Mapping Functions
========================= */

const distanceGoalMap: Record<string, string> = {
  "Total distance(Cumulative throughout challenge)": "total_distance",
  "Weekly distance(Maintain each week)": "weekly_distance",
  "Per-walk distance(Maintain per week)": "per_walk_distance",
  "Progressive distance(Increases over time)": "progressive_distance",
};

const frequencyGoalMap: Record<string, string> = {
  "Total number of walks": "total_walks",
  "Walks per week": "walks_per_week",
  "Walks on specific days": "walks_on_specific_days",
  "Time-of-day walks": "time_of_day_walks",
};

const photoGoalMap: Record<string, string> = {
  "Total photo uploads": "total_photo_uploads",
  "Photo uploads per week": "daily_weekly_photo",
};

const timeGoalMap: Record<string, string> = {
  "Total time spent walking": "total_time",
  "Time per walk": "time_per_walk",
  "Weekly walking time": "weekly_time",
  "Progressive duration increase": "progressive_duration",
};

const streakGoalMap: Record<string, string> = {
  "Consecutive days": "consecutive_days",
  "Weekly patterns": "weekly_patterns",
  "Longest streak achievement": "longest_streak",
  "Multiple day streak": "multiple_day_streak",
};



// export const mapBasicInfo = (basicInfo: any) => ({
//   name: basicInfo.challengeName,
//   type: basicInfo.challengeType,
//   description: basicInfo.description,
//   primaryHashtags: basicInfo.primaryHashtags,
//   coverImage: basicInfo.coverImage || null, // file will be handled separately if uploading
// });

// mapBasicInfo.ts
export const mapBasicInfo = (basicInfo: BasicInfoState) => {
  return {
    name: basicInfo.challengeName,
    type: basicInfo.challengeType,
    description: basicInfo.description,
    primaryHashtags: basicInfo.primaryHashtags,
    // Only include coverImage if it’s a File
    // ...(basicInfo.coverImage instanceof File ? { coverImage: basicInfo.coverImage } : {}),
  };
};


export const mapGoalsAndMetrics = (goalsAndMetrics: any) => {
  const distanceGoals = goalsAndMetrics.distanceGoal
    ? [
        {
          configurationType:
            distanceGoalMap[goalsAndMetrics.distanceGoal.configurationType] ||
            goalsAndMetrics.distanceGoal.configurationType,
          config: goalsAndMetrics.distanceGoal.config,
        },
      ]
    : [];

  const frequencyGoals = goalsAndMetrics.frequencyGoal
    ? [
        {
          configurationType:
            frequencyGoalMap[goalsAndMetrics.frequencyGoal.configurationType] ||
            goalsAndMetrics.frequencyGoal.configurationType,
          config: goalsAndMetrics.frequencyGoal.config,
        },
      ]
    : [];



  const timeGoals = goalsAndMetrics.timeGoal
    ? [
        {
          configurationType:
            timeGoalMap[goalsAndMetrics.timeGoal.configurationType] ||
            goalsAndMetrics.timeGoal.configurationType,
          config: goalsAndMetrics.timeGoal.config,
        },
      ]
    : [];

 
  const streakGoals = goalsAndMetrics.streakGoal
    ? [
        {
          configurationType:
            streakGoalMap[goalsAndMetrics.streakGoal.configurationType] ||
            goalsAndMetrics.streakGoal.configurationType,
          config: goalsAndMetrics.streakGoal.config,
        },
      ]
    : [];

  const photoGoals = goalsAndMetrics.photoGoal
    ? [
        {
          configurationType:
            photoGoalMap[goalsAndMetrics.photoGoal.configurationType] ||
            goalsAndMetrics.photoGoal.configurationType,
          config: goalsAndMetrics.photoGoal.config,
        },
      ]
    : [];

  return {
    selectedGoalTypes: goalsAndMetrics.selectedGoalTypes,
    distanceGoals,
    frequencyGoals,
    timeGoals,
    streakGoals,
    photoGoals,
  };
};

export const mapSchedule = (schedule: any) => ({
  startDate: schedule.startDate,
  startTime: schedule.startTime,
  endDate: schedule.endDate,
  endTime: schedule.endTime,
  recurrenceType: schedule.recurrenceType,
  challengeDays: schedule.selectedDay || [], // selectedDays is an array of enum values
});

// export const mapRewards = (rewards: any) => {
//   let whoCanParticipate:
//     | "all_users"
//     | "new_users"
//     | "specific_pet_type"
//     | "users_with_min_fit_score" =
//     rewards.participation.whoCanParticipate === "All users"
//       ? "all_users"
//       : rewards.participation.whoCanParticipate === "New users"
//         ? "new_users"
//         : rewards.participation.whoCanParticipate === "Pet type"
//         ? "specific_pet_type"
//         : "users_with_min_fit_score";

//   return {
//     points: Number(rewards.points || 0),
//     participation: { whoCanParticipate },
//     segmentCriteria: {
//       petFitScoreRange:
//         whoCanParticipate === "users_with_min_fit_score"
//           ? rewards.segmentCriteria.petFitScoreRange || "all"
//           : "all",
//       specificPetTypes:
//         whoCanParticipate === "specific_pet_type"
//           ? rewards.segmentCriteria.specificPetTypes || []
//           : [],
//     },
//     // badgeImage: rewards.rewardFile || null,
//     // ...(rewards.badgeImage instanceof File ? { badgeImage: rewards.badgeImage } : {}),
//   };
// };


export const mapRewards = (rewards: any) => {
  const whoCanParticipate: "all_users" | "new_users" | "specific_pet_type" | "users_with_min_fit_score" =
    rewards.participation?.whoCanParticipate ?? "all_users";
  

  return {
    points: Number(rewards.points || 0),
    participation: { whoCanParticipate },
    segmentCriteria: {
      petFitScoreRange: rewards.segmentCriteria?.petFitScoreRange ?? "all",
      specificPetTypes: rewards.segmentCriteria?.specificPetTypes ?? [],
    },
    rewardFileUrl: rewards?.achievementBadge?.image || null,
    rewardFile: null,
  };
};
