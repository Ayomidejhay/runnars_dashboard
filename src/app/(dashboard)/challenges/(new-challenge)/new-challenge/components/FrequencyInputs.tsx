
"use client";

import React, { useState, useEffect } from "react";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";

export default function FrequencyInputs() {
  const { goalsAndMetrics, setFrequencyConfig } = useChallengeBuilderStore();
  const { selectedFrequencyConfiguration } = goalsAndMetrics;

  const [selected, setSelected] = useState(selectedFrequencyConfiguration);

  // Local states for input fields
  const [numberOfWalks, setNumberOfWalks] = useState("");
  const [minimumWalkDuration, setMinimumWalkDuration] = useState("");
  const [minDuration, setMinDuration] = useState("");
  const [walksPerWeek, setWalksPerWeek] = useState("");
  const [numberOfWeeks, setNumberOfWeeks] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [timePeriod, setTimePeriod] = useState("Morning");
  const [timeRange, setTimeRange] = useState("");
  const [walksPerPeriod, setWalksPerPeriod] = useState("");
  const [weeksCount, setWeeksCount] = useState("");
  const [minimumDuration, setMinimumDuration] = useState("");
  const [minWalkDuration, setMinWalkDuration] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  
  const days = [
  { label: "M", value: "Monday" },
  { label: "T", value: "Tuesday" },
  { label: "W", value: "Wednesday" },
  { label: "Th", value: "Thursday" },
  { label: "F", value: "Friday" },
  { label: "S", value: "Saturday" },
  { label: "Su", value: "Sunday" }
];
  const periods = ["Morning", "Midday", "Evening"];

  // Update store when relevant values change
  useEffect(() => {
  if (!selected) return;

  setFrequencyConfig({
    // type: selected,
    configurationType: selected,
    config: {
      numberOfWalks: numberOfWalks ? Number(numberOfWalks) : undefined,
      minimumWalkDuration: minimumWalkDuration ? Number(minimumWalkDuration) : undefined,
      minDuration: minDuration ? Number(minDuration) : undefined,
      walksPerWeek: walksPerWeek ? Number(walksPerWeek) : undefined,
      numberOfWeeks: numberOfWeeks ? Number(numberOfWeeks) : undefined,
      weeksCount: weeksCount ? Number(weeksCount) : undefined,
      minimumDuration: minimumDuration ? Number(minimumDuration) : undefined,
      minWalkDuration: minWalkDuration ? Number(minWalkDuration) : undefined,
      selectedDay,
      timePeriod,
      timeRange,
      walksPerPeriod: walksPerPeriod ? Number(walksPerPeriod) : undefined,
    },
  });
}, [
  selected,
  numberOfWalks,
  minWalkDuration,
  minimumWalkDuration,
  walksPerWeek,
  numberOfWeeks,
  selectedDay,
  timePeriod,
  timeRange,
  walksPerPeriod,
  setFrequencyConfig,
]);


  // Render configuration-specific inputs
  const renderInputs = () => {
    switch (selected) {
      case "Total number of walks":
        return (
          <div className="flex flex-row-reverse justify-between items-start gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Minimum Walk Duration (Optional)</label>
              <input
                value={minimumWalkDuration}
                onChange={(e) => setMinimumWalkDuration(e.target.value)}
                placeholder="E.g 1-20"
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Number of Walks</label>
              <input
                value={numberOfWalks}
                onChange={(e) => setNumberOfWalks(e.target.value)}
                placeholder="E.g 1-50"
                className="border p-2 rounded"
              />
            </div>
          </div>
        );
      case "Walks per week":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">Walks per Week</label>
                <input
                  type="text"
                  value={walksPerWeek}
                  onChange={(e) => setWalksPerWeek(e.target.value)}
                  required
                  className="border border-[#E1E1E1] rounded-[16px] p-2"
                  placeholder="E.g 1-7"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">Number of Weeks</label>
                <input
                  type="text"
                  value={numberOfWeeks}
                  onChange={(e) => setNumberOfWeeks(e.target.value)}
                  required
                  className="border border-[#E1E1E1] rounded-[16px] p-2"
                  placeholder="E.g 1-12"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Minimum Walk Duration (Optional)</label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                <input
                  type="text"
                  value={minDuration}
                  onChange={(e) => setMinDuration(e.target.value)}
                  className="p-2 w-[60%] outline-none"
                  placeholder="E.g 5-12"
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[40%] text-center text-[10px]">Minutes</p>
              </div>
            </div>
          </div>
        );
          case "Walks on specific days":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">Day Selection</label>
                <div className="flex gap-2">
                  {days.map((day) => (
                    <label key={day.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="selectedDay"
                        value={day.value}
                        checked={selectedDay === day.value}
                        onChange={() => setSelectedDay(day.value)}
                        className="hidden"
                      />
                      <span
                        className={`h-8 w-8 flex items-center justify-center text-[12px] border rounded-full ${
                          selectedDay === day.value
                            ? "border-brightblue text-white bg-brightblue"
                            : "text-[#8E98A8] border-[#8E98A8] bg-transparent"
                        }`}
                      >
                        {day.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">Number of Weeks</label>
                <input
                  type="text"
                  value={weeksCount}
                  onChange={(e) => setWeeksCount(e.target.value)}
                  required
                  className="border border-[#E1E1E1] rounded-[16px] p-2"
                  placeholder="E.g 1-12"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Minimum Walk Duration (Optional)</label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                <input
                  type="text"
                  value={minimumDuration}
                  onChange={(e) => setMinimumDuration(e.target.value)}
                  className="p-2 w-[80%] outline-none"
                  placeholder="E.g 5-12"
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[20%] text-center text-[10px]">Minutes</p>
              </div>
            </div>
          </div>
        );

      case "Time-of-day walks":
        return (
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Time Period</label>
              <div className="flex gap-2">
                {periods.map((period) => (
                  <label key={period} className="cursor-pointer">
                    <input
                      type="radio"
                      name="timePeriod"
                      value={period}
                      checked={timePeriod === period}
                      onChange={() => setTimePeriod(period)}
                      className="hidden"
                    />
                    <span
                      className={`w-[79px] h-[40px] flex items-center justify-center text-[12px] border rounded-[8px] ${
                        timePeriod === period
                          ? "border-brightblue text-brightblue bg-[#E8F1FD]"
                          : "text-[#8E98A8] border-[#8E98A8] bg-transparent"
                      }`}
                    >
                      {period}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Time Range</label>
              <input
                type="text"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                required
                className="border border-[#E1E1E1] rounded-[16px] p-2"
                placeholder="Select time range"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Walk per Period</label>
              <input
                type="text"
                value={walksPerPeriod}
                onChange={(e) => setWalksPerPeriod(e.target.value)}
                required
                className="border border-[#E1E1E1] rounded-[16px] p-2"
                placeholder="E.g 1-20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Minimum Walk Duration (Optional)</label>
              <input
                type="text"
                value={minWalkDuration}
                onChange={(e) => setMinWalkDuration(e.target.value)}
                className="border border-[#E1E1E1] rounded-[16px] p-2"
                placeholder="E.g 5-12"
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
        onChange={(e) => setSelected(e.target.value)}
        required
      >
        <option value="">Select goal configuration</option>
        {[
          "Total number of walks",
          "Walk per week",
          "Walks on specific days",
          "Time-of-day walks",
        ].map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {renderInputs()}
    </div>
  );
}
