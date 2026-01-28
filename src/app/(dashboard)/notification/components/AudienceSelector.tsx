"use client";

import React, { useEffect, useState } from "react";

import { useAllChallenges } from "@/hooks/useChallenges";
import { challenge } from "@/types";
import { TargetType } from "@/types/notification";

const mainOptions = [
  "All users",
  "New users",
  "Petfit score range",
  "Pet type",
  "Incomplete profile",
  "Users in a specific community",
  "Users in a specific challenge",
];

/* ======================
   Static Options
====================== */

const petfitScoreRanges = [
  "Low score (Below 60)",
  "Moderate score (60–79)",
  "High score (80–100)",
];

const petTypes = ["Dog", "Cat", "Reptiles", "Birds", "Others"];

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

const participantStatuses = [
  "All participants",
  "Active participants",
  "Completed challenge",
  "At risk (no activity)",
];

interface AudienceSelectorProps {
  onChange: (payload: {
    targetType: TargetType;
    criteria: Record<string, any>;
  }) => void;
}

export default function AudienceSelector({ onChange }: AudienceSelectorProps) {
  const [selectedMain, setSelectedMain] = useState(mainOptions[0]);

  const [selectedPetfitScore, setSelectedPetfitScore] = useState("");
  const [selectedPetTypes, setSelectedPetTypes] = useState<string[]>([]);

  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [selectedCommunityType, setSelectedCommunityType] = useState("");

  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [selectedParticipantStatus, setSelectedParticipantStatus] =
    useState("");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  /* ======================
     Active States
  ====================== */

  const isPetfitActive = selectedMain === "Petfit score range";
  const isPetTypeActive = selectedMain === "Pet type";
  const isCommunityActive = selectedMain === "Users in a specific community";
  const isChallengeActive = selectedMain === "Users in a specific challenge";

  const params = {
    search: search,
    page: 1,
    limit: 50,
  };

  const { data, isLoading } = useAllChallenges(params);

  const challenges = Array.isArray(data?.data?.challenges)
    ? data.data.challenges
    : [];

  /* ======================
     Auto defaults
  ====================== */

  useEffect(() => {
    if (isPetfitActive) {
      setSelectedPetfitScore(petfitScoreRanges[0]);
    }

    if (isPetTypeActive) {
      setSelectedPetTypes([petTypes[0]]);
    }

    if (isCommunityActive) {
      setSelectedCommunity(communityNames[0]);
      setSelectedCommunityType(communityMemberTypes[0]);
    }

    if (isChallengeActive) {
      setSelectedChallenge(challenges[0]?.name || "");
      setSelectedParticipantStatus(participantStatuses[0]);
    }
  }, [selectedMain]);

  const togglePetType = (type: string) => {
    setSelectedPetTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const buildAudiencePayload = (): {
    targetType: TargetType;
    criteria: Record<string, any>;
  } => {
    switch (selectedMain) {
      case "All users":
        return { targetType: "all_users" as TargetType, criteria: {} };

      case "New users":
        return {
          targetType: "new_users" as TargetType,
          criteria: { registeredWithinDays: 7 },
        };

      case "Incomplete profile":
        return {
          targetType: "incomplete_profile" as TargetType,
          criteria: {},
        };

      case "Petfit score range": {
        if (selectedPetfitScore === "Low score (Below 60)") {
          return {
            targetType: "petfitscore_range" as TargetType,
            criteria: { minScore: 0, maxScore: 59 },
          };
        }

        if (selectedPetfitScore === "Moderate score (60-79)") {
          return {
            targetType: "petfitscore_range" as TargetType,
            criteria: { minScore: 60, maxScore: 79 },
          };
        }

        return {
          targetType: "petfitscore_range" as TargetType,
          criteria: { minScore: 80, maxScore: 100 },
        };
      }

      case "Pet type":
        return {
          targetType: "pet_type" as TargetType,
          criteria: { petTypes: selectedPetTypes },
        };

      case "Users in a specific challenge":
        return {
          targetType: "challenge_status" as TargetType,
          criteria: {
            challengeId: selectedChallenge,
            challengeStatus: selectedParticipantStatus
              .toLowerCase()
              .replace(" ", "_"),
          },
        };

      default:
        return { targetType: "all_users" as TargetType, criteria: {} };
    }
  };

  /* =========================
     Emit to Parent
  ========================= */

  useEffect(() => {
    onChange(buildAudiencePayload());
  }, [
    selectedMain,
    selectedPetfitScore,
    selectedPetTypes,
    selectedChallenge,
    selectedParticipantStatus,
  ]);



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
                  isSelected ? "border-blue-600 bg-blue-50" : "border-gray-300"
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
                    // Reset sub-state on main option change
                    setSelectedPetfitScore("");
                    setSelectedPetTypes([]);
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
          {/* PETFIT SCORE */}
          {selectedMain === "Petfit score range" &&
            petfitScoreRanges.map((range) => {
              const isSelected = selectedPetfitScore === range;
              return (
                <label
                  key={range}
                  className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                    isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  } ml-2`}
                >
                  <span className="text-deepblue text-[12px]">{range}</span>
                  <input
                    type="radio"
                    checked={isSelected}
                    onChange={() => setSelectedPetfitScore(range)}
                    className="hidden"
                  />
                  {isSelected && (
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  )}
                </label>
              );
            })}

          {/* PET TYPE (MULTI) */}
          {selectedMain === "Pet type" &&
            petTypes.map((type) => {
              const isSelected = selectedPetTypes.includes(type);
              return (
                <label
                  key={type}
                  className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                    isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  } ml-2`}
                >
                  <span className="text-deepblue text-[12px]">{type}</span>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => togglePetType(type)}
                    className="hidden"
                  />
                  {isSelected && (
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  )}
                </label>
              );
            })}

          {/* CHALLENGE STATUS */}
          {selectedMain === "Users in a specific challenge" && (
            
            <>
              <label className="text-[16px] font-bold text-deepblue">
                Select Challenge
              </label>

              {/* ===== SEARCHABLE DROPDOWN ===== */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search challenge by name..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setIsOpen(true);
                  }}
                  onFocus={() => setIsOpen(true)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-black"
                />

                {isOpen && (
                  <div className="absolute z-10 mt-1 w-full max-h-56 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                    {challenges.length === 0 && (
                      <div className="px-3 py-2 text-sm text-gray-500">
                        No challenges found
                      </div>
                    )}

                    {challenges.map((challenge: challenge) => (
                      <button
                        key={challenge._id}
                        type="button"
                        onClick={() => {
                          setSelectedChallenge(challenge._id || "");
                          setSearch(challenge.title || "");
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-black hover:bg-gray-100"
                      >
                        {challenge.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ===== PARTICIPANT STATUS ===== */}
              {participantStatuses.map((status) => (
                <label key={status} className="flex gap-4 items-center">
                  <input
                    type="radio"
                    checked={selectedParticipantStatus === status}
                    onChange={() => setSelectedParticipantStatus(status)}
                  />
                  <span className="text-[12px] text-deepblue">{status}</span>
                </label>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
