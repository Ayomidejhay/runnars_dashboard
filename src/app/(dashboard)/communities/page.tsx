"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import StatCard from "./components/StatCard";
import { communityMockData } from "@/mockdata";
import { Calendar, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import PaginationControls from "@/app/components/PaginationControls";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  // Close on outside click or Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        activeTriggerRef.current &&
        !activeTriggerRef.current.contains(target)
      ) {
        closeDropdown();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDropdown();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recompute dropdown pos when openRow changes or on resize/scroll
  useEffect(() => {
    if (openRow == null) return;

    const recompute = () => {
      const btn = activeTriggerRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      // temporary estimate; will be refined after measuring dropdown
      const estimatedHeight = 140;
      const estimatedWidth = 192;

      const spaceBelow = window.innerHeight - rect.bottom;
      const showBelow = spaceBelow > estimatedHeight;

      let top = showBelow ? rect.bottom + 8 : rect.top - estimatedHeight - 8;
      // keep inside viewport vertical
      if (top + estimatedHeight > window.innerHeight) top = Math.max(8, window.innerHeight - estimatedHeight - 8);
      if (top < 8) top = 8;

      let left = rect.left;
      if (left + estimatedWidth > window.innerWidth) {
        left = Math.max(8, window.innerWidth - estimatedWidth - 8);
      }
      if (left < 8) left = 8;

      setDropdownPos({ top, left });
    };

    // initial compute
    recompute();

    // adjust on scroll/resize
    window.addEventListener("resize", recompute);
    window.addEventListener("scroll", recompute, { passive: true });
    return () => {
      window.removeEventListener("resize", recompute);
      window.removeEventListener("scroll", recompute);
    };
  }, [openRow]);

  // After dropdown mounts, measure and adjust to avoid overflow
  useEffect(() => {
    if (openRow == null) {
      setIsDropdownVisible(false);
      return;
    }
    // show animation after next tick
    setIsDropdownVisible(false);
    const t = setTimeout(() => setIsDropdownVisible(true), 10);

    // measure and adjust
    const adjust = () => {
      if (!dropdownRef.current || !activeTriggerRef.current) return;
      const ddRect = dropdownRef.current.getBoundingClientRect();
      const btnRect = activeTriggerRef.current.getBoundingClientRect();

      let top = dropdownPos?.top ?? btnRect.bottom + 8;
      let left = dropdownPos?.left ?? btnRect.left;

      // vertical adjustments
      if (top + ddRect.height > window.innerHeight) {
        // show above if possible
        const altTop = btnRect.top - ddRect.height - 8;
        top = altTop >= 8 ? altTop : Math.max(8, window.innerHeight - ddRect.height - 8);
      }
      if (top < 8) top = 8;

      // horizontal adjustments
      if (left + ddRect.width > window.innerWidth) {
        left = Math.max(8, window.innerWidth - ddRect.width - 8);
      }
      if (left < 8) left = 8;

      // only set if changed noticeably
      if (!dropdownPos || Math.abs(dropdownPos.top - top) > 1 || Math.abs(dropdownPos.left - left) > 1) {
        setDropdownPos({ top, left });
      }
    };

    // adjust after paint
    requestAnimationFrame(adjust);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRow, dropdownPos]);

  const closeDropdown = () => {
    setIsDropdownVisible(false);
    // small timeout to allow animation if desired, then close
    setTimeout(() => {
      setOpenRow(null);
      setDropdownPos(null);
      activeTriggerRef.current = null;
      setIsDropdownVisible(false);
    }, 150);
  };

  const onActionButtonClick = (e: React.MouseEvent, id: number) => {
    const btn = e.currentTarget as HTMLElement;
    // toggle same row
    if (openRow === id) {
      closeDropdown();
      return;
    }

    activeTriggerRef.current = btn;

    const rect = btn.getBoundingClientRect();
    const dropdownHeightEstimate = 140;
    const dropdownWidthEstimate = 192;

    const spaceBelow = window.innerHeight - rect.bottom;
    const showBelow = spaceBelow > dropdownHeightEstimate;

    let top = showBelow ? rect.bottom + 8 : rect.top - dropdownHeightEstimate - 8;
    if (top + dropdownHeightEstimate > window.innerHeight) top = Math.max(8, window.innerHeight - dropdownHeightEstimate - 8);
    if (top < 8) top = 8;

    let left = rect.left;
    if (left + dropdownWidthEstimate > window.innerWidth) {
      left = Math.max(8, window.innerWidth - dropdownWidthEstimate - 8);
    }
    if (left < 8) left = 8;

    setDropdownPos({ top, left });
    setOpenRow(id);
  };

  const filterCommunity = () => {
    return communityMockData.filter((community) => {
      const name = community.name?.toLowerCase() || "";
      const matchesSearch = name.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || community.status === statusFilter;
      return matchesSearch && matchesStatus;
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
  const paginatedCommunity = filteredCommunity.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="px-10">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="capitalize text-[34px] font-bold text-deepblue">communities</h1>
          <div className="flex gap-6">
            <Link href="/communities/managebadge" className="w-[207px] h-[44px] bg-transparent border border-brightblue text-brightblue rounded-[32px] flex items-center justify-center">
              <span className="text-[14px] flex items-center gap-[2px] font-bold">Manage Community Badges</span>
            </Link>
            <Link href="/communities/new-community" className="w-[170px] h-[44px] text-white bg-brightblue rounded-[32px] flex items-center justify-center">
              <span className="text-[14px] flex items-center gap-[2px] font-bold">
                <Image src="/add.svg" alt="add" width={24} height={24} />
                New Community
              </span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="total communities" value="412" subtitle="28 since last month" />
          <StatCard title="active members" value="6,358" subtitle="67.1% of total users" />
          <StatCard title="group walks" value="400" subtitle="Last 30 days" />
        </div>

        {/* Table */}
        <div className="bg-white p-4 rounded mt-6">
          {/* Filters */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 capitalize">all communities ({communityMockData.length})</h2>
            <div className="flex flex-wrap gap-4">
              <div className="relative h-10 rounded-[32px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="Search community..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border rounded-[32px] w-[240px] text-sm" />
              </div>

              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-[32px] px-3 py-2 h-10 text-sm w-[87px]">
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

          {/* Data table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left">
              <thead className="bg-tableheader text-tableheadertext rounded-md">
                <tr>
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
                  paginatedCommunity.map((community) => {
                    const id = Number(community.id);
                    return (
                      <tr key={id} className="border-b border-border">
                        <td className="px-4 py-4 font-medium">{community.name}</td>
                        <td className="px-4 py-4 capitalize">{community.creator}</td>
                        <td className="px-4 py-4">{community.createdDate}</td>
                        <td className="px-4 py-4">{community.members}</td>
                        <td className="px-4 py-4">{community.location}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-2 rounded-full text-xs font-semibold ${getStatusBadge(community.status)}`}>{community.status}</span>
                        </td>
                        <td className="relative px-4 py-4">
                          <button
                            onClick={(e) => onActionButtonClick(e, id)}
                            aria-haspopup="true"
                            aria-expanded={openRow === id}
                            className="inline-flex items-center"
                          >
                            <Image src="/Button-table.svg" alt="button" width={24} height={24} className="cursor-pointer" />
                          </button>

                          {/* Smart Dropdown (fixed) */}
                          {openRow === id && dropdownPos && (
                            <div
                              ref={dropdownRef}
                              role="menu"
                              aria-label="row actions"
                              style={{
                                position: "fixed",
                                top: Math.round(dropdownPos.top),
                                left: (Math.round(dropdownPos.left))-10,
                                zIndex: 9999,
                              }}
                              className={`w-44 bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden transform transition-all duration-150 ${isDropdownVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                            >
                              <ul className="text-sm">
                                <li
                                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => {
                                    closeDropdown();
                                    router.push(`/communities/${community.id}`);
                                  }}
                                >
                                  <Image src="/eye.svg" alt="View" width={16} height={16} />
                                  View Community
                                </li>
                                <li
                                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => {
                                    closeDropdown();
                                    router.push(`/communities/${community.id}/edit`);
                                  }}
                                >
                                  <Image src="/edit.svg" alt="Edit" width={16} height={16} />
                                  Edit Community
                                </li>
                                <li
                                  className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                                  onClick={() => {
                                    closeDropdown();
                                    alert("Delete community");
                                  }}
                                >
                                  <Image src="/user.svg" alt="Delete" width={16} height={16} />
                                  Delete Community
                                </li>
                              </ul>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      {communityMockData.length === 0 ? "No community yet. Create your first community" : "No active community found."}
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
    </div>
  );
}
