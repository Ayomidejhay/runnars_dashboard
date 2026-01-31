"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { challenge } from "@/types";

import PaginationControls from "../components/PaginationControls";
import DropdownMenu from "../components/DropdownMenu";
import { useAllChallenges, useDeleteChallenge } from "@/hooks/useChallenges";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";

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



const Page = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"all" | "featured" | "community">(
    "all",
  );

  const [challengeToDelete, setChallengeToDelete] = useState<challenge | null>(
    null,
  );

  const [dateRange, setDateRange] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [dateError, setDateError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openRow, setOpenRow] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
    buttonHeight: number;
  } | null>(null);

  // const deleteModalMutation = useDeleteChallenge();
  const deleteModalMutation = useDeleteChallenge();

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

  const category =
    activeTab === "featured" || activeTab === "community"
      ? (activeTab as "featured" | "community")
      : undefined;

  /* =========================
     API Params
  ========================= */

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
      type: typeFilter !== "all" ? typeFilter : undefined,
      category,
      ...dateParams,
    };
  }, [
    currentPage,
    rowsPerPage,
    searchTerm,
    statusFilter,
    typeFilter,
    category,
    dateRange,
    customStartDate,
    customEndDate,
  ]);

  const { data, isLoading } = useAllChallenges(apiParams);

  const challenges = Array.isArray(data?.data?.challenges)
    ? data.data.challenges
    : [];

  const totalPages = data?.data?.pagination?.totalPages ?? 1;
  const totalCount = data?.data?.pagination?.totalCount ?? 0;

  /* =========================
     Reset Pagination
  ========================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    statusFilter,
    typeFilter,
    activeTab,
    dateRange,
    customStartDate,
    customEndDate,
  ]);

  const formatDate = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleActionClick = (e: React.MouseEvent, id: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    setOpenRow(id);
    setDropdownPos({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX - 120,
      buttonHeight: rect.height,
    });
  };



  const badge = (bg: string, text: string) =>
    `px-2 py-1 rounded-full text-xs ${bg} ${text}`;

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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[34px] font-bold">Challenges</h1>

        <div className="flex gap-4">
          <Link
            href="/challenges/managebadge"
            className="border px-4 py-2 rounded-full"
          >
            Manage Badges
          </Link>

          <Link
            href="/challenges/new-challenge"
            className="bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            New Challenge
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-6">
          {["all", "featured", "community"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-2 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 capitalize">
            {activeTab} Challenges ({totalCount})
          </h2>
          <div className=" flex flex-wrap gap-4 items-center">
            <div className="relative w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search challenges"
                className="pl-10 pr-4 h-10 w-full border rounded-full text-sm"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 px-4 border rounded-full text-sm"
            >
              <option value="all">Type</option>
              <option value="walk">Walk</option>
              <option value="exercise">Exercise</option>
              <option value="health">Health</option>
              <option value="social">Social</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-4 border rounded-full text-sm"
            >
              <option value="all">Status</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>

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
      </div>
      {/* Filters */}

      {dateError && <p className="text-red-500 text-sm mb-4">{dateError}</p>}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3">Participants</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Start</th>
              <th className="px-4 py-3">End</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center">
                  Loading challenges...
                </td>
              </tr>
            ) : challenges.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No challenges found.
                </td>
              </tr>
            ) : (
              challenges.map((c: any) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold text-deepblue">
                    <div className="flex gap-1.5 items-center">
                      <Image
                        src={c.image || "/petmock.svg"}
                        alt={c.title}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <p>{c.title}</p>
                        <p className="text-xs text-[#8E98A8] font-normal">
                          {c.challengeCategory}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* <td className="px-4 py-3 font-semibold">
                    {c.title}
                    <p className="text-xs text-gray-400 capitalize">
                      {c.challengeCategory}
                    </p>
                  </td> */}

                  <td className="px-4 py-3 text-center">
                    {Array.isArray(c.participants) ? c.participants.length : 0}
                  </td>

                  <td className="px-4 py-3 text-center capitalize">
                    <span className="px-2 py-1 rounded-full text-xs bg-[#E8F1FD] text-[#1570EF]">
                      {c.type}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        c.status === "active"
                          ? "bg-[#E8F1FD] text-[#1570EF]"
                          : c.status === "scheduled"
                            ? "bg-[#FFF8E1] text-[#FFA000]"
                            : c.status === "completed"
                              ? "bg-[#ECF8F1] text-[#40B773]"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {formatDate(c.startDate)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {formatDate(c.endDate)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button onClick={(e) => handleActionClick(e, c._id)}>
                      <Image
                        src="/Button-table.svg"
                        alt="Actions"
                        width={20}
                        height={20}
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={(v) => {
          setRowsPerPage(v);
          setCurrentPage(1);
        }}
      />

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
            href:
              openRow &&
              challenges.find((c: challenge) => c._id === openRow)?._id
                ? `/challenges/${challenges.find((c: challenge) => c._id === openRow)?._id}`
                : "#",

            // href: openRow ? `/challenges/${openRow}` : "#",
          },
          {
            label: "Edit",
            icon: "/edit.svg",
             href:
              openRow &&
              challenges.find((c: challenge) => c._id === openRow)?._id
                ? `/challenges/${challenges.find((c: challenge) => c._id === openRow)?._id}/edit`
                : "#",
          },
          {
            label: "Delete",
            icon: "/user.svg",
            danger: true,
            onClick: () => {
              setChallengeToDelete(
                challenges.find((c: challenge) => c._id === openRow) || null,
              );
            },
          },
        ]}
      />

      {challengeToDelete && (
        <DeleteModal
          // name={challengeToDelete.title}
          isLoading={deleteModalMutation.isPending}
          onCancel={() => setChallengeToDelete(null)}
          message={`Are you sure you want to delete the challenge "${challengeToDelete.title}"? This action cannot be undone.`}
          deleteObject="challenge"
          onConfirm={() => {
            if (!challengeToDelete?._id)
              return toast.error("Invalid challenge");
            deleteModalMutation.mutate(challengeToDelete._id, {
              onSuccess: () => setChallengeToDelete(null),
              onError: (error: any) =>
                toast.error(
                  error?.response?.data?.message ||
                    "Failed to delete challenge",
                ),
            });
          }}
        />
      )}
    </div>
  );
};

export default Page;
