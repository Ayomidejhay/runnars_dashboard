"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import PetInfo from "../components/PetInfo";
import { usePet } from "@/hooks/usePets";
import LeaderboardTable from "../components/leaderboard/Leaderboard";
import Leaderboard from "../components/leaderboard/Leaderboard";
import ChallengesTable from "../components/ChallengeTable";

export default function page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [activeTab, setActiveTab] = React.useState("challenges");

  const { data, isLoading, error } = usePet(id);

  const petInfo = data?.data;

  // const pet = petMockData.find((p) => p.id === id);
  // if (!pet) {
  //   return <p className="text-red-500">Pet not found.</p>;
  // }
  return (
    <div className="px-10">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex gap-4 items-center text-deepblue"
        >
          <Image src="/arrow-back.svg" alt="icon" width={18} height={14} />
          Back
        </button>
        <div className="flex justify-between items-center">
          <h1 className="capitalize text-[34px] font-bold text-deepblue">
            pet details
          </h1>
        </div>
      </div>
      <div className="w-full flex flex-col gap-6">
        <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-4">
          <p className="text-deepblue font-bold">Overview</p>
          <div className="grid grid-cols-3 gap-4 text-[14px]">
            <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-white flex flex-col gap-3 items-center text-center">
              <p className="font-bold text-deepblue text-[24px]">
                {petInfo?.summary?.totalPoints || 0}
              </p>
              <p>Total Points</p>
            </div>
            <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-white flex flex-col gap-3 items-center text-center">
              <p className="font-bold text-deepblue text-[24px]">
                {petInfo?.summary?.currentStreak || 0}
              </p>
              <p>Days Streak</p>
            </div>
            <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-white flex flex-col gap-3 text-center items-center">
              <p className="font-bold text-deepblue text-[24px]">
                {petInfo?.summary?.totalBadges || 0}
              </p>
              <p>Badges</p>
            </div>
          </div>
        </div>

        <PetInfo petInfo={petInfo} />
        {/* Tabs */}
      <div className="border-b mb-2">
        <div className="flex gap-6">
          {["challenges", "communities", "leaderboard"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-2 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
       {activeTab === "challenges" && (
          <div>
            <ChallengesTable petId={id}/>
          </div>
        )}
        {activeTab === "communities" && (
          <div>
            {/* Communities content */}
          </div>
        )}
        {activeTab === "leaderboard" && (
          <div>
            <Leaderboard />
          </div>
        )}
      </div>
    </div>
  );
}
