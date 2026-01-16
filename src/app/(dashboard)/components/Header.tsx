"use client";

import Image from "next/image";
import React from "react";
import { useCurrentAdmin } from "@/hooks/useCurrentAdmin";

export default function Header() {
  const formatText = (text: string) => text.replace(/_/g, " ");

  const { data: admin, isLoading } = useCurrentAdmin();

  // if (isLoading) {
  //   return (
  //     <div className="py-3 px-10 border-b border-[#E1E1E1] flex justify-end">
  //       <div className="text-gray-400 text-sm">Loading...</div>
  //     </div>
  //   );
  // }

  const profilePic = admin?.admin?.profilePicture
    ? admin.admin.profilePicture
    : "/avatar.svg";

  const fullName = admin?.admin?.fullName ?? "Admin";
  const role = admin?.admin?.role ? formatText(admin.admin.role) : "";

  return (
    <div className="py-3 px-10 border-b border-[#E1E1E1] flex justify-end">
      <div className="flex gap-4 items-center justify-center">
        {/* Notification Icon */}
        <div>
          <Image
            src="/notification.svg"
            alt="notification icon"
            width={40}
            height={40}
          />
        </div>

        {/* Profile Info */}
        <div className="flex gap-2 items-center">
          {/* Avatar */}
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image
              src={profilePic || "/avatar.svg"}
              alt="avatar"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Name & Role */}
          <div className="flex items-center gap-1">
            <div className="flex flex-col text-xs w-[112px]">
              <p className="font-bold text-deepblue">{fullName}</p>
              <p className="capitalize text-gray-600">{role}</p>
            </div>

            {/* Dropdown Button */}
            <button>
              <Image src="/dropdown.svg" alt="dropdown" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
