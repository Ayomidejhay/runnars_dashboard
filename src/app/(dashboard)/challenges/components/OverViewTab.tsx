// components/OverviewTab.tsx

"use client";

import Image from "next/image";
import React, { use } from "react";
//import { Challenge } from "@/types"; // Update path if needed
import { challenge } from "@/types";
import { AdminChallenge } from "@/types/challenge";
import { getParticipationDisplayValue } from "./ParticipationDisplay";
import { useChallengeAnalytics, useChallengeOverview } from "@/hooks/useAnalyticsChallenge";
import { useParams } from "next/navigation";
import { humanizeAllGoals } from "@/lib/humanizeGoals";
import DescriptionWithReadMore from "./DescriptionWithReadMore";

interface OverviewTabProps {
  getStatusBadge: (status: string) => string;
  adminChallenge: AdminChallenge;
}

const formatDate = (date: string) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const combineDateAndTime = (isoDate?: string, time?: string) => {
  if (!isoDate || !time) return null;

  const dateOnly = isoDate.split("T")[0]; // YYYY-MM-DD
  const dateTime = new Date(`${dateOnly}T${time}`);

  return isNaN(dateTime.getTime()) ? null : dateTime;
};

const formatDateTime = (date: Date | null) => {
  if (!date) return "-";

  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} at ${timePart}`;
};

function getPrimaryGoalDescription(goal: any) {
  const { configurationType, config } = goal;

  switch (configurationType) {
   case "total_distance":
  return `Complete a total of ${config.targetDistance} miles across ${config.numberOfWalks} walks`;

case "weekly_distance":
  return `Complete ${config.distancePerWeek} miles each week over ${config.numberOfWalks} walks`;

case "per_walk_distance":
  return `Take ${config.totalWalks} walks, covering ${config.distancePerWalk} miles in each walk`;

case "progressive_distance":
  return `Start with ${config.startDistance} miles in the first week, then increase by ${config.weeklyIncrease} miles each week for ${config.durationWeeks} weeks`;


    default:
      return "Complete the challenge goals";
  }
}





const OverviewTab: React.FC<OverviewTabProps> = ({
  getStatusBadge,
  adminChallenge,
}) => {

     const {id} = useParams();
    const { data, isLoading, error } = useChallengeOverview(
      id as string,
      // active,
    );
  const startDateTime = combineDateAndTime(
    adminChallenge.scheduleAndDuration.startDate,
    adminChallenge.scheduleAndDuration.startTime,
  );
  const endDateTime = combineDateAndTime(
    adminChallenge.scheduleAndDuration.endDate,
    adminChallenge.scheduleAndDuration.endTime,
  );

  const formattedStart = formatDateTime(startDateTime);
  const formattedEnd = formatDateTime(endDateTime);

  const start = new Date(
    `${(adminChallenge.scheduleAndDuration.startDate ?? "").split("T")[0]}T${adminChallenge.scheduleAndDuration.startTime}`,
  );
  const end = new Date(adminChallenge.scheduleAndDuration.endDate ?? "");
  const diffInDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  const goalDescriptions = humanizeAllGoals(
  adminChallenge.goalsAndMetrics
);

  const participants = adminChallenge?.publishedChallenge?.participants ?? [];

  const totalDistance = data?.data?.participantMetrics?.totalDistance ?? 0;

  const averageDistance =
    data?.data?.participantMetrics?.averageDistancePerActiveParticipant ?? 0;

    const primaryDistanceGoal =
  adminChallenge?.goalsAndMetrics?.distanceGoals?.[0];


  const getFitScoreDisplay = (range: string) => {
    switch (range) {
      case "all":
        return "All scores";
      case "low":
        return "Low (below 60)";
      case "medium":
        return "Medium (60 - 79)";
      case "high":
        return "High (80 - 100)";
      default:
        return "";
    }
  };
 
  const getWhoCanParticipateDisplay = (challenge: AdminChallenge) => {
    const whoCanParticipate = challenge.rewards.participation.whoCanParticipate;

    const segment = challenge.rewards.segmentCriteria;

    const baseValue = getParticipationDisplayValue(whoCanParticipate);

   
    if (whoCanParticipate === "specific_pet_type") {
      const uniquePetTypes = Array.from(
        new Set(segment.specificPetTypes ?? []),
      );

      return `${baseValue}: ${uniquePetTypes.join(", ")}`;
    }

    if (whoCanParticipate === "users_with_min_fit_score") {
      return `${baseValue}: ${getFitScoreDisplay(segment.petFitScoreRange)}`;
    }

    return baseValue;
  };
 

  return (
    <div className="flex gap-6">
      <div className="basis-[60%]">
        <div>
          <div className="w-full h-[230px] relative rounded-[16px] overflow-hidden">
            <Image
              src={adminChallenge.basicInfo.coverImage || "/petmock.svg"}
              alt="banner"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-3 ">
            <span
              className={`px-2 py-2 rounded-full text-xs font-semibold capitalize ${getStatusBadge(
                adminChallenge.publishedChallenge.status ?? "",
              )}`}
            >
              {adminChallenge.publishedChallenge.status}
            </span>
            <p className="mt-3 text-[18px] font-bold capitalize text-deepblue">
              {adminChallenge.basicInfo.name}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mt-6 flex gap-4 w-full">
            <div className="flex-1 h-32 border border-[#E1E1E1] rounded-[16px] flex pl-6 pr-2 items-center">
              <div className="flex flex-col gap-1">
                <p className="text-[14px]">Participants</p>
                <p className="text-deepblue font-bold text-[24px]">
                  {data?.data?.participantMetrics?.totalParticipants || 0}
                </p>
                <p className="text-[12px] text-[#40B773]"></p>
              </div>
            </div>
            <div className="flex-1 pl-6 pr-2 h-32 border border-[#E1E1E1] rounded-[16px] flex items-center">
              <div className="flex flex-col gap-1">
                <p className="text-[14px]">Completion rate</p>
                <p className="text-deepblue font-bold text-[24px]">
                  {data?.data?.participantMetrics.completionRate ?? 0}%
                </p>
                <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-brightblue h-full"
                    style={{
                      width: `${data?.data?.participantMetrics.completionRate ?? 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex-1 pl-6 pr-2 h-32 border border-[#E1E1E1] rounded-[16px] flex items-center">
              <div className="flex flex-col gap-1">
                <p className="text-[14px]">Total distance</p>
                {/* <p className="text-deepblue font-bold text-[24px]">{.totalDistance}</p> */}
                <div className="flex items-baseline gap-2">
                  <p className="text-deepblue font-bold text-[24px]">
                    {totalDistance.toFixed(2) ?? "0.00"}
                  </p>
                  <p>mi</p>
                </div>
                <p className="text-[12px] text-[#40B773]">
                  Avg {averageDistance.toFixed(2)} mi per walk
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4 p-5 bg-white rounded-2xl w-full">
            <p className="text-[14px] text-deepblue font-bold">Description</p>
            {/* <p className="text-[12px] mt-4">
              {adminChallenge.basicInfo.description}
            </p> */}
              <DescriptionWithReadMore text={adminChallenge.basicInfo.description} limit={600} />

          </div>

          {/* Summary */}
          <div className="mt-4 p-5 bg-white rounded-2xl w-full">
            <p className="text-[14px] text-deepblue font-bold">Summary</p>
            <div className="mt-4 flex flex-col gap-2">
              <div className="text-[12px] w-full flex justify-between">
                <p>Challenge category</p>
                <p className="font-bold text-deepblue capitalize">
                  {adminChallenge.publishedChallenge.challengeCategory}
                </p>
              </div>
              <div className="text-[12px] w-full flex justify-between">
                <p>Goal type</p>
                {/* <p className="font-bold text-deepblue capitalize">{adminChallenge.publishedChallenge.type} ({adminChallenge.rewards.segmentCriteria.specificPetTypes})</p> */}
                <p className="font-bold text-deepblue capitalize">
                  {adminChallenge.publishedChallenge.type}
                </p>
              </div>
              <div className="text-[12px] w-full flex justify-between">
                <p>Tags</p>
                <div className="flex gap-1 flex-wrap">
                  {adminChallenge.basicInfo.primaryHashtags.map(
                    (tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-[12px] bg-[#F3F4F6] text-deepblue rounded-full capitalize"
                      >
                        {tag}
                      </span>
                    ),
                  )}
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
          {/* <p className="text-[12px] mt-4 capitalize">
            
            {primaryDistanceGoal
      ? getPrimaryGoalDescription(primaryDistanceGoal)
      : "No goal configured"}
      

          </p> */}
          <div>
            <ul className="space-y-2 text-sm">
  {goalDescriptions.map((desc, index) => (
    <li key={index}>• {desc}</li>
  ))}
</ul>

          </div>
        </div>
        <div className="p-5 bg-white rounded-2xl w-full">
          <p className="text-[14px] text-deepblue font-bold">Schedule</p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="text-[12px] w-full flex justify-between">
              <p>Start date</p>
              <p className="font-bold text-deepblue">{formattedStart}</p>
            </div>
            <div className="text-[12px] w-full flex justify-between">
              <p>End date</p>
              <p className="font-bold text-deepblue">{formattedEnd}</p>
            </div>
            <div className="text-[12px] w-full flex justify-between">
              <p>Duration</p>
              <p className="font-bold text-deepblue capitalize">
                {diffInDays} days
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white rounded-2xl w-full">
          <p className="text-[14px] text-deepblue font-bold">Reward</p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="text-[12px] w-full flex justify-between">
              <p>Completion points</p>
              <p className="font-bold text-deepblue capitalize">
                {adminChallenge.rewards.points} points
              </p>
            </div>
            {/* <div className="text-[12px] w-full flex justify-between">
              <p>Achievement badge</p>
              {/* <p className="font-bold text-deepblue capitalize">
                {challenge.rewards.achievementBadge}
              </p> 
            </div> */}
            {/* <div className="text-[12px] w-full flex justify-between ">
              <p>Who can participate</p>
              <p className="font-bold text-deepblue capitalize">
                {getParticipationDisplayValue(
                  adminChallenge.rewards.participation,
                )} 
              </p>
            </div> */}
            <div className="text-[12px] w-full flex justify-between">
              <p>Who can participate</p>
              <p className="font-bold text-deepblue capitalize">
                {getWhoCanParticipateDisplay(adminChallenge)}
                {}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
