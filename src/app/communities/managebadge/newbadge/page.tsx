"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const Page = () => {
  const router = useRouter();

  const [badgeName, setBadgeName] = useState("");
  const [challengeType, setChallengeType] = useState("");
  const [associatedWith, setAssociatedWith] = useState("");
  const [earningCriteria, setEarningCriteria] = useState("");
  const [file, setFile] = useState<File | null>(null);

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
      <div className="flex gap-4 items-center h-14 border-b border-[#E1E1E1] px-10">
        <button onClick={() => router.back()}>
          <Image src="/close.svg" alt="close" width={24} height={24} />
        </button>
        <p className="text-[24px] text-deepblue capitalize font-bold">
          create new badge
        </p>
      </div>

      <div className="flex border-b border-[#E1E1E1]">
        <div className="basis-[60%] pt-6 px-10 flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Badge Name</label>
              <input
                type="text"
                value={badgeName}
                onChange={(e) => setBadgeName(e.target.value)}
                className="border border-[#E1E1E1] rounded-md p-2"
                placeholder="Enter badge name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Preview Image</label>
              <div>
                <div
                  {...getRootProps()}
                  className="relative border-2 border-dashed h-[162px] rounded-[8px] p-6 cursor-pointer transition-all border-[#1570EF] bg-[#F4F8FD]"
                >
                  <input {...getInputProps()} />
                  {file ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[6px]"
                    />
                  ) : isDragActive ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-blue-600">Drop the image here...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Image
                        src="/document-upload.svg"
                        alt="upload"
                        width={24}
                        height={24}
                      />
                      <p className="text-[14px] mt-4">
                        Click or drag to upload preview image
                      </p>
                      <p className="text-[14px] mt-1">
                        (Recommended size: 1200x400px)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border border-[#E1E1E1] rounded-md p-6">
            <p className="text-deepblue">Badge Assignment</p>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Challenge type</label>
              <select
                value={challengeType}
                onChange={(e) => setChallengeType(e.target.value)}
                className="border border-[#E1E1E1] rounded-md p-2"
              >
                <option value="">Walk Challenge</option>
                <option value="walk">Fitness Challenge</option>
                <option value="run">Run</option>
                <option value="cycling">Cycling</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Associated With</label>
              <input
                type="text"
                value={associatedWith}
                onChange={(e) => setAssociatedWith(e.target.value)}
                className="border border-[#E1E1E1] rounded-md p-2"
                placeholder="E.g 10Km Distance walk"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-deepblue">Badge Earning Criteria</label>
              <input
                type="text"
                value={earningCriteria}
                onChange={(e) => setEarningCriteria(e.target.value)}
                className="border border-[#E1E1E1] rounded-md p-2"
                placeholder="E.g Complete 10km total walking distance during the challenge"
              />
            </div>
          </div>
        </div>

        <div className="basis-[40%] border-l border-[#E1E1E1] h-[800px] p-6">
          <p className="font-bold text-deepblue text-[20px] mb-14">Preview badge</p>
          <div className="flex flex-col items-center w-full text-center mx-auto">
            <div className="h-[240px] w-[240px] relative flex items-center justify-center bg-[#F7F7F7] rounded-[100%] mb-2">
              {file ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Badge Preview"
                  fill
                  className="rounded-[100%] object-cover"
                />
              ) : (
                <p className="text-[14px]">Badge preview image</p>
              )}
            </div>
            <p className="text-[14px] text-center">
              Preview updates as you configure your community badge
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-6">
        <button className="text-white bg-brightblue w-[153px] h-[48px] rounded-[32px] flex items-center justify-center text-[14px]">
          Create badge
        </button>
      </div>
    </div>
  );
};

export default Page;
