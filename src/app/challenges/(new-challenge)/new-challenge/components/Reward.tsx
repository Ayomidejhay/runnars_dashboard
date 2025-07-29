"use client";

import React, { useState, useCallback } from "react";
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

export default function RewardsForm() {
  // --- State Hooks ---
  const [selected, setSelected] = useState<string>("All users");
  const [selectedPetType, setSelectedPetType] = useState<string>("");
  const [selectedScore, setSelectedScore] = useState<string>("");
  const [points, setPoints] = useState<number | "">("");
  const [breed, setBreed] = useState<string>("");
  const [geographicTarget, setGeographicTarget] = useState<string>(
    "Global (Available worldwide)"
  );

  const [file, setFile] = useState<File | null>(null);

  // --- Dropzone Setup ---
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[20px] font-bold text-deepblue">Rewards</p>

      <div className="flex flex-col gap-5">
        {/* --- Badge Image Upload --- */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">
            Achievement Badge Image{" "}
            <span className="text-[12px] text-[#8E98A8]">(Optional)</span>
          </label>
          <div>
            <div
              {...getRootProps()}
              className="relative border-2 border-dashed h-[162px] rounded-[8px] p-6 cursor-pointer transition-all border-[#1570EF] bg-[#F4F8FD]"
            >
              <input {...getInputProps()} />
              {file ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[6px]"
                />
              ) : isDragActive ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-blue-600">Drop the image here...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Image
                    src="/document-upload.svg"
                    alt="upload"
                    width={24}
                    height={24}
                  />
                  <p className="text-[14px] mt-4">
                    Drag and drop your badge here
                  </p>
                  <p className="text-[14px] mt-1">
                    512 × 512px recommended. PNG or SVG preferred. Max 2MB.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Points Input --- */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Points</label>
          <input
            type="number"
            className="border border-[#E1E1E1] rounded-md p-2"
            placeholder="E.g 100"
            value={points}
            onChange={(e) =>
              setPoints(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>

        {/* --- Participation & Dynamic Segment --- */}
        <div className="flex gap-5 items-start">
          {/* LEFT: Who can participate */}
          <div className="flex-1 border border-[#E1E1E1] rounded-[16px] px-3 py-4">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">
                Who can participate
              </label>

              {options.map((option) => {
                const isSelected = selected === option;
                return (
                  <label
                    key={option}
                    className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                      isSelected
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <span className="text-gray-800">{option}</span>

                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isSelected
                          ? "border-2 border-blue-600"
                          : "border border-gray-400"
                      }`}
                    >
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white"></span>
                      )}
                    </span>

                    <input
                      type="radio"
                      name="who-can-participate"
                      value={option}
                      checked={isSelected}
                      onChange={() => setSelected(option)}
                      className="hidden"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Segment Criteria */}
          <div className="flex-1 border border-[#E1E1E1] rounded-[16px] px-3 py-4">
            {/* Case 1: Pet Type */}
            {selected === "Users with specific pet type" && (
              <div className="flex flex-col gap-4">
                <label className="text-[16px] text-deepblue">
                  Segment Criteria
                </label>

                <div className="flex flex-col gap-2">
                  {petTypes.map((pet) => (
                    <label
                      key={pet}
                      className="flex items-center gap-4 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="pet-type"
                        value={pet}
                        checked={selectedPetType === pet}
                        onChange={() => setSelectedPetType(pet)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-800">{pet}</span>
                    </label>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[16px] text-deepblue">Breed</label>
                  <select
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                  >
                    <option value="">Select breed...</option>
                    <option>Breed A</option>
                    <option>Breed B</option>
                    <option>Breed C</option>
                  </select>
                </div>
              </div>
            )}

            {/* Case 2: Score */}
            {selected === "Users with min. petfit score" && (
              <div className="flex flex-col gap-4">
                <label className="text-[16px] text-deepblue font-bold">
                  Segment Criteria
                </label>

                <div className="flex flex-col gap-2">
                  {scoreOptions.map((score) => (
                    <label
                      key={score}
                      className="flex items-center gap-4 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="score"
                        value={score}
                        checked={selectedScore === score}
                        onChange={() => setSelectedScore(score)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-800">{score}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Case 3: Disabled */}
            {selected !== "Users with specific pet type" &&
              selected !== "Users with min. petfit score" && (
                <div className="flex flex-col gap-4 opacity-50 pointer-events-none">
                  <label className="text-[16px] text-deepblue font-bold">
                    Segment Criteria
                  </label>

                  <div className="flex flex-col gap-2">
                    {scoreOptions.map((score) => (
                      <label key={score} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="score-disabled"
                          disabled
                          className="w-4 h-4 text-gray-400"
                        />
                        <span className="text-gray-800">{score}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* --- Geographic Targeting --- */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">
            Geographic Targeting
          </label>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={geographicTarget}
            onChange={(e) => setGeographicTarget(e.target.value)}
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
