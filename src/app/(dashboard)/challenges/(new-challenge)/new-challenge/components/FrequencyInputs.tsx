"use client";

import React, { useState, useEffect } from "react";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";

const days = [
  { label: "M", value: "Monday" },
  { label: "T", value: "Tuesday" },
  { label: "W", value: "Wednesday" },
  { label: "Th", value: "Thursday" },
  { label: "F", value: "Friday" },
  { label: "S", value: "Saturday" },
  { label: "Su", value: "Sunday" },
];

export default function FrequencyInputs() {
  const { goalsAndMetrics, setFrequencyConfig } = useChallengeBuilderStore();
  const { selectedFrequencyConfiguration } = goalsAndMetrics;

  const [selected, setSelected] = useState(selectedFrequencyConfiguration);

  // Local states for input fields
  const [numberOfWalks, setNumberOfWalks] = useState("");
  const [minimumWalkDuration, setMinimumWalkDuration] = useState("");
  const [minDuration, setMinDuration] = useState("");
  const [walksPerWeek, setWalksPerWeek] = useState("");
  const [numberOfWeeks, setNumberOfWeeks] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [timePeriod, setTimePeriod] = useState("morning");
  // const [timeRange, setTimeRange] = useState("");
  const [walksPerPeriod, setWalksPerPeriod] = useState("");
  const [weeksCount, setWeeksCount] = useState("");
  const [minimumDuration, setMinimumDuration] = useState("");
  const [minWalkDuration, setMinWalkDuration] = useState("");
  const [timeRange, setTimeRange] = useState<{
    start: string;
    end: string;
  }>({
    start: "",
    end: "",
  });

  const periods = ["morning", "midday", "evening"];

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const isValidTimeRange = (start: string, end: string) => {
    if (!start || !end) return false;

    const startMinutes =
      Number(start.split(":")[0]) * 60 + Number(start.split(":")[1]);
    const endMinutes =
      Number(end.split(":")[0]) * 60 + Number(end.split(":")[1]);

    return startMinutes < endMinutes;
  };

  // // Update store when relevant values change
  // useEffect(() => {
  //   if (!selected) return;

  //   setFrequencyConfig({
  //     // type: selected,
  //     configurationType: selected,
  //     config: {
  //       numberOfWalks: numberOfWalks ? Number(numberOfWalks) : undefined,
  //       minimumWalkDuration: minimumWalkDuration
  //         ? Number(minimumWalkDuration)
  //         : undefined,
  //       minDuration: minDuration ? Number(minDuration) : undefined,
  //       walksPerWeek: walksPerWeek ? Number(walksPerWeek) : undefined,
  //       numberOfWeeks: numberOfWeeks ? Number(numberOfWeeks) : undefined,
  //       weeksCount: weeksCount ? Number(weeksCount) : undefined,
  //       minimumDuration: minimumDuration ? Number(minimumDuration) : undefined,
  //       minWalkDuration: minWalkDuration ? Number(minWalkDuration) : undefined,
  //       selectedDays,
  //       timePeriod,
  //       // timeRange,
  //       timeRange: timeRange.start && timeRange.end ? timeRange : undefined,
  //       walksPerPeriod: walksPerPeriod ? Number(walksPerPeriod) : undefined,
  //     },
  //   });
  // }, [
  //   selected,
  //   numberOfWalks,
  //   minWalkDuration,
  //   minimumWalkDuration,
  //   walksPerWeek,
  //   numberOfWeeks,
  //   selectedDays,
  //   timePeriod,
  //   timeRange,
  //   walksPerPeriod,
  //   setFrequencyConfig,
  // ]);

  // useEffect(() => {
  //   if (!selected) return;

  //   const isValidTimeRange = (start: string, end: string) => {
  //     if (!start || !end) return false;

  //     const startMinutes =
  //       Number(start.split(":")[0]) * 60 + Number(start.split(":")[1]);
  //     const endMinutes =
  //       Number(end.split(":")[0]) * 60 + Number(end.split(":")[1]);

  //     return startMinutes < endMinutes;
  //   };

  //   const validTimeRange = isValidTimeRange(timeRange.start, timeRange.end)
  //     ? timeRange
  //     : undefined;

  //   setFrequencyConfig({
  //     configurationType: selected,
  //     config: {
  //       // Total number of walks
  //       numberOfWalks: numberOfWalks ? Number(numberOfWalks) : undefined,
  //       minimumWalkDuration: minimumWalkDuration
  //         ? Number(minimumWalkDuration)
  //         : undefined,

  //       // Walks per week
  //       walksPerWeek: walksPerWeek ? Number(walksPerWeek) : undefined,
  //       numberOfWeeks: numberOfWeeks ? Number(numberOfWeeks) : undefined,
  //       minDuration: minDuration ? Number(minDuration) : undefined,

  //       // Walks on specific days
  //       selectedDays: selectedDays.length ? selectedDays : undefined,
  //       weeksCount: weeksCount ? Number(weeksCount) : undefined,
  //       minimumDuration: minimumDuration ? Number(minimumDuration) : undefined,

  //       // Time-of-day walks (validated)
  //       timePeriod,
  //       timeRange: validTimeRange,
  //       walksPerPeriod: walksPerPeriod ? Number(walksPerPeriod) : undefined,
  //       minWalkDuration: minWalkDuration ? Number(minWalkDuration) : undefined,
  //     },
  //   });
  // }, [
  //   selected,
  //   numberOfWalks,
  //   minimumWalkDuration,
  //   walksPerWeek,
  //   numberOfWeeks,
  //   minDuration,
  //   selectedDays,
  //   weeksCount,
  //   minimumDuration,
  //   timePeriod,
  //   timeRange,
  //   walksPerPeriod,
  //   minWalkDuration,
  //   setFrequencyConfig,
  // ]);

  useEffect(() => {
  if (!selected) return;

  const isTimeOfDay = selected === "time_of_day_walks";

  const isValidTimeRange = (start?: string, end?: string) => {
    if (!start || !end) return false;

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    return sh * 60 + sm < eh * 60 + em;
  };

  const validatedTimeRange =
    isTimeOfDay && isValidTimeRange(timeRange.start, timeRange.end)
      ? {
          start: timeRange.start,
          end: timeRange.end,
        }
      : undefined;

  setFrequencyConfig({
    configurationType: selected,
    config: {
      // Total walks
      numberOfWalks: numberOfWalks ? Number(numberOfWalks) : undefined,
      minimumWalkDuration: minimumWalkDuration
        ? Number(minimumWalkDuration)
        : undefined,

      // Per week
      walksPerWeek: walksPerWeek ? Number(walksPerWeek) : undefined,
      numberOfWeeks: numberOfWeeks ? Number(numberOfWeeks) : undefined,
      minDuration: minDuration ? Number(minDuration) : undefined,

      // Specific days
      selectedDays: selectedDays.length ? selectedDays : undefined,
      // weeksCount: weeksCount ? Number(weeksCount) : undefined,
      // minimumDuration: minimumDuration ? Number(minimumDuration) : undefined,

      // Time-of-day (STRICT)
      timePeriod: isTimeOfDay ? timePeriod : undefined,
      timeRange: validatedTimeRange,
      walksPerPeriod: isTimeOfDay
        ? walksPerPeriod
          ? Number(walksPerPeriod)
          : undefined
        : undefined,
      minWalkDuration: isTimeOfDay
        ? minWalkDuration
          ? Number(minWalkDuration)
          : undefined
        : undefined,
    },
  });
}, [
  selected,
  numberOfWalks,
  minimumWalkDuration,
  walksPerWeek,
  numberOfWeeks,
  minDuration,
  selectedDays,
  weeksCount,
  minimumDuration,
  timePeriod,
  timeRange.start,
  timeRange.end,
  walksPerPeriod,
  minWalkDuration,
  setFrequencyConfig,
]);


  // Render configuration-specific inputs
  const renderInputs = () => {
    switch (selected) {
      case "Total number of walks":
        return (
          <div className="flex flex-row-reverse justify-between items-start gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">
                Minimum Walk Duration (Optional)
              </label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                <input
                  value={minimumWalkDuration}
                  onChange={(e) => setMinimumWalkDuration(e.target.value)}
                  className="p-2 w-[80%] outline-none"
                  placeholder="E.g 5-12"
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[20%] text-center text-[10px]">Mins</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[16px] text-deepblue">
                Number of Walks
              </label>

              <input
                value={numberOfWalks}
                onChange={(e) => setNumberOfWalks(e.target.value)}
                placeholder="E.g 1-50"
                className="border p-2 rounded-[16px] border-[#E1E1E1] w-full"
              />
            </div>
          </div>
        );
      case "Walks per week":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">
                  Walks per Week
                </label>
                <input
                  type="text"
                  value={walksPerWeek}
                  onChange={(e) => setWalksPerWeek(e.target.value)}
                  required
                  className="border border-[#E1E1E1] rounded-[16px] p-2"
                  placeholder="E.g 1-7"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">
                  Number of Weeks
                </label>
                <input
                  type="text"
                  value={numberOfWeeks}
                  onChange={(e) => setNumberOfWeeks(e.target.value)}
                  required
                  className="border border-[#E1E1E1] rounded-[16px] p-2"
                  placeholder="E.g 1-12"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">
                Minimum Walk Duration (Optional)
              </label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                <input
                  type="text"
                  value={minDuration}
                  onChange={(e) => setMinDuration(e.target.value)}
                  className="p-2 w-[80%] outline-none"
                  placeholder="E.g 5-12"
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[20%] text-center text-[10px]">Mins</p>
              </div>
            </div>
          </div>
        );
      case "Walks on specific days":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">
                  Day Selection
                </label>
                <div className="flex gap-2">
                  {days.map((day) => {
                    const isSelected = selectedDays.includes(day.value);

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

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[16px] text-deepblue">
                  Number of Weeks
                </label>
                <input
                  type="text"
                  value={weeksCount}
                  onChange={(e) => setWeeksCount(e.target.value)}
                  required
                  className="border border-[#E1E1E1] rounded-[16px] p-2"
                  placeholder="E.g 1-12"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">
                Minimum Walk Duration (Optional)
              </label>
              <div className="border border-[#E1E1E1] rounded-[16px] flex items-center">
                <input
                  type="text"
                  value={minimumDuration}
                  onChange={(e) => setMinimumDuration(e.target.value)}
                  className="p-2 w-[80%] outline-none"
                  placeholder="E.g 5-12"
                />
                <div className="border-l border-[#E1E1E1] h-full" />
                <p className="w-[20%] text-center text-[10px]">Mins</p>
              </div>
            </div>
          </div>
        );

      case "Time-of-day walks":
        return (
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Time Period</label>
              <div className="flex gap-2">
                {periods.map((period) => (
                  <label key={period} className="cursor-pointer">
                    <input
                      type="radio"
                      name="timePeriod"
                      value={period}
                      checked={timePeriod === period}
                      onChange={() => setTimePeriod(period)}
                      className="hidden"
                    />
                    <span
                      className={`w-[79px] h-[40px] flex items-center justify-center text-[12px] border rounded-[8px] capitalize ${
                        timePeriod === period
                          ? "border-brightblue text-brightblue bg-[#E8F1FD]"
                          : "text-[#8E98A8] border-[#8E98A8] bg-transparent"
                      }`}
                    >
                      {period}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Time Range</label>
              {/* <input
                type="text"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                required
                className="border border-[#E1E1E1] rounded-[16px] p-2"
                placeholder="Select time range"
              /> */}
              <div className="flex gap-2">
                <input
                  type="time"
                  value={timeRange.start}
                  onChange={(e) =>
                    setTimeRange((prev) => ({ ...prev, start: e.target.value }))
                  }
                  className="border border-[#E1E1E1] rounded-[16px] p-2 w-full"
                />

                <input
                  type="time"
                  value={timeRange.end}
                  onChange={(e) =>
                    setTimeRange((prev) => ({ ...prev, end: e.target.value }))
                  }
                  className="border border-[#E1E1E1] rounded-[16px] p-2 w-full"
                />
              </div>
              {timeRange.start &&
  timeRange.end &&
  !isValidTimeRange(timeRange.start, timeRange.end) && (
    <p className="text-red-500 text-[12px]">
      End time must be later than start time
    </p>
)}

            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">
                Walk per Period
              </label>
              <input
                type="text"
                value={walksPerPeriod}
                onChange={(e) => setWalksPerPeriod(e.target.value)}
                required
                className="border border-[#E1E1E1] rounded-[16px] p-2"
                placeholder="E.g 1-20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">
                Minimum Walk Duration (Optional)
              </label>
              <input
                type="text"
                value={minWalkDuration}
                onChange={(e) => setMinWalkDuration(e.target.value)}
                className="border border-[#E1E1E1] rounded-[16px] p-2"
                placeholder="E.g 5-12"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[16px] text-deepblue">Goal Configuration</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        required
      >
        <option value="">Select goal configuration</option>
        {[
          "Total number of walks",
          "Walks per week",
          "Walks on specific days",
          "Time-of-day walks",
        ].map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {renderInputs()}
    </div>
  );
}
