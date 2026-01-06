"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { petMockData } from "@/mockdata";
import Image from "next/image";
import StatCard from "../components/StatsCard";
import Link from "next/link";
import { Calendar, Search } from "lucide-react";
import DropdownMenu, {DropdownItem} from "../../components/DropdownMenu";
import PaginationControls from "../../components/PaginationControls";
// import PaginationControls from "@/app/components/PaginationControls";
// import DropdownMenu, { DropdownItem } from "@/app/components/DropdownMenu";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("all");

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const router = useRouter();

  const filterPet = () => {
    return petMockData.filter((pet) => {
      const name = pet.petName?.toLowerCase() || "";
      const matchesSearch = name.includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || pet.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  };

  const filteredPet = filterPet();

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

  const totalPages = Math.ceil(filteredPet.length / rowsPerPage);
  const paginatedPet = filteredPet.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
          label: "Edit Pet",
          icon: "/edit.svg",
          onClick: () => alert(`Editing ${petId}`),
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
            value="12,845"
            subtitle="+12% from last month"
          />
          <StatCard
            title="Active Pets"
            value="6,845"
            subtitle="72.7% of total pets"
          />
          <StatCard title="New Pets" value="400" subtitle="This week" />
        </div>

        <div className="bg-white p-4 rounded mt-6">
          {/* Filters */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 capitalize">
              all pets ({petMockData.length})
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
                {paginatedPet.length > 0 ? (
                  paginatedPet.map((pet, index) => (
                    <tr key={pet.id} className="border-b border-border">
                      <td className="px-4 py-4 font-medium">{pet.petName}</td>
                      <td className="px-4 py-4 capitalize">{pet.ownerName}</td>
                      <td className="px-4 py-4 capitalize">{pet.breed}</td>
                      <td className="px-4 py-4">{pet.age}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-2 rounded-full text-xs font-semibold ${getStatusBadge(
                            pet.status
                          )}`}
                        >
                          {pet.status}
                        </span>
                      </td>
                      <td className="relative px-4 py-4">
                        <button
                          ref={(el) => { buttonRefs.current[index] = el; }}
                          onClick={() => handleToggleMenu(pet.id, index)}
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
                    <td
                      colSpan={8}
                      className="text-center py-8 text-gray-500"
                    >
                      {petMockData.length === 0
                        ? "No pet yet."
                        : "No pet found."}
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
