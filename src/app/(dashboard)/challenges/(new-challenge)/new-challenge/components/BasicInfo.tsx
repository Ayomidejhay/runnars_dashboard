"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface Props {
  challengeName: string;
  challengeType: string;
  description: string;
  file: File | null;
  setBasicInfo: React.Dispatch<
    React.SetStateAction<{
      challengeName: string;
      challengeType: string;
      description: string;
      file: File | null;
    }>
  >;
}

export default function BasicInfo({
  challengeName,
  challengeType,
  description,
  file,
  setBasicInfo,
}: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setBasicInfo((prev) => ({ ...prev, file: acceptedFiles[0] }));
      }
    },
    [setBasicInfo]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[20px] font-bold text-deepblue">Basic Info</p>

      <div className="flex flex-col gap-5">
        {/* Challenge Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Challenge Name</label>
          <input
            type="text"
            value={challengeName}
            onChange={(e) =>
              setBasicInfo((prev) => ({
                ...prev,
                challengeName: e.target.value,
              }))
            }
            className="border border-[#E1E1E1] rounded-md p-2"
            placeholder="E.g Summer Dog Walking Challenge"
          />
        </div>

        {/* Challenge Type */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Challenge type</label>
          <select
            value={challengeType}
            onChange={(e) =>
              setBasicInfo((prev) => ({
                ...prev,
                challengeType: e.target.value,
              }))
            }
            className="border border-[#E1E1E1] rounded-md p-2"
          >
            <option value="">Select</option>
            <option value="walk">Walk</option>
            <option value="social">Social</option>
            <option value="health">Health</option>
            <option value="training">Training</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Description</label>
          <textarea
            value={description}
            onChange={(e) =>
              setBasicInfo((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="border border-[#E1E1E1] rounded-md p-2 h-[162px] resize-none"
            placeholder="Type here"
          />
        </div>

        {/* Cover Image */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Cover Image</label>

          <div
            {...getRootProps()}
            className="relative border-2 border-dashed h-[162px] rounded-[8px] p-6 cursor-pointer border-[#1570EF] bg-[#F4F8FD]"
          >
            <input {...getInputProps()} />

            {file ? (
              <Image
                src={URL.createObjectURL(file)}
                alt="preview"
                fill
                className="object-cover rounded-[6px]"
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
                  Click or drag to upload preview image
                </p>
                <p className="text-[14px] mt-1">(Recommended size: 1200x400px)</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
