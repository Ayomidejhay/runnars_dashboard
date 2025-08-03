"use client";

import React from "react";

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  subtitleColor?: string; // optional custom color
};

export default function StatCard({
  title,
  value,
  subtitle,
  subtitleColor = "#40B773", // default green
}: StatCardProps) {
  return (
    <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-1">
      <div className="flex justify-between items-center text-sm text-gray">
        <span>{title}</span>
      </div>
      <div className="text-2xl font-bold text-deepblue">{value}</div>
      {subtitle && (
        <p className="text-xs flex items-center" style={{ color: subtitleColor }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
