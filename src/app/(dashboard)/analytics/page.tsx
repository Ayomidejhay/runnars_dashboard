"use client";

import { Calendar } from "lucide-react";
import React, { useState } from "react";
import Overview from "./components/Overview";
import PetWellness from "./components/PetWellness";
import Activities from "./components/Activities";
import Social from "./components/Social";
import Gamification from "./components/Gamification";

const tabs = [
  "Overview",
  "Pet Wellness",
  "Activities",
  "Social & Communities",
  "Gamification",
];

export default function page() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <Overview />
        );

      case "Pet Wellness":
        return (
          <PetWellness />
        );

      case "Activities":
        return (
          <Activities />
        );

      case "Social & Communities":
        return (
          <Social />
        );

      case "Gamification":
        return (
          <Gamification />
        );

      default:
        return null;
    }
  };
  return (
    <div className="px-10">
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-[34px] font-bold text-deepblue">
          Analytics
        </h1>
        <button className="flex items-center px-3 w-[117px] h-10 py-2 border rounded-[32px] text-sm hover:bg-gray-100">
          <Calendar className="w-4 h-4 mr-2" />
          Date Range
        </button>
      </div>
      {/* Tabs Header */}
      <div className="flex gap-3 border-b  mb-4 px-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium rounded-t-lg ${
              activeTab === tab
                ? "text-brightblue border-b-2 border-brightblue"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{renderContent()}</div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <h4 className="text-lg font-bold text-deepblue mt-1">{value}</h4>
    </div>
  );
}
