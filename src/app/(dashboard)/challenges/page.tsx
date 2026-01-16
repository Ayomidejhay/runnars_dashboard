"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { mockPetChallenges } from "@/mockdata";
import { Calendar, Search } from "lucide-react";
import PaginationControls from "../components/PaginationControls";
import DropdownMenu from "../components/DropdownMenu";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const [openRow, setOpenRow] = useState<number | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
    buttonHeight: number;
  } | null>(null);

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Format date as "Apr 15, 2025"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filtering
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
  const totalPages = Math.ceil(filteredChallenges.length / rowsPerPage);
  const paginatedChallenges = filteredChallenges.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // handle action button click
  const handleActionClick = (e: React.MouseEvent, id: number) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const buttonHeight = rect.height;
    const dropdownHeight = 160; // approximate dropdown height
    const left = rect.right - 160; // align with dropdown width
    const clampedLeft = Math.max(
      8,
      Math.min(left, window.innerWidth - 160 - 8)
    );

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    let top: number;

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      // not enough space below → show above
      top = rect.top + window.scrollY - dropdownHeight;
    } else {
      // default → show below
      top = rect.top + window.scrollY + buttonHeight;
    }

    if (openRow === id) {
      setOpenRow(null);
      setDropdownPos(null);
    } else {
      setOpenRow(id);
      setDropdownPos({
        top,
        left: clampedLeft + window.scrollX,
        buttonHeight,
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#E8F1FD] text-[#1570EF]";
      case "scheduled":
        return "bg-[#FFF8E1] text-[#FFA000]";
      case "completed":
        return "bg-[#ECF8F1] text-[#40B773]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getChallengeBadge = (type: string) => {
    switch (type) {
      case "walk":
        return "bg-[#E8F1FD] text-[#1570EF]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="px-10">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-[34px] font-bold text-deepblue">
          challenges
        </h1>
        <div className="flex gap-6">
          <Link
            href="/challenges/managebadge"
            className="w-[163px] h-[44px] bg-transparent border border-brightblue text-brightblue rounded-[32px] flex items-center justify-center"
          >
            <span className="text-[14px] flex items-center gap-[2px] font-bold">
              Manage Badges
              <Image src="/arrow-right.svg" alt="add" width={24} height={24} />
            </span>
          </Link>
          <Link
            href="/challenges/new-challenge"
            className="w-[163px] h-[44px] text-white bg-brightblue rounded-[32px] flex items-center justify-center"
          >
            <span className="text-[14px] flex items-center gap-[2px] font-bold">
              <Image src="/add.svg" alt="add" width={24} height={24} />
              New Challenge
            </span>
          </Link>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div>
        <div className="border-b">
          <div className="flex space-x-4 px-5">
            {["all", "featured", "community"].map((tab) => (
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
        </div>

        <div className="bg-white p-4 rounded mt-6">
          {/* Filters */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 capitalize">
              {activeTab} Challenges
            </h2>

            <div className="flex flex-wrap gap-4">
              {/* Search */}
              <div className="relative w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search challenges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 border rounded-[32px] text-xs w-full h-10"
                />
              </div>

              {/* Type Filter */}
              <div className="relative w-[137px]">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="border px-3 text-xs w-full rounded-[32px] appearance-none h-10"
                >
                  <option value="all">Types</option>
                  <option value="exercise">Exercise</option>
                  <option value="social">Social</option>
                  <option value="health">Health</option>
                  <option value="training">Training</option>
                  <option value="fun">Walk</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>

              {/* Status Filter */}
              <div className="relative w-[87px]">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border px-3 text-xs w-full rounded-[32px] appearance-none h-10"
                >
                  <option value="all">Status</option>
                  <option value="active">Active</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                </select>

                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>

              {/* Date Range Filter */}
              <div className="relative w-[150px]">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border px-3 text-xs w-full rounded-[32px] appearance-none h-10"
                >
                  <option value="all">Date Range</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7">Last 7 Days</option>
                  <option value="last30">Last 30 Days</option>
                  <option value="thisMonth">This Month</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="thisYear">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left relative">
              <thead className="bg-tableheader font-normal text-tableheadertext rounded-md">
                <tr>
                  <th className="px-4 py-2">Challenge Name</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Participants</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Start Date</th>
                  <th className="px-4 py-2">End Date</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedChallenges.length > 0 ? (
                  paginatedChallenges.map((challenge) => (
                    <tr
                      key={challenge.id}
                      className="border-b border-border text-deepblue text-[14px] font-bold hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 font-bold text-deepblue">
                        <div className="flex gap-1.5 items-center">
                          <Image
                            src="/challenge.svg"
                            alt={challenge.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex flex-col gap-1">
                            <p>{challenge.name}</p>
                            <p className="text-xs text-[#8E98A8] font-normal">
                              {challenge.is_featured
                                ? "Featured"
                                : "Freewalk Pack"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">{challenge.location}</td>
                      <td className="px-4 py-4">{challenge.participants}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-2 rounded-full text-xs font-semibold capitalize ${getChallengeBadge(
                            challenge.type
                          )}`}
                        >
                          {challenge.type}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-2 rounded-full text-xs font-semibold capitalize ${getStatusBadge(
                            challenge.status
                          )}`}
                        >
                          {challenge.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {formatDate(challenge.startDate)}
                      </td>
                      <td className="px-4 py-4">
                        {formatDate(challenge.endDate)}
                      </td>
                      <td className="relative px-4 py-4">
                        <button
                          onClick={(e) => handleActionClick(e, challenge.id)}
                        >
                          <Image
                            src="/Button-table.svg"
                            alt="button"
                            width={24}
                            height={24}
                            className="cursor-pointer"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      {mockPetChallenges.length === 0
                        ? "No challenges yet. Create your first challenge."
                        : "No active challenges found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Single global DropdownMenu */}
      <DropdownMenu
        isOpen={openRow !== null}
        position={dropdownPos}
        onClose={() => {
          setOpenRow(null);
          setDropdownPos(null);
        }}
        items={[
          {
            label: "See Details",
            icon: "/eye.svg",
            href: openRow ? `/challenges/${openRow}` : "#",
          },
          {
            label: "Edit",
            icon: "/edit.svg",
            onClick: () => console.log("Edit", openRow),
          },
          {
            label: "Delete",
            icon: "/user.svg",
            danger: true,
            onClick: () => console.log("Delete", openRow),
          },
        ]}
      />
    </div>
  );
};

export default Page;
