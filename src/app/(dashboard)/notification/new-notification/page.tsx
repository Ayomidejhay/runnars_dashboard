"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AudienceSelector from "../components/AudienceSelector";
import { CreateNotificationPayload } from "@/types/notification";
import { useSendNotification } from "@/hooks/useSendNotification";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [campaign, setCampaign] = useState("");

  const [audience, setAudience] = useState<{
    targetType: CreateNotificationPayload["targetType"];
    criteria: Record<string, any>;
  }>({
    targetType: "all_users",
    criteria: {},
  });

  const { mutate, isPending } = useSendNotification();

  const validatePayload = (): boolean => {
  if (!title.trim() || !body.trim()) {
    toast.error("Title and message body are required.");
    return false;
  }

  if (
    audience.targetType === "pet_type" &&
    (!audience.criteria.petTypes ||
      audience.criteria.petTypes.length === 0)
  ) {
    toast.error("Please select at least one pet type.");
    return false;
  }

  if (
    audience.targetType === "challenge_status" &&
    (!audience.criteria.challengeId ||
      !audience.criteria.challengeStatus)
  ) {
    toast.error("Please select challenge and participant status.");
    return false;
  }

  return true;
};

  const handleSubmit = () => {

    if (!validatePayload()) return;

    const payload: CreateNotificationPayload = {
      title,
      body,
      campaign,
      targetType: audience.targetType,
      criteria: audience.criteria,
    };

    console.log("FINAL PAYLOAD 👉", payload);
    mutate(payload, {
      onSuccess: () => {
        toast.success("Notification sent successfully");
        router.push("/notifications");
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong" ;
        toast.error(message);
      }
    });
  };

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Message</label>
              <textarea
                className="border border-[#E1E1E1] rounded-md p-2 h-[162px] resize-none"
                placeholder="Type here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Campaign (optional)"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                className="border px-3 py-2 w-full rounded"
              />
            </div>
          </div>

          {/* Audience and Timing */}
          <AudienceSelector onChange={setAudience} />
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
                  {title && (
                    <p className="font-bold text-[16px] mb-1 text-deepblue capitalize">
                      {title}
                    </p>
                  )}
                  {body && (
                    <p className="text-[14px]  line-clamp-2 mb-2">{body}</p>
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
        <button
          className="bg-brightblue text-[14px] rounded-[32px] text-white w-[161px] h-[48px] flex items-center justify-center"
          disabled={isPending}
          onClick={handleSubmit}
        >
          {isPending ? "Sending..." : "Send Notification"}
        </button>
      </div>
    </div>
  );
}
