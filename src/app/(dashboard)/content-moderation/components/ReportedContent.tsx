"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { reportedContents } from "@/mockdata";
import Image from "next/image";
import DropdownMenu, { DropdownItem } from "../../components/DropdownMenu";
import { Search } from "lucide-react";

const typeImages: Record<string, string> = {
  photo: "/📷.svg",
  comment: "/#.svg",
  video: "/🎬.svg",
  hashtag: "/💬.svg",
};

const ReportedContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [reasonFilter, setReasonFilter] = useState("all");

  const [openRow, setOpenRow] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
    buttonHeight: number;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Filter logic
  const filteredReportedContent = useMemo(() => {
    return reportedContents.filter((content) => {
      const title = content.title?.toLowerCase() || "";
      const description = content.moderationNotes?.toLowerCase() || "";

      const matchesSearch =
        title.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || content.status === statusFilter;

      const matchesType = typeFilter === "all" || content.type === typeFilter;

      const matchesReason =
        reasonFilter === "all" || content.reportReason === reasonFilter;

      return matchesSearch && matchesStatus && matchesType && matchesReason;
    });
  }, [searchTerm, statusFilter, typeFilter, reasonFilter]);

  const totalPages = Math.ceil(filteredReportedContent.length / rowsPerPage);
  const paginatedReportedContent = filteredReportedContent.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Badge helpers
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-[#FFEBEA] text-[#FF3729]";
      case "reviewed":
        return "bg-[#ECF8F1] text-[#40B773]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "photo":
        return "bg-[#FFF3E0] text-[#B88330]";
      case "video":
        return "bg-[#E8F1FD] text-[#1570EF]";
      case "comment":
        return "bg-[#F3E5F5] text-[#9C27B0]";
      case "hashtag":
        return "bg-[#ECF8F1] text-[#40B773]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Open dropdown
  const openMenuForRow = (id: string) => {
    const btn = buttonRefs.current[id];
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + 4,
      left: rect.left,
      buttonHeight: rect.height,
    });

    setOpenRow((prev) => (prev === id ? null : id));
  };

  const getDropdownItems = (id: string): DropdownItem[] => [
    { label: "See Details", icon: "/eye.svg", href: `/contents/${id}` },
    {
      label: "Edit",
      icon: "/edit.svg",
      onClick: () => console.log("Edit", id),
    },
    {
      label: "Delete",
      icon: "/user.svg",
      onClick: () => console.log("Delete", id),
      danger: true,
    },
  ];

  return (
    <div>
      <div className="bg-white p-4 rounded mt-6">
        {/* Filters */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 capitalize">
            All Contents ({reportedContents.length})
          </h2>
          <div className="flex flex-wrap gap-4">
            <div className="relative h-10 rounded-[32px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 border rounded-[32px] w-[240px] text-sm"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-3 py-2 h-10 text-sm w-[100px] rounded-[32px]"
            >
              <option value="all">All</option>
              <option value="photo">Photo</option>
              <option value="video">Video</option>
              <option value="comment">Comment</option>
              <option value="hashtag">Hashtag</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-[32px] px-3 py-2 h-10 text-sm w-[100px]"
            >
              <option value="all">Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
            </select>

            <select
              value={reasonFilter}
              onChange={(e) => {
                setReasonFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-[32px] px-3 py-2 h-10 text-sm w-[100px]"
            >
              <option value="all">Reason</option>
              <option value="spam">Spam</option>
              <option value="abuse">Abuse</option>
              <option value="inappropriate">Inappropriate</option>
              <option value="misinformation">Misinformation</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-tableheader text-tableheadertext rounded-md">
              <tr>
                <th className="px-4 py-2">Content</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Report Reason</th>
                <th className="px-4 py-2">Reports</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedReportedContent.length > 0 ? (
                paginatedReportedContent.map((content) => {
                  const idStr = String(content.id);

                  return (
                    <tr key={idStr} className="border-b border-border">
                      <td className="px-4 py-4 flex items-center gap-3">
                        <p className="text-2xl font-bold">
                          {content.type === "photo"
                            ? "📷"
                            : content.type === "video"
                            ? "🎬"
                            : content.type === "hashtag"
                            ? "💬"
                            : content.type === "comment"
                            ? "#"
                            : "❓"}
                        </p>
                        <div className="flex flex-col gap-1">
                          <p className="font-medium">{content.title}</p>
                          <p className="text-[8px] text-[#8E98A8]">
                            Check out this content...
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-4 capitalize">{content.user}</td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeBadge(
                            content.type
                          )}`}
                        >
                          {content.type}
                        </span>
                      </td>

                      <td className="px-4 py-4">{content.reportReason}</td>

                      <td className="px-4 py-4">3</td>

                      <td className="px-4 py-4">
                        {new Date(content.dateReported).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                            content.status
                          )}`}
                        >
                          {content.status}
                        </span>
                      </td>

                      <td className="px-4 py-4 relative">
                        <button
                          ref={(el) => {
                            buttonRefs.current[idStr] = el;
                          }}
                          onClick={() => openMenuForRow(idStr)}
                        >
                          <Image
                            src="/Button-table.svg"
                            alt="actions"
                            width={24}
                            height={24}
                            className="cursor-pointer"
                          />
                        </button>

                        {openRow === idStr && dropdownPos && (
                          <DropdownMenu
                            isOpen={true}
                            position={dropdownPos}
                            onClose={() => setOpenRow(null)}
                            items={getDropdownItems(idStr)}
                            width={160}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-8 text-gray-500"
                  >
                    {reportedContents.length === 0
                      ? "No reported content yet."
                      : "No matching results."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
                className="text-sm font-bold text-deepblue px-2 py-1"
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
                disabled={currentPage === totalPages}
              >
                <Image src="/next.svg" alt="next" height={32} width={32} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportedContent;
