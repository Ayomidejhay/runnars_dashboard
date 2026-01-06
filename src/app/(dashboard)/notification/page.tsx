"use client";

import React, { useEffect, useRef, useState } from "react";
import StatCard from "./components/StatCard";
import { notificationData } from "@/mockdata";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PaginationControls from "../components/PaginationControls";
import DropdownMenu, { DropdownItem } from "../components/DropdownMenu";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
    buttonHeight: number;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredNotifications = notificationData.filter((notification) =>
    notification.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotifications.length / rowsPerPage);
  const paginatedNotification = filteredNotifications.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // format date
  function formatDateTime(dateJoined: string, timeJoined: string) {
    const [year, month, day] = dateJoined.split("-").map(Number);
    const [time, modifier] = timeJoined.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const dateObj = new Date(year, month - 1, day, hours, minutes);

    return dateObj.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-col gap-8 px-10">
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-[34px] font-bold text-deepblue">
          push notifications
        </h1>
        <div className="flex gap-6">
          <Link
            href="/notification/new-notification"
            className="w-[163px] h-[44px] text-white bg-brightblue rounded-[32px] flex items-center justify-center"
          >
            <span className="text-[14px] flex items-center gap-[2px] font-bold">
              <Image src="/add.svg" alt="add" width={24} height={24} />
              New Notification
            </span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Total sent" value="412" subtitle="last 30 days" />
        <StatCard
          title="avg. open rate"
          value="42.7%"
          subtitle="3.12% from last month"
        />
        <StatCard title="Scheduled" value="9" subtitle="Upcoming" />
      </div>
      <div>
        <div className="p-4 mt-4 bg-white rounded-[10px]">
          <div className="flex justify-between items-center  pb-3">
            <h2 className="text-[16px] text-deepblue capitalize font-bold">
              All notifications ({filteredNotifications.length})
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
              <thead className="bg-tableheader text-tableheadertext rounded-md">
                <tr className="border-none">
                  <th className="px-4 py-2">Notification</th>
                  <th className="px-4 py-2">Target</th>
                  <th className="px-4 py-2">Sent Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedNotification.length > 0 ? (
                  paginatedNotification.map((notification) => {
                    const dropdownItems: DropdownItem[] = [
                      {
                        label: "See Details",
                        icon: "/eye.svg",
                        href: `/notification/${notification.id}`,
                      },
                      {
                        label: "Remove",
                        icon: "/trash.svg",
                        danger: true,
                        onClick: () => {
                          console.log("Remove", notification.id);
                        },
                      },
                    ];

                    return (
                      <tr
                        key={notification.id}
                        className="border-b border-border"
                      >
                        <td className="px-4 py-4 font-medium">
                          {notification.name}
                        </td>
                        <td className="px-4 py-4 capitalize">
                          {notification.target}
                        </td>
                        <td className="px-4 py-4">
                          {formatDateTime(
                            notification.dateSent,
                            notification.timeSent
                          )}
                        </td>
                        <td className="px-4 py-4">{notification.status}</td>
                        <td className="relative px-4 py-4">
                          <button
                            onClick={(e) => {
                              const rect =
                                (e.currentTarget as HTMLElement).getBoundingClientRect();
                              setDropdownPos({
                                top: rect.top + window.scrollY,
                                left: rect.left + window.scrollX,
                                buttonHeight: rect.height,
                              });
                              setOpenRow(notification.id);
                            }}
                          >
                            <Image
                              src="/Button-table.svg"
                              alt="button"
                              width={24}
                              height={24}
                              className="cursor-pointer"
                            />
                          </button>

                          {/* Reusable Dropdown */}
                          <DropdownMenu
                            isOpen={openRow === notification.id}
                            position={dropdownPos}
                            onClose={() => setOpenRow(null)}
                            items={dropdownItems}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      {notificationData.length === 0
                        ? "No challenges yet. Create your first challenge or generate mock data."
                        : "No active challenges found."}
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
};

export default page;
