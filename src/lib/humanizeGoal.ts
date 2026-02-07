import { GoalType } from "@/types/challenge";

function humanizeDistance(type: string, config: any) {
  if (type === "total_distance") {
    return `Complete a total of ${config.targetDistance} miles across ${config.numberOfWalks} walks`;
  }

  if (type === "weekly_distance") {
    return `Complete ${config.distancePerWeek} miles each week over ${config.numberOfWalks} walks.`;
  }

  if (type === "per_walk_distance") {
    return `Take ${config.totalWalks} walks, covering ${config.distancePerWalk} miles in each walk.`;
  }

   if (type === "progressive_distance") {
    return `Start with ${config.startDistance} miles in the first week, then increase by ${config.weeklyIncrease} miles each week for ${config.durationWeeks} weeks.`;
  }

  return "Complete the distance goal.";
}

function humanizeFrequency(type: string, config: any) {
  if (type === "walks_per_week") {
    return `Complete ${config.walksPerWeek} walks per week for ${config.numberOfWeeks} weeks.`;
  }

  return "Meet the required activity frequency.";
}

function humanizeTime(type: string, config: any) {
  if (type === "daily_time") {
    return `Spend at least ${config.minutesPerDay} minutes walking each day.`;
  }

  if (type === "total_time") {
    return `Accumulate ${config.totalMinutes} minutes of activity.`;
  }

  return "Complete the required activity duration.";
}

function humanizeStreak(type: string, config: any) {
  if (type === "consecutive_days") {
    return `Maintain a ${config.days}-day activity streak.`;
  }

  return "Maintain a consistent activity streak.";
}

function humanizePhoto(type: string, config: any) {
  if (type === "daily_photo") {
    return `Upload a photo after each daily activity.`;
  }

  if (type === "total_photos") {
    return `Upload ${config.totalPhotos} activity photos.`;
  }

  return "Upload activity photos to complete the challenge.";
}


export function humanizeGoal(
  goalType: GoalType,
  goal?: {
    configurationType: string;
    config: any;
  }
): string {
  if (!goal) return "";

  const { configurationType, config } = goal;

  switch (goalType) {
    case "distance":
      return humanizeDistance(configurationType, config);

    case "frequency":
      return humanizeFrequency(configurationType, config);

    case "time":
      return humanizeTime(configurationType, config);

    case "streak":
      return humanizeStreak(configurationType, config);

    case "photo":
      return humanizePhoto(configurationType, config);

    default:
      return "";
  }
}
