"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AudienceSelector from "../components/AudienceSelector";

const sendOptions = ["Send immediately", "Schedule for later"];

export default function Page() {
  const router = useRouter();

  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selected, setSelected] = useState("Send immediately");
  const isScheduled = selected === "Schedule for later";

  return (
    <div>
      <div className="border-b border-[#E1E1E1] px-10">
        <div className="flex gap-4 items-center h-14">
          <button onClick={() => router.back()}>
            <Image src="/close.svg" alt="close" width={24} height={24} />
          </button>
          <p className="text-[24px] text-deepblue capitalize font-bold">
            create new notification
          </p>
        </div>
      </div>

      <div className="flex ">
        <div className="basis-[60%] pt-6 px-10 flex flex-col gap-6">
          {/* Title and Message */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Title</label>
              <input
                type="text"
                className="border border-[#E1E1E1] rounded-md p-2"
                placeholder="Enter title"
                value={notificationTitle}
                onChange={(e) => setNotificationTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Message</label>
              <textarea
                className="border border-[#E1E1E1] rounded-md p-2 h-[162px] resize-none"
                placeholder="Type here..."
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
              />
            </div>
          </div>

          {/* Audience and Timing */}
          <AudienceSelector />

          <div className="flex gap-5 items-start">
            {/* Send Timing Selection */}
            <div className="flex-1 border border-[#E1E1E1] rounded-[16px] px-3 py-4">
              <div className="flex flex-col gap-2">
                <label className="text-[16px] text-deepblue">
                  Target Audience
                </label>
                {sendOptions.map((option) => {
                  const isSelected = selected === option;
                  return (
                    <label
                      key={option}
                      className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                        isSelected
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      <span className="text-gray-800">{option}</span>
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
                        name="send-timing"
                        value={option}
                        checked={isSelected}
                        onChange={() => setSelected(option)}
                        className="hidden"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Schedule Date/Time */}
            <div
              className={`flex-1 border border-[#E1E1E1] rounded-[16px] px-3 py-4 ${
                !isScheduled ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] text-gray-700">
                    Select Date
                  </label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    disabled={!isScheduled}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] text-gray-700">
                    Select Time
                  </label>
                  <input
                    type="time"
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    disabled={!isScheduled}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Preview */}
        <div className="basis-[40%] border-l border-[#E1E1E1] h-[900px] p-6 relative">
          <p className="font-bold text-deepblue text-[20px] mb-14">
            Preview mobile
          </p>

          <div className="relative flex justify-center mt-14">
            <Image
              src="/iphone.svg"
              alt="phone"
              width={308}
              height={622}
              className="z-0"
            />

            {/* Preview Content inside phone */}
            <div className="absolute top-[100px] w-[250px] bg-white z-10 rounded-xl shadow p-3  text-gray-800">
              <div className="flex gap-2 items-start">
                <Image
                                      src="/notification.svg"
                                      alt="notification icon"
                                      width={25}
                                      height={25}
                                    />
                <div>
                  {notificationTitle && (
                    <p className="font-bold text-[16px] mb-1 text-deepblue capitalize">
                      {notificationTitle}
                    </p>
                  )}
                  {notificationMessage && (
                    <p className="text-[14px]  line-clamp-2 mb-2">
                      {notificationMessage}
                    </p>
                  )}
                  
                    <div className="text-brightblue text-[12px] flex items-center gap-1">
                    <p>Runnars</p>
                    <div className="h-1.5 w-1.5 bg-brightblue rounded-full mt-1"></div>
                    <p>now</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          <p className="text-[14px] text-center mt-4 text-gray-500">
            Preview updates as you configure your challenge
          </p>
        </div>
      </div>
      <div className="border-t border-[#E1E1E1] flex justify-end  px-10 pt-6">
        <button className="bg-brightblue text-[14px] rounded-[32px] text-white w-[161px] h-[48px] flex items-center justify-center">
            Send Notification
          </button>
      </div>
    </div>
  );
}
