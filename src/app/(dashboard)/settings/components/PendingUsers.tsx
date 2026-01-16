"use client";

import { useState } from "react";
import Image from "next/image";
import {
  usePendingAdmins,
  useResendInvite,
  useDeleteAdmin,
} from "@/hooks/useAdmins";
import toast from "react-hot-toast";
import DeleteAdminModal from "./DeleteAdminModal";

export default function PendingUsers() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isPending, isFetching, isError, error } = usePendingAdmins({
    page,
    limit,
  });
  const resendInviteMutation = useResendInvite();
  const deleteAdminMutation = useDeleteAdmin();
  const [adminToDelete, setAdminToDelete] = useState<any>(null);

  // Normalize users array safely
  const users = Array.isArray(data?.data) ? data.data : data?.data?.users ?? [];

  const totalPages = data?.data?.meta?.totalPages ?? 1;

  function formatDateTime(dateJoined: string) {
    return new Date(dateJoined).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const formatText = (text: string) => text.replace(/_/g, " ");

  if (isPending) {
    return <p className="text-sm text-gray-500">Loading users…</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-red-600">
        {(error as Error).message || "Failed to load users"}
      </p>
    );
  }

  return (
    <div className="bg-white p-4 rounded">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Pending Users
      </h2>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Date Joined</th>
            <th className="px-4 py-2 text-left">Role</th>
            {/* <th className="px-4 py-2 text-left">Action</th> */}
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user: any) => (
              <tr
                key={user._id}
                className="border-b text-deepblue  text-[14px]"
              >
                <td className="px-4 py-3">
                  {user.fullName}
                  <br />
                  <span className="text-[10px] text-gray-500">
                    {user.email}
                  </span>
                </td>

                <td className="px-4 py-3">{formatDateTime(user.invitedAt)}</td>

                <td className="px-4 py-3 capitalize">
                  {formatText(user.role)}
                </td>

                {/* <td className="px-4 py-3">
                  <button onClick={() => setAdminToDelete(user)}>
                    <Image
                      src="/trash.svg"
                      alt="delete"
                      width={20}
                      height={20}
                    />
                  </button>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-10">
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="text-sm font-bold"
        >
          {[10, 20, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        <div className="flex gap-2 items-center">
          <button
            disabled={page === 1 || isFetching}
            onClick={() => setPage((p) => p - 1)}
          >
            <Image src="/prev.svg" alt="prev" width={28} height={28} />
          </button>

          <span className="text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages || isFetching}
            onClick={() => setPage((p) => p + 1)}
          >
            <Image src="/next.svg" alt="next" width={28} height={28} />
          </button>
        </div>
      </div>

      
    </div>
  );
}
