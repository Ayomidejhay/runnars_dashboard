import { humanizeGoal } from "./humanizeGoal";

export function humanizeAllGoals(goalsAndMetrics: any): string[] {
  const results: string[] = [];

  const goalMap = {
    distance: goalsAndMetrics.distanceGoals?.[0],
    frequency: goalsAndMetrics.frequencyGoals?.[0],
    time: goalsAndMetrics.timeGoals?.[0],
    streak: goalsAndMetrics.streakGoals?.[0],
    photo: goalsAndMetrics.photoGoals?.[0],
  };

  for (const goalType of goalsAndMetrics.selectedGoalTypes || []) {
    const goal = goalMap[goalType as keyof typeof goalMap];

    const text = humanizeGoal(goalType, goal);
    if (text) results.push(text);
  }

  return results;
}
