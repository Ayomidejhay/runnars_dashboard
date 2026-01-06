"use client";

import React, { useEffect, useState } from "react";
import { mockPetChallenges } from "@/mockdata";

const mainOptions = [
  "All users",
  "Specific user segment",
  "Users in a specific community",
  "Users in a specific challenge",
];

const segmentDropdownOptions = [
  "Petfit score range",
  "Walk activity level",
  "Streak status",
  "Onboarding status",
  "Engagement level",
  "Pet type",
];

const segmentCriteriaMap: Record<string, string[]> = {
  "Petfit score range": [
    "Low score (Below 60)",
    "Moderate score (60-79)",
    "High score (80-100)",
  ],
  "Walk activity level": [
    "Highly active",
    "Moderately active",
    "Inactive",
  ],
  "Streak status": ["Active streak", "Broken streak"],
  "Onboarding status": ["New users", "Incomplete profile"],
  "Engagement level": ["High engagers", "Low engagers"],
  "Pet type": ["Dog", "Cat", "Reptiles", "Birds", "Others"],
};

const communityNames = [
  "Dog Lovers",
  "Fit Pet Parents",
  "Morning Walkers",
  "Active Companions",
];

const communityMemberTypes = [
  "All community members",
  "Active members only",
  "Community admin",
  "Inactive members",
];

const challengeNames = [
  "10K Steps Challenge",
  "Weekly Walkathon",
  "PetFit Sprint",
  "Health Boost 30",
];

const participantStatuses = [
  "All participants",
  "Active participants",
  "Completed challenge",
  "At risk (no activity)",
];

export default function AudienceSelector() {
   const [selectedMain, setSelectedMain] = useState(mainOptions[0]);
  const [selectedSegment, setSelectedSegment] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [selectedCommunityType, setSelectedCommunityType] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [selectedParticipantStatus, setSelectedParticipantStatus] = useState("");

  const isSegmentActive = selectedMain === "Specific user segment";
  const isCommunityActive = selectedMain === "Users in a specific community";
  const isChallengeActive = selectedMain === "Users in a specific challenge";


    // Auto-select first option when main selection changes
  useEffect(() => {
    if (isSegmentActive) {
      setSelectedSegment(segmentDropdownOptions[0]);
    }
    if (isCommunityActive) {
      setSelectedCommunity(communityNames[0]);
      setSelectedCommunityType(communityMemberTypes[0]);
    }
    if (isChallengeActive) {
      setSelectedChallenge(challengeNames[0]);
      setSelectedParticipantStatus(participantStatuses[0]);
    }
  }, [selectedMain]);

  // Auto-select first radio in segment criteria
  useEffect(() => {
    if (selectedSegment) {
      const firstOption = segmentCriteriaMap[selectedSegment]?.[0] || "";
      setSelectedSubOption(firstOption);
    }
  }, [selectedSegment]);
  return (
    <div className="flex gap-5 items-start">
      {/* LEFT: Main Audience Options */}
      <div className="flex-1 border border-[#E1E1E1] rounded-[16px] px-3 py-4">
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Target Audience</label>

          {mainOptions.map((option) => {
            const isSelected = selectedMain === option;

            return (
              <label
                key={option}
                className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <span className="text-deepblue text-[12px]">{option}</span>

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
                  name="main-audience"
                  value={option}
                  checked={isSelected}
                  onChange={() => {
                    setSelectedMain(option);
                    // Reset state on change
                    setSelectedSegment("");
                    setSelectedSubOption("");
                    setSelectedCommunity("");
                    setSelectedCommunityType("");
                    setSelectedChallenge("");
                    setSelectedParticipantStatus("");
                  }}
                  className="hidden"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Dynamic Options */}
      <div
        className={`flex-1 border border-[#E1E1E1] bg-white rounded-[16px] px-3 py-4 ${
          selectedMain === "All users" ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="flex flex-col gap-4">
          <label className="text-[16px] text-deepblue font-bold">
            {selectedMain === "Specific user segment" && "Segment Criteria"}
            {selectedMain === "Users in a specific community" && "Select Community"}
            {selectedMain === "Users in a specific challenge" && "Select Challenge"}
          </label>

          {/* CASE: Specific User Segment */}
          {isSegmentActive && (
            <>
              <select
                value={selectedSegment}
                onChange={(e) => {
                  setSelectedSegment(e.target.value);
                  setSelectedSubOption("");
                }}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select criteria...</option>
                {segmentDropdownOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              {selectedSegment && (
                <div className="flex flex-col gap-2 mt-2">
                  {segmentCriteriaMap[selectedSegment]?.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-4 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="segment-sub-option"
                        value={opt}
                        checked={selectedSubOption === opt}
                        onChange={() => setSelectedSubOption(opt)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-deepblue text-[12px]">{opt}</span>
                    </label>
                  ))}
                </div>
              )}
            </>
          )}

          {/* CASE: Specific Community */}
          {isCommunityActive && (
            <>
              <div className="flex flex-col gap-2">
                {/* <label className="text-[15px] text-gray-700">Select community</label> */}
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  value={selectedCommunity}
                  onChange={(e) => setSelectedCommunity(e.target.value)}
                >
                  <option value="">Select community...</option>
                  {communityNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[15px] text-gray-700">Specify member type:</label>
                {communityMemberTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="community-type"
                      value={type}
                      checked={selectedCommunityType === type}
                      onChange={() => setSelectedCommunityType(type)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-deepblue text-[12px]">{type}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* CASE: Specific Challenge */}
          {isChallengeActive && (
            <>
              <div className="flex flex-col gap-2">
                {/* <label className="text-[15px] text-gray-700">Select challenge</label> */}
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  value={selectedChallenge}
                  onChange={(e) => setSelectedChallenge(e.target.value)}
                >
                  <option value="">Select challenge...</option>
                  {mockPetChallenges.map((challenge) => (
                    <option key={challenge.id} value={challenge.name}>
                      {challenge.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] text-gray-700">Participant status:</label>
                {participantStatuses.map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="challenge-status"
                      value={status}
                      checked={selectedParticipantStatus === status}
                      onChange={() => setSelectedParticipantStatus(status)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-deepblue text-[12px]">{status}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
