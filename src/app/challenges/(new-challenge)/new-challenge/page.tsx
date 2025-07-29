"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import BasicInfo from "./components/BasicInfo";
import Reward from "./components/Reward";
import Schedule from "./components/Schedule";
import GoalMetric from "./components/GoalMetric";

export default function page() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  const steps = ["Basic Info", "Goal & Metric", "Schedule", "Rewards"];
  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

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
          {step === 1 && <BasicInfo />}
          {step === 2 && <GoalMetric />}
          {step === 3 && <Schedule />}
          {step === 4 && <Reward />}
        </div>
        <div className="basis-[40%] border-l border-[#E1E1E1] h-[800px] p-6">
          <p className="font-bold text-deepblue text-[20px] mb-14">
            Preview mobile
          </p>
          <div className="flex flex-col items-center w-full text-center mt-14 mx-auto">
            <Image src="/iphone.svg" alt="phone" width={308} height={622} />
            <p className="text-[14px]">
              Preview updates as you configure your challenge
            </p>
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
