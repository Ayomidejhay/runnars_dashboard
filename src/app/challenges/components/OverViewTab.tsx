// components/OverviewTab.tsx

"use client";

import Image from "next/image";
import React from "react";
//import { Challenge } from "@/types"; // Update path if needed
import { PetChallenge } from "@/types";

interface OverviewTabProps {
  challenge: PetChallenge;
  getStatusBadge: (status: string) => string;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ challenge, getStatusBadge }) => {
  const startDate = new Date(`${challenge.startDate}T${challenge.startTime}`);
  const formattedDate = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const endDate = new Date(`${challenge.endDate}T${challenge.endTime}`);
  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedEndTime = endDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const start = new Date(challenge.startDate);
  const end = new Date(challenge.endDate);
  const diffInDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="flex gap-6">
      <div className="basis-[60%]">
        <div>
          <div className="w-full h-[230px] relative rounded-[16px] overflow-hidden">
            <Image
              src="/challenge-banner.png"
              alt="banner"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-3 ">
            <span
              className={`px-2 py-2 rounded-full text-xs font-semibold capitalize ${getStatusBadge(
                challenge.status ?? ""
              )}`}
            >
              {challenge.status}
            </span>
            <p className="mt-3 text-[18px] font-bold capitalize text-deepblue">
              {challenge.name}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mt-6 flex gap-4 w-full">
            <div className="flex-1 h-32 border border-[#E1E1E1] rounded-[16px] flex pl-6 pr-2 items-center">
              <div className="flex flex-col gap-1">
                <p className="text-[14px]">Participants</p>
                <p className="text-deepblue font-bold text-[24px]">{challenge.participants}</p>
                <p className="text-[12px] text-[#40B773]">+12 on last 24hours</p>
              </div>
            </div>
            <div className="flex-1 pl-6 pr-2 h-32 border border-[#E1E1E1] rounded-[16px] flex items-center">
              <div className="flex flex-col gap-1">
                <p className="text-[14px]">Completion rate</p>
                <p className="text-deepblue font-bold text-[24px]">{challenge.completionRate}%</p>
                <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-brightblue h-full"
                    style={{ width: `${challenge.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex-1 pl-6 pr-2 h-32 border border-[#E1E1E1] rounded-[16px] flex items-center">
              <div className="flex flex-col gap-1">
                <p className="text-[14px]">Total distance</p>
                <p className="text-deepblue font-bold text-[24px]">{challenge.totalDistance}</p>
                <p className="text-[12px] text-[#40B773]">Avg 5.92 km per participant</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4 p-5 bg-white rounded-2xl w-full">
            <p className="text-[14px] text-deepblue font-bold">Description</p>
            <p className="text-[12px] mt-4">{challenge.description}</p>
          </div>

          {/* Summary */}
          <div className="mt-4 p-5 bg-white rounded-2xl w-full">
            <p className="text-[14px] text-deepblue font-bold">Summary</p>
            <div className="mt-4 flex flex-col gap-2">
              <div className="text-[12px] w-full flex justify-between">
                <p>Challenge category</p>
                <p className="font-bold text-deepblue capitalize">{challenge.category}</p>
              </div>
              <div className="text-[12px] w-full flex justify-between">
                <p>Goal type</p>
                <p className="font-bold text-deepblue capitalize">{challenge.type}</p>
              </div>
              <div className="text-[12px] w-full flex justify-between">
                <p>Tags</p>
                <div className="flex gap-1 flex-wrap">
                  {challenge.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-[12px] bg-[#F3F4F6] text-deepblue rounded-full capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="basis-[40%] flex flex-col gap-4">
        <div className="p-5 bg-white rounded-2xl w-full">
          <p className="text-[14px] text-deepblue font-bold">Primary goal</p>
          <p className="text-[12px] mt-4">{challenge.primaryGoal}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl w-full">
          <p className="text-[14px] text-deepblue font-bold">Schedule</p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="text-[12px] w-full flex justify-between">
              <p>Start date</p>
              <p className="font-bold text-deepblue">{`${formattedDate} at ${formattedTime}`}</p>
            </div>
            <div className="text-[12px] w-full flex justify-between">
              <p>End date</p>
              <p className="font-bold text-deepblue">{`${formattedEndDate} at ${formattedEndTime}`}</p>
            </div>
            <div className="text-[12px] w-full flex justify-between">
              <p>Duration</p>
              <p className="font-bold text-deepblue capitalize">{diffInDays} days</p>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white rounded-2xl w-full">
          <p className="text-[14px] text-deepblue font-bold">Reward</p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="text-[12px] w-full flex justify-between">
              <p>Completion points</p>
              <p className="font-bold text-deepblue capitalize">
                {challenge.rewards.completionPoints} points
              </p>
            </div>
            <div className="text-[12px] w-full flex justify-between">
              <p>Achievement badge</p>
              <p className="font-bold text-deepblue capitalize">
                {challenge.rewards.achievementBadge}
              </p>
            </div>
            <div className="text-[12px] w-full flex justify-between">
              <p>Who can participate</p>
              <p className="font-bold text-deepblue capitalize">
                {challenge.eligibleParticipants}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
