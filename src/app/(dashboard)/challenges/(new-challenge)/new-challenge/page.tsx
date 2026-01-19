"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import BasicInfo from "./components/BasicInfo";
import Reward from "./components/Reward";
import Schedule from "./components/Schedule";
import GoalMetric from "./components/GoalMetric";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
import { useSubmitChallenge } from "@/hooks/useSubmitChallenge";

export default function Page() {
   const { submit, isLoading } = useSubmitChallenge();
  const router = useRouter();

  const {
    step,
    setStep,
    basicInfo,
    goalsAndMetrics,
    schedule,
    rewards,
  } = useChallengeBuilderStore();

  const steps = ["Basic Info", "Goal & Metric", "Schedule", "Rewards"];

  const nextStep = () => setStep(Math.min(step + 1, steps.length));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-[#E1E1E1] px-10">
        <div className="flex gap-4 items-center h-14 ">
          <button onClick={() => router.back()}>
            <Image src="/close.svg" alt="close" width={24} height={24} />
          </button>
          <p className="text-[24px] text-deepblue capitalize font-bold">
            create new challenge
          </p>
        </div>
        <button className="w-[116px] h-[40px] text-[14px] text-brightblue border border-brightblue bg-transparent rounded-4xl flex items-center justify-center">
          Save as draft
        </button>
      </div>

      <div className="flex border-b border-[#E1E1E1]">
        <div className="basis-[60%] pt-6 px-10 flex flex-col gap-6">
          {step === 1 && <BasicInfo />}

          {step === 2 && <GoalMetric />}

          {step === 3 && <Schedule />}

          {step === 4 && <Reward />}
        </div>

        {/* MOBILE PREVIEW */}
        <div className="basis-[40%] border-l border-[#E1E1E1] h-[850px] p-6">
          <p className="font-bold text-deepblue text-[20px] mb-14">
            Preview mobile
          </p>

          <div className="relative flex justify-center mt-14">
            <Image src="/iphone.svg" alt="phone" width={308} height={622} />

            <div className="absolute top-[50px] w-[250px] bg-white z-10 rounded-xl shadow">
              {basicInfo.file && (
                <Image
                  src={URL.createObjectURL(basicInfo.file)}
                  alt="cover"
                  width={260}
                  height={120}
                  className="rounded-t-xl object-cover"
                />
              )}

              <div className="p-3">
                <h2 className="mt-4 text-[18px] font-bold text-deepblue">
                  {basicInfo.challengeName}
                </h2>

                <p className="text-[14px] text-gray-500 mt-1">
                  Challenge Type :{" "}
                  <span className="capitalize">
                    {basicInfo.challengeType}
                  </span>
                </p>

                <p className="text-[14px] text-gray-700 mt-3 line-clamp-4">
                  {basicInfo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div
        className={`flex mt-6 px-10 ${
          step === 1 ? "justify-end" : "justify-between"
        }`}
      >
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-brightblue rounded-[32px] text-white w-[90px] h-[48px]"
          >
            Back
          </button>
        )}

        {step < steps.length && (
          <button
            onClick={nextStep}
            className="bg-brightblue rounded-[32px] text-white w-[190px] h-[48px]"
          >
            Next: {steps[step]} →
          </button>
        )}

        {step === steps.length && (
          <button onClick={submit}
            disabled={isLoading} className="bg-brightblue rounded-[32px] text-white w-[90px] h-[48px]">
            {isLoading ? "Publishing..." : "Publish"}
          </button>
        )}
      </div>
    </div>
  );
}
