"use client";

import { Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";
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
  PieChart,
  Pie,
} from "recharts";

const getBarColor = (value: number) => {
  if (value <= 30) return "#93BDF8";
  if (value <= 60) return "#448DF2";
  return "#0F50AA";
};

import { useChallengeAnalytics } from "@/hooks/useAnalyticsChallenge";


interface ParticipationByDate {
  date: string;
  newParticipants: number;
  activeParticipants: number;
  completedActivities: number;
  totalDistance: number;
}


// Utility to format date labels like "Today, 2:25pm"
const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return `Today, ${time}`;
  if (isYesterday) return `Yesterday, ${time}`;

  // Short format: "25 Jan" or "25 Jan 24" for year
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
};

// const filterByDateRange = (items: { date: string }[], range: string) => {
//     const now = new Date();
//     let start: Date | null = null;

//     switch (range) {
//       case "today":
//         start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//         break;

//       case "yesterday": {
//         const y = new Date(now);
//         y.setDate(now.getDate() - 1);
//         start = new Date(y.getFullYear(), y.getMonth(), y.getDate());
//         now.setDate(now.getDate() - 1);
//         break;
//       }

//       case "last7":
//         start = new Date(now);
//         start.setDate(now.getDate() - 7);
//         break;

//       case "last30":
//         start = new Date(now);
//         start.setDate(now.getDate() - 30);
//         break;

//       case "thisMonth":
//         start = new Date(now.getFullYear(), now.getMonth(), 1);
//         break;

//       case "thisYear":
//         start = new Date(now.getFullYear(), 0, 1);
//         break;

//       default:
//         return items;
//     }

//     return items.filter((i) => {
//       const d = new Date(i.date);
//       return d >= start! && d <= now;
//     });
//   };


const filterByDateRange = (
  items: ParticipationByDate[],
  range: string
) => {
  const now = new Date();
  let start: Date | null = null;

  switch (range) {
    case "today":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;

    case "yesterday": {
      const y = new Date(now);
      y.setDate(now.getDate() - 1);
      start = new Date(y.getFullYear(), y.getMonth(), y.getDate());
      now.setDate(now.getDate() - 1);
      break;
    }

    case "last7":
      start = new Date(now);
      start.setDate(now.getDate() - 7);
      break;

    case "last30":
      start = new Date(now);
      start.setDate(now.getDate() - 30);
      break;

    case "thisMonth":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      break;

    case "thisYear":
      start = new Date(now.getFullYear(), 0, 1);
      break;

    default:
      return items;
  }

  return items.filter((i) => {
    const d = new Date(i.date);
    return d >= start! && d <= new Date(); // exclude future dates
  });
};

