"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { userMockData } from "@/mockdata";

export default function page() {
  const { id } = useParams();
  const router = useRouter();

  const user = userMockData.find((c) => c.id === id);

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

  if (!user) {
    return <p className="text-red-500">User not found.</p>;
  }
  return (
    <div className="px-10">
      <div>
        <button
          onClick={() => router.back()}
          className="flex gap-4 items-center text-deepblue"
        >
          <Image src="/arrow-back.svg" alt="icon" width={18} height={14} />
          Back
        </button>
        <div className="flex justify-between items-center">
          <h1 className="capitalize text-[34px] font-bold text-deepblue">
            user details
          </h1>
          <div className="flex gap-6">
            <Link href="">
              <Image src="/edit-detail.svg" alt="edit" width={40} height={40} />
            </Link>
            <Link href="">
              <Image
                src="/delete-detail.svg"
                alt="delete"
                width={40}
                height={40}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="basis-[40%] flex flex-col gap-6">
          <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-6">
            <p className="text-[20px] text-deepblue font-bold">
              User information
            </p>
            <div className="text-center mx-auto  border-[#E1E1E1]">
              <Image
                src="/mockuser.png"
                alt="user "
                width={120}
                height={120}
                className="rounded-full mb-2 mx-auto"
              />
              <div className="text-[18px] text-deepblue font-bold mb-1">
                {user.name}
              </div>
              <div className="text-[14px] mb-2">{user.email}</div>
              <div
                className={`px-2 py-2 w-[51px] mx-auto rounded-full text-xs  font-semibold ${getStatusBadge(
                  user.status
                )}`}
              >
                {user.status}
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#E1E1E1] -mt-1"></div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between ">
                <p>Email</p>
                <p className="text-deepblue font-bold">{user.email}</p>
              </div>
              <div className="flex justify-between ">
                <p>Member Since</p>
                <p className="text-deepblue font-bold">{user.dateJoined}</p>
              </div>
              <div className="flex justify-between ">
                <p>Last Login</p>
                <p className="text-deepblue font-bold">Today, 2:45 PM</p>
              </div>
            </div>
          </div>
          <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-6">
            <p className="text-[20px] text-deepblue font-bold">
              Pet information
            </p>
            <div className="flex flex-col gap-3 text-[14px]">
              <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  <Image
                    src="/petmock.png"
                    alt="pet"
                    height={40}
                    width={40}
                    className="rounded-full"
                  />
                  <p className="text-[12px]">
                    <span className="font-bold text-deepblue text-[14px]">
                      Max
                    </span>{" "}
                    (Golden Retriever)
                  </p>
                </div>
                <div className="flex gap-1 items-center text-brightblue">
                  <p>View profile</p>
                  <Image
                    src="/arrow-right.svg"
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <p>Pet Type</p>
                <p className="font-bold text-deepblue">Dog</p>
              </div>
              <div className="flex justify-between">
                <p>Age</p>
                <p className="font-bold text-deepblue">1-3 years</p>
              </div>
              <div className="flex justify-between">
                <p>Activity Level</p>
                <p className="font-bold text-deepblue">High</p>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-[60%] flex flex-col gap-6">
          <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-4">
            <p className="text-deepblue font-bold">Activity Summary</p>
            <div className="grid grid-cols-3 gap-4 text-[14px]">
              <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-white flex flex-col gap-3 items-center text-center">
                <p className="font-bold text-deepblue text-[24px]">24</p>
                <p>Challenges Completed</p>
              </div>
              <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-white flex flex-col gap-3 items-center text-center">
                <p className="font-bold text-deepblue text-[24px]">24</p>
                <p>Communities Joined</p>
              </div>
              <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-white flex flex-col gap-3 text-center items-center">
                <p className="font-bold text-deepblue text-[24px]">24</p>
                <p>Posts & Comments</p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
