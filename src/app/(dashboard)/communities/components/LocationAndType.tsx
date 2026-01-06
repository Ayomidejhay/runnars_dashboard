"use client";

import React from "react";

type Props = {
  primaryLocation: string;
  setPrimaryLocation: (value: string) => void;
  selectedPrivacy: string;
  setSelectedPrivacy: (value: string) => void;
};

const LocationAndType = ({
  primaryLocation,
  setPrimaryLocation,
  selectedPrivacy,
  setSelectedPrivacy,
}: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[20px] font-bold text-deepblue">Location & Type</p>

      <div className="flex flex-col gap-5">
        {/* Primary Location */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Primary Location</label>
          <input
            type="text"
            className="border border-[#E1E1E1] rounded-md p-2"
            placeholder="Enter primary location"
            value={primaryLocation}
            onChange={(e) => setPrimaryLocation(e.target.value)}
            required
          />
        </div>

        {/* Privacy Settings */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Privacy Settings</label>

          {[
            {
              title: "Public",
              description: "Anyone can join instantly",
            },
            {
              title: "Invite-only",
              description: "Members need admin approval to join",
            },
          ].map((option) => {
            const isSelected = selectedPrivacy === option.title;

            return (
              <label
                key={option.title}
                className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-deepblue font-medium">{option.title}</span>
                  <span className="text-gray-600 text-sm">{option.description}</span>
                </div>

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
                  name="privacy-setting"
                  value={option.title}
                  checked={isSelected}
                  onChange={() => setSelectedPrivacy(option.title)}
                  className="hidden"
                  required
                />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LocationAndType;
