"use client";

import React, { useState } from "react";
import StatCard from "./StatCard";
import LineBar from "./LineBar";
import {
  Bar,
  BarChart,
  PieChart,
  Pie,
  AreaChart,
  Cell,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Sector,
  ResponsiveContainer,
} from "recharts";
import { walkData } from "@/mockdata";

const dataB = [
  { week: "Week 1", value: 20 },
  { week: "Week 2", value: 45 },
  { week: "Week 3", value: 30 },
  { week: "Week 4", value: 60 },
  { week: "Week 5", value: 50 },
];

const tabs = ["daily", "weekly", "monthly"] as const;
type TabType = (typeof tabs)[number];

const dataC = [
  { name: "Puppy/Kitten (0-1 yrs)", value: 12 },
  { name: "Young (1-3 yrs)", value: 30 },
  { name: "Adult (3-7 yrs)", value: 25 },
  { name: "Senior (7+ yrs)", value: 10 },
];

const COLORS = ["#B6D3FA", "#93BDF8", "#629FF4", "#448DF2"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom legend displayed vertically
function CustomLegend() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      {dataC.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 "
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          />
          <span>{`${entry.name} `}</span>
        </div>
      ))}
    </div>
  );
}

export default function Activities() {
  const [view, setView] = useState<TabType>("daily");

  const data = walkData[view];
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Walks" value="24,875" subtitle="8.3%" />
        <StatCard
          title="Average Distance"
          value="2.4km"
          subtitle="1.7% this month"
        />
        <StatCard title="Average Duration" value="35 mins" subtitle="2 mins" />
        <StatCard
          title="Challenge Rate"
          value="43%"
          subtitle="3.2%"
          subtitleColor="#FF3729"
        />
      </div>

      <div className="px-6 py-4 border border-[#E1E1E1] rounded-[16px] bg-transparent">
        <div className="w-full ">
          <div className="flex justify-between items-center my-4">
            <p className="text-[18px] font-bold text-deepblue capitalize mb-6">
              total walks (Daily/Weekly/Monthly)
            </p>
            <div className="inline-flex bg-white rounded-full">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setView(tab)}
                  className={`px-4 py-1 rounded-full text-sm  capitalize transition-colors duration-200 ${
                    view === tab ? "bg-brightblue text-white" : ""
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis allowDecimals={false} /> */}
              <Tooltip />
              <Bar dataKey="walks" fill="#93BDF8" radius={[5, 5, 5, 5]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-1/2 px-6 py-4 border border-[#E1E1E1] rounded-[16px] bg-transparent">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={dataB}
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#93BDF8" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* <CartesianGrid strokeDasharray="3 3" vertical={false} /> */}

              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#333", fontSize: 12 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#333", fontSize: 12 }}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#1570EF"
                fill="url(#areaGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 px-6 py-4 border border-[#E1E1E1] rounded-[16px] bg-transparent">
          <p className="text-[18px] font-bold text-deepblue capitalize mb-6">
            avg. petfit score by breed
          </p>
          <div className="flex flex-col gap-4">
            <LineBar title="labrador retriever" value="80/100" />
            <LineBar title="golden retriever" value="60/100" />
            <LineBar title="germain shepherd" value="20/100" />
            <LineBar title="germain shepherd" value="66/100" />
            <LineBar title="germain shepherd" value="10/100" />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
              <div className="w-1/2 px-6 py-4 border border-[#E1E1E1] rounded-[16px] bg-transparent">
                <p className="text-[18px] font-bold text-deepblue capitalize mb-6">
                  Age distribution
                </p>
                <div className="w-full h-[200px] flex justify-between items-center gap-4">
                  <div className="h-full flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dataC}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {dataB.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                              stroke="none"
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-shrink-0">
                    <CustomLegend />
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-6 py-4 border border-[#E1E1E1] rounded-[16px] bg-transparent">
                <p className="text-[18px] font-bold text-deepblue capitalize mb-6">
                  Activity stats
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-[14px]">
                    <p className="capitalize">avg. daily walk distance</p>
                    <p className="capitalize text-deepblue font-bold">3.2km</p>
                  </div>
                  <div className="flex items-center justify-between text-[14px]">
                    <p className="capitalize">avg. daily walk time</p>
                    <p className="capitalize text-deepblue font-bold">38min</p>
                  </div>
                  <div className="flex items-center justify-between text-[14px]">
                    <p className="capitalize">most active time</p>
                    <p className="capitalize text-deepblue font-bold">6-8pm</p>
                  </div>
                  <div className="flex items-center justify-between text-[14px]">
                    <p className="capitalize">avg. petfit score</p>
                    <p className="capitalize text-deepblue font-bold">73/100</p>
                  </div>
                  <div className="flex items-center justify-between text-[14px]">
                    <p className="capitalize">most active breed</p>
                    <p className="capitalize text-deepblue font-bold">
                      Border Collie
                    </p>
                  </div>
                </div>
              </div>
            </div>
    </div>
  );
}
