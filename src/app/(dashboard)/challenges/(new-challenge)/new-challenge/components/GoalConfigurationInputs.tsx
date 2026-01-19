'use client';

import React, { useState, useEffect } from "react";

// types for the component's props
interface GoalConfigurationInputsProps {
  selectedConfiguration: string;
}

export default function GoalConfigurationInputs({ selectedConfiguration }: GoalConfigurationInputsProps) {
  // States for inputs within Goal Configuration
  const [distance, setDistance] = useState<string>("");
  const [numberOfWalks, setNumberOfWalks] = useState<string>("");
  const [totalWalks, setTotalWalks] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [distancePerWeek, setDistancePerWeek] = useState<string>("");
  const [walksPerWeek, setWalksPerWeek] = useState<string>("");
  const [distancePerWalk, setDistancePerWalk] = useState<string>("");
  const [startDistance, setStartDistance] = useState<string>("");
  const [weeklyIncrease, setWeeklyIncrease] = useState<string>("");
  const [durationWeeks, setDurationWeeks] = useState<string>(""); 

  // Reset states when selectedConfiguration changes
  useEffect(() => {
    setDistance("");
    setNumberOfWalks("");
    setDuration("");
    setDistancePerWeek("");
    setWalksPerWeek("");
    setDistancePerWalk("");
    setStartDistance("");
    setWeeklyIncrease("");
    setDurationWeeks("");
    setTotalWalks("");
  }, [selectedConfiguration]);

  const renderInputs = () => {
    switch (selectedConfiguration) {
      case "Total distance(Cumulative throughout challenge)":
        return (
          <div className="rounded-[16px] p-4 border border-[#E1E1E1] w-full">
            <p className="text-[14px] text-deepblue mb-2">Target value</p>
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">Distance</label>
                <div className="border border-[#E1E1E1] rounded-[16px] flex items-center w-full">
                  <input
                    type="text"
                    className="p-2 w-[60%] outline-none"
                    placeholder="E.g 10"
                    value={distance}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDistance(e.target.value)}
                    required 
                  />
                  <div className="border-l border-[#E1E1E1] h-full" />
                  <p className="w-[40%] text-center">Kilometer</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">
                  Number of walks
                </label>
                <div className="border border-[#E1E1E1] rounded-[16px] w-full">
                  <input
                    type="text"
                    className="p-2 w-full outline-none"
                    placeholder="E.g 1-12"
                    value={numberOfWalks}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumberOfWalks(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">Duration</label>
                <div className="border border-[#E1E1E1] rounded-[16px] flex items-center w-full">
                  <input
                    type="text"
                    className="p-2 w-[60%] outline-none"
                    placeholder="E.g 10"
                    value={duration}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDuration(e.target.value)}
                    required
                  />
                  <div className="border-l border-[#E1E1E1] h-full" />
                  <p className="w-[40%] text-center">Minutes</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Weekly distance(Maintain each week)":
        return (
          <div className="flex justify-between items-center gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">
                Distance per week
              </label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                <input
                  type="text"
                  className="p-2 w-[60%] outline-none"
                  placeholder="E.g 200"
                  value={distancePerWeek}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDistancePerWeek(e.target.value)}
                  required 
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[40%] text-center">Kilometer</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">
                Number of walks
              </label>
              <div className="border border-[#E1E1E1] rounded-[16px]">
                <input
                  type="text"
                  className="p-2"
                  placeholder="E.g 1-12"
                  value={walksPerWeek}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWalksPerWeek(e.target.value)}
                  required 
                />
              </div>
            </div>
          </div>
        );
      case "Per-walk distance(Maintain per week)":
        return (
          <div className="flex justify-between items-center gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">
                Distance per walk
              </label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                <input
                  type="text"
                  className="p-2 w-[60%] outline-none"
                  placeholder="E.g 0.5-20"
                  value={distancePerWalk}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDistancePerWalk(e.target.value)}
                  required 
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[40%] text-center">Kilometer</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">
                Number of walks
              </label>
              <div className="border border-[#E1E1E1] rounded-[16px]">
                <input
                  type="text"
                  className="p-2"
                  placeholder="E.g 1-50"
                  value={totalWalks}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotalWalks(e.target.value)}
                  required 
                />
              </div>
            </div>
          </div>
        );
      case "Progressive distance(Increases over time)":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">
                  Start distance
                </label>
                <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                  <input
                    type="text"
                    className="p-2 w-[60%] outline-none"
                    placeholder="E.g 1-50"
                    value={startDistance}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDistance(e.target.value)}
                    required 
                  />
                  <div className="border-l border-[#E1E1E1] h-full" />
                  <p className="w-[40%] text-center">Kilometer</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">
                  Weekly increase
                </label>
                <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                  <input
                    type="text"
                    className="p-2 w-[60%] outline-none"
                    placeholder="E.g 1-10"
                    value={weeklyIncrease}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeeklyIncrease(e.target.value)}
                    required 
                  />
                  <div className="border-l border-[#E1E1E1] h-full" />
                  <p className="w-[40%] text-center">Kilometer</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">
                Duration (weeks)
              </label>
              <input
                type="number"
                className="border border-[#E1E1E1] rounded-md p-2"
                placeholder="E.g 4"
                value={durationWeeks}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDurationWeeks(e.target.value)}
                required 
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderInputs()}</>;
}