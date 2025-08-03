"use client";

import React, { useEffect, useRef, useState } from "react";
import StatCard from "./components/StatCard";
import { notificationData } from "@/mockdata";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const dropdownRef = useRef(null);

  

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

  //format date
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
              <thead className="bg-gray-100 text-gray-700 rounded-md">
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
                  paginatedNotification.map((notification) => (
                    <tr key={notification.id} className="border-b ">
                      <td className="px-4 py-4 font-medium">
                        {notification.name}
                      </td>
                      <td className="px-4 py-4 capitalize">
                        {notification.target}
                      </td>
                      <td className="px-4 py-4">{formatDateTime(notification.dateSent, notification.timeSent)}</td>
                      <td className="px-4 py-4">{notification.status}</td>

                      <td className="relative px-4 py-4">
                        <button onClick={() => setOpenRow(notification.id)}>
                          <Image
                            src="/Button-table.svg"
                            alt="button"
                            width={24}
                            height={24}
                            className="cursor-pointer"
                          />
                        </button>

                        {openRow === notification.id && (
                          <div
                            ref={dropdownRef}
                            className="absolute left-[-10rem] top-0 w-40 bg-white shadow-lg rounded-md z-10"
                          >
                            <Link
                              href={`/notification/${notification.id}`}
                              className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center "
                            >
                              <Image
                                src="/eye.svg"
                                alt="icon"
                                width={24}
                                height={24}
                              />
                              See Details
                            </Link>

                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 flex gap-2 items-center ">
                              <Image
                                src="/trash.svg"
                                alt="icon"
                                width={24}
                                height={24}
                              />
                              Remove
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
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
