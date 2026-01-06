"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type ActivityType = "All" | "Challenge" | "Post" | "Comment" | "Profile";

interface Activity {
  id: string;
  title: string;
  timestamp: string;
  type: ActivityType;
  color: string;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Completed Morning Walk Challenge",
    timestamp: "Today, 7:35 AM",
    type: "Challenge",
    color: "#40B773",
  },
  {
    id: "2",
    title: "Posted in Downtown Walkers Community",
    timestamp: "Today, 7:35 AM",
    type: "Post",
    color: "#1570EF",
  },
  {
    id: "3",
    title: "Commented on Sarah's post",
    timestamp: "Today, 11:42 AM",
    type: "Comment",
    color: "#9C27B0",
  },
  {
    id: "4",
    title: "Started Wellness Challenge",
    timestamp: "Today, 11:42 AM",
    type: "Challenge",
    color: "#40B773",
  },
  {
    id: "5",
    title: "Uploaded profile photo",
    timestamp: "Today, 11:42 AM",
    type: "Profile",
    color: "#607D8B",
  },
  {
    id: "6",
    title: "Joined Fitness Community",
    timestamp: "Yesterday, 2:15 PM",
    type: "Post",
    color: "#1570EF",
  },
  {
    id: "7",
    title: "Completed 5K Run Challenge",
    timestamp: "Yesterday, 9:20 AM",
    type: "Challenge",
    color: "#40B773",
  },
  {
    id: "8",
    title: "Updated profile information",
    timestamp: "Dec 7, 4:30 PM",
    type: "Profile",
    color: "#607D8B",
  },
];

const badgeColors = {
  Challenge: "bg-green-100 #40B773",
  Post: "bg-blue-100 #1570EF",
  Comment: "bg-purple-100 #9C27B0",
  Profile: "bg-gray-100 #607D8B",
  All: "",
};

export default function RecentActivity() {
  const [selectedFilter, setSelectedFilter] = useState<ActivityType>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(5);

  const filteredActivities =
    selectedFilter === "All"
      ? mockActivities
      : mockActivities.filter((activity) => activity.type === selectedFilter);

  const displayedActivities = filteredActivities.slice(0, displayCount);

  const activityTypes: ActivityType[] = [
    "All",
    "Challenge",
    "Post",
    "Comment",
    "Profile",
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border border-[#E1E1E1] p-6 ">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold text-deepblue">Recent Activity</h1>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 text-[12px] rounded-full border border-gray-300 bg-white text-deepblue font-medium hover:bg-gray-50 transition-colors"
            >
              Filter by{" "}
              {selectedFilter !== "All" ? selectedFilter : "Activity Type"}
              <ChevronDown size={16} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {activityTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedFilter(type);
                      setIsDropdownOpen(false);
                      setDisplayCount(5);
                    }}
                    className={`w-full text-left px-4 py-2 text-[12px] hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedFilter === type
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-0">
          {displayedActivities.map((activity, index) => {
            const isLast = index === displayedActivities.length - 1;

            return (
              <div key={activity.id} className="flex gap-4">
                {/* Timeline Dot and Line */}
                <div className="flex flex-col items-center ">
                  <div
                    className="w-4 h-4 rounded-full     z-10"
                    style={{ backgroundColor: activity.color }}
                  />
                  {!isLast && (
                    <div
                      className="w-1 h-20"
                      style={{ backgroundColor: activity.color }}
                    />
                  )}
                </div>

                {/* Activity Card */}
                <div className="flex-1 pb-2 pt-1">
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {activity.timestamp}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          badgeColors[activity.type]
                        }`}
                        style={{color: activity.color}}
                      >
                        {activity.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {displayCount < filteredActivities.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setDisplayCount(displayCount + 3)}
              className="rounded-full px-8 py-2 border text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Load more
            </button>
          </div>
        )}

        {displayCount >= filteredActivities.length &&
          filteredActivities.length > 5 && (
            <div className="flex justify-center mt-8">
              <p className="text-sm text-gray-500">
                No more activities to load
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
