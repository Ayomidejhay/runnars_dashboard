"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import BasicInfo from "./components/BasicInfo";
import Reward from "./components/Reward";
import Schedule from "./components/Schedule";
import GoalMetric from "./components/GoalMetric";

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // LIFTED STATE FOR BASIC INFO PREVIEW
  const [basicInfo, setBasicInfo] = useState({
    challengeName: "",
    challengeType: "",
    description: "",
    file: null as File | null,
  });

  // GOAL & METRIC STATES
const [activeTab, setActiveTab] = useState<
  "distance" | "frequency" | "time" | "streak" | "photo"
>("distance");
const [selectedGoalConfiguration, setSelectedGoalConfiguration] = useState("");
const [selectedFrequencyConfiguration, setSelectedFrequencyConfiguration] = useState("");
const [selectedTimeConfiguration, setSelectedTimeConfiguration] = useState("");
const [selectedStreakConfiguration, setSelectedStreakConfiguration] = useState("");
const [selectedPhotoConfiguration, setSelectedPhotoConfiguration] = useState("");


  //Schedule
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [recurrenceType, setRecurrenceType] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  // REWARD STATES 
const [rewardSelected, setRewardSelected] = useState("All users");
const [rewardPetType, setRewardPetType] = useState("");
const [rewardScore, setRewardScore] = useState("");
const [rewardPoints, setRewardPoints] = useState<number | "">("");
const [rewardBreed, setRewardBreed] = useState("");
const [rewardTarget, setRewardTarget] = useState("Global (Available worldwide)");
const [rewardFile, setRewardFile] = useState<File | null>(null);


  const steps = ["Basic Info", "Goal & Metric", "Schedule", "Rewards"];
  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div>
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
          {step === 1 && (
            <BasicInfo
              challengeName={basicInfo.challengeName}
              challengeType={basicInfo.challengeType}
              description={basicInfo.description}
              file={basicInfo.file}
              setBasicInfo={setBasicInfo}
            />
          )}

          {step === 2 && (
  <GoalMetric
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    selectedGoalConfiguration={selectedGoalConfiguration}
    setSelectedGoalConfiguration={setSelectedGoalConfiguration}
    selectedFrequencyConfiguration={selectedFrequencyConfiguration}
    setSelectedFrequencyConfiguration={setSelectedFrequencyConfiguration}
    selectedTimeConfiguration={selectedTimeConfiguration}
    setSelectedTimeConfiguration={setSelectedTimeConfiguration}
    selectedStreakConfiguration={selectedStreakConfiguration}
    setSelectedStreakConfiguration={setSelectedStreakConfiguration}
    selectedPhotoConfiguration={selectedPhotoConfiguration}
    setSelectedPhotoConfiguration={setSelectedPhotoConfiguration}
  />
)}


          {step === 3 && (
            <Schedule
              startDate={startDate}
              setStartDate={setStartDate}
              startTime={startTime}
              setStartTime={setStartTime}
              endDate={endDate}
              setEndDate={setEndDate}
              endTime={endTime}
              setEndTime={setEndTime}
              recurrenceType={recurrenceType}
              setRecurrenceType={setRecurrenceType}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          )}

          {step === 4 && (
  <Reward
    rewardSelected={rewardSelected}
    setRewardSelected={setRewardSelected}
    rewardPetType={rewardPetType}
    setRewardPetType={setRewardPetType}
    rewardScore={rewardScore}
    setRewardScore={setRewardScore}
    rewardPoints={rewardPoints}
    setRewardPoints={setRewardPoints}
    rewardBreed={rewardBreed}
    setRewardBreed={setRewardBreed}
    rewardTarget={rewardTarget}
    setRewardTarget={setRewardTarget}
    rewardFile={rewardFile}
    setRewardFile={setRewardFile}
  />
)}

        </div>

        {/* MOBILE PREVIEW */}
        <div className="basis-[40%] border-l border-[#E1E1E1] h-[850px] p-6">
          <p className="font-bold text-deepblue text-[20px] mb-14">
            Preview mobile
          </p>

          <div className="relative flex justify-center mt-14">
            {/* PHONE FRAME */}
            <Image
              src="/iphone.svg"
              alt="phone"
              width={308}
              height={622}
              className="z-0"
            />

            {/* OVERLAY PREVIEW CONTENT */}
            <div
              className="absolute top-[50px] w-[250px] bg-white z-10 rounded-xl shadow   text-gray-800"
              style={
                {
                  // Adjust these values based on how your phone SVG looks
                }
              }
            >
              {/* COVER IMAGE */}
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
                  {basicInfo.challengeName || ""}
                </h2>

                <p className="text-[14px] text-gray-500 mt-1">
                  Challenge Type :{" "}
                  <span className="capitalize">
                    {basicInfo.challengeType || ""}
                  </span>
                </p>

                <p className="text-[14px] text-gray-700 mt-3 line-clamp-4">
                  {basicInfo.description || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        className={`flex mt-6 px-10 ${
          step === 1 ? "justify-end" : "justify-between"
        }`}
      >
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-brightblue rounded-[32px] text-white w-[90px] h-[48px] flex items-center justify-center"
          >
            Back
          </button>
        )}

        {step < steps.length && (
          <button
            onClick={nextStep}
            className="bg-brightblue rounded-[32px] text-white w-[190px] h-[48px] flex items-center justify-center"
          >
            Next: {steps[step]} →
          </button>
        )}

        {step === steps.length && (
          <button className="bg-brightblue rounded-[32px] text-white w-[90px] h-[48px] flex items-center justify-center">
            Publish
          </button>
        )}
      </div>
    </div>
  );
}