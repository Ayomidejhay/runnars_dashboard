"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { communityMockData } from "@/mockdata";
import Overview from "../components/Overview";
import Member from "../components/Member";
import Event from "../components/Event";
import Post from "../components/Post";
import Badge from "../components/Badge";
import Leaderboard from "../components/Leaderboard";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const community = communityMockData.find((c) => c.id === id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#ECF8F1] text-[#40B773]";
      case "inactive":
        return "bg-[#FFE0B2] text-[#E65100]";
      default:
        return "bg-[#ECF8F1] text-[#40B773]";
    }
  };

  if (!community) {
    return <p className="text-red-500">Community not found.</p>;
  }

  return (
    <div className="px-10">
      <div>
        <button
          onClick={() => router.back()}
          className="flex gap-4 items-center text-deepblue"
        >
          <Image src="/arrow-back.svg" alt="icon" width={18} height={14} />
          Back
        </button>
        <div className="flex justify-between items-center">
          <h1 className="capitalize text-[34px] font-bold text-deepblue">
            community details
          </h1>
          <div className="flex gap-6">
            <Link href="">
              <Image src="/edit-detail.svg" alt="edit" width={40} height={40} />
            </Link>
            <Link href="">
              <Image
                src="/delete-detail.svg"
                alt="delete"
                width={40}
                height={40}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="py-4 mt-4">
        {/* Tabs */}
        <div className="flex space-x-4 border-b pl-4">
          {["overview", "members", "events", "post", "badges", "leaderboard"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "overview" && (
            <Overview
              community={{
                ...community,
                status: community.status as "active" | "inactive",
              }}
              getStatusBadge={getStatusBadge}
            />
          )}
          {activeTab === "members" && (
            <Member />
          )}
           {activeTab === "events" && (
            <Event />
          )}
          {activeTab === "post" && (
            <Post />
          )}
          {activeTab === "badges" && (
            <Badge />
          )}
          {activeTab === "leaderboard" && (
            <Leaderboard />
          )}
        </div>
      </div>
    </div>
  );
}
