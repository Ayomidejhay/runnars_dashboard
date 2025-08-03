import Image from "next/image";
import React from "react";
import { Community } from "@/types";
import StatCard from "./StatCard";

interface OverviewProps {
  community: Community;
  getStatusBadge: (status: string) => string;
}

const Overview = ({ community, getStatusBadge }: OverviewProps) => {
  const formattedDate = new Date(community.createdDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
  return (
    <div>
      <div className="bg-white rounded-[16px] pb-6">
        <div className="w-full h-[230px] relative rounded-t-[16px] overflow-hidden">
          <Image
            src="/challenge-banner.png"
            alt="banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="px-6">
          <div className=" pt-5 pb-4 border-b ">
            <div className="flex gap-1 items-center">
              <h2 className="text-[18px] font-bold text-deepblue">
                {community.name}
              </h2>
              <span
                className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(
                  community.status
                )}`}
              >
                {community.status}
              </span>
            </div>
            <p className="text-[14px]">
              Created: {formattedDate} • {community.location}
            </p>
          </div>
          <div className="flex gap-2 items-center mt-[10px] ">
            <Image
              src="/user-image.png"
              alt="icon"
              width={48}
              height={38}
              className="rounded-full"
            />
            <div className="text-[12px] flex flex-col gap-2">
              <p>Admin</p>
              <p className="text-deepblue font-bold">{community.creator}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-6">
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            title="members"
            value="412"
            subtitle="↑ 15 since last month"
          />
          <StatCard title="badges" value="6" subtitle="Top 5% of communities" />
          <StatCard title="events" value="400" subtitle="Last 30 days" />
        </div>
        <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-3">
          <p className="text-[16px] text-deepblue font-bold">About</p>
          <div className="flex flex-col gap-1">
            <p>
              A community of dog owners who meet regularly in New York City
              parks for group walks, training tips, and socializing. We organize
              weekly meetups in Central Park, Prospect Park, and other green
              spaces around NYC. Open to all breeds and experience levels!
            </p>
            <p>Tags: #dogwalking #nyc #centralpark #training #socialization</p>
          </div>
        </div>
        <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-3">
            <p className="text-[16px] text-deepblue font-bold">Community Guidelines</p>
            <div className="text-[14px] flex flex-col gap-2">
                <p>• Be respectful to all members and their puppies</p>
                <p>• Keep your dog on leash during group walks unless in designated off-leash areas</p>
                <p>• Clean up after your dog</p>
                <p>• Ensure your puppy is up-to-date on vaccinations</p>
                <p>• Photos and videos are welcome, but ask before featuring other members</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
