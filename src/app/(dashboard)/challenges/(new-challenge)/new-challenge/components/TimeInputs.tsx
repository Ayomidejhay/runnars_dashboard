
'use client';

import React, { useState, useEffect } from "react";
import { useChallengeBuilderStore, GoalPayload, TimeGoalConfig } from "@/stores/useChallengeBuilderStore";

interface TimeInputsProps {
  configOptions: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function TimeInputs({ configOptions, selected, onSelect }: TimeInputsProps) {
  const timeGoal = useChallengeBuilderStore((state) => state.goalsAndMetrics.timeGoal);
  const setTimeConfig = useChallengeBuilderStore((state) => state.setTimeConfig);

  const [totalWalkingTime, setTotalWalkingTime] = useState(timeGoal?.config.totalWalkingTime || "");
  const [minimumWalkDuration, setMinimumWalkDuration] = useState(timeGoal?.config.minimumWalkDuration || "");
  const [numberOfWalks, setNumberOfWalks] = useState(timeGoal?.config.numberOfWalks || "");
  const [distancePerWalk, setDistancePerWalk] = useState(timeGoal?.config.distancePerWalk || "");
  const [startDistance, setStartDistance] = useState(timeGoal?.config.startDistance || "");
  const [weeklyIncrease, setWeeklyIncrease] = useState(timeGoal?.config.weeklyIncrease || "");
  const [durationWeeks, setDurationWeeks] = useState(timeGoal?.config.durationWeeks || "");
  const [numberOfWeeks, setNumberOfWeeks] = useState(timeGoal?.config.numberOfWeeks || "");
  const [timePerWeek, setTimePerWeek] = useState(timeGoal?.config.timePerWeek || "");

  useEffect(() => {
    const payload: GoalPayload<TimeGoalConfig> = {
      configurationType: selected,
      config: {
        totalWalkingTime: Number(totalWalkingTime) || undefined,
        minimumWalkDuration: Number(minimumWalkDuration) || undefined,
        numberOfWalks: Number(numberOfWalks) || undefined,
        distancePerWalk: Number(distancePerWalk) || undefined,
        startDistance: Number(startDistance) || undefined,
        weeklyIncrease: Number(weeklyIncrease) || undefined,
        durationWeeks: Number(durationWeeks) || undefined,
        timePerWeek: Number(timePerWeek) || undefined,
        numberOfWeeks: Number(numberOfWeeks) || undefined,
      },
    };
    setTimeConfig(payload);
  }, [
    totalWalkingTime,
    minimumWalkDuration,
    numberOfWalks,
    distancePerWalk,
    startDistance,
    weeklyIncrease,
    durationWeeks,
    selected,
    timePerWeek,
    numberOfWeeks,
    setTimeConfig,
  ]);

  const renderInputs = () => {
    switch (selected) {
      case "Total time spent walking":
        return (
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-deepblue">Total Walking Time</label>
            <input
              type="number"
              value={totalWalkingTime}
              onChange={(e) => setTotalWalkingTime(e.target.value)}
              placeholder="E.g 10"
              className="border border-[#E1E1E1] rounded-[16px] p-2"
            />
          </div>
        );

      case "Time per walk":
        return (
          <div className="flex justify-between gap-5">
            
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Minimum Walk Duration</label>
              <input
                type="number"
                value={minimumWalkDuration}
                onChange={(e) => setMinimumWalkDuration(e.target.value)}
                placeholder="E.g 10"
                className="border border-[#E1E1E1] rounded-[16px] p-2"
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Number of weeks</label>
              <input
                type="number"
                value={numberOfWalks}
                onChange={(e) => setNumberOfWalks(e.target.value)}
                placeholder="E.g 1-12"
                className="border border-[#E1E1E1] rounded-[16px] p-2"
              />
            </div>
          </div>
        );
      case "Weekly walking time":
        return (
          <div className="flex justify-between gap-5">
            
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Time Per Week</label>
              <input
                type="number"
                value={timePerWeek}
                onChange={(e) => setTimePerWeek(e.target.value)}
                placeholder="E.g 10"
                className="border border-[#E1E1E1] rounded-[16px] p-2"
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Number of weeks</label>
              <input
                type="number"
                value={numberOfWeeks}
                onChange={(e) => setNumberOfWeeks(e.target.value)}
                placeholder="E.g 1-12"
                className="border border-[#E1E1E1] rounded-[16px] p-2"
              />
            </div>
          </div>
        );

      case "Progressive duration increase":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">Start Distance</label>
                <input
                  type="number"
                  value={startDistance}
                  onChange={(e) => setStartDistance(e.target.value)}
                  placeholder="E.g 1-50"
                  className="border border-[#E1E1E1] rounded-[16px] p-2"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">Weekly Increase</label>
                <input
                  type="number"
                  value={weeklyIncrease}
                  onChange={(e) => setWeeklyIncrease(e.target.value)}
                  placeholder="E.g 1-10"
                  className="border border-[#E1E1E1] rounded-[16px] p-2"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Duration (weeks)</label>
              <input
                type="number"
                value={durationWeeks}
                onChange={(e) => setDurationWeeks(e.target.value)}
                placeholder="E.g 4"
                className="border border-[#E1E1E1] rounded-md p-2"
              />
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
