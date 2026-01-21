"use client";

import React, { useState, useEffect } from "react";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
import { distance } from "framer-motion";

const goalConfigurations = [
  "Total distance(Cumulative throughout challenge)",
  "Weekly distance(Maintain each week)",
  "Per-walk distance(Maintain per week)",
  "Progressive distance(Increases over time)",
];

export default function DistanceInputs() {
  const { goalsAndMetrics, setDistanceConfig } = useChallengeBuilderStore();


  const [configurationType, setConfigurationType] = useState<string>("");

  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (!configurationType) return;

    setDistanceConfig({
      configurationType,
      config: form,
    });
  }, [configurationType, form, setDistanceConfig]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[16px] text-deepblue">Goal Configuration</label>

      <select
        className="w-full border p-2 rounded mb-4"
        value={configurationType}
        onChange={(e) => {
          setConfigurationType(e.target.value);
          setForm({});
        }}
        required
      >
        <option value="">Select goal configuration</option>
        {goalConfigurations.map((goal) => (
          <option key={goal} value={goal}>
            {goal}
          </option>
        ))}
      </select>

      {configurationType ===
        "Total distance(Cumulative throughout challenge)" && (
        <div className="rounded-[16px] p-4 border border-[#E1E1E1] w-full">
          <p className="text-[14px] text-deepblue mb-2">Target value</p>
          <div className="flex justify-between items-center gap-5">
            {/* Distance */}
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Distance</label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center w-full">
                
                <input
                  className="p-2 w-[80%] outline-none"
                  placeholder="E.g 10"
                  required
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      targetDistance: Number(e.target.value),
                    }))
                  }
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[20%] text-center text-[10px]">Miles</p>
              </div>
            </div>

            {/* Walks */}
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">
                Number of walks
              </label>
            
              <input
                placeholder="E.g 12"
                required
                className="border border-[#E1E1E1] rounded-[16px] p-2 w-full"
                onChange={(e) =>
                  setForm((f: any) => ({
                    ...f,
                    numberOfWalks: Number(e.target.value),
                  }))
                }
              />
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">Duration</label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center w-full">
              
                <input
                  placeholder="E.g 10"
                  className="p-2 w-[80%] outline-none"
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      duration: Number(e.target.value),
                    }))
                  }
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[20%] text-center text-[12px]">Mins</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {configurationType === "Weekly distance(Maintain each week)" && (
        <div className="flex justify-between items-center gap-5">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[16px] text-deepblue">
              Distance per week
            </label>
            <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
            
              <input
                placeholder="E.g 200"
                className="p-2 w-[80%] outline-none"
                onChange={(e) =>
                  setForm((f: any) => ({
                    ...f,
                    distancePerWeek: Number(e.target.value),
                  }))
                }
              />
              <div className="border-l border-[#E1E1E1] h-full" />
              <p className="w-[20%] text-center text-[10px]">Miles</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[16px] text-deepblue">Number of walks</label>
           
            <input
              placeholder="E.g 10"
              className="border border-[#E1E1E1] rounded-[16px] p-2"
              onChange={(e) =>
                setForm((f: any) => ({
                  ...f,
                  numberOfWalks: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>
      )}
      {configurationType === "Per-walk distance(Maintain per week)" && (
        <div className="flex justify-between items-center gap-5">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[16px] text-deepblue">
              Distance per walk
            </label>
            <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
             
              <input
                placeholder="E.g 10"
                className="p-2 w-[80%] outline-none"
                onChange={(e) =>
                  setForm((f: any) => ({
                    ...f,
                    distancePerWalk: Number(e.target.value),
                  }))
                }
              />
              <div className="border-l border-[#E1E1E1] h-full" />
              <p className="w-[20%] text-center text-[10px]">Miles</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[16px] text-deepblue">Number of walks</label>
           
            <input
              placeholder="E.g 10"
              className="border border-[#E1E1E1] rounded-[16px] p-2"
              onChange={(e) =>
                setForm((f: any) => ({
                  ...f,
                  walksPerWeek: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>
      )}
      {configurationType === "Progressive distance(Increases over time)" && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">
                Start distance
              </label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
              
                <input
                  placeholder="E.g 10"
                  className="p-2 w-[80%] outline-none"
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      startDistance: Number(e.target.value),
                    }))
                  }
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[20%] text-center text-[10px]">Miles</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">
                Weekly increase
              </label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                
                <input
                  placeholder="E.g 10"
                  className="p-2 w-[80%] outline-none"
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      weeklyIncrease: Number(e.target.value),
                    }))
                  }
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[20%] text-center text-[10px]">Miles</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-deepblue">
              Duration (weeks)
            </label>
            
            <input
              placeholder="E.g 10"
              className="border border-[#E1E1E1] rounded-md p-2"
              onChange={(e) =>
                setForm((f: any) => ({
                  ...f,
                  durationWeeks: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
