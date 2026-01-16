'use client';

import React, { useState } from "react";

interface TimeInputsProps {
  configOptions: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function TimeInputs({ configOptions, selected, onSelect }: TimeInputsProps) {
  const [totalWalkingTime, setTotalWalkingTime] = useState("");
  const [distancePerWeek, setDistancePerWeek] = useState("");
  const [numberOfWalks, setNumberOfWalks] = useState("");
  const [distancePerWalk, setDistancePerWalk] = useState("");
  const [startDistance, setStartDistance] = useState("");
  const [weeklyIncrease, setWeeklyIncrease] = useState("");
  const [weeks, setWeeks] = useState("");

  const renderInputs = () => {
    switch (selected) {
      case "Total time spent walking":
        return (
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[16px] text-deepblue">Total walking time</label>
            <div className="border border-[#E1E1E1] rounded-[16px] flex items-center w-full">
              <input
                type="text"
                value={totalWalkingTime}
                onChange={(e) => setTotalWalkingTime(e.target.value)}
                required
                className="p-2 w-[80%] outline-none"
                placeholder="E.g 10"
              />
              <div className="border-l border-[#E1E1E1] h-full" />
              <p className="w-[20%] text-center">Minutes</p>
            </div>
          </div>
        );

      case "Time per walk":
        return (
          <div className="flex justify-between items-center gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Distance per week</label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                <input
                  type="text"
                  value={distancePerWeek}
                  onChange={(e) => setDistancePerWeek(e.target.value)}
                  required
                  className="p-2 w-[60%] outline-none"
                  placeholder="E.g 200"
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[40%] text-center">Kilometer</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Number of walks</label>
              <input
                type="text"
                value={numberOfWalks}
                onChange={(e) => setNumberOfWalks(e.target.value)}
                required
                className="border border-[#E1E1E1] rounded-[16px] p-2"
                placeholder="E.g 1-12"
              />
            </div>
          </div>
        );

      case "Weekly walking time":
        return (
          <div className="flex justify-between items-center gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Distance per walk</label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                <input
                  type="text"
                  value={distancePerWalk}
                  onChange={(e) => setDistancePerWalk(e.target.value)}
                  required
                  className="p-2 w-[60%] outline-none"
                  placeholder="E.g 0.5-20"
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[40%] text-center">Kilometer</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Number of walks</label>
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

      case "Progressive duration increase":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">Start distance</label>
                <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                  <input
                    type="text"
                    value={startDistance}
                    onChange={(e) => setStartDistance(e.target.value)}
                    required
                    className="p-2 w-[60%] outline-none"
                    placeholder="E.g 1-50"
                  />
                  <div className="border-l border-[#E1E1E1] h-full" />
                  <p className="w-[40%] text-center">Kilometer</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">Weekly increase</label>
                <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                  <input
                    type="text"
                    value={weeklyIncrease}
                    onChange={(e) => setWeeklyIncrease(e.target.value)}
                    required
                    className="p-2 w-[60%] outline-none"
                    placeholder="E.g 1-10"
                  />
                  <div className="border-l border-[#E1E1E1] h-full" />
                  <p className="w-[40%] text-center">Kilometer</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Duration (weeks)</label>
              <input
                type="number"
                value={weeks}
                onChange={(e) => setWeeks(e.target.value)}
                required
                className="border border-[#E1E1E1] rounded-md p-2"
                placeholder="E.g 4"
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