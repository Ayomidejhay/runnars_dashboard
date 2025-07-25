"use client";

import Image from "next/image";
import Link from "next/link";
import { mockPetChallenges } from "@/mockdata";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const dropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredChallenges = mockPetChallenges.filter((challenge) =>
    challenge.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-[34px] font-bold text-deepblue">
          dashboard
        </h1>
        <div className="w-[163px] h-[44px] text-white bg-brightblue rounded-[32px] flex items-center justify-center">
          <Link
            href=""
            className="text-[14px] flex items-center gap-[2px] font-bold"
          >
            <Image src="/add.svg" alt="add" width={24} height={24} />
            New Challenge
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Total Users",

            value: "12,845",
            subtitle: "+12% from last month",
          },
          {
            title: "Active Challenges",

            value: 26,
            subtitle: "4 new this week",
          },
          {
            title: "Total Communities",

            value: 400,
            subtitle: "+5% from last month",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent  flex flex-col gap-1 mt-6"
          >
            <div className="flex justify-between items-center  text-sm text-gray">
              <span>{item.title}</span>
            </div>
            <div className="text-2xl font-bold text-deepblue">{item.value}</div>
            <p className="text-xs text-[#40B773] flex items-center ">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>

      <div className="p-4 mt-4 bg-white rounded-[10px]">
        <div className="flex justify-between items-center  pb-3">
          <h2 className="text-[16px] text-deepblue capitalize font-bold">
            Featured Challenges
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search challenges..."
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
                <th className="px-4 py-2">Challenge Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Participants</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedChallenges.length > 0 ? (
                paginatedChallenges.map((challenge) => (
                  <tr key={challenge.id} className="border-b ">
                    <td className="px-4 py-4 font-medium">{challenge.name}</td>
                    <td className="px-4 py-4 capitalize">{challenge.type}</td>
                    <td className="px-4 py-4">{challenge.location}</td>
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
                          <button className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center ">
                            <Image
                              src="/eye.svg"
                              alt="icon"
                              width={24}
                              height={24}
                            />
                            See Details
                          </button>
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
                  <td colSpan={6} className="text-center py-8 text-gray-500">
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
      <div className="p-4 mt-4 bg-white rounded-[10px]">
        <div className="flex justify-between items-center  pb-3">
          <h2 className="text-[16px] text-deepblue capitalize font-bold">
            Featured Challenges
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search challenges..."
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
                <th className="px-4 py-2">Challenge Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Participants</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedChallenges.length > 0 ? (
                paginatedChallenges.map((challenge) => (
                  <tr key={challenge.id} className="border-b ">
                    <td className="px-4 py-4 font-medium">{challenge.name}</td>
                    <td className="px-4 py-4 capitalize">{challenge.type}</td>
                    <td className="px-4 py-4">{challenge.location}</td>
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
                          <button className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center ">
                            <Image
                              src="/eye.svg"
                              alt="icon"
                              width={24}
                              height={24}
                            />
                            See Details
                          </button>
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
                  <td colSpan={6} className="text-center py-8 text-gray-500">
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
  );
}
