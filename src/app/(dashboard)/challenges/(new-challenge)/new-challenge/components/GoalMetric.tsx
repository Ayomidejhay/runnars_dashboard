"use client";

import { div } from "framer-motion/client";
import React, { useState } from "react";
import Tabs from "./Tabs";
import DistanceInputs from "./DistanceInputs";
import FrequencyInputs from "./FrequencyInputs";
import TimeInputs from "./TimeInputs";
import StreakInputs from "./StreakInputs";
import PhotoInputs from "./PhotoInputs";

const goalConfiguration = [
  "Total distance(Cumulative throughout challenge)",
  "Weekly distance(Maintain each week)",
  "Per-walk distance(Maintain per week)",
  "Progressive distance(Increases over time)",
];

const frequencyConfiguration = [
  "Total number of walks",
  "Walk per week",
  "Walks on specific days",
  "Time-of-day walks",
];

const timeConfiguration = [
  "Total time spent walking",
  "Time per walk",
  "Weekly walking time",
  "Progressive duration increase",
];

const streakConfiguration = [
  "Consecutive days",
  "Weekly patterns",
  "Longest streak achievement",
  "Multiple day streak",
];

const photoConfiguration = [
  "Total photo uploads",
  "Daily/weekly photo challenge",
];

export default function GoalMetric({
  activeTab,
  setActiveTab,
  selectedGoalConfiguration,
  setSelectedGoalConfiguration,
  selectedFrequencyConfiguration,
  setSelectedFrequencyConfiguration,
  selectedTimeConfiguration,
  setSelectedTimeConfiguration,
  selectedStreakConfiguration,
  setSelectedStreakConfiguration,
  selectedPhotoConfiguration,
  setSelectedPhotoConfiguration,
}: any) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[20px] font-bold text-deepblue">Goals & metrics</p>
      <div className="flex flex-col gap-5">
        {/* Tabs */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Distance tab content */}
        {activeTab === "distance" && (
          <DistanceInputs
            configOptions={goalConfiguration}
            selected={selectedGoalConfiguration}
            onSelect={setSelectedGoalConfiguration}
          />
        )}

        {/* Frequency tab content */}
        {activeTab === "frequency" && (
          <FrequencyInputs
            configOptions={frequencyConfiguration}
            selected={selectedFrequencyConfiguration}
            onSelect={setSelectedFrequencyConfiguration}
          />
        )}

        {/* Time tab content */}
        {activeTab === "time" && (
          <TimeInputs
            configOptions={timeConfiguration}
            selected={selectedTimeConfiguration}
            onSelect={setSelectedTimeConfiguration}
          />
        )}
        {/* Streak tab content */}
        {activeTab === "streak" && (
          <StreakInputs
            configOptions={streakConfiguration}
            selected={selectedStreakConfiguration}
            onSelect={setSelectedStreakConfiguration}
          />
        )}

        {/* Photo tab content */}
        {activeTab === "photo" && (
          <PhotoInputs
            configOptions={photoConfiguration}
            selected={selectedPhotoConfiguration}
            onSelect={setSelectedPhotoConfiguration}
          />
        )}
      </div>
    </div>
  );
}
