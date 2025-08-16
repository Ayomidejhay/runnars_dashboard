"use client";

import React from "react";
import { hashtagMockData } from "@/mockdata";
import Link from "next/link";
import Image from "next/image";
import HashTagCard from "./HashTagCard";

const HashTags = () => {
  // Separate featured and challenge hashtags
  const featuredHashtags = hashtagMockData.filter(
    (tag) => tag.type === "featured"
  );
  const challengeHashtags = hashtagMockData.filter(
    (tag) => tag.type === "challenge"
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-[14px] font-bold text-deepblue">
          all hashtags ({hashtagMockData.length})
        </h1>
        <div className="w-[163px] h-[44px] text-white bg-brightblue rounded-[32px] flex items-center justify-center">
          <Link
            href=""
            className="text-[14px] flex items-center gap-[2px] font-bold"
          >
            <Image src="/add.svg" alt="add" width={24} height={24} />
            New hashtag
          </Link>
        </div>
      </div>

      {/* Lists */}
      <div className="flex flex-col gap-10">
        {/* Featured */}
        <div className="flex flex-col gap-4">
          <p className="text-[16px] font-bold text-deepblue">
            Featured Campaign Hashtags
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHashtags.map((tag, idx) => (
              <HashTagCard
                key={idx}
                title={tag.title}
                value={tag.posts}
                type={tag.type}
              />
            ))}
          </div>
        </div>

        {/* Challenge */}
        <div className="flex flex-col gap-4">
          <p className="text-[16px] font-bold text-deepblue">
            Challenge Hashtags
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {challengeHashtags.map((tag, idx) => (
              <HashTagCard
                key={idx}
                title={tag.title}
                value={tag.posts}
                type={tag.type}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashTags;
