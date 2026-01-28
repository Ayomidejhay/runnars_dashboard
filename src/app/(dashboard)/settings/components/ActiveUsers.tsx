

"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useAdmins,
  useDeleteAdmin,
  useInviteAdmin,
  useResendInvite,
} from "@/hooks/useAdmins";
import InviteUserModal from "./InviteUserModal";
import { ROLE_MAP } from "@/constants/adminRoles";
import toast from "react-hot-toast";
import DeleteAdminModal from "./DeleteAdminModal";

type Admin = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  joinedDate: string;
  profilePicture?: string | null;
  isPending?: boolean;
};

export default function ActiveUsers() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);

  const { data, isPending, isFetching, isError, error } = useAdmins({
    page,
    limit,
    search,
  });

  const inviteAdminMutation = useInviteAdmin();
  const resendInviteMutation = useResendInvite();
  const deleteAdminMutation = useDeleteAdmin();

  // Robust normalization
  const users: Admin[] = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.users)
    ? data.data.users
    : [];

  const totalPages =
    (data?.data?.meta?.totalPages ??
      (Array.isArray(data?.data) ? 1 : 1)) as number;

  function formatDateTime(dateJoined: string) {
    return new Date(dateJoined).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const formatText = (text: string) => text.replace(/_/g, " ");

  if (isPending) return <p className="text-sm text-gray-500">Loading users…</p>;
  if (isError)
    return (
      <p className="text-sm text-red-600">
        {(error as Error)?.message || "Failed to load users"}
      </p>
    );

  function handleInvite(payload: { fullName: string; email: string; role: string }) {
    const backendRole = ROLE_MAP[payload.role];
    if (!backendRole) return;

    inviteAdminMutation.mutate(
      {
        fullName: payload.fullName,
        email: payload.email,
        role: backendRole,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message || "Invite sent successfully");
          setShowInviteModal(false);
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Failed to invite admin");
        },
      }
    );
  }

  return (
    <div className="bg-white p-4 rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">All Users</h2>
        <button
          className="bg-brightblue text-white rounded-full px-6 py-2"
          onClick={() => setShowInviteModal(true)}
        >
          New User
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Joined Date</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Action</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => {
              // Fallback to /avatar.svg if empty, null, or missing
              const profileSrc = user.profilePicture?.trim() || "/avatar.svg";

              return (
                <tr key={user.id} className="border-b text-deepblue text-[14px]">
                  <td className="px-4 py-3 flex gap-3 items-center">
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                      <Image
                        src={profileSrc}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      {user.fullName}
                      <br />
                      <span className="text-[10px] text-gray-500">{user.email}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3">{formatDateTime(user.joinedDate)}</td>
                  <td className="px-4 py-3 capitalize">{formatText(user.role)}</td>

                  <td className="px-4 py-3">
                    <button onClick={() => setAdminToDelete(user)}>
                      <Image src="/trash.svg" alt="delete" width={20} height={20} />
                    </button>
                  </td>

                  <td>
                    {user.isPending && (
                      <button
                        onClick={() =>
                          resendInviteMutation.mutate(user.id, {
                            onSuccess: () => toast.success("Invite resent successfully"),
                            onError: () => toast.error("Failed to resend invite"),
                          })
                        }
                        disabled={resendInviteMutation.isPending}
                        className="text-blue-600 text-sm"
                      >
                        Resend Invite
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
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
          <button disabled={page <= 1 || isFetching} onClick={() => setPage((p) => p - 1)}>
            <Image src="/prev.svg" alt="prev" width={28} height={28} />
          </button>

          <span className="text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages || isFetching}
            onClick={() => setPage((p) => p + 1)}
          >
            <Image src="/next.svg" alt="next" width={28} height={28} />
          </button>
        </div>
      </div>

      {/* Invite Modal */}
      <InviteUserModal
        open={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSubmit={handleInvite}
      />

      {/* Delete Admin Modal */}
      {adminToDelete && (
        <DeleteAdminModal
          adminName={adminToDelete.fullName}
          isLoading={deleteAdminMutation.isPending}
          onCancel={() => setAdminToDelete(null)}
          onConfirm={() =>
            deleteAdminMutation.mutate(adminToDelete.id, {
              onSuccess: () => setAdminToDelete(null),
              onError: (error: any) =>
                toast.error(error?.response?.data?.message || "Failed to delete admin"),
            })
          }
        />
      )}
    </div>
  );
}
