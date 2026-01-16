'use client';

import React, { useState } from "react";

interface FrequencyInputsProps {
  configOptions: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function FrequencyInputs({ configOptions, selected, onSelect }: FrequencyInputsProps) {
  // Shared states
  const [numberOfWalks, setNumberOfWalks] = useState("");
  const [minimumDuration, setMinimumDuration] = useState(""); // optional
  const [walksPerWeek, setWalksPerWeek] = useState("");
  const [numberOfWeeks, setNumberOfWeeks] = useState("");
  const [selectedDay, setSelectedDay] = useState<string>("M");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Morning");
  const [timeRange, setTimeRange] = useState("");
  const [walksPerPeriod, setWalksPerPeriod] = useState("");

  const days = ["M", "T", "W", "Th", "F", "S", "Su"];
  const periods = ["Morning", "Midday", "Evening"];

  const renderInputs = () => {
    switch (selected) {
      case "Total number of walks":
        return (
          <div className="flex flex-row-reverse justify-between items-start gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Minimum Walk Duration (Optional)</label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                <input
                  type="text"
                  value={minimumDuration}
                  onChange={(e) => setMinimumDuration(e.target.value)}
                  className="p-2 w-[60%] outline-none"
                  placeholder="E.g 1-20"
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[40%] text-center">Kilometer</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Number of Walks to Complete</label>
              <input
                type="text"
                value={numberOfWalks}
                onChange={(e) => setNumberOfWalks(e.target.value)}
                required
                className="border border-[#E1E1E1] rounded-[16px] p-2"
                placeholder="E.g 1-50"
              />
            </div>
          </div>
        );

      case "Walk per week":
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
                  value={minimumDuration}
                  onChange={(e) => setMinimumDuration(e.target.value)}
                  className="p-2 w-[60%] outline-none"
                  placeholder="E.g 5-12"
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[40%] text-center">Minutes</p>
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
                  value={minimumDuration}
                  onChange={(e) => setMinimumDuration(e.target.value)}
                  className="p-2 w-[80%] outline-none"
                  placeholder="E.g 5-12"
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[20%] text-center">Minutes</p>
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
                      checked={selectedPeriod === period}
                      onChange={() => setSelectedPeriod(period)}
                      className="hidden"
                    />
                    <span
                      className={`w-[79px] h-[40px] flex items-center justify-center text-[12px] border rounded-[8px] ${
                        selectedPeriod === period
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
                value={minimumDuration}
                onChange={(e) => setMinimumDuration(e.target.value)}
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