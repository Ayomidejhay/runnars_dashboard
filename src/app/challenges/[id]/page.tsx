"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { mockPetChallenges } from "@/mockdata";
import { Search } from "lucide-react";
import ParticipantsTab from "../components/ParticipantsTab";
import OverviewTab from "../components/OverViewTab";
import { ChallengeStatus } from "@/types";
import AnalyticsTab from "../components/AnalyticsTab";
import PostsTab from "../components/PostsTab";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  //const [searchTerm, setSearchTerm] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const dropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const challenge = mockPetChallenges.find((c) => c.id === Number(id));

  //date and time
  const startDate = new Date(`${challenge?.startDate}T${challenge?.startTime}`);
  const formattedDate = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const endDate = new Date(`${challenge?.startDate}T${challenge?.startTime}`);
  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedEndTime = endDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // calculate duration
  const start = new Date(`${challenge?.startDate}`);
  const end = new Date(`${challenge?.endDate}`);
  // Calculate difference in milliseconds
  const diffInMs = end.getTime() - start.getTime();
  // Convert to days
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  const filterChallenges = () => {
    return mockPetChallenges.filter((challenge) => {
      const name = challenge.name?.toLowerCase() || "";
      const description = challenge.description?.toLowerCase() || "";

      const matchesSearch =
        name.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || challenge.status === statusFilter;

      const matchesType =
        typeFilter === "all" || challenge.category === typeFilter;

      let matchesTab = true;
      if (activeTab === "featured") {
        matchesTab = challenge.is_featured;
      } else if (activeTab === "community") {
        matchesTab = challenge.community_id !== undefined;
      }

      return matchesSearch && matchesStatus && matchesType && matchesTab;
    });
  };

  const filteredChallenges = filterChallenges();

  //pages
  const totalPages = Math.ceil(filteredChallenges.length / rowsPerPage);
  const paginatedChallenges = filteredChallenges.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(e.target)
      ) {
        setOpenRow(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!challenge) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Challenge not found
          </h2>
          <p className="text-gray-500">
            The challenge you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/challenges")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Challenges
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button
          //cursor-pointer
          onClick={() => router.back()}
          className="flex gap-4 items-center text-deepblue"
        >
          <Image src="/arrow-back.svg" alt="icon" width={18} height={14} />
          Back
        </button>
        <div className="flex justify-between items-center">
          <h1 className="capitalize text-[34px] font-bold text-deepblue">
            challenges details
          </h1>
          <div className="flex gap-6">
            <Link href="">
              <Image src="/edit-detail.svg" alt="edit" width={40} height={40} />
            </Link>
            <Link href="">
              <Image
                src="/delete-detail.svg"
                alt="edit"
                width={40}
                height={40}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="py-4 mt-4">
        {/**tab */}
        <div className="flex space-x-4 border-b pl-4">
          {["overview", "participants", "analytics", "post"].map((tab) => (
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
        {/**content */}
        <div className="mt-4">
          {activeTab === "overview" && (
             <OverviewTab
               challenge={{
                 ...challenge,
                 status: challenge?.status as any, // or as ChallengeStatus if imported
                 users: challenge?.users?.map(user => ({
                   ...user,
                   status: user.status as ChallengeStatus
                 })) ?? []
               }}
               getStatusBadge={getStatusBadge}
             />
          )}

          {activeTab === "participants" && (
            <ParticipantsTab />
          )}

          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "post" && <PostsTab />}
        </div>
      </div>
    </div>
  );
};

export default page;
