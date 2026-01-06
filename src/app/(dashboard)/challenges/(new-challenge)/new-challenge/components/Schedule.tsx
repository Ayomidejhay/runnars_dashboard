"use client";

import React from "react";

const days = ["M", "T", "W", "Th", "F", "S", "Su"];

interface ScheduleProps {
  startDate: string;
  setStartDate: (value: string) => void;

  startTime: string;
  setStartTime: (value: string) => void;

  endDate: string;
  setEndDate: (value: string) => void;

  endTime: string;
  setEndTime: (value: string) => void;

  recurrenceType: string;
  setRecurrenceType: (value: string) => void;

  selectedDay: string;
  setSelectedDay: (value: string) => void;
}

export default function Schedule({
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  endDate,
  setEndDate,
  endTime,
  setEndTime,
  recurrenceType,
  setRecurrenceType,
  selectedDay,
  setSelectedDay,
}: ScheduleProps) {
  return (
    <div className="grid grid-cols-2 gap-5">
      {/* Start Date */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">Start date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="border border-[#E1E1E1] rounded-md p-2 w-full"
        />
      </div>

      {/* Start Time */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">Start time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="border border-[#E1E1E1] rounded-md p-2 w-full"
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">End date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="border border-[#E1E1E1] rounded-md p-2 w-full"
        />
      </div>

      {/* End Time */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">End time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="border border-[#E1E1E1] rounded-md p-2 w-full"
        />
      </div>

      {/* Recurrence Type */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">
          Recurrence type{" "}
          <span className="text-[12px] text-[#8E98A8]">(Optional)</span>
        </label>
        <select
          value={recurrenceType}
          onChange={(e) => setRecurrenceType(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="">Select recurrence type</option>
          <option value="monthly">Monthly</option>
          <option value="one-time">One-time</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      {/* Challenge Days */}
      <div className="flex flex-col gap-2 flex-1">
        <label className="text-[16px] text-deepblue">
          Challenge days{" "}
          <span className="text-[12px] text-[#8E98A8]">(Optional)</span>
        </label>

        <div className="flex gap-2">
          {days.map((day) => (
            <label key={day} className="cursor-pointer">
              <input
                type="radio"
                name="selectedDay"
                value={day}
                checked={selectedDay === day}
                onChange={() => setSelectedDay(day)}
                className="hidden"
              />
              <span
                className={`h-8 w-8 flex items-center justify-center text-[12px] border rounded-full ${
                  selectedDay === day
                    ? "border-brightblue text-white bg-brightblue"
                    : "text-[#8E98A8] border-[#8E98A8] bg-transparent"
                }`}
              >
                {day}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
