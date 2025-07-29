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

export default function GoalMetric() { 
  const [activeTab, setActiveTab] = useState<"distance" | "frequency" | "time" | "streak" | "photo">("distance");
  const [selectedGoalConfiguration, setSelectedGoalConfiguration] =
    useState("");
  const [selectedFrequencyConfiguration, setSelectedFrequencyConfiguration] =
    useState("");
  const [selectedTimeConfiguration, setSelectedTimeConfiguration] =
    useState("");
  const [selectedStreakConfiguration, setSelectedStreakConfiguration] =
    useState("");
  const [selectedPhotoConfiguration, setSelectedPhotoConfiguration] =
    useState("");

  // const [selectedDay, setSelectedDay] = useState<string>("M");
  // const days = ["M", "T", "W", "Th", "F", "S", "Su"];

  // const [selectedPeriod, setSelectedPeriod] = useState<string>("Morning");
  // const periods = ["Morning", "Midday", "Evening"];

  // const [selectedValue, setSelectedValue] = useState<string>("");

  // // State to manage selected checkbox for photo uploads
  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  // const toggleSelection = (option: string) => {
  //   setSelectedOptions(
  //     (prev) =>
  //       prev.includes(option)
  //         ? prev.filter((item) => item !== option) // remove if already selected
  //         : [...prev, option] // add if not selected
  //   );
  // };


 

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
