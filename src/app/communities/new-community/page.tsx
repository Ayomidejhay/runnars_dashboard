"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import BasicInfo from "../components/BasicInfo";
import LocationAndType from "../components/LocationAndType";

export default function page() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const steps = ["Basic Info", "Location & Type"];
  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  //basic info
  const [selectedPet, setSelectedPet] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");
  const [weeklyActivities, setWeeklyActivities] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [guidelines, setGuidelines] = useState<string[]>([""]);

  //location
  const [primaryLocation, setPrimaryLocation] = useState("");
const [selectedPrivacy, setSelectedPrivacy] = useState("");

  return (
    <div>
      <div className="flex justify-between items-center border-b border-[#E1E1E1] px-10">
        <div className="flex gap-4 items-center h-14 ">
          <button onClick={() => router.back()}>
            <Image src="/close.svg" alt="close" width={24} height={24} />
          </button>
          <p className="text-[24px] text-deepblue capitalize font-bold">
            create new community
          </p>
        </div>
      </div>
      <div className="flex border-b border-[#E1E1E1]">
        <div className="basis-[60%] pt-6 px-10 flex flex-col gap-6">
          {step === 1 && (
            <BasicInfo
              selectedPet={selectedPet}
              setSelectedPet={setSelectedPet}
              communityName={communityName}
              setCommunityName={setCommunityName}
              description={description}
              setDescription={setDescription}
              weeklyActivities={weeklyActivities}
              setWeeklyActivities={setWeeklyActivities}
              file={file}
              setFile={setFile}
              hashtags={hashtags}
              setHashtags={setHashtags}
              guidelines={guidelines}
              setGuidelines={setGuidelines}
            />
          )}
          {step === 2 && (
  <LocationAndType
    primaryLocation={primaryLocation}
    setPrimaryLocation={setPrimaryLocation}
    selectedPrivacy={selectedPrivacy}
    setSelectedPrivacy={setSelectedPrivacy}
  />
)}
        </div>
        <div className="basis-[40%] border-l border-[#E1E1E1] h-[850px] p-6">
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
            <div className="absolute top-[50px] w-[250px] bg-white z-10 rounded-xl shadow p-3  text-gray-800">
              <div className="">
                <div>
                  {file && (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="Cover preview"
                      width={300}
                      height={50}
                    />
                  )}
                  {communityName && (
                    <p className="text-[14px]  line-clamp-2 mb-2">
                      {communityName}
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
      {/* Navigation Buttons */}
      <div
        className={`flex mt-6 px-10 ${
          step === 1 ? "justify-center" : "justify-between"
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
            Save & Continue
          </button>
        )}

        {step === steps.length && (
          <button className="bg-brightblue rounded-[32px] text-white w-[190px] h-[48px] flex items-center justify-center">
            Create Community
          </button>
        )}
      </div>
    </div>
  );
}
