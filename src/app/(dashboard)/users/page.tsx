"use client";

import React, { useState, useRef } from "react";
import { userMockData } from "@/mockdata";
import Link from "next/link";
import Image from "next/image";
import StatCard from "./components/StatsCard";
import { Calendar, Search } from "lucide-react";
// import PaginationControls from "@/app/components/PaginationControls";
import PaginationControls from "../components/PaginationControls";
import DropdownMenu from "../components/DropdownMenu";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
    buttonHeight: number;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Keep refs for each action button
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const filterUser = () => {
    return userMockData.filter((user) => {
      const name = user.name?.toLowerCase() || "";
      const matchesSearch = name.includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const filteredUser = filterUser();
  const totalPages = Math.ceil(filteredUser.length / rowsPerPage);
  const paginatedUser = filteredUser.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
          <div className="flex gap-6">
            <Link
              href="/users/new-user"
              className="w-[170px] h-[44px] text-white bg-brightblue rounded-[32px] flex items-center justify-center"
            >
              <span className="text-[14px] flex items-center gap-[2px] font-bold">
                <Image src="/add.svg" alt="add" width={24} height={24} />
                New User
              </span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            title="Total Users"
            value="12,845"
            subtitle="+12% from last month"
          />
          <StatCard
            title="Active Users"
            value="6,845"
            subtitle="72.7% of total users"
          />
          <StatCard title="New Users" value="400" subtitle="This week" />
        </div>

        {/* Table */}
        <div className="bg-white p-4 rounded mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 capitalize">
              all users ({userMockData.length})
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

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left">
              <thead className="bg-tableheader text-tableheadertext rounded-md">
                <tr>
                  <th className="px-4 py-2">User Name</th>
                  <th className="px-4 py-2">Joined date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Number of pet</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUser.length > 0 ? (
                  paginatedUser.map((user) => (
                    <tr key={user.id} className="border-b border-border">
                      <td className="px-4 py-4 font-medium">{user.name}</td>
                      <td className="px-4 py-4 capitalize">
                        {user.dateJoined}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-2 rounded-full text-xs font-semibold ${getStatusBadge(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">3</td>
                      <td className="relative px-4 py-4">
                        <button
                          ref={(el) => {
                            buttonRefs.current[user.id] = el;
                          }}
                          onClick={() => handleToggleDropdown(user.id)}
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
                      {userMockData.length === 0
                        ? "No user yet."
                        : "No user found."}
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
            label: "Edit User",
            icon: "/edit.svg",
            onClick: () => console.log("Edit", openRow),
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