export default function AnalyticsTab() {
  const [active, setActive] = useState<"hourly" | "daily">("hourly");
  const [dateRange, setDateRange] = useState("all");
  const [pieTab, setPieTab] = useState<"pet" | "location" | "timeOfDay">("pet");

  const { id } = useParams();
  const { data, isLoading, error } = useChallengeAnalytics(
    id as string,
    active,
  );

  

  // Prepare charts data
  // const lineChartData = useMemo(() => {
  //   if (!data?.success) return [];
  //   return data.data.participationByDate.map((p: any) => ({

  //     time: formatDateLabel(p.date),
  //     completionRate: data.data.participantMetrics.completionRate,
  //     avgDistance: data.data.participantMetrics.averageDistance,
  //     engagementRate: data.data.participantMetrics.engagementRate,
  //   }));
  // }, [data]);
  // const lineChartData = useMemo(() => {
  //   if (!data?.success) return [];

  //   const filtered = filterByDateRange(
  //     data.data.participationByDate,
  //     dateRange
  //   );

  //   return filtered.map((p) => ({
  //     time: formatDateLabel(p.date),
  //     completionRate: data.data.participantMetrics.completionRate,
  //     avgDistance: data.data.participantMetrics.averageDistance,
  //     engagementRate: data.data.participantMetrics.engagementRate,
  //   }));
  // }, [data, dateRange]);

const lineChartData = useMemo(() => {
  if (!data?.success) return [];

  const filtered = filterByDateRange(
    data.data.participationByDate as ParticipationByDate[],
    dateRange
  );

  const now = new Date();

  return filtered
    .filter((p) => new Date(p.date) <= now) // future dates excluded
    .map((p) => ({
      time: formatDateLabel(p.date),
      completionRate: p.newParticipants
        ? Math.round((p.completedActivities / p.newParticipants) * 100)
        : 0,
      avgDistance: p.activeParticipants
        ? +(p.totalDistance / p.activeParticipants).toFixed(2)
        : 0,
      engagementRate: p.newParticipants
        ? Math.round((p.activeParticipants / p.newParticipants) * 100)
        : 0,
    }));
}, [data, dateRange]);



  const barChartData = useMemo(() => {
    if (!data?.success) return [];
    return data.data.distanceDistribution.map((d: any) => ({
      range: d.range,
      value: Number(d.count),
    }));
  }, [data]);

  const pieChartData = useMemo(() => {
    if (!data?.success) return [];

    let raw: any[] = [];

    if (pieTab === "pet") raw = data.data.participationByPet;
    if (pieTab === "location") raw = data.data.participationByLocation;
    if (pieTab === "timeOfDay") raw = data.data.participationByTimeOfDay;

    const total =
      raw.reduce(
        (sum, i) => sum + (i.activityCount ?? i.participantCount ?? 0),
        0,
      ) || 1;

    return raw.map((i) => {
      const value = i.activityCount ?? i.participantCount ?? 0;
      return {
        name: i.petType ?? i.locationName ?? i.timeRange ?? "Unknown",
        value,
        percentage: Math.round((value / total) * 100),
        icon: i.icon,
      };
    });
  }, [data, pieTab]);

  if (isLoading) return <p className="text-gray-500">Loading analytics...</p>;
  if (error || !data?.success)
    return <p className="text-red-500">Failed to load analytics.</p>;

  const challenge = data.data.challengeInfo;

  if (!challenge) return <p className="text-red-500">Challenge not found.</p>;
  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <h2 className="font-bold text-[18px] text-deepblue">Analytics</h2>
        {/* Date Range Filter */}
        <div className="relative w-[150px]">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border px-3 text-xs w-full rounded-[32px] appearance-none h-10"
          >
            <option value="all">Date Range</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
            
          </select>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Completion Rate",
              value: `${data.data.participantMetrics.completionRate}%`,
              subtitle: `${data.data.participantMetrics.completedParticipants} of ${data.data.participantMetrics.totalParticipants} participants`,
            },
            {
              title: "Avg. Distance",
              value: `${data.data.participantMetrics.averageDistance} miles`,
              subtitle: `per active participant`,
            },
            {
              title: "Engagement Rate",
              value: `${data.data.participantMetrics.engagementRate}%`,
              subtitle: "Based on participant activity",
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
                data={lineChartData}
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
                  data={barChartData}
                  margin={{ top: 5, right: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis domain={[0, 80]} />
                  <Tooltip />
                  <Bar dataKey="value">
                    {barChartData.map((entry: any, index: any) => (
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
          <div className="flex-1 border border-[#E1E1E1] rounded-[16px] p-6">
            <p className="font-bold text-deepblue mb-4">Participation Trends</p>

            {/* TABS */}
            <div className="flex gap-6 border-b border-gray-200 mb-6">
              {[
                { key: "pet", label: "By pet breed" },
                { key: "location", label: "By Location" },
                { key: "timeOfDay", label: "By Time of Day" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setPieTab(t.key as any)}
                  className={`pb-2 text-sm font-medium ${
                    pieTab === t.key
                      ? "text-brightblue border-b-2 border-brightblue"
                      : "text-gray-400"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <ResponsiveContainer width={220} height={220}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                  >
                    {pieChartData.map((e, i) => (
                      <Cell key={i} fill={getBarColor(e.percentage)} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="flex flex-col gap-3">
                {pieChartData.map((i, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-6 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: getBarColor(i.percentage),
                        }}
                      />
                      <span>
                        {i.icon ? `${i.icon} ` : ""}
                        {i.name}
                      </span>
                    </div>
                    <span className="font-semibold">({i.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
