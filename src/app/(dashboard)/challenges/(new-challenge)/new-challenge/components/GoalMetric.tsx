
"use client";

import React from "react";
import Tabs from "./Tabs";
import DistanceInputs from "./DistanceInputs";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
import TimeInputs from "./TimeInputs";
import StreakInputs from "./StreakInputs";
import FrequencyInputs from "./FrequencyInputs";
import PhotoInputs from "./PhotoInputs";

const timeGoalOptions = [
  "Total time spent walking",
  "Time per walk",
  "Weekly walking time",
  "Progressive duration increase",
];
const streakGoalOptions = ["Consecutive days", "Weekly patterns", "Longest streak achievement", "Multiple day streak"];
const photoGoalOptions = [
  "Total photo uploads",
  "Daily/weekly photo challenge",
];

  

export default function GoalMetric() {

  const { goalsAndMetrics, setGoalsAndMetrics } = useChallengeBuilderStore();
  const activeTab = useChallengeBuilderStore(
    (s) => s.goalsAndMetrics.selectedGoalTypes[0],
  );

  const selectedTimeConfiguration = goalsAndMetrics.selectedTimeConfiguration;
  const selectedStreakConfiguration = goalsAndMetrics.selectedStreakConfiguration;
  const selectedPhotoConfiguration = goalsAndMetrics.selectedPhotoConfiguration;
    

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[20px] font-bold text-deepblue">Goals & metrics</p>
      {}
      <div className="flex flex-col gap-5">
        <Tabs />

        {activeTab === "distance" && <DistanceInputs />}
        {activeTab === "time" && (
          <TimeInputs
            configOptions={timeGoalOptions}
            selected={selectedTimeConfiguration}
            onSelect={(value) =>
              setGoalsAndMetrics({ selectedTimeConfiguration: value })
            }
          />
        )}

      
       {activeTab === "streak" && (
          <StreakInputs
            configOptions={streakGoalOptions}
            selected={selectedStreakConfiguration}
            onSelect={(value) =>
              setGoalsAndMetrics({ selectedStreakConfiguration: value })
            }
          />
        )}

        
        {activeTab === "frequency" && <FrequencyInputs />}
        
        {activeTab === "photo" && (
          <PhotoInputs
            configOptions={photoGoalOptions}
            selected={selectedPhotoConfiguration}
            onSelect={(value) =>
              setGoalsAndMetrics({ selectedPhotoConfiguration: value })
            }
          />
        )}
      </div>
      
    </div>
  );
}
