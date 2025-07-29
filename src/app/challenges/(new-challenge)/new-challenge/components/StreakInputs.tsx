'use client';

import React, { useState } from "react";

interface StreakInputsProps {
  configOptions: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function StreakInputs({ configOptions, selected, onSelect }: StreakInputsProps) {
  const [consecutiveDays, setConsecutiveDays] = useState("");
  const [selectedValue, setSelectedValue] = useState(""); // For Yes/No radio
  const [selectedDay, setSelectedDay] = useState<string>("M");
  const [minimumDuration, setMinimumDuration] = useState("");
  const [numberOfWeeks, setNumberOfWeeks] = useState("");
  const [minimumStreakTarget, setMinimumStreakTarget] = useState("");
  const [minimumStreakValue, setMinimumStreakValue] = useState("");
  const [challengeDuration, setChallengeDuration] = useState("");
  const [numberOfStreaks, setNumberOfStreaks] = useState("");
  const [streakLength, setStreakLength] = useState("");
  const [restDays, setRestDays] = useState("");

  const days = ["M", "T", "W", "Th", "F", "S", "Su"];

  const renderInputs = () => {
    switch (selected) {
      case "Consecutive days":
        return (
          <div className="flex flex-col gap-5">
            {/* Consecutive days */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Consecutive Days Target</label>
              <input
                type="text"
                value={consecutiveDays}
                onChange={(e) => setConsecutiveDays(e.target.value)}
                required
                className="border border-[#E1E1E1] rounded-[16px] p-2"
                placeholder="E.g 7"
              />
              <p className="text-[12px]">Number of consecutive days to walk in a row</p>
            </div>

            {/* Joker day */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Allow Joker Day?</label>
              <div className="flex gap-6 items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="jokerDay"
                    value="Yes"
                    checked={selectedValue === "Yes"}
                    onChange={() => setSelectedValue("Yes")}
                    className="h-4 w-4"
                  />
                  <span
                    className={`text-[14px] ${
                      selectedValue === "Yes" ? "text-deepblue font-semibold" : "text-[#8E98A8]"
                    }`}
                  >
                    Yes
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="jokerDay"
                    value="No"
                    checked={selectedValue === "No"}
                    onChange={() => setSelectedValue("No")}
                    className="h-4 w-4"
                  />
                  <span
                    className={`text-[14px] ${
                      selectedValue === "No" ? "text-deepblue font-semibold" : "text-[#8E98A8]"
                    }`}
                  >
                    No
                  </span>
                </label>
              </div>
            </div>
          </div>
        );

      case "Weekly patterns":
        return (
          <div className="flex flex-col gap-5">
            {/* Day selection */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Day Selection</label>
              <div className="flex gap-2">
                {days.map((day) => (
                  <label key={day} className="cursor-pointer">
                    <input
                      type="radio"
                      name="selectedDay"
                      value={day}
                      checked={selectedDay === day}
                      onChange={() => setSelectedDay(day)}
                      className="hidden"
                    />
                    <span
                      className={`h-8 w-8 flex items-center justify-center text-[12px] border rounded-full ${
                        selectedDay === day
                          ? "border-brightblue text-white bg-brightblue"
                          : "text-[#8E98A8] border-[#8E98A8] bg-transparent"
                      }`}
                    >
                      {day}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum duration and number of weeks */}
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">Minimum Walk Duration</label>
                <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                  <input
                    type="text"
                    value={minimumDuration}
                    onChange={(e) => setMinimumDuration(e.target.value)}
                    required
                    className="p-2 w-[60%] outline-none"
                    placeholder="E.g 5-120"
                  />
                  <div className="border-l border-[#E1E1E1] h-full" />
                  <p className="w-[40%] text-center">Minutes</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">Number of weeks</label>
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
          </div>
        );

      case "Longest streak achievement":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">Minimum Streak Target</label>
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
                <label className="text-[16px] text-deepblue">Minimum Streak Value</label>
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
              <label className="text-[16px] text-deepblue">Challenge Duration</label>
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
                <label className="text-[16px] text-deepblue">Number of Streaks</label>
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
                <label className="text-[16px] text-deepblue">Streak Length</label>
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
        required
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
