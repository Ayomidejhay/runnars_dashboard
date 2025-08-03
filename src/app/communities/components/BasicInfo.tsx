"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

type BasicInfoProps = {
  selectedPet: string;
  setSelectedPet: (value: string) => void;
  communityName: string;
  setCommunityName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  weeklyActivities: string;
  setWeeklyActivities: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  hashtags: string[];
  setHashtags: React.Dispatch<React.SetStateAction<string[]>>;
  guidelines: string[];
  setGuidelines: React.Dispatch<React.SetStateAction<string[]>>;
};


const PetTypes = [
  "🐶 Dog",
  "😽 Cat",
  "🐥 Bird",
  "🐠 Fish",
  "🐍 Reptile",
  "🫘 Others",
];

export default function BasicInfo({
  selectedPet,
  setSelectedPet,
  communityName,
  setCommunityName,
  description,
  setDescription,
  weeklyActivities,
  setWeeklyActivities,
  file,
  setFile,
  hashtags,
  setHashtags,
  guidelines,
  setGuidelines
}: BasicInfoProps) {
  

  // Dropzone
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

  // Hashtags
  const [inputValue, setInputValue] = useState('')
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "," || e.key === "Enter") && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().replace(/,$/, "");
      if (
        newTag &&
        hashtags.length < 3 &&
        !hashtags.includes(newTag.toLowerCase())
      ) {
        setHashtags([...hashtags, newTag]);
      }
      setInputValue("");
    }
  };
  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  // Guidelines
  
  const handleEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const lastLine = guidelines[guidelines.length - 1].trim();
      if (lastLine !== "") {
        setGuidelines((prev) => [...prev, ""]);
      }
    }
  };
  const handleGuidelineChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const lines = e.target.value
      .split("\n")
      .map((line) => line.replace(/^•\s?/, ""));
    setGuidelines(lines);
  };
  const textareaValue = "• " + guidelines.join("\n• ");

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[20px] font-bold text-deepblue">Basic Info</p>
      <div className="flex flex-col gap-5">
        {/* Community Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Community Name</label>
          <input
            type="text"
            className="border border-[#E1E1E1] rounded-md p-2"
            placeholder="Enter community name"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
            required
          />
        </div>

        {/* Pet Type */}
        <div className="px-3 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-deepblue">Pet Type</label>
            <div className="grid grid-cols-3 gap-4">
              {PetTypes.map((option) => {
                const isSelected = selectedPet === option;
                return (
                  <label
                    key={option}
                    className={`flex items-center gap-1 border justify-center rounded-lg px-4 py-3 cursor-pointer ${
                      isSelected
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <span className="text-gray-800">{option}</span>
                    <input
                      type="radio"
                      name="pet-type"
                      value={option}
                      checked={isSelected}
                      onChange={() => setSelectedPet(option)}
                      className="hidden"
                      required
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Description</label>
          <textarea
            className="border border-[#E1E1E1] rounded-md p-2 h-[162px] resize-none"
            placeholder="Tell others what your community is about..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Weekly Activities */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Weekly Activities</label>
          <input
            type="text"
            className="border border-[#E1E1E1] rounded-md p-2"
            placeholder="e.g Weekly walks on Saturdays at 10 AM"
            value={weeklyActivities}
            onChange={(e) => setWeeklyActivities(e.target.value)}
            required
          />
        </div>

        {/* Hashtags */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Hashtags</label>
          <div className="relative border border-[#E1E1E1] w-full min-h-[90px] rounded-md p-2">
            <div className="flex flex-wrap gap-2 mt-1">
              {hashtags.map((tag) => (
                <div
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  #{tag}
                  <button
                    onClick={() => removeHashtag(tag)}
                    className="text-red-500 font-bold ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {hashtags.length < 3 && (
              <input
                type="text"
                className="w-full outline-none border-none mt-2"
                placeholder="Type and press comma or Enter..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            )}
            <p className="absolute bottom-1 right-2 text-sm text-gray-500">
              {hashtags.length}/3
            </p>
          </div>
        </div>

        {/* Cover Image */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Cover Image</label>
          <div>
            <div
              {...getRootProps()}
              className="relative border-2 border-dashed h-[162px] rounded-[8px] p-6 cursor-pointer transition-all border-[#1570EF] bg-[#F4F8FD]"
            >
              <input {...getInputProps()} required />
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
                    Click or drag to upload preview image
                  </p>
                  <p className="text-[14px] mt-1">
                    (Recommended size: 1200x400px)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Community Guidelines</label>
          <div>
            <textarea
              className="border border-[#E1E1E1] rounded-md p-2 h-[106px] w-full resize-none"
              placeholder="Clicking “Enter” creates a bulleted list format for your text"
              value={textareaValue}
              onChange={handleGuidelineChange}
              onKeyDown={handleEnterKey}
              required
            />
            <p className="text-[12px]">
              Press “Enter” to create a bulleted list
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
