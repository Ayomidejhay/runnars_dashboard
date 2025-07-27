'use client';

import React from "react";

interface TabsProps {
  activeTab: "distance" | "frequency" | "time" | "streak" | "photo";
  setActiveTab: (tab: "distance" | "frequency" | "time" | "streak" | "photo") => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabs: ("distance" | "frequency" | "time" | "streak" | "photo")[] = [
    "distance",
    "frequency",
    "time",
    "streak",
    "photo",
  ];

  return (
    <div className="flex gap-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`px-3 py-2 text-[12px] border rounded-[100px] ${
            activeTab === tab
              ? "border-brightblue text-white bg-brightblue"
              : "text-[#8E98A8] border-[#8E98A8] bg-transparent"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}
