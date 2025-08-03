"use client";

import {
  dailyData,
  hourlyData,
  mockPetChallenges,
  distanceData,
} from "@/mockdata";
import { Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const getBarColor = (value: number) => {
  if (value <= 30) return "#93BDF8";
  if (value <= 60) return "#448DF2";
  return "#0F50AA";
};

export default function AnalyticsTab() {
  const [active, setActive] = useState<"hourly" | "daily">("hourly");

  const data = active === "daily" ? dailyData : hourlyData;

  // Extracting the challenge ID from the URL parameters
  const { id } = useParams();
  const challenge = mockPetChallenges.find((c) => c.id === Number(id));

  if (!challenge) return null;
  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <h2 className="font-bold text-[18px] text-deepblue">Analytics</h2>
        <button className="flex items-center px-3 w-[117px] h-10 py-2 border rounded-[32px] text-sm hover:bg-gray-100">
          <Calendar className="w-4 h-4 mr-2" />
          Date Range
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Completion Rate",
              value: `${challenge.completionRate}%`,
              subtitle: "124 0f 328 participants",
            },
            {
              title: "Avg. Distance",
              value: "5.92 km",
              subtitle: "+0.8km above goal",
            },
            {
              title: "Engagement Rate",
              value: "85%",
              subtitle: "152 posts from 328 users",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-1 mt-6"
            >
              <div className="flex justify-between items-center text-sm text-gray">
                <span>{item.title}</span>
              </div>
              <div className="text-2xl font-bold text-deepblue">
                {item.value}
              </div>
              <p className="text-xs text-[#40B773] flex items-center">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Line Chart */}
        <div className="border border-[#E1E1E1] py-4 px-6 rounded-[16px] bg-transparent w-full h-[365px]">
          <div className="flex justify-between items-center ">
            <div>
              <p className="capitalize text-[18px]">participation trends</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#40B773] rounded-full"></div>
                <p className="text-[14px] capitalize">completion rate</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#2196F3] rounded-full"></div>
                <p className="text-[14px] capitalize">avg. distance</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#FF9800] rounded-full"></div>
                <p className="text-[14px] capitalize">engagement rate</p>
              </div>
              {/* Toggle Buttons */}
              <div className="w-[200px] bg-white h-[44px] py-1 px-2 rounded-full relative flex justify-between items-center shadow-inner">
                {/* Animated slider */}
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-brightblue shadow-md ${
                    active === "hourly" ? "left-1" : "left-1/2"
                  }`}
                />

                {/* Buttons */}
                <button
                  onClick={() => setActive("hourly")}
                  className={`relative z-10 w-1/2 text-sm font-semibold py-2 rounded-full transition-colors duration-300 ${
                    active === "hourly" ? "text-white" : ""
                  }`}
                >
                  Hourly
                </button>

                <button
                  onClick={() => setActive("daily")}
                  className={`relative z-10 w-1/2 text-sm font-semibold py-2 rounded-full transition-colors duration-300 ${
                    active === "daily" ? "text-white" : ""
                  }`}
                >
                  Daily
                </button>
              </div>
            </div>
          </div>

          {/* line chart */}
          <div className="py-2 ">
            

            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                //margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 70]} />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="engagementRate"
                  stroke="#FF9800"
                  strokeWidth={3} // Thicker line
                />
                <Line
                  type="monotone"
                  dataKey="avgDistance"
                  stroke="#2196F3"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="completionRate"
                  stroke="#40B773"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Other Chart */}
        <div className="flex gap-4">
          <div className="flex-[1] border border-[#E1E1E1] py-4 px-6 rounded-[16px] bg-transparent w-full flex flex-col gap-2">
            <p className="text-[18px] font-bold text-deepblue">
              Distance Distribution
            </p>
            <p className="text-[14px]">
              Break down of walk distances by participants
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-[#93BDF8]"></div>
                <p className="text-[14px] capitalize">Below target</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-[#448DF2] "></div>
                <p className="text-[14px] capitalize">near target</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-[#0F50AA] "></div>
                <p className="text-[14px] capitalize">met target</p>
              </div>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={distanceData}
                  margin={{ top: 5, right: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis domain={[0, 80]} />
                  <Tooltip />
                  <Bar dataKey="value">
                    {distanceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getBarColor(entry.value)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex-[1] border border-[#E1E1E1] py-4 px-6 rounded-[16px] bg-transparent w-full">
            <p className="text-[18px] font-bold text-deepblue">
              Participation Trends
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
