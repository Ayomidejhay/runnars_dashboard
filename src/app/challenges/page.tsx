"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { mockPetChallenges } from "@/mockdata";
import { Calendar, Filter, Search } from "lucide-react";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  //const [searchTerm, setSearchTerm] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const dropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const router = useRouter();

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

  const getTypeBadge = (category: string) => {
    const variants: Record<string, string> = {
      exercise: "bg-blue-100 text-blue-700",
      social: "bg-teal-100 text-teal-700",
      health: "bg-green-100 text-green-700",
      training: "bg-yellow-100 text-yellow-700",
      fun: "bg-purple-100 text-purple-700",
    };
    return variants[category] || variants.exercise;
  };

  const handleChallengeAction = async (id: string, action: string) => {
    if (action === "see details") {
      router.push(`/challenges/${id}`);
    } else if (action === "edit") {
      router.push(`/challenges/${id}/edit`);
    } else if (action === "delete") {
    }
  };

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

  return (
    <div className="px-10">
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-[34px] font-bold text-deepblue">
          challenges
        </h1>
        <div className="flex gap-6">
          <Link
            href="/challenges/managebadge"
            className="w-[163px] h-[44px]  bg-transparent border border-brightblue text-brightblue rounded-[32px] flex items-center justify-center"
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
          <div className="     flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-800 capitalize">
                {activeTab} Challenges
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="relative h-10  rounded-[32px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search challenges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-[32px] w-[240px] text-sm"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border px-3 py-2 h-10 text-sm w-[137px] rounded-[32px]"
              >
                <option value="all">Types</option>
                <option value="exercise">Exercise</option>
                <option value="social">Social</option>
                <option value="health">Health</option>
                <option value="training">Training</option>
                <option value="fun">Fun</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-[32px] px-3 py-2 h-10 text-sm w-[87px]"
              >
                <option value="all">Status</option>
                <option value="active">Active</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
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
                  <th className="px-4 py-2">Challenge Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Start Date</th>
                  <th className="px-4 py-2">End Date</th>
                  <th className="px-4 py-2">Participants</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedChallenges.length > 0 ? (
                  paginatedChallenges.map((challenge) => (
                    <tr key={challenge.id} className="border-b">
                      <td className="px-4 py-4 font-medium">
                        {challenge.name}
                      </td>
                      <td className="px-4 py-4 capitalize">{challenge.type}</td>
                      <td className="px-4 py-4">{challenge.location}</td>
                      <td className="px-4 py-4">{challenge.startDate}</td>
                      <td className="px-4 py-4">{challenge.endDate}</td>
                      <td className="px-4 py-4">{challenge.participants}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-2 rounded-full text-xs font-semibold ${getStatusBadge(
                            challenge.status
                          )}`}
                        >
                          {challenge.status}
                        </span>
                      </td>
                      <td className="relative px-4 py-4">
                        <button onClick={() => setOpenRow(challenge.id)}>
                          <Image
                            src="/Button-table.svg"
                            alt="button"
                            width={24}
                            height={24}
                            className="cursor-pointer"
                          />
                        </button>

                        {openRow === challenge.id && (
                          <div
                            ref={dropdownRef}
                            className="absolute left-[-10rem] top-0 w-40 bg-white shadow-lg rounded-md z-10"
                          >
                            <Link href={`/challenges/${challenge.id}`}  className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center ">
                              <Image
                                src="/eye.svg"
                                alt="icon"
                                width={24}
                                height={24}
                              />
                              See Details
                            </Link>
                            <button className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center ">
                              <Image
                                src="/edit.svg"
                                alt="icon"
                                width={24}
                                height={24}
                              />
                              Edit
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 flex gap-2 items-center ">
                              <Image
                                src="/user.svg"
                                alt="icon"
                                width={24}
                                height={24}
                              />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      {mockPetChallenges.length === 0
                        ? "No challenges yet. Create your first challenge or generate mock data."
                        : "No active challenges found."}
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
};

export default page;
