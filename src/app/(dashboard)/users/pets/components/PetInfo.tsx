"use client";

import Image from "next/image";
import PetFitScore from "./PetFitScore";
import { ChallengeParticipant } from "@/types/pet";
import { div } from "framer-motion/client";
import StatCard from "../../components/StatsCard";
import {
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LineChart } from "lucide-react";
import WalkHistoryChart from "./WalkHistoryChart";

type PetInfoProps = {
  petInfo: ChallengeParticipant | any;
};

const PetInfo = ({ petInfo }: PetInfoProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#ECF8F1] text-[#40B773]";
      case "Inactive":
        return "bg-[#FFE0B2] text-[#E65100]";
      default:
        return "bg-[#ECF8F1] text-[#40B773]";
    }
  };
  const badge = petInfo?.basicInfo?.status;

  const totalDistance = petInfo?.summary?.totalDistance || 0;
  const totalWalks = petInfo?.summary?.totalWalks || 0;

  const avgDistance =
    totalWalks > 0 ? (totalDistance / totalWalks).toFixed(2) : "0.00";

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="p-6 bg-white  border border-neutral-200  rounded-lg">
          <h2 className="text-lg font-semibold text-neutral-900  mb-4">
            Pet information
          </h2>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full ">
                <Image
                  src={petInfo?.basicInfo?.photo || "/petmock.svg"}
                  alt={petInfo?.basicInfo?.name || "pet"}
                  width={64}
                  height={64}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-neutral-900 capitalize">
                    {petInfo?.basicInfo?.name}
                  </span>
                  <span className="text-xs text-neutral-500">
                    ({petInfo?.basicInfo?.breed})
                  </span>
                </div>

                <span
                  className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${getStatusBadge(badge)}  font-medium w-fit mt-1`}
                >
                  {petInfo?.basicInfo?.status}
                </span>

                <div className="text-sm text-neutral-500 mt-1">
                  {petInfo?.basicInfo?.ageGroup} years
                </div>
                <div className="text-sm text-neutral-500">
                  {petInfo?.basicInfo?.weight} kg
                </div>
                <div className="text-sm text-neutral-500">
                  Owned by {petInfo?.owner?.fullName}
                </div>
              </div>
            </div>

            <PetFitScore
              score={petInfo?.activityStats?.currentFitScore || 0}
              label="PetFit Score"
              
              // change={`${pet.scoreChange}`}

              // percentile={`${pet.percentile}`}
            />
          </div>
        </div>
        <div className=" p-6 bg-white  border border-neutral-200  rounded-lg">
          <h2 className="text-lg font-semibold text-neutral-900  mb-4">
            Activities
          </h2>
          <div className="flex gap-6">
            <div className=" bg-white flex-1 p-6 rounded-2xl  border-[#FFFFFF] shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Overview</h2>
              <div className="grid grid-cols-3 gap-2 mb-6">
                <StatCard
                  title="Total Walks"
                  value={totalWalks}
                  subtitle="Since registration"
                />
                <StatCard
                  title="Total Distance"
                  value={totalDistance}
                  subtitle={`Avg. ${avgDistance} mi per walk`}
                />
                <StatCard
                  title="Challenges"
                  value={petInfo?.summary?.challengesParticipated || 0}
                  subtitle={`${petInfo?.summary?.challengesCompleted || 0} completed`}
                />
              </div>
              {/* <button className="w-full py-3 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
            View walk history
          </button> */}
              <div></div>
            </div>
            <div className="flex-1">
              <WalkHistoryChart
                activities={petInfo?.activityStats?.recentActivities}
                petFitScore={petInfo?.activityStats?.currentFitScore}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetInfo;
