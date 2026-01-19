"use client";

import React from "react";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";

const days = [
  { label: "M", value: "Monday" },
  { label: "T", value: "Tuesday" },
  { label: "W", value: "Wednesday" },
  { label: "Th", value: "Thursday" },
  { label: "F", value: "Friday" },
  { label: "S", value: "Saturday" },
  { label: "Su", value: "Sunday" }
];

export default function Schedule() {
  const { schedule, setSchedule } = useChallengeBuilderStore();

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* Start Date */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">Start date</label>
        <input
          type="date"
          value={schedule.startDate}
          onChange={(e) => setSchedule({ startDate: e.target.value })}
          required
          className="border border-[#E1E1E1] rounded-md p-2 w-full"
        />
      </div>

      {/* Start Time */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">Start time</label>
        <input
          type="time"
          value={schedule.startTime}
          onChange={(e) => setSchedule({ startTime: e.target.value })}
          required
          className="border border-[#E1E1E1] rounded-md p-2 w-full"
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">End date</label>
        <input
          type="date"
          value={schedule.endDate}
          onChange={(e) => setSchedule({ endDate: e.target.value })}
          required
          className="border border-[#E1E1E1] rounded-md p-2 w-full"
        />
      </div>

      {/* End Time */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">End time</label>
        <input
          type="time"
          value={schedule.endTime}
          onChange={(e) => setSchedule({ endTime: e.target.value })}
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
          value={schedule.recurrenceType}
          onChange={(e) => setSchedule({ recurrenceType: e.target.value })}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="">Select recurrence type</option>
          <option value="monthly">Monthly</option>
          <option value="one_time">One-time</option>
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
            <label key={day.value} className="cursor-pointer">
              <input
                type="radio"
                name="selectedDay"
                value={day.value}
                checked={schedule.selectedDay === day.value}
                onChange={() => setSchedule({ selectedDay: day.value })}
                className="hidden"
              />
              <span
                className={`h-8 w-8 flex items-center justify-center text-[12px] border rounded-full ${
                  schedule.selectedDay === day.value
                    ? "border-brightblue text-white bg-brightblue"
                    : "text-[#8E98A8] border-[#8E98A8] bg-transparent"
                }`}
              >
                {day.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
