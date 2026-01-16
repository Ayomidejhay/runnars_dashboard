"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useUpdateAdminProfile } from "@/hooks/useCurrentAdmin";

interface ProfileDetailsProps {
  admin: any; // React Query cached admin object
}

export default function ProfileDetails({ admin }: ProfileDetailsProps) {
  // Controlled input states
  const [fullNameInput, setFullNameInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  // Mutation hook
  const { mutate, isPending } = useUpdateAdminProfile();

  // Sync local state when admin data changes
  useEffect(() => {
    if (admin?.admin) {
      setFullNameInput(admin.admin.fullName ?? "");
      setFileUrl(admin.admin.profilePicture ?? null);
    }
  }, [admin?.admin]);

  // Handle image drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile));
    }
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullNameInput);

    if (file) {
      formData.append("photo", file);
    }

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 w-[800px]">
        {/* HEADER */}
        <div className="bg-[#E8F1FD] rounded-[16px] p-6 flex gap-4 items-center">
          <div className="relative" {...getRootProps()}>
            <div className="bg-white rounded-full h-[72px] w-[72px] overflow-hidden flex items-center justify-center">
              {fileUrl ? (
                <img
                  src={fileUrl}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image
                  src="/avatar.svg"
                  alt="avatar"
                  width={72}
                  height={72}
                />
              )}
            </div>

            {/* Camera button */}
            <button
              type="button"
              onClick={open}
              className="absolute bottom-0 right-0 h-8 w-8 bg-brightblue rounded-full flex items-center justify-center"
            >
              <Image src="/camera.svg" alt="edit" width={16} height={16} />
            </button>

            <input {...getInputProps()} />
          </div>

          {/* Display name now reacts immediately */}
          <p className="text-[24px] font-bold text-deepblue">
            {fullNameInput || "Loading..."}
          </p>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              className="border rounded-md p-2 text-sm"
              value={fullNameInput}
              onChange={(e) => setFullNameInput(e.target.value)}
            />
          </div>

          {/* Email (Read Only) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              className="border rounded-md p-2 text-sm bg-gray-100 cursor-not-allowed"
              value={admin?.admin?.email ?? ""}
              readOnly
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-brightblue text-white rounded-[32px] text-[14px] h-[48px] w-[138px] mt-4 disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
