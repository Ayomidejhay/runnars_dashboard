"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import BasicInfo from "./components/BasicInfo";
import Reward from "./components/Reward";
import Schedule from "./components/Schedule";
import GoalMetric from "./components/GoalMetric";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
import { useSubmitChallenge } from "@/hooks/useSubmitChallenge";
import toast from "react-hot-toast";

const LOCAL_DRAFT_KEY = "challenge_draft";

export default function Page() {
  const { submit, isLoading } = useSubmitChallenge();
  const router = useRouter();

  // const { step, setStep, basicInfo, goalsAndMetrics, schedule, rewards, reset } =
  //   useChallengeBuilderStore();
  const {
    step,
    setStep,
    isStepValid,
    markStepTouched,
    basicInfo,
    goalsAndMetrics,
    schedule,
    rewards,
    reset,
    setBasicInfo,
    setGoalsAndMetrics,
    setSchedule,
    rewardActions,
  } = useChallengeBuilderStore();

  const [showDiscardModal, setShowDiscardModal] = React.useState(false);

  const steps = ["Basic Info", "Goal & Metric", "Schedule", "Rewards"];

  //Restore Draft (on mount)

  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_DRAFT_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);

      if (parsed.basicInfo) setBasicInfo(parsed.basicInfo);
      if (parsed.goalsAndMetrics) setGoalsAndMetrics(parsed.goalsAndMetrics);
      if (parsed.schedule) setSchedule(parsed.schedule);
      if (parsed.rewards) rewardActions.setRewards(parsed.rewards);

      toast.success("Draft restored");
    } catch (err) {
      console.error("Draft restore failed:", err);
    }
  }, [setBasicInfo, setGoalsAndMetrics, setSchedule, rewardActions]);

  // Save Draft
  const handleSaveDraft = () => {
    try {
      // Only save serializable fields
      const draft = {
        basicInfo: {
          ...basicInfo,
          coverImage: null, // remove file from draft
        },
        goalsAndMetrics,
        schedule,
        rewards: {
          ...rewards,
          rewardFile: null, // remove file from draft
        },
      };

      localStorage.setItem(LOCAL_DRAFT_KEY, JSON.stringify(draft));
      toast.success("Draft saved. Note: images will need to be re-uploaded.");
    } catch {
      toast.error("Failed to save draft");
    }
  };

  // Restore Draft (on mount)
  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_DRAFT_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);

      if (parsed.basicInfo) setBasicInfo(parsed.basicInfo); // coverImage will be null
      if (parsed.goalsAndMetrics) setGoalsAndMetrics(parsed.goalsAndMetrics);
      if (parsed.schedule) setSchedule(parsed.schedule);
      if (parsed.rewards) rewardActions.setRewards(parsed.rewards);

      toast.success("Draft restored. Please re-upload necessary images.");
    } catch (err) {
      console.error("Draft restore failed:", err);
    }
  }, [setBasicInfo, setGoalsAndMetrics, setSchedule, rewardActions]);

  //Navigation
  const nextStep = () => {
    markStepTouched(step);

    if (!isStepValid(step)) return;

    setStep(Math.min(step + 1, steps.length));
  };
  const prevStep = () => setStep(Math.max(step - 1, 1));

  // Discard Challenge
  const handleDiscard = () => {
    reset();
    localStorage.removeItem(LOCAL_DRAFT_KEY);
    router.push("/challenges");
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-[#E1E1E1] px-10">
        <div className="flex gap-4 items-center h-14 ">
          <button onClick={() => setShowDiscardModal(true)}>
            <Image src="/close.svg" alt="close" width={24} height={24} />
          </button>

          <p className="text-[24px] text-deepblue capitalize font-bold">
            create new challenge
          </p>
        </div>
        <button
          className="w-[116px] h-[40px] text-[14px] text-brightblue border border-brightblue bg-transparent rounded-4xl flex items-center justify-center"
          onClick={handleSaveDraft}
        >
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
              {basicInfo.coverImage && (
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
                  {basicInfo.challengeName}
                </h2>

                <p className="text-[14px] text-gray-500 mt-1">
                  Challenge Type :{" "}
                  <span className="capitalize">{basicInfo.challengeType}</span>
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
            disabled={!isStepValid(step)}
            className={`rounded-[32px] w-[190px] h-[48px] ${
              isStepValid(step)
                ? "bg-brightblue text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next: {steps[step]} →
          </button>
        )}

        {step === steps.length && (
          <button
            onClick={submit}
            disabled={isLoading}
            className="bg-brightblue rounded-[32px] text-white w-[90px] h-[48px]"
          >
            {isLoading ? "Publishing..." : "Publish"}
          </button>
        )}
      </div>

      {/* DISCARD MODAL */}
      {showDiscardModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
            <h3 className="text-[18px] font-bold text-deepblue mb-4">
              Discard Challenge?
            </h3>
            <p className="text-[14px] text-gray-600 mb-6">
              Are you sure you want to discard this challenge?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDiscardModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDiscard}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
