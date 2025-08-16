"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { reportedContents } from "@/mockdata";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { createPortal } from "react-dom";

type MenuPos = { top: number; left: number };

const ReportedContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [reasonFilter, setReasonFilter] = useState("all");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<MenuPos | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // stable width for the dropdown; keep in sync with className w-40 (160px)
  const MENU_WIDTH = 160;
  const MENU_GAP = 8;

  const typeImages: Record<string, string> = {
    photo: "/📷.svg",
    comment: "/#.svg",
    video: "/🎬.svg",
    hashtag: "/💬.svg",
  };

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

  const totalPages = Math.ceil(filteredReportedContent.length / rowsPerPage);
  const paginatedReportedContent = filteredReportedContent.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Close on outside click / ESC / scroll or resize (to avoid stale position)
  useEffect(() => {
    if (openRow === null) return;

    const onDocClick = (e: MouseEvent) => {
      const menu = document.getElementById("row-actions-menu");
      if (!menu) return;
      if (!menu.contains(e.target as Node)) setOpenRow(null);
    };

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenRow(null);
    };

    const onScrollOrResize = () => setOpenRow(null);

    document.addEventListener("mousedown", onDocClick);
    window.addEventListener("keydown", onEsc);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      document.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("keydown", onEsc);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [openRow]);

  // calculate and set menu position relative to the clicked button
  const openMenuForTarget = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    const rect = (evt.currentTarget as HTMLButtonElement).getBoundingClientRect();

    // Prefer right-aligning the menu to the button; clamp to viewport
    const tentativeLeft = rect.right - MENU_WIDTH;
    const left = Math.max(8, Math.min(tentativeLeft, window.innerWidth - MENU_WIDTH - 8));
    const top = rect.bottom + MENU_GAP;

    setMenuPos({ top, left });

    setOpenRow((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className="bg-white p-4 rounded mt-6">
        {/* Filters */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800 capitalize">
              All Contents ({reportedContents.length})
            </h2>
          </div>
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

        {/* table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 rounded-md">
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
                  const idNum = Number(content.id);
                  return (
                    <tr key={content.id} className="border-b">
                      <td className="px-4 py-4 flex items-center gap-3">
                        <Image
                          src={typeImages[content.type] || "/images/type-default.png"}
                          alt={content.type}
                          width={20}
                          height={20}
                          className="rounded-md object-cover"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="font-medium">{content.title}</p>
                          <p className="text-[8px] text-[#8E98A8]">
                            Check out this funny walk today...
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
                          month: "short", // e.g., "May"
                          day: "numeric", // e.g., 10
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true, // "9:45 AM"
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
                      <td className="px-4 py-4">
                        <button
                          onClick={(e) => openMenuForTarget(e, idNum)}
                          aria-haspopup="menu"
                          aria-expanded={openRow === idNum}
                        >
                          <Image
                            src="/Button-table.svg"
                            alt="actions"
                            width={24}
                            height={24}
                            className="cursor-pointer"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    {reportedContents.length === 0
                      ? "No reported content yet."
                      : "No matching results."}
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
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <Image src="/next.svg" alt="next" height={32} width={32} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Portal dropdown menu */}
      {openRow !== null && menuPos &&
        createPortal(
          <div
            id="row-actions-menu"
            role="menu"
            style={{ top: menuPos.top, left: menuPos.left, position: "fixed" }}
            className="w-40 bg-white shadow-lg rounded-md z-[9999] border"
          >
            <Link
              href={`/contents/${openRow}`}
              className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center hover:bg-gray-50"
            >
              <Image src="/eye.svg" alt="icon" width={20} height={20} />
              See Details
            </Link>
            <button className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center hover:bg-gray-50">
              <Image src="/edit.svg" alt="icon" width={20} height={20} />
              Edit
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 flex gap-2 items-center hover:bg-gray-50">
              <Image src="/user.svg" alt="icon" width={20} height={20} />
              Delete
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ReportedContent;
