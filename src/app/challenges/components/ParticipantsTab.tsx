"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { mockPetChallenges } from "@/mockdata";
import { Search } from "lucide-react";

export default function ParticipantsTab() {
  const { id } = useParams();
  const challenge = mockPetChallenges.find((c) => c.id === Number(id));

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (!challenge) return null;

  const filteredParticipants = challenge.users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredParticipants.length / rowsPerPage);

  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-600";
      case "completed":
        return "bg-blue-100 text-blue-600";
      case "scheduled":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };
  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Total Participants",
            value: `${challenge.users.length}`,
            subtitle: "+12% from 24 hours",
          },
          {
            title: "Active Participants",
            value: `${challenge.users.filter((u) => u.status === "active").length}`,
            subtitle: "Currently active",
          },
          {
            title: "Completed Challenge",
            value: `${challenge.users.filter((u) => u.status === "completed").length}`,
            subtitle: "Marked complete",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-1 mt-6"
          >
            <div className="flex justify-between items-center text-sm text-gray">
              <span>{item.title}</span>
            </div>
            <div className="text-2xl font-bold text-deepblue">{item.value}</div>
            <p className="text-xs text-[#40B773] flex items-center">{item.subtitle}</p>
          </div>
        ))}
      </div>

      {challenge.users.length !== 0 && (
        // Filters
        <div className="bg-white p-4 rounded mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 capitalize">All Participants</h2>
          <div className="flex flex-wrap gap-4">
            <div className="relative h-10 rounded-[32px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search participants..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 border rounded-[32px] w-[240px] text-sm"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-[32px] px-3 py-2 h-10 text-sm w-[110px]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 rounded-md">
              <tr>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">Joined Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Progress</th>
              </tr>
            </thead>
            <tbody>
              {paginatedParticipants.length > 0 ? (
                paginatedParticipants.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/avata.png"
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="text-gray-800">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">{user.joinedAt}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{user.completionRate}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No participants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
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
                className="text-sm font-bold text-deepblue px-2 py-1"
              >
                {[5, 10, 20].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                <Image src="/prev.svg" alt="prev" height={32} width={32} />
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <Image src="/next.svg" alt="next" height={32} width={32} />
              </button>
            </div>
          </div>
        )}
      </div>
      )}

    
    </div>
  )
}
