"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import StatCard from "./components/StatCard";
import { communityMockData } from "@/mockdata";
import { Calendar, Filter, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [openRow, setOpenRow] = useState<number | null>(null);
  const dropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const router = useRouter();

  const filterCommunity = () => {
    return communityMockData.filter((community) => {
      const name = community.name?.toLowerCase() || "";
      // const description = community.description?.toLowerCase() || "";

      const matchesSearch = name.includes(searchTerm.toLowerCase());
      name.includes(searchTerm.toLowerCase()) || ''
      // description.includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || community.status === statusFilter;

      // const matchesType =
      //   typeFilter === "all" || challenge.category === typeFilter;

      // let matchesTab = true;
      // if (activeTab === "featured") {
      //   matchesTab = challenge.is_featured;
      // } else if (activeTab === "community") {
      //   matchesTab = challenge.community_id !== undefined;
      // }

      return matchesSearch && matchesStatus;
      // && matchesType && matchesTab;
    });
  };

  const filteredCommunity = filterCommunity();

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

  const totalPages = Math.ceil(filteredCommunity.length / rowsPerPage);
  const paginatedCommunity = filteredCommunity.slice(
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
  return (
    <div className="px-10">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="capitalize text-[34px] font-bold text-deepblue">
            communities
          </h1>
          <div className="flex gap-6">
            <Link
              href="/communities/managebadge"
              className="w-[207px] h-[44px]  bg-transparent border border-brightblue text-brightblue rounded-[32px] flex items-center justify-center"
            >
              <span className="text-[14px] flex items-center gap-[2px] font-bold">
                Manage Community Badges
              </span>
            </Link>
            <Link
              href="/communities/new-community"
              className="w-[170px] h-[44px] text-white bg-brightblue rounded-[32px] flex items-center justify-center"
            >
              <span className="text-[14px] flex items-center gap-[2px] font-bold">
                <Image src="/add.svg" alt="add" width={24} height={24} />
                New Community
              </span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            title="total communities"
            value="412"
            subtitle="28 since last month"
          />
          <StatCard
            title="active members"
            value="6,358"
            subtitle="67.1% of total users"
          />
          <StatCard title="group walks" value="400" subtitle="Last 30 days" />
        </div>
        <div className="bg-white p-4 rounded mt-6">
          {/* Filters */}
          <div className="     flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-800 capitalize">
                all communities ({communityMockData.length})
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="relative h-10  rounded-[32px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search community..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-[32px] w-[240px] text-sm"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-[32px] px-3 py-2 h-10 text-sm w-[87px]"
              >
                <option value="all">Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <button className="flex items-center px-3 w-[117px] h-10 py-2 border rounded-[32px] text-sm hover:bg-gray-100">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </button>
            </div>
          </div>

          {/*table*/}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 rounded-md">
                <tr className="border-none">
                  <th className="px-4 py-2">Community Name</th>
                  <th className="px-4 py-2">Creator</th>
                  <th className="px-4 py-2">Created Date</th>
                  <th className="px-4 py-2">Members</th>
                  <th className="px-4 py-2">Location</th>

                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCommunity.length > 0 ? (
                  paginatedCommunity.map((community) => (
                    <tr key={community.id} className="border-b">
                      <td className="px-4 py-4 font-medium">
                        {community.name}
                      </td>
                      <td className="px-4 py-4 capitalize">
                        {community.creator}
                      </td>
                      <td className="px-4 py-4">{community.createdDate}</td>

                      <td className="px-4 py-4">{community.members}</td>
                      <td className="px-4 py-4">{community.location}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-2 rounded-full text-xs font-semibold ${getStatusBadge(
                            community.status
                          )}`}
                        >
                          {community.status}
                        </span>
                      </td>
                      <td className="relative px-4 py-4">
                        <button
                          onClick={() => setOpenRow(Number(community.id))}
                        >
                          <Image
                            src="/Button-table.svg"
                            alt="button"
                            width={24}
                            height={24}
                            className="cursor-pointer"
                          />
                        </button>

                        {openRow === Number(community.id) && (
                          <div
                            ref={dropdownRef}
                            className="absolute left-[-10rem] top-0 w-40 bg-white shadow-lg rounded-md -mt-12 z-10"
                          >
                            <Link
                              href={`/communities/${community.id}`}
                              className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center "
                            >
                              <Image
                                src="/eye.svg"
                                alt="icon"
                                width={24}
                                height={24}
                              />
                              View Community
                            </Link>
                            <button className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center ">
                              <Image
                                src="/edit.svg"
                                alt="icon"
                                width={24}
                                height={24}
                              />
                              Edit Community
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 flex gap-2 items-center ">
                              <Image
                                src="/user.svg"
                                alt="icon"
                                width={24}
                                height={24}
                              />
                              Delete Community
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      {communityMockData.length === 0
                        ? "No community yet. Create your first community"
                        : "No active community found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <div className="flex justify-end items-center my-2 gap-2">
                <label htmlFor="rows" className="text-sm text-gray-600">
                  Rows per page:
                </label>
                <select
                  id="rows"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className=" text-sm font-bold text-deepblue px-2 py-1"
                >
                  {[5, 10, 20, 50].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className=""
                  disabled={currentPage === 1}
                >
                  <Image src="/prev.svg" alt="prev" height={32} width={32} />
                </button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  className=""
                  disabled={currentPage === totalPages}
                >
                  <Image src="/next.svg" alt="prev" height={32} width={32} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
