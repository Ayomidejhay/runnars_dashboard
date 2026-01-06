"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const options = [
  "All users",
  "New users",
  "Users with specific pet type",
  "Users with min. petfit score",
];

const petTypes = ["Dog", "Cat", "Reptile", "Bird", "Others"];

const scoreOptions = [
  "Low score (below 60)",
  "Moderate score (60-79)",
  "High score (80 - 100)",
];

export default function Reward({
  rewardSelected,
  setRewardSelected,
  rewardPetType,
  setRewardPetType,
  rewardScore,
  setRewardScore,
  rewardPoints,
  setRewardPoints,
  rewardBreed,
  setRewardBreed,
  rewardTarget,
  setRewardTarget,
  rewardFile,
  setRewardFile,
}: any) {
  // --- Dropzone Setup ---
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) setRewardFile(acceptedFiles[0]);
    },
    [setRewardFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[20px] font-bold text-deepblue">Rewards</p>

      <div className="flex flex-col gap-5">
        {/* Upload Badge Image */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">
            Achievement Badge Image{" "}
            <span className="text-[12px] text-[#8E98A8]">(Optional)</span>
          </label>

          <div
            {...getRootProps()}
            className="relative border-2 border-dashed h-[162px] rounded-[8px] p-6 cursor-pointer transition-all border-[#1570EF] bg-[#F4F8FD]"
          >
            <input {...getInputProps()} />

            {rewardFile ? (
              <Image
                src={URL.createObjectURL(rewardFile)}
                alt="preview"
                fill
                className="rounded-[6px] object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Image
                  src="/document-upload.svg"
                  alt="upload"
                  width={24}
                  height={24}
                />
                <p className="text-[14px] mt-4">Drag and drop your badge</p>
                <p className="text-[14px] mt-1">512 × 512px recommended.</p>
              </div>
            )}
          </div>
        </div>

        {/* Points */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Points</label>
          <input
            type="number"
            className="border border-[#E1E1E1] rounded-md p-2"
            placeholder="E.g 100"
            value={rewardPoints}
            onChange={(e) =>
              setRewardPoints(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>

        {/* Participation */}
        <div className="flex gap-5 items-start">
          {/* Left: Options */}
          <div className="flex-1 border border-[#E1E1E1] rounded-[16px] px-3 py-4">
            <label className="text-[16px] text-deepblue">
              Who can participate
            </label>

            {options.map((option) => {
              const isSelected = rewardSelected === option;

              return (
                <label
                  key={option}
                  className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                    isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <span>{option}</span>

                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isSelected
                        ? "border-2 border-blue-600"
                        : "border border-gray-400"
                    }`}
                  >
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    )}
                  </span>

                  <input
                    type="radio"
                    name="reward-option"
                    value={option}
                    className="hidden"
                    checked={isSelected}
                    onChange={() => setRewardSelected(option)}
                  />
                </label>
              );
            })}
          </div>

          {/* Right: Dynamic Segment */}
          <div className="flex-1 border border-[#E1E1E1] rounded-[16px] px-3 py-4">
            {/* If: Pet Type */}
            {rewardSelected === "Users with specific pet type" && (
              <div className="flex flex-col gap-4">
                <label className="text-[16px] text-deepblue">
                  Segment Criteria
                </label>

                {/* Pet Type */}
                <div className="flex flex-col gap-2">
                  {petTypes.map((pet) => (
                    <label key={pet} className="flex gap-4 cursor-pointer">
                      <input
                        type="radio"
                        name="reward-pet"
                        value={pet}
                        checked={rewardPetType === pet}
                        onChange={() => setRewardPetType(pet)}
                      />
                      <span>{pet}</span>
                    </label>
                  ))}
                </div>

                {/* Breed */}
                <div className="flex flex-col gap-2">
                  <label className="text-[16px] text-deepblue">Breed</label>
                  <select
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={rewardBreed}
                    onChange={(e) => setRewardBreed(e.target.value)}
                  >
                    <option value="">Select breed...</option>
                    <option>Breed A</option>
                    <option>Breed B</option>
                    <option>Breed C</option>
                  </select>
                </div>
              </div>
            )}

            {/* If: Score */}
            {rewardSelected === "Users with min. petfit score" && (
              <div className="flex flex-col gap-4">
                <label className="text-[16px] text-deepblue font-bold">
                  Segment Criteria
                </label>

                {scoreOptions.map((score) => (
                  <label key={score} className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="reward-score"
                      value={score}
                      checked={rewardScore === score}
                      onChange={() => setRewardScore(score)}
                    />
                    <span>{score}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Geographic Target */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">
            Geographic Targeting
          </label>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={rewardTarget}
            onChange={(e) => setRewardTarget(e.target.value)}
          >
            <option>Global (Available worldwide)</option>
            <option>Region A</option>
            <option>Region B</option>
            <option>Region C</option>
          </select>
        </div>
      </div>
    </div>
  );
}
