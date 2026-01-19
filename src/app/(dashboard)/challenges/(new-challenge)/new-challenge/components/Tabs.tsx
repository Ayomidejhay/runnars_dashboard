"use client";

import React from "react";
import { useChallengeBuilderStore, GoalType } from "@/stores/useChallengeBuilderStore";

export default function Tabs() {
  // Pull activeTab and setGoalType from the store
  const { goalsAndMetrics, setGoalType } = useChallengeBuilderStore();
  const { activeTab } = goalsAndMetrics;

  const tabs: GoalType[] = ["distance", "frequency", "time", "streak", "photo"];

  return (
    <div className="flex gap-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => setGoalType(tab)}
          className={`px-3 py-2 text-[12px] border rounded-[100px] ${
            activeTab === tab
              ? "border-brightblue text-white bg-brightblue"
              : "text-[#8E98A8] border-[#8E98A8]"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}
