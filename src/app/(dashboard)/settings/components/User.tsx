"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { adminUsers } from "@/mockdata";
import Image from "next/image";

export default function User() {
  const [active, setActive] = useState<"pending" | "users">("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalPages = Math.ceil(adminUsers.length / rowsPerPage);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [permission, setPermission] = useState("");

  const paginatedAdminUsers = adminUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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

  function handleDeleteClick(id: number) {
    setUserToDelete(id);
    setShowDeleteModal(true);
  }

  function confirmDelete() {
    console.log("Deleting user with id:", userToDelete);
    setShowDeleteModal(false);
    setUserToDelete(null);
  }

  function cancelDelete() {
    setShowDeleteModal(false);
    setUserToDelete(null);
  }

  function handleInviteSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteName || !inviteEmail || !permission) return;

    console.log("Inviting User:", { inviteName, inviteEmail, permission });

    // Reset and close modal
    setInviteName("");
    setInviteEmail("");
    setPermission("");
    setShowInviteModal(false);
  }

  return (
    <div className="relative">
      {/* Tabs */}
      <div className="w-[200px] bg-white h-[44px] py-1 px-2 rounded-full relative flex justify-between items-center shadow-inner">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-brightblue shadow-md ${
            active === "pending" ? "left-1" : "left-1/2"
          }`}
        />
        <button
          onClick={() => setActive("pending")}
          className={`relative z-10 w-1/2 text-sm font-semibold py-2 rounded-full ${
            active === "pending" ? "text-white" : "text-gray-500"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActive("users")}
          className={`relative z-10 w-1/2 text-sm font-semibold py-2 rounded-full ${
            active === "users" ? "text-white" : "text-gray-500"
          }`}
        >
          Users
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 capitalize">
            All users
          </h2>
          <button
            className="bg-brightblue text-white text-[14px] rounded-[32px] w-[125px] h-[44px] flex items-center justify-center"
            onClick={() => setShowInviteModal(true)}
          >
            New User
          </button>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 rounded-md">
              <tr>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">Joined Date</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAdminUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-4 font-medium">
                    {user.name}
                    <br />
                    <span className="text-[12px]">{user.email}</span>
                  </td>
                  <td className="px-4 py-4">
                    {formatDateTime(user.dateJoined, user.timeJoined)}
                  </td>
                  <td className="px-4 py-4">{user.role}</td>
                  <td className="px-4 py-4">
                    <button onClick={() => handleDeleteClick(user.id)}>
                      <Image
                        src="/trash.svg"
                        alt="icon"
                        width={24}
                        height={24}
                      />
                    </button>
                  </td>
                </tr>
              ))}
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

      {/* ❌ Delete Modal */}
      {showDeleteModal && (
        <>
          <div className="fixed inset-0 bg-black/90 z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 h-[270px] w-[460px]">
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-[24px] text-deepblue mb-4 text-center">
                Delete User
              </h3>
              <p className="text-[14px] text-center">
                Are you sure you want to delete this user? They will no longer
                have access to the Admin portal.
              </p>
              <div className="flex flex-row-reverse justify-center gap-4 mt-[40px]">
                <button
                  onClick={confirmDelete}
                  className="bg-[#FF3729] text-white text-[14px] rounded-[100px] h-[56px] w-[180px]"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-[#FFECEB] text-[#FF3729] text-[14px] rounded-[100px] h-[56px] w-[180px]"
                >
                  No, Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ➕ Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center">
          <div
            className="fixed inset-0 bg-black/90 z-40"
            onClick={() => setShowInviteModal(false)}
          ></div>
          <form
            onSubmit={handleInviteSubmit}
            className="fixed top-2 left-1/2 -translate-x-1/2 bg-white py-3 px-6 rounded-lg shadow-lg z-50 w-[480px] max-h-[100vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowInviteModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
              aria-label="Close"
            >
              ×
            </button>

            <h3 className="text-xl font-bold mb-4 text-deepblue ">
              Invite New User
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permission
                </label>

                <div className="flex flex-col gap-3">
                  {[
                    "Super admin",
                    "Challenges",
                    "Communities",
                    "Content Moderations",
                    "Push Notifications",
                  ].map((role) => {
                    const isSelected = permission === role;

                    return (
                      <label
                        key={role}
                        className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                          isSelected
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300"
                        }`}
                      >
                        <span className="text-gray-800">{role}</span>

                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isSelected
                              ? "border-2 border-blue-600"
                              : "border border-gray-400"
                          }`}
                        >
                          {isSelected && (
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white"></span>
                          )}
                        </span>

                        <input
                          type="radio"
                          name="permission"
                          value={role}
                          checked={isSelected}
                          onChange={(e) => setPermission(e.target.value)}
                          className="hidden"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-6">
              <button
                type="submit"
                className="bg-brightblue text-white rounded-full w-full py-2"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
