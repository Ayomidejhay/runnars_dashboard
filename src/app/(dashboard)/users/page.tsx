"use client";

import React, { useState, useRef, use, useEffect, useMemo } from "react";
import { userMockData } from "@/mockdata";
import Link from "next/link";
import Image from "next/image";
import StatCard from "./components/StatsCard";
import { Calendar, Search } from "lucide-react";
// import PaginationControls from "@/app/components/PaginationControls";
import PaginationControls from "../components/PaginationControls";
import DropdownMenu from "../components/DropdownMenu";
import { useQueryClient } from "@tanstack/react-query";
import { useAllUsers } from "@/hooks/useUsers";

/* =========================
   Date Range Utility
========================= */
const getPresetDateRange = (range: string) => {
  const now = new Date();
  let startDate: Date | undefined;
  let endDate: Date | undefined = new Date();

  switch (range) {
    case "today":
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      break;

    case "yesterday":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(now);
      endDate.setDate(now.getDate() - 1);
      endDate.setHours(23, 59, 59, 999);
      break;

    case "last7":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      break;

    case "last30":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 30);
      break;

    case "thisMonth":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;

    case "lastMonth":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0);
      break;

    case "thisYear":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;

    default:
      return {};
  }

  return {
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
  };
};

export default function Page() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [openRow, setOpenRow] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
    buttonHeight: number;
  } | null>(null);

  const [dateRange, setDateRange] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [dateError, setDateError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Keep refs for each action button
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /* =========================
       Validate Custom Dates
    ========================= */
  useEffect(() => {
    if (
      dateRange === "custom" &&
      customStartDate &&
      customEndDate &&
      new Date(customStartDate) > new Date(customEndDate)
    ) {
      setDateError("End date must be after start date");
    } else {
      setDateError("");
    }
  }, [customStartDate, customEndDate, dateRange]);

  const apiParams = useMemo(() => {
    let dateParams = {};

    if (dateRange === "custom" && customStartDate && customEndDate) {
      dateParams = {
        startDate: new Date(customStartDate).toISOString(),
        endDate: new Date(customEndDate).toISOString(),
      };
    } else if (dateRange !== "all") {
      dateParams = getPresetDateRange(dateRange);
    }

    return {
      page: currentPage,
      limit: rowsPerPage,
      search: searchTerm || undefined,
      status: statusFilter !== "all" ? statusFilter : undefined,

      ...dateParams,
    };
  }, [
    currentPage,
    rowsPerPage,
    searchTerm,
    statusFilter,

    dateRange,
    customStartDate,
    customEndDate,
  ]);

  const { data, isLoading } = useAllUsers(apiParams);
  const users = Array.isArray(data?.data?.users) ? data?.data?.users : [];

  const { activeUsers } = data?.data?.statistics || { activeUsers: 0 };

  const totalPages = data?.data?.pagination?.totalPages ?? 1;
  const totalUsers = data?.data?.pagination?.totalUsers ?? 0;

  const activePercentage =
    totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : "0";

  /* =========================
       Reset Pagination
    ========================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateRange, customStartDate, customEndDate]);

  const formatDate = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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

  const handleToggleDropdown = (userId: string) => {
    if (openRow === userId) {
      setOpenRow(null);
      return;
    }

    const btn = buttonRefs.current[userId];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setDropdownPos({
        top: rect.top + window.scrollY, // top position relative to page
        left: rect.left + window.scrollX,
        buttonHeight: rect.height, // ✅ include button height
      });
    }

    setOpenRow(userId);
  };

  return (
    <div className="px-10">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="capitalize text-[34px] font-bold text-deepblue">
            users
          </h1>
          <div className="flex gap-6"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            title="Total Users"
            value={totalUsers.toLocaleString()}
            // subtitle="+12% from last month"
          />
          <StatCard
            title="Active Users"
            value={users
              .filter((u: any) => u.userStatus === "active")
              .length.toLocaleString()}
            subtitle={`${activePercentage}% of total users`}
          />
          <StatCard
            title="New Users"
            value={data?.data?.statistics?.recentUsers || 0}
            subtitle="This week"
          />
        </div>

        {/* Table */}
        <div className="bg-white p-4 rounded mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 capitalize">
              all users ({totalUsers.toLocaleString()})
            </h2>
            <div className="flex flex-wrap gap-4">
              <div className="relative h-10 rounded-[32px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-[32px] w-[240px] text-sm"
                />
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
                  <option value="inactive">Inactive</option>
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
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="h-10 px-4 border rounded-full text-sm"
              >
                <option value="all">Date Range</option>
                <option value="today">Today</option>
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="custom">Custom</option>
              </select>

              {dateRange === "custom" && (
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="h-10 px-3 border rounded"
                  />
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="h-10 px-3 border rounded"
                  />
                </div>
              )}
            </div>
          </div>
          {dateError && (
            <p className="text-red-500 text-sm mb-4">{dateError}</p>
          )}

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left">
              <thead className="bg-tableheader text-tableheadertext rounded-md">
                <tr>
                  <th className="px-4 py-2">User Name</th>
                  <th className="px-4 py-2">Joined date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Number of pets</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user: any) => (
                    <tr key={user._id} className="border-t hover:bg-gray-50 ">
                      <td className="px-4 py-3 font-bold text-deepblue">
                        <div className="flex gap-1.5 items-center">
                          <Image
                            src={user.profilePicture || "/profile-icon.svg"}
                            alt={user.fullName}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex flex-col gap-1">
                            <p>{user.fullName}</p>
                            <p className="text-xs text-[#8E98A8] font-normal">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-2 rounded-full text-xs font-semibold ${getStatusBadge(
                            user.userStatus,
                          )}`}
                        >
                          {user.userStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 pl-10">{user.petCount}</td>
                      <td className="relative px-4 py-3">
                        <button
                          ref={(el) => {
                            buttonRefs.current[user._id] = el;
                          }}
                          onClick={() => handleToggleDropdown(user._id)}
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

      {/* Dropdown Menu (Portal) */}
      <DropdownMenu
        isOpen={openRow !== null}
        position={dropdownPos}
        onClose={() => setOpenRow(null)}
        items={[
          {
            label: "See Profile",
            icon: "/eye.svg",
            href: openRow ? `/users/${openRow}` : "#",
          },
          {
            label: "Deactivate User",
            icon: "/user.svg",
            danger: true,
            onClick: () => console.log("Deactivate", openRow),
          },
        ]}
      />
    </div>
  );
}
