"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { mockBadges } from "@/mockdata";
import { Search } from "lucide-react";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const dropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredBadges = mockBadges.filter((badge) =>
    badge.badgeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBadges.length / rowsPerPage);
  const paginatedBadges = filteredBadges.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short", // Jan, Feb, etc.
    day: "numeric", // 1, 2, 3
    year: "numeric", // 2025
  });
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-[34px] font-bold text-deepblue">
          manage challenge badges
        </h1>
        <div className="flex gap-6">
          <Link
            href="/challenges/managebadge/newbadge"
            className="w-[163px] h-[44px] text-white bg-brightblue rounded-[32px] flex items-center justify-center"
          >
            <span className="text-[14px] flex items-center gap-[2px] font-bold">
              <Image src="/add.svg" alt="add" width={24} height={24} />
              New Badge
            </span>
          </Link>
        </div>
      </div>

      <div className="p-4 mt-4 bg-white rounded-[10px]">
        <div className="flex justify-between items-center  pb-3">
          <h2 className="text-[16px] text-deepblue capitalize font-bold">
            all badges({filteredBadges.length})
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search badges..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 border rounded-md text-sm w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 rounded-md">
              <tr className="border-none">
                <th className="px-4 py-2">Badge Name</th>
                <th className="px-4 py-2">Created Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBadges.length > 0 ? (
                paginatedBadges.map((badge) => (
                  <tr key={badge.id} className="border-b ">
                    <td className="px-4 py-4 font-medium">{badge.badgeName}</td>
                    <td className="px-4 py-4 capitalize">
                      {formatDate(badge.dateCreated)}
                    </td>

                    <td className="relative flex items-center gap-6 px-4 py-4">
                      <button>
                        <Image
                          src="/edit.svg"
                          alt="button"
                          width={24}
                          height={24}
                          className="cursor-pointer"
                        />
                      </button>
                      <button>
                        <Image
                          src="/trash.svg"
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
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    {mockBadges.length === 0
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
  );
};

export default page;
