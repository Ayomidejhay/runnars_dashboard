


"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
import { div } from "framer-motion/client";

/* ------------------ UI Options ------------------ */

const participationOptions = [
  { label: "All users", value: "all_users" as const },
  { label: "New users", value: "new_users" as const },
  { label: "Specific pet type", value: "specific_pet_type" as const },
  { label: "Users with minimum PetFit score", value: "users_with_min_fit_score" as const },
] as const;



const petTypes = [
  { label: "Dog", value: "dog" },
  { label: "Cat", value: "cat" },
  { label: "Reptile", value: "reptile" },
  { label: "Bird", value: "bird" },
  { label: "Others", value: "others" },
]

const petFitScoreRanges = [
  { label: "All scores", value: "all" as const },
  { label: "Low (below 60)", value: "low" as const },
  { label: "Medium (60–79)", value: "medium" as const },
  { label: "High (80–100)", value: "high" as const },
  
];

export default function Reward() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { points, participation, segmentCriteria,  } =
    useChallengeBuilderStore((state) => state.rewards);

    const {touchedSteps, rewards} = useChallengeBuilderStore();
    const showError = touchedSteps[4];

  const setRewards = useChallengeBuilderStore(
    (state) => state.rewardActions.setRewards,
  );

  /* ------------------ Dropzone ------------------ */

  // const onDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     if (!acceptedFiles.length) return;

  //     const file = acceptedFiles[0];
  //     setPreviewUrl(URL.createObjectURL(file));

  //     setRewards({ rewardFile: file });
  //   },
  //   [setRewards],
  // );

  const onDrop = useCallback(
     (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setRewards({ rewardFile: acceptedFiles[0], rewardFileUrl: null });
      }
    },
    [setRewards],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  //  useEffect(() => {
  //     // New image selected (File)
  //     if (rewards.rewardFile) {
  //       const url = URL.createObjectURL(rewards.rewardFile);
  //       setPreviewUrl(url);
  //       return () => URL.revokeObjectURL(url);
  //     }
  
  //     // Existing image from backend (URL)
  //     if (rewards.rewardFileUrl) {
  //       setPreviewUrl(rewards.rewardFileUrl);
  //       return;
  //     }
  
  //     setPreviewUrl(null);
  //   }, [rewards.rewardFile, rewards.rewardFileUrl]);
  
  useEffect(() => {
  let objectUrl: string | null = null;

  // If a new file is selected, use URL.createObjectURL
  if (rewards.rewardFile) {
    objectUrl = URL.createObjectURL(rewards.rewardFile);
    setPreviewUrl(objectUrl);
  } 
  // If editing and there is an existing URL, use it
  else if (rewards.rewardFileUrl) {
    setPreviewUrl(rewards.rewardFileUrl);
  } 
  // No image
  else {
    setPreviewUrl(null);
  }

  return () => {
    // Clean up only the object URL for newly selected files
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  };
}, [rewards.rewardFile, rewards.rewardFileUrl]);



  const participationType = participation.whoCanParticipate;

  

  /* ------------------ Render ------------------ */

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[20px] font-bold text-deepblue">Rewards</p>

      {/* Badge Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">
          Achievement Badge Image <span className="text-[12px] text-[#8E98A8]">(Optional)</span>
        </label>

        {/* <div
          {...getRootProps()}
          className="relative border-2 border-dashed h-[162px] rounded-[8px] p-6 cursor-pointer border-[#1570EF] bg-[#F4F8FD]"
        >
          <input {...getInputProps()} />

          {previewUrl ? (
            <Image src={previewUrl} alt="Badge preview" fill className="rounded-[6px] object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Image src="/document-upload.svg" alt="upload" width={24} height={24} />
              <p className="text-[14px] mt-4">Drag and drop your badge</p>
              <p className="text-[14px] mt-1">512 × 512px recommended.</p>
            </div>
          )}
        </div> */}
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
                  </div>
      </div>

      {/* Points */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">Points</label>
        <input
          type="number"
          className="border border-[#E1E1E1] rounded-md p-2"
          value={points}
          onChange={(e) =>
            setRewards({ points: Number(e.target.value) || 0 })
          }
        />
         {showError && !points && (
            <p className="text-red-500 text-sm">Reward points is required</p>
          )}
      </div>

      {/* Participation */}
      <div className="flex gap-5 items-start">
        <div className="flex-1 border rounded-[16px] px-3 py-4">
          <label className="text-[16px] text-deepblue">Who can participate</label>

          {participationOptions.map((opt) => {
            const selected = participationType === opt.value;

            return (
              <div className="mt-2" key={opt.value}>
                <label
                key={opt.value}
                className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                  selected ? "border-blue-600 bg-blue-50" : "border-gray-300"
                }`}
              >
                <span>{opt.label}</span>

                <input
                  type="radio"
                  checked={selected}
                  className="hidden"
                  onChange={() =>
                    setRewards({
                      participation: { whoCanParticipate: opt.value },
                      segmentCriteria: {
                        petFitScoreRange: "all",
                        specificPetTypes: [],
                      },
                    })
                  }
                />
              </label>
              </div>
            );
          })}
          {showError && !segmentCriteria && (
            <p className="text-red-500 text-sm">Segment criteria is required</p>
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
                  <label key={pet.label} className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={segmentCriteria.specificPetTypes.includes(pet.value)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...segmentCriteria.specificPetTypes, pet.value]
                          : segmentCriteria.specificPetTypes.filter((p) => p !== pet.value);
                        setRewards({
                          segmentCriteria: {
                            petFitScoreRange: "all",
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
            {participationType === "users_with_min_fit_score" && (
              <div className="mt-4 flex flex-col gap-2">
                {petFitScoreRanges.map((range) => (
                  <label key={range.value} className="flex gap-3">
                    <input
                      type="radio"
                      checked={segmentCriteria.petFitScoreRange === range.value}
                      onChange={() =>
                        setRewards({
                          segmentCriteria: {
                            petFitScoreRange: range.value,
                            specificPetTypes: [],
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
  );
}
