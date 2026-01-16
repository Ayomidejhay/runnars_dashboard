"use client";

import React from "react";

type ActiveTab = "distance" | "frequency" | "time" | "streak" | "photo";

interface TabsProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabs: ActiveTab[] = ["distance", "frequency", "time", "streak", "photo"];

  return (
    <div className="flex gap-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => setActiveTab(tab)}
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
