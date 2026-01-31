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

type PetInfoProps = {
  petInfo: ChallengeParticipant | undefined;
};

const PetInfo = ({ petInfo }: PetInfoProps) => {
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

                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium w-fit mt-1">
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

            {/* <PetFitScore
          score={pet.petfitScore}
          label="PetFit Score"
          change={`${pet.scoreChange}`}
          percentile={`${pet.percentile}`}
        /> */}
          </div>
        </div>
        <div className=" p-6 bg-white  border border-neutral-200  rounded-lg">
          <h2 className="text-lg font-semibold text-neutral-900  mb-4">
            Activities
          </h2>
          <div className="flex gap-6">
            <div className=" bg-white p-6 rounded-2xl  border-[#FFFFFF] shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-3 gap-2 mb-6">
              <StatCard
                title="Total Walks"
                value="23"
                subtitle="Since registration"
              />
              <StatCard
                title="Total Distance"
                value="433Km"
                subtitle="Avg. 3.1 km per walk"
              />
              <StatCard title="Challenges" value="12" subtitle="8 completed" />
            </div>
            {/* <button className="w-full py-3 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
            View walk history
          </button> */}
            <div></div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetInfo;
