"use client";

import React from "react";
import StatCard from "./StatCard";
import LineBar from "./LineBar";
import {
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

const data = [
  { week: "Week 1", value: 20 },
  { week: "Week 2", value: 45 },
  { week: "Week 3", value: 30 },
  { week: "Week 4", value: 60 },
  { week: "Week 5", value: 50 },
];

const dataB = [
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
      {dataB.map((entry, index) => (
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

export default function PetWellness() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Avg. Petfit Score" value="78/100" subtitle="2.3%" />
        <StatCard
          title="Profile Completion"
          value="83.5%"
          subtitle="1.7% this month"
        />
        <StatCard
          title="Health Journal Usage"
          value="68.2%"
          subtitle="3.2%"
          subtitleColor="#FF3729"
        />
        <StatCard
          title="Needs Improvement"
          value="18%"
          subtitle="3.2%"
          subtitleColor="#FF3729"
        />
      </div>
      <div className="flex gap-6">
        <div className="w-1/2 px-6 py-4 border border-[#E1E1E1] rounded-[16px] bg-transparent">
          <p className="text-[18px] font-bold text-deepblue capitalize mb-6">
            breed distribution
          </p>
          <div className="flex flex-col gap-4">
            <LineBar title="healthy" value="80%" activeColor="#40B773" />
            <LineBar title="moderate" value="60%" activeColor="#F39C12" />
            <LineBar
              title="needs improvement"
              value="30%"
              activeColor="#FF3729"
            />
            <LineBar title="not set" value="10%" activeColor="#95A5A6" />
          </div>
        </div>
        <div className="w-1/2 px-6 py-4 border border-[#E1E1E1] rounded-[16px] bg-transparent">
          <p className="text-[18px] font-bold text-deepblue capitalize mb-6">
            pet profile completion by field
          </p>
          <div className="flex flex-col gap-4">
            <LineBar title="pet name" value="100%" />
            <LineBar title="breed" value="95%" />
            <LineBar title="age" value="85%" />
            <LineBar title="weight" value="40%" />
            <LineBar title="photo" value="30%" />
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="w-1/2 px-6 py-4 border border-[#E1E1E1] rounded-[16px] bg-transparent">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={data}
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
      <div className="px-6 py-4 border border-[#E1E1E1] rounded-[16px] bg-transparent">
        <div className="flex flex-col gap-2 mb-6">
          <p className="text-[18px] font-bold text-deepblue capitalize">
            pet profile completion by field
          </p>
          <p className="text-[14px]">Top 10 Breeds</p>
        </div>
        <div className="flex flex-col gap-4">
          <LineBar title="labrador retriever" value="22%" />
          <LineBar title="golden retriever" value="16%" />
          <LineBar title="german shepherd" value="15%" />
          <LineBar title="poodle" value="12%" />
          <LineBar title="bulldog" value="10%" />
          <LineBar title="others" value="25%" />
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
                    data={dataB}
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
