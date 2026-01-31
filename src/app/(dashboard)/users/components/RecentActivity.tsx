"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// Reuse your ActivityType
type ActivityType = "All" | "Challenge" | "Post" | "Comment" | "Profile";

// Define backend activity shape
interface BackendActivity {
  _id: string;
  type: "challenge" | "post" | "comment" | "profile";
  title: string;
  createdAt: string;
}

// Define normalized activity for UI
interface Activity {
  id: string;
  title: string;
  timestamp: string;
  type: ActivityType;
  color: string;
}

// Props for the component
interface RecentActivityProps {
  activities: BackendActivity[];
}

// Map backend to UI
const mapActivity = (activity: BackendActivity): Activity => {
  const typeMap: Record<
    BackendActivity["type"],
    { type: ActivityType; color: string }
  > = {
    challenge: { type: "Challenge", color: "#40B773" },
    post: { type: "Post", color: "#1570EF" },
    comment: { type: "Comment", color: "#9C27B0" },
    profile: { type: "Profile", color: "#607D8B" },
  };

  return {
    id: activity._id,
    title: activity.title,
    timestamp: new Date(activity.createdAt).toLocaleString(),
    type: typeMap[activity.type].type,
    color: typeMap[activity.type].color,
  };
};

interface Activity {
  id: string;
  title: string;
  timestamp: string;
  type: ActivityType;
  color: string;
}

const badgeColors = {
  Challenge: "bg-green-100 #40B773",
  Post: "bg-blue-100 #1570EF",
  Comment: "bg-purple-100 #9C27B0",
  Profile: "bg-gray-100 #607D8B",
  All: "",
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  const [selectedFilter, setSelectedFilter] = useState<ActivityType>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(5);

  const normalizedActivities = activities.map(mapActivity);

  const filteredActivities =
    selectedFilter === "All"
      ? normalizedActivities
      : normalizedActivities.filter(
          (activity) => activity.type === selectedFilter,
        );

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
          {normalizedActivities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">No recent activity yet</p>
            </div>
          )}
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
                        style={{ color: activity.color }}
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
