"use client";

import React, { useEffect, useRef, useState } from "react";
import { userMockData } from "@/mockdata";
import Link from "next/link";
import Image from "next/image";
import StatCard from "./components/StatsCard";
import { useRouter } from "next/navigation";
import { Calendar, Search } from "lucide-react";

export default function page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

 const [openRow, setOpenRow] = useState<string | null>(null);
  const dropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const router = useRouter();

    const filterUser = () => {
      return userMockData.filter((user) => {
        const name = user.name?.toLowerCase() || "";
        // const description = community.description?.toLowerCase() || "";
  
        const matchesSearch = name.includes(searchTerm.toLowerCase());
        name.includes(searchTerm.toLowerCase()) || ''
        // description.includes(searchTerm.toLowerCase());
  
        const matchesStatus =
          statusFilter === "all" || user.status === statusFilter;
  
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
  
    const filteredUser = filterUser();
  
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
  
    const totalPages = Math.ceil(filteredUser.length / rowsPerPage);
    const paginatedUser = filteredUser.slice(
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
        <div className="bg-white p-4 rounded mt-6">
                  {/* Filters */}
                  <div className="     flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold text-gray-800 capitalize">
                        all users ({userMockData.length})
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="relative h-10  rounded-[32px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search user..."
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
                            <tr key={user.id} className="border-b">
                              <td className="px-4 py-4 font-medium">
                                {user.name}
                              </td>
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
                                  onClick={() => setOpenRow((user.id))}
                                >
                                  <Image
                                    src="/Button-table.svg"
                                    alt="button"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer"
                                  />
                                </button>
        
                                {openRow === (user.id) && (
                                  <div
                                    ref={dropdownRef}
                                    className="absolute left-[-10rem] top-0 w-40 bg-white shadow-lg rounded-md -mt-12 z-10"
                                  >
                                    <Link
                                      href={`/users/${user.id}`}
                                      className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center "
                                    >
                                      <Image
                                        src="/eye.svg"
                                        alt="icon"
                                        width={24}
                                        height={24}
                                      />
                                      See Profile
                                    </Link>
                                    <button className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center ">
                                      <Image
                                        src="/edit.svg"
                                        alt="icon"
                                        width={24}
                                        height={24}
                                      />
                                      Edit User
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 flex gap-2 items-center ">
                                      <Image
                                        src="/user.svg"
                                        alt="icon"
                                        width={24}
                                        height={24}
                                      />
                                      Deactivate User
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={8} className="text-center py-8 text-gray-500">
                              {userMockData.length === 0
                                ? "No user yet. "
                                : "No user found."}
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
