"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WalkHistoryChart({ activities = [], petFitScore = 0 }) {

  // Group by day
  const grouped = activities.reduce((acc, a:any) => {
    const day = a.date.split("T")[0];
    acc[day] = (acc[day] || 0) + a.distance;
    return acc;
  }, {} as Record<string, number>);

  // Convert to chart format
  const chartData = Object.entries(grouped).map(([date, distance]) => ({
    date: new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    distance,
    petFitScore,
  }));

  console.log("Chart Data:", chartData);

  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-200">
      <h2 className="text-lg font-semibold mb-4">Walk history</h2>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="distance"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="petFitScore"
              stroke="#93c5fd"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
