import React from "react";
import Image from "next/image";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";

export default function MobilePreview() {
  const { basicInfo } = useChallengeBuilderStore();

  return (
    <div className="basis-[40%] border-l border-[#E1E1E1] h-[850px] p-6">
      <p className="font-bold text-deepblue text-[20px] mb-14">Preview mobile</p>

      <div className="relative flex justify-center mt-14">
        {/* Phone Frame */}
        <Image
          src="/iphone.svg"
          alt="phone"
          width={308}
          height={622}
          className="z-0"
        />

        {/* Overlay Content */}
        <div className="absolute top-[50px] w-[250px] bg-white z-10 rounded-xl shadow text-gray-800">
          {/* Cover Image */}
          {basicInfo?.coverImage && (
            <Image
              src={URL.createObjectURL(basicInfo.coverImage)}
              alt="cover"
              width={260}
              height={120}
              className="rounded-t-xl object-cover"
            />
          )}

          <div className="p-3">
            <h2 className="mt-4 text-[18px] font-bold text-deepblue">
              {basicInfo?.name || ""}
            </h2>

            <p className="text-[14px] text-gray-500 mt-1">
              Challenge Type:{" "}
              <span className="capitalize">{basicInfo?.type || ""}</span>
            </p>

            <p className="text-[14px] text-gray-700 mt-3 line-clamp-4">
              {basicInfo?.description || ""}
            </p>

            <div className="flex flex-wrap gap-1 mt-2">
              {basicInfo?.primaryHashtags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[#F4F8FD] text-brightblue px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}