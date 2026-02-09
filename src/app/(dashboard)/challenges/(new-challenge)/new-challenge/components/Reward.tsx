"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
import { div } from "framer-motion/client";
import { useImageUpload } from "@/hooks/useImageUpload";

/* ------------------ UI Options ------------------ */

const participationOptions = [
  { label: "All users", value: "all_users" as const },
  { label: "New users", value: "new_users" as const },
  { label: "Specific pet type", value: "specific_pet_type" as const },
  {
    label: "Users with minimum PetFit score",
    value: "users_with_min_fit_score" as const,
  },
] as const;

const petTypes = [
  { label: "Dog", value: "Dog" },
  { label: "Cat", value: "Cat" },
  { label: "Reptile", value: "Reptile" },
  { label: "Bird", value: "Bird" },
  { label: "Others", value: "Others" },
];

const petFitScoreRanges = [
  { label: "All scores", value: "all" as const },
  { label: "Low (below 60)", value: "low" as const },
  { label: "Medium (60–79)", value: "medium" as const },
  { label: "High (80–100)", value: "high" as const },
];

export default function Reward() {
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { points, participation, segmentCriteria } = useChallengeBuilderStore(
    (state) => state.rewards,
  );

  const mode = useChallengeBuilderStore((s) => s.mode);
  const isEditMode = mode === "edit";

  const { touchedSteps, rewards } = useChallengeBuilderStore();
  const showError = touchedSteps[4];

  const setRewards = useChallengeBuilderStore(
    (state) => state.rewardActions.setRewards,
  );

  // Dropzone
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    previewUrl,
    compressing,
    setPreviewFromFile,
    setPreviewFromUrl,
  } = useImageUpload({
    maxUploadSizeMB: 5, // user can select up to 5MB
    maxCompressedSizeMB: 1, // compress to under 1MB
    initialImageUrl: rewards.rewardFileUrl,
    onFileAccepted: (file) => {
      setRewards({ rewardFile: file, rewardFileUrl: null });
      setPreviewFromFile(file);
    },
  });

  useEffect(() => {
    if (!rewards.rewardFile && rewards.rewardFileUrl) {
      setPreviewFromUrl(rewards.rewardFileUrl);
    }

    if (!rewards.rewardFile && !rewards.rewardFileUrl) {
      setPreviewFromUrl(null);
    }
  }, [rewards.rewardFile, rewards.rewardFileUrl, setPreviewFromUrl]);

  const participationType = participation.whoCanParticipate;

  /* ------------------ Render ------------------ */

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[20px] font-bold text-deepblue">Rewards</p>

      {/* Badge Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">
          Achievement Badge Image{" "}
          <span className="text-[12px] text-[#8E98A8]">(Optional)</span>
        </label>

        <div
          {...getRootProps()}
          className="relative border-2 border-dashed h-[162px] rounded-[8px] p-6 cursor-pointer border-[#1570EF] bg-[#F4F8FD]"
        >
          <input {...getInputProps()} />

          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="preview"
              fill
              className="object-cover rounded-[6px]"
            />
          ) : isDragActive ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-blue-600">Drop the image here...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Image
                src="/document-upload.svg"
                alt="upload"
                width={24}
                height={24}
              />
              <p className="text-[14px] mt-4">
                Click or drag to upload preview image
              </p>
              <p className="text-[14px] mt-1">
                (Recommended size: 1200 × 400px)
              </p>
            </div>
          )}

          {/* Compression loader overlay */}
          {compressing && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20 rounded-[6px]">
              <p className="text-deepblue">Compressing image...</p>

              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
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
          value={points}
          onChange={(e) => setRewards({ points: Number(e.target.value) || 0 })}
        />
        {showError && !points && (
          <p className="text-red-500 text-sm">Reward points is required</p>
        )}
      </div>

      {/* Participation */}
      <div className={isEditMode ? "opacity-30 pointer-events-none" : ""}>
        <div className="flex gap-5 items-start">
          
            <div className="flex-1 border rounded-[16px] px-3 py-4">
              <label className="text-[16px] text-deepblue">
                Who can participate
              </label>

              {participationOptions.map((opt) => {
                const selected = participationType === opt.value;

                return (
                  <div className="mt-2" key={opt.value}>
                    <label
                      className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                        selected
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      <span>{opt.label}</span>

                      <input
                        type="radio"
                        disabled={isEditMode}
                        checked={selected}
                        className="hidden"
                        onChange={() => {
                          const nextType = opt.value;

                          // Grab current segmentCriteria from store
                          const { segmentCriteria } = rewards;

                          setRewards({
                            participation: { whoCanParticipate: nextType },
                            segmentCriteria: {
                              petFitScoreRange:
                                nextType === "users_with_min_fit_score"
                                  ? segmentCriteria.petFitScoreRange
                                  : "all", // reset to all if not using petFitScore
                              specificPetTypes:
                                nextType === "specific_pet_type"
                                  ? segmentCriteria.specificPetTypes
                                  : [], // reset if not specific_pet_type
                            },
                          });
                        }}
                      />
                    </label>
                  </div>
                );
              })}

              {showError && !segmentCriteria && (
                <p className="text-red-500 text-sm">
                  Segment criteria is required
                </p>
              )}
            </div>
          

          {/* Segment Criteria */}
          {(participationType === "specific_pet_type" ||
            participationType === "users_with_min_fit_score") && (
            <div className="flex-1 border rounded-[16px] px-3 py-4">
              <label className="text-[16px] font-bold text-deepblue">
                Segment Criteria
              </label>

              {/* Pet Types */}

              {participationType === "specific_pet_type" && (
                <div className="mt-4 flex flex-col gap-2">
                  {petTypes.map((pet) => (
                    <label key={pet.value} className="flex gap-3">
                      <input
                        type="checkbox"
                        disabled={isEditMode}
                        checked={rewards.segmentCriteria.specificPetTypes.includes(
                          pet.value,
                        )}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [
                                ...rewards.segmentCriteria.specificPetTypes,
                                pet.value,
                              ]
                            : rewards.segmentCriteria.specificPetTypes.filter(
                                (p) => p !== pet.value,
                              );

                          setRewards({
                            segmentCriteria: {
                              ...rewards.segmentCriteria,
                              specificPetTypes: updated,
                            },
                          });
                        }}
                      />
                      {pet.label}
                    </label>
                  ))}
                </div>
              )}

              {/* PetFit Score */}
              {/* {participationType === "users_with_min_fit_score" && (
              <div className="mt-4 flex flex-col gap-2">
                {petFitScoreRanges.map((range) => (
                  <label key={range.value} className="flex gap-3">
                    <input
                      type="radio"
                      checked={segmentCriteria.petFitScoreRange === range.value}
                      onChange={() =>
                        setRewards({
                          segmentCriteria: {
                            ...segmentCriteria, // keep specificPetTypes
                            petFitScoreRange: range.value, // only update score range
                          },
                        })
                      }
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            )} */}
              {participationType === "users_with_min_fit_score" && (
                <div className="mt-4 flex flex-col gap-2">
                  {petFitScoreRanges.map((range) => (
                    <label key={range.value} className="flex gap-3">
                      <input
                        type="radio"
                        disabled={isEditMode}
                        checked={
                          rewards.segmentCriteria.petFitScoreRange ===
                          range.value
                        }
                        onChange={() =>
                          setRewards({
                            segmentCriteria: {
                              ...rewards.segmentCriteria,
                              petFitScoreRange: range.value,
                              specificPetTypes: [], // reset pet types when using fit score
                            },
                          })
                        }
                      />
                      {range.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isEditMode && (
        <p className="text-xs text-red-500 mt-2">
          Participation rules cannot be edited after challenge creation.
        </p>
      )}
    </div>
  );
}
