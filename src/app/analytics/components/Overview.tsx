import React from "react";
import StatCard from "./StatCard";
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
import {
  dailyData,
  hourlyData,
  mockPetChallenges,
  distanceData,
} from "@/mockdata";
import Link from "next/link";

export default function Overview() {
  const data = dailyData;
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <StatCard title="Total Users" value="412" subtitle="+12%(1.375)" />
        <StatCard
          title="Active Challenges"
          value="6,358"
          subtitle="+4 this month"
        />
        <StatCard title="Active Communities" value="400" subtitle="+5%(21)" />
        <StatCard title="Avg. Daily Walks" value="412" subtitle="+8%(241)" />
        <StatCard
          title="Challenge Completion Rate"
          value="50%"
          subtitle="+3% from last month"
        />
        <StatCard title="Social Posts" value="412" subtitle="+15%(1.145)" />
      </div>
      <div className="flex gap-5">
        <div className="flex-2/3">
          {/* Line Chart */}
          <div className="border border-[#E1E1E1] py-4 px-6 rounded-[16px] bg-transparent w-full h-[365px]">
            <div className="flex justify-between items-center">
              <div>
                <p className="capitalize text-[18px] text-deepblue font-bold">
                  User growth
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#40B773] rounded-full"></div>
                  <p className="text-[14px] capitalize">total users</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#2196F3] rounded-full"></div>
                  <p className="text-[14px] capitalize">active users</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#FF9800] rounded-full"></div>
                  <p className="text-[14px] capitalize">new registrations</p>
                </div>
              </div>
            </div>

            {/* Line Chart */}
            <div className="py-2 -ml-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }} // removes extra padding
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 70]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="engagementRate"
                    stroke="#FF9800"
                    strokeWidth={3}
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
        </div>
        <div className="flex-1/3 px-6 py-8 border border-[#E1E1E1] rounded-[16px] bg-transparent flex flex-col gap-4">
            <p className="text-[16px] font-bold text-deepblue ">
                Top Challenges
            </p>
          <div className="flex flex-col gap-2">
            <p className="text-[14px]">Morning Walk</p>

            <div className="flex items-center gap-1">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-brightblue h-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <p className="text-[12px] text-deepblue">80%</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[14px]">Morning Walk</p>

            <div className="flex items-center gap-1">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-[#9C27B0] h-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <p className="text-[12px] text-deepblue">65%</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[14px]">Obedience Training</p>

            <div className="flex items-center gap-1">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-brightblue h-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
              <p className="text-[12px] text-deepblue">90%</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[14px]">Rescue Awareness</p>

            <div className="flex items-center gap-1">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-[#FF9800] h-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <p className="text-[12px] text-deepblue">60%</p>
            </div>
          </div>
          <Link href='/challenges' className="font-bold text-brightblue text-[14px] mt-4">View All Challenges</Link>
        </div>

      </div>
      
    </div>
  );
}
