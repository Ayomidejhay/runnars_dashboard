"use client";

import React, { useEffect, useState } from "react";
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
  const selectedDay = schedule.selectedDay ?? [];

  const [errors, setErrors] = useState<{
    startTime?: string;
    endTime?: string;
  }>({});

  const now = new Date();
  const todayDate = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().slice(0, 5);

  const isToday = (date?: string) => date === todayDate;

  
const toggleDay = (day: string) => {
  if (schedule.selectedDay.includes(day)) {
    setSchedule({
      selectedDay: schedule.selectedDay.filter((d) => d !== day)
    });
  } else {
    setSchedule({
      selectedDay: [...schedule.selectedDay, day]
    });
  }
};

// useEffect(() => {
//     if (
//       schedule.startDate &&
//       schedule.startTime &&
//       isToday(schedule.startDate) &&
//       schedule.startTime < currentTime
//     ) {
//       setSchedule({ startTime: "" });
//     }

//     if (
//       schedule.startDate &&
//       schedule.endDate &&
//       schedule.startTime &&
//       schedule.endTime &&
//       schedule.endDate === schedule.startDate &&
//       schedule.endTime <= schedule.startTime
//     ) {
//       setSchedule({ endTime: "" });
//     }
//   }, [
//     schedule.startDate,
//     schedule.startTime,
//     schedule.endDate,
//     schedule.endTime
//   ]);

    useEffect(() => {
    const newErrors: typeof errors = {};

    // Start time cannot be in the past if start date is today
    if (
      schedule.startDate &&
      schedule.startTime &&
      isToday(schedule.startDate) &&
      schedule.startTime < currentTime
    ) {
      newErrors.startTime = "Start time cannot be earlier than the current time.";
      setSchedule({ startTime: "" });
    }

    // End time must be after start time if same day
    if (
      schedule.startDate &&
      schedule.endDate &&
      schedule.startTime &&
      schedule.endTime &&
      schedule.endDate === schedule.startDate &&
      schedule.endTime <= schedule.startTime
    ) {
      newErrors.endTime = "End time must be later than start time.";
      setSchedule({ endTime: "" });
    }

    setErrors(newErrors);
  }, [
    schedule.startDate,
    schedule.startTime,
    schedule.endDate,
    schedule.endTime
  ]);

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* Start Date */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">Start date</label>
        <input
          type="date"
          min={todayDate}
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
          min={isToday(schedule.startDate) ? currentTime : undefined}
          value={schedule.startTime}
          onChange={(e) => {
            setSchedule({ startTime: e.target.value });
            setErrors((prev) => ({ ...prev, startTime: undefined }));
          }}      
          required
          className="border border-[#E1E1E1] rounded-md p-2 w-full"
        />
          {errors.startTime && (
          <span className="text-[12px] text-red-500">{errors.startTime}</span>
        )}
      </div>

      {/* End Date */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] text-deepblue">End date</label>
        <input
          type="date"
          min={schedule.startDate || todayDate}
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
          min={
            schedule.endDate === schedule.startDate
              ? schedule.startTime
              : undefined
          }
          value={schedule.endTime}
          onChange={(e) => {
            setSchedule({ endTime: e.target.value });
            setErrors((prev) => ({ ...prev, endTime: undefined }));
          }}
          required
          className="border border-[#E1E1E1] rounded-md p-2 w-full"
        />
         {errors.endTime && (
          <span className="text-[12px] text-red-500">{errors.endTime}</span>
        )}
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
    {days.map((day) => {
      const isSelected = selectedDay.includes(day.value);

      return (
        <label key={day.value} className="cursor-pointer">
          <input
            type="checkbox"
            value={day.value}
            checked={isSelected}
            onChange={() => toggleDay(day.value)}
            className="hidden"
          />
          <span
            className={`h-8 w-8 flex items-center justify-center text-[12px] border rounded-full ${
              isSelected
                ? "border-brightblue text-white bg-brightblue"
                : "text-[#8E98A8] border-[#8E98A8] bg-transparent"
            }`}
          >
            {day.label}
          </span>
        </label>
      );
    })}
  </div>
</div>
    </div>
  );
}
