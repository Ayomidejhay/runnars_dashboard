'use client';

import React, { useState } from "react";

interface PhotoInputsProps {
  configOptions: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function PhotoInputs({ configOptions, selected, onSelect }: PhotoInputsProps) {
  const [numberOfPhotos, setNumberOfPhotos] = useState("");
  const [challengeDuration, setChallengeDuration] = useState("");
  const [frequency, setFrequency] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleSelection = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const renderInputs = () => {
    switch (selected) {
      case "Total photo uploads":
        return (
          <div className="flex flex-col gap-5">
            {/* Number of photos */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Number of photos</label>
              <input
                type="number"
                value={numberOfPhotos}
                onChange={(e) => setNumberOfPhotos(e.target.value)}
                required
                className="border border-[#E1E1E1] rounded-[16px] p-2"
                placeholder="E.g 7"
              />
              <p className="text-[12px]">
                Total number of photos to upload during the challenge
              </p>
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">
                Photo Requirements <span className="text-[12px] text-[#8E98A8]">(Multiple selection)</span>
              </label>
              {["Pet must be visible", "Must be taken during walk", "Location tagged", "Caption required"].map(
                (option) => (
                  <label key={option} className="flex items-center gap-2 text-[14px] cursor-pointer">
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedOptions.includes(option)}
                      onChange={() => toggleSelection(option)}
                      className="h-4 w-4 accent-brightblue"
                    />
                    <span>{option}</span>
                  </label>
                )
              )}
            </div>
          </div>
        );

      case "Daily/weekly photo challenge":
        return (
          <div className="flex flex-col gap-5">
            {/* Challenge Duration */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Challenge Duration</label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                <input
                  type="text"
                  value={challengeDuration}
                  onChange={(e) => setChallengeDuration(e.target.value)}
                  required
                  className="p-2 w-[80%] outline-none"
                  placeholder="E.g 7-30"
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[20%] text-center">Days</p>
              </div>
            </div>

            {/* Frequency */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                required
                className="p-2 w-full rounded-[16px] border outline-none"
              >
                <option value="">Select</option>
                {["1-3", "4-6", "7-9", "10-12"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">
                Photo Requirements <span className="text-[12px] text-[#8E98A8]">(Multiple selection)</span>
              </label>
              {["Pet must be visible", "Must be taken during walk", "Location tagged", "Caption required"].map(
                (option) => (
                  <label key={option} className="flex items-center gap-2 text-[14px] cursor-pointer">
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedOptions.includes(option)}
                      onChange={() => toggleSelection(option)}
                      className="h-4 w-4 accent-brightblue"
                    />
                    <span>{option}</span>
                  </label>
                )
              )}
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
