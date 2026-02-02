"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { petMockData } from "@/mockdata";
import Image from "next/image";
import StatCard from "../components/StatsCard";
import Link from "next/link";
import { Calendar, Search } from "lucide-react";
import DropdownMenu, { DropdownItem } from "../../components/DropdownMenu";
import PaginationControls from "../../components/PaginationControls";
import { useAllPets } from "@/hooks/usePets";
import { useQueryClient } from "@tanstack/react-query";

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
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [petType, setPetType] = useState("all");
  const [breed, setBreed] = useState("all");
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [dateError, setDateError] = useState("");

     /** 🔒 GLOBAL STATS (cached once) */
    const [globalStats, setGlobalStats] = useState<{
      totalPets: number;
      activePets: number;
      newPetsThisWeek: number;
    } | null>(null);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      petType: petType !== "all" ? petType : undefined,
      breed : breed !== "all" ? breed : undefined,

      ...dateParams,
    };
  }, [
    currentPage,
    rowsPerPage,
    searchTerm,
    statusFilter,
    petType,
    breed,
    dateRange,
    customStartDate,
    customEndDate,
  ]);

  const { data, isLoading } = useAllPets(apiParams);
  const pets = Array.isArray(data?.data?.pets) ? data?.data?.pets : [];
  const petStatistics = data?.data?.statistics;

  /*  ========================
       Cache GLOBAL stats once
    ========================= */
    useEffect(() => {
      if (!globalStats && data?.data?.statistics) {
        setGlobalStats({
          totalPets: data.data.statistics.totalPets,
          activePets: data.data.statistics.activePets,
          newPetsThisWeek: data.data.statistics.newPetsThisWeek,
        });
      }
    }, [data, globalStats]);

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

  const totalPages = data?.data?.pagination?.totalPages ?? 1;
  const totalPets = data?.data?.pagination?.totalPets ?? 0;

  // dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    buttonHeight: number;
  } | null>(null);

  const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>([]);

  const handleToggleMenu = (petId: string, index: number) => {
    if (openRow === petId) {
      setOpenRow(null);
      setDropdownOpen(false);
      return;
    }

    const btn = buttonRefs.current[index];
    if (btn) {
      const rect = btn.getBoundingClientRect();

      setDropdownPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        buttonHeight: rect.height,
      });

      // menu items
      setDropdownItems([
        {
          label: "See Profile",
          icon: "/eye.svg",
          href: `/users/pets/${petId}`,
        },
        {
          label: "Delete Pet",
          icon: "/user.svg",
          danger: true,
          onClick: () => alert(`Deleting ${petId}`),
        },
      ]);
    }

    setOpenRow(petId);
    setDropdownOpen(true);
  };

  const activePercentage =
    globalStats && globalStats.totalPets > 0
      ? ((globalStats.activePets / globalStats.totalPets) * 100).toFixed(1)
      : "0";

  return (
    <div className="px-10">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="capitalize text-[34px] font-bold text-deepblue">
            pets
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            title="Total Pets"
            value={globalStats?.totalPets.toString() || 0}
            subtitle=""
          />
          <StatCard
            title="Active Pets"
            value={globalStats?.activePets.toString() || 0}
            subtitle={`${activePercentage}% of total pets`}
          />
          <StatCard
            title="New Pets"
            value={globalStats?.newPetsThisWeek.toString() || 0}
            subtitle="This week"
          />
        </div>

        <div className="bg-white p-4 rounded mt-6">
          {/* Filters */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 capitalize">
              all pets ({totalPets})
            </h2>
            <div className="flex flex-wrap gap-4">
              <div className="relative h-10 rounded-[32px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search pet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-[32px] w-[240px] text-sm"
                />
              </div>

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

              <div className="relative w-[87px]">
                <select
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  className="border px-3 text-xs w-full rounded-[32px] appearance-none h-10"
                >
                  <option value="all">Pet Type</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Other">Other</option>
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

              {/* Breed Filter */
              <div className="relative w-[120px]">
                <select
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="border px-3 text-xs w-full rounded-[32px] appearance-none h-10"
                >
                  <option value="all">Breed</option>
                  <option value="Golden Retriever">Golden Retriever</option>
                  <option value="Bulldog">Bulldog</option>
                  <option value="Labrador Retriever">Labrador Retriever</option>
                  <option value="Beagle">Beagle</option>
                  <option value="Rottweiler">Rottweiler</option>
                  <option value="German Shepherd">German Shepherd</option>
                  <option value="Poodle">Poodle</option>
                  <option value="Other">Other</option>
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
              </div>}

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

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left">
              <thead className="bg-tableheader text-tableheadertext rounded-md">
                <tr className="border-none">
                  <th className="px-4 py-2">Pet Name</th>
                  <th className="px-4 py-2">Owner</th>
                  <th className="px-4 py-2">Breed</th>
                  <th className="px-4 py-2">Age</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center">
                      Loading pets...
                    </td>
                  </tr>
                ) : pets.length > 0 ? (
                  pets.map((pet: any, index: number) => (
                    <tr key={pet._id} className="border-b border-border">
                      <td className="px-4 py-4 font-medium">
                        <div className="flex gap-1.5 items-center">
                          <Image
                            src={pet.photo || "/petmock.svg"}
                            alt={pet.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex flex-col gap-1">
                            <p>{pet.name}</p>
                            <p className="text-xs text-[#8E98A8] font-normal"></p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 capitalize">
                        {pet.ownerInfo.fullName}
                      </td>
                      <td className="px-4 py-4 capitalize">{pet.breed}</td>
                      <td className="px-4 py-4">{pet.ageGroup}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-2 rounded-full text-xs font-semibold ${getStatusBadge(
                            pet.status,
                          )}`}
                        >
                          {pet.status}
                        </span>
                      </td>
                      <td className="relative px-4 py-4">
                        <button
                          ref={(el) => {
                            buttonRefs.current[index] = el;
                          }}
                          onClick={() => handleToggleMenu(pet._id, index)}
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
                      {totalPets === 0 ? "No pet yet." : "No pet found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
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

      {/* DropdownMenu portal */}
      <DropdownMenu
        isOpen={dropdownOpen}
        position={dropdownPosition}
        onClose={() => {
          setOpenRow(null);
          setDropdownOpen(false);
        }}
        items={dropdownItems}
      />
    </div>
  );
}
