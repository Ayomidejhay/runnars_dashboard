"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { useUser } from "@/hooks/useUsers";
import RecentActivity from "../components/RecentActivity";
import { formatDates } from "@/lib/formatDates";
import { div } from "framer-motion/client";


export default function page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useUser(id);

  const userInfo = data?.data?.basicInfo;
  const userPets = data?.data?.pets;
  const userActivities = data?.data?.activitySummary;


  

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

    if (isLoading) {
    return <div className="p-10">Loading user details…</div>;
  }

  if (error || !data?.data?.basicInfo) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">User not found</h2>
        <button
          onClick={() => router.push("/users")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Users
        </button>
      </div>
    );
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
                src={userInfo.profilePicture || '/profile-icon.svg'}
                alt={userInfo.fullName}
                width={120}
                height={120}
                className="rounded-full mb-2 mx-auto"
              />
              <div className="text-[18px] text-deepblue font-bold mb-1">
                {userInfo.fullName}
              </div>
              <div className="text-[14px] mb-2">{userInfo.email}</div>
              <div
                className={`px-2 py-2 w-[51px] mx-auto rounded-full text-xs  font-semibold ${getStatusBadge(
                  userInfo.status
                )}`}
              >
                {userInfo.status}
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#E1E1E1] -mt-1"></div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between ">
                <p>Email</p>
                <p className="text-deepblue font-bold">{userInfo.email}</p>
              </div>
              <div className="flex justify-between ">
                <p>Member Since</p>
                <p className="text-deepblue font-bold">{formatDates(userInfo.joinDate)}</p>
              </div>
              <div className="flex justify-between ">
                <p>Last Login</p>
                <p className="text-deepblue font-bold">{formatDates(userInfo.lastActive)}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {userPets.map((pet: any) => (
               <div key={pet._id} className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-6">
            <p className="text-[20px] text-deepblue font-bold">
              Pet information
            </p>
            <div className="flex flex-col gap-3 text-[14px]">
              <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  <Image
                    src={pet.picture || '/petmock.svg'}
                    alt="pet"
                    height={40}
                    width={40}
                    className="rounded-full"
                  />
                  <p className="text-[12px]">
                    <span className="font-bold text-deepblue text-[14px]">
                      {pet.name}
                    </span>{" "}
                    {pet.breed}
                  </p>
                </div>
                <Link href={`/users/pets/${pet._id}`} className="flex gap-1 items-center text-brightblue">
                  <p>View profile</p>
                  <Image
                    src="/arrow-right.svg"
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                </Link>
              </div>
              <div className="flex justify-between">
                <p>Pet Type</p>
                <p className="font-bold text-deepblue">{pet.petType}</p>
              </div>
              <div className="flex justify-between">
                <p>Age</p>
                <p className="font-bold text-deepblue">{pet.ageGroup}</p>
              </div>
              <div className="flex justify-between">
                <p>Activity Level</p>
                <p className="font-bold text-deepblue">High</p>
              </div>
            </div>
          </div>
            ))}
          </div>
         
        </div>
        <div className="basis-[60%] flex flex-col gap-6">
          <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-4">
            <p className="text-deepblue font-bold">Activity Summary</p>
            <div className="grid grid-cols-3 gap-4 text-[14px]">
              <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-white flex flex-col gap-3 items-center text-center">
                <p className="font-bold text-deepblue text-[24px]">{data?.data?.challengeSummary.completedChallenges ?? 0}</p>
                <p>Challenges Completed</p>
              </div>
              <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-white flex flex-col gap-3 items-center text-center">
                <p className="font-bold text-deepblue text-[24px]">{data?.data?.communitySummary.totalCommunitiesJoined ?? 0}</p>
                <p>Communities Joined</p>
              </div>
              <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-white flex flex-col gap-3 text-center items-center">
                <p className="font-bold text-deepblue text-[24px]">{data?.data?.engagementSummary.totalEngagementActions ?? 1}</p>
                <p>Posts & Comments</p>
              </div>
            </div>
          </div>
          <RecentActivity activities={userActivities?.recentActivities}/>
        </div>
      </div>
    </div>
  );
}
