"use client";

import React, { useState, useEffect } from "react";
import {
  useChallengeBuilderStore,
  GoalPayload,
  StreakGoalConfig,
} from "@/stores/useChallengeBuilderStore";

interface StreakInputsProps {
  configOptions: string[];
  selected: string;
  onSelect: (value: string) => void;
}

const days = [
  { label: "M", value: "Monday" },
  { label: "T", value: "Tuesday" },
  { label: "W", value: "Wednesday" },
  { label: "Th", value: "Thursday" },
  { label: "F", value: "Friday" },
  { label: "S", value: "Saturday" },
  { label: "Su", value: "Sunday" },
];

export default function StreakInputs({
  configOptions,
  selected,
  onSelect,
}: StreakInputsProps) {
  const streakGoal = useChallengeBuilderStore(
    (state) => state.goalsAndMetrics.streakGoal,
  );
  const setStreakConfig = useChallengeBuilderStore(
    (state) => state.setStreakConfig,
  );

  const [consecutiveDaysTarget, setConsecutiveDaysTarget] = useState(
    streakGoal?.config.consecutiveDaysTarget || "",
  );
  const [allowJokerDay, setAllowJokerDay] = useState(
    streakGoal?.config.allowJokerDay ? "Yes" : "No",
  );
  // const [selectedDay, setSelectedDay] = useState(
  //   streakGoal?.config.selectedDay || "M",
  // );
  const [selectedDays, setSelectedDays] = useState<string[]>(
    streakGoal?.config.selectedDays || [],
  );

  const [minimumWalkDuration, setMinimumWalkDuration] = useState(
    streakGoal?.config.minimumWalkDuration || "",
  );
  const [numberOfWeeks, setNumberOfWeeks] = useState(
    streakGoal?.config.numberOfWeeks || "",
  );
  const [minimumStreakTarget, setMinimumStreakTarget] = useState(
    streakGoal?.config.minimumStreakTarget || "",
  );
  const [minimumStreakValue, setMinimumStreakValue] = useState(
    streakGoal?.config.minimumStreakValue || "",
  );
  const [challengeDuration, setChallengeDuration] = useState(
    streakGoal?.config.challengeDuration || "",
  );
  const [numberOfStreaks, setNumberOfStreaks] = useState(
    streakGoal?.config.numberOfStreaks || "",
  );
  const [streakLength, setStreakLength] = useState(
    streakGoal?.config.streakLength || "",
  );
  const [restDays, setRestDays] = useState(streakGoal?.config.restDays || "");

  // const days = ["M", "T", "W", "Th", "F", "S", "Su"];
  //   const days = [
  //   { label: "M", value: "Monday" },
  //   { label: "T", value: "Tuesday" },
  //   { label: "W", value: "Wednesday" },
  //   { label: "Th", value: "Thursday" },
  //   { label: "F", value: "Friday" },
  //   { label: "S", value: "Saturday" },
  //   { label: "Su", value: "Sunday" }
  // ];

  // Update store whenever local state changes
  useEffect(() => {
    const payload: GoalPayload<StreakGoalConfig> = {
      configurationType: selected,
      config: {
        consecutiveDaysTarget: Number(consecutiveDaysTarget) || undefined,
        allowJokerDay: allowJokerDay === "Yes",
        // selectedDay,
        selectedDays,
        minimumWalkDuration: Number(minimumWalkDuration) || undefined,
        numberOfWeeks: Number(numberOfWeeks) || undefined,
        minimumStreakTarget: Number(minimumStreakTarget) || undefined,
        minimumStreakValue: Number(minimumStreakValue) || undefined,
        challengeDuration: Number(challengeDuration) || undefined,
        numberOfStreaks: Number(numberOfStreaks) || undefined,
        streakLength: Number(streakLength) || undefined,
        restDays: Number(restDays) || undefined,
      },
    };
    setStreakConfig(payload);
  }, [
    consecutiveDaysTarget,
    allowJokerDay,
    // selectedDay,
    selectedDays,
    minimumWalkDuration,
    numberOfWeeks,
    minimumStreakTarget,
    minimumStreakValue,
    challengeDuration,
    numberOfStreaks,
    streakLength,
    restDays,
    selected,
    setStreakConfig,
  ]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const renderInputs = () => {
    switch (selected) {
      case "Consecutive days":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">
                Consecutive Days Target
              </label>
              <input
                type="number"
                value={consecutiveDaysTarget}
                onChange={(e) => setConsecutiveDaysTarget(e.target.value)}
                placeholder="E.g 7"
                className="border border-[#E1E1E1] rounded-[16px] p-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">
                Allow Joker Day?
              </label>
              <div className="flex gap-6 items-center">
                {["Yes", "No"].map((val) => (
                  <label
                    key={val}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="jokerDay"
                      value={val}
                      checked={allowJokerDay === val}
                      onChange={() => setAllowJokerDay(val)}
                      className="h-4 w-4"
                    />
                    <span
                      className={`text-[14px] ${allowJokerDay === val ? "text-deepblue font-semibold" : "text-[#8E98A8]"}`}
                    >
                      {val}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case "Weekly patterns":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Days Selection</label>
              <div className="flex gap-2">
                {days.map((day) => {
                  const isSelected = selectedDays.includes(day.value);

                  return (
                    <label key={day.value} className="cursor-pointer">
                      <input
                        type="checkbox"
                        value={day.value}
                        checked={isSelected}
                        onChange={() => toggleDay(day.value)}
                        className="hidden"
                      />
                      <span
                        className={`h-8 w-8 flex items-center justify-center text-[12px] border rounded-full ${
                          isSelected
                            ? "border-brightblue text-white bg-brightblue"
                            : "text-[#8E98A8] border-[#8E98A8] bg-transparent"
                        }`}
                      >
                        {day.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">
                  Minimum Walk Duration
                </label>
                <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                  <input
                    type="number"
                    value={minimumWalkDuration}
                    onChange={(e) => setMinimumWalkDuration(e.target.value)}
                    placeholder="E.g 5-120"
                    className="p-2 w-[80%] outline-none"
                  />
                  <div className="border-l border-[#E1E1E1] h-full" />
                  <p className="w-[20%] text-center">Mins</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">
                  Number of weeks
                </label>
                <input
                  type="number"
                  value={numberOfWeeks}
                  onChange={(e) => setNumberOfWeeks(e.target.value)}
                  placeholder="E.g 1-12"
                  className="border border-[#E1E1E1] rounded-[16px] p-2"
                />
              </div>
            </div>
          </div>
        );

      case "Longest streak achievement":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">
                  Minimum Streak Target
                </label>
                <input
                  type="text"
                  value={minimumStreakTarget}
                  onChange={(e) => setMinimumStreakTarget(e.target.value)}
                  required
                  className="border border-[#E1E1E1] rounded-[16px] p-2"
                  placeholder="E.g 2-10"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">
                  Minimum Streak Value
                </label>
                <input
                  type="text"
                  value={minimumStreakValue}
                  onChange={(e) => setMinimumStreakValue(e.target.value)}
                  required
                  className="border border-[#E1E1E1] rounded-[16px] p-2"
                  placeholder="E.g 7-60"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">
                Challenge Duration
              </label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                <input
                  type="text"
                  value={challengeDuration}
                  onChange={(e) => setChallengeDuration(e.target.value)}
                  required
                  className="p-2 w-[80%] outline-none"
                  placeholder="E.g 7-90"
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[20%] text-center">Days</p>
              </div>
            </div>
          </div>
        );

      case "Multiple day streak":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">
                  Number of Streaks
                </label>
                <input
                  type="text"
                  value={numberOfStreaks}
                  onChange={(e) => setNumberOfStreaks(e.target.value)}
                  required
                  className="border border-[#E1E1E1] rounded-[16px] p-2"
                  placeholder="E.g 2-10"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">
                  Streak Length
                </label>
                <input
                  type="text"
                  value={streakLength}
                  onChange={(e) => setStreakLength(e.target.value)}
                  required
                  className="border border-[#E1E1E1] rounded-[16px] p-2"
                  placeholder="E.g 3-14"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Rest days</label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                <input
                  type="text"
                  value={restDays}
                  onChange={(e) => setRestDays(e.target.value)}
                  required
                  className="p-2 w-[80%] outline-none"
                  placeholder="E.g 1-7"
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[20%] text-center">Days</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[16px] text-deepblue">Goal Configuration</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select goal configuration</option>
        {configOptions.map((goal) => (
          <option key={goal} value={goal}>
            {goal}
          </option>
        ))}
      </select>

      {renderInputs()}
    </div>
  );
}
