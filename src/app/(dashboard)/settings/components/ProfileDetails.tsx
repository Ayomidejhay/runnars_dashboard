"use client";

import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ProfileDetails() {
  //profile picture state
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const url = URL.createObjectURL(acceptedFiles[0]);
      setFileUrl(url);
    }
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });
  //

  return (
    <form>
      <div className="flex flex-col gap-6 w-[800px]">
        <div className="bg-[#E8F1FD] rounded-[16px] p-6 flex gap-4 items-center">
          <div className="relative" {...getRootProps()}>
            {/* Profile Circle */}
            <div className="bg-white rounded-full h-[72px] w-[72px] flex items-center justify-center overflow-hidden">
              {fileUrl ? (
                <img
                  src={fileUrl}
                  alt="profile"
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <Image
                  src="/profile-icon.svg"
                  alt="icon"
                  width={32}
                  height={32}
                />
              )}
            </div>

            {/* Camera Button */}
            <button
              type="button"
              onClick={open}
              className="absolute h-8 w-8 bottom-0 right-0 bg-brightblue rounded-full flex items-center justify-center"
            >
              <Image src="/camera.svg" alt="edit" width={16} height={16} />
            </button>

            {/* Hidden input for Dropzone */}
            <input {...getInputProps()} />
          </div>
          <p className="text-[24px] font-bold text-deepblue">Adekola Touchy</p>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">Full Name</label>
              <input
                type="text"
                className="border rounded-md p-2 text-sm"
                placeholder="Enter your full name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                className="border rounded-md p-2 text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>
          
        </div>
      </div>
      <button
            type="submit"
            className="bg-brightblue text-white  rounded-[32px] text-[14px] h-[48px] w-[138px] flex items-center justify-center mt-4"
          >
            Save Changes
          </button>
    </form>
  );
}
