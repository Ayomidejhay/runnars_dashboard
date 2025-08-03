"use client";
import React from "react";

type StatusCardProps = {
  topCircleColor?: string;
  bottomCircleColor?: string;
  stackedText: string;
  stackedTextColor?: string;
  title: string;
  subtitle: string;
  titleColor?: string;
  subtitleColor?: string;
  status: "available" | "earned";
};

export default function StatusCard({
  topCircleColor,
  bottomCircleColor,
  stackedText,

  title,
  subtitle,

  status,
}: StatusCardProps) {
  return (
    <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-1 items-center text-center">
      <div className="relative flex items-center justify-center mb-2 w-20 h-20">
  {/* Top Circle (larger one) */}
  <div
    className="absolute w-[56px] h-[56px] border rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
    style={{ backgroundColor: topCircleColor }}
  />

  {/* Bottom Circle (smaller one) */}
  <div
    className="absolute w-[48px] h-[48px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
    style={{ backgroundColor: bottomCircleColor }}
  />

  {/* Stacked Text (on top of both circles) */}
  <span
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-2xl font-medium"
    // style={{ color: stackedTextColor }}
  >
    {stackedText}
  </span>
</div>


      {/* Title */}
      <p className="text-[14px] font-bold text-deepblue">{title}</p>

      {/* Subtitle */}
      <p className="text-[12px]">{subtitle}</p>

      {/* Status */}
      <div className="py-[2px] px-[8px] rounded-[100px]" style={{backgroundColor: topCircleColor}}>
        <p
        className={` text-xs font-medium capitalize `}
        style={{color: bottomCircleColor}}
      >
        {status}
      </p>
      </div>
    </div>
  );
}
