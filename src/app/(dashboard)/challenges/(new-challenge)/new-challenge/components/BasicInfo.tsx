// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import Image from "next/image";
// import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
// import { useImageUpload } from "@/hooks/useImageUpload";

// export default function BasicInfo() {
//   const { basicInfo, setBasicInfo, touchedSteps } = useChallengeBuilderStore();
//   const showError = touchedSteps[1];

//   const [hashtagInput, setHashtagInput] = useState("");
//   // const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   /* ------------------ Hashtag Logic ------------------ */

//   const addHashtag = () => {
//     const trimmed = hashtagInput.trim().toLowerCase();
//     if (!trimmed) return;
//     if (basicInfo.primaryHashtags.includes(trimmed)) return;

//     setBasicInfo({
//       primaryHashtags: [...basicInfo.primaryHashtags, trimmed],
//     });

//     setHashtagInput("");
//   };

//   const removeHashtag = (tag: string) => {
//     setBasicInfo({
//       primaryHashtags: basicInfo.primaryHashtags.filter((t) => t !== tag),
//     });
//   };

//   /* ------------------ Image Upload (Shared Hook) ------------------ */

//   const {
//     getRootProps,
//     getInputProps,
//     isDragActive,
//     previewUrl,
//     compressing,
//     setPreviewFromFile,
//     setPreviewFromUrl,
//   } = useImageUpload({
//     maxUploadSizeMB: 5, // user can select up to 5MB
//     maxCompressedSizeMB: 1, // compress to under 1MB

//     initialImageUrl: basicInfo.coverImageUrl,
//     onFileAccepted: (file) => {
//       setBasicInfo({ coverImage: file, coverImageUrl: null });
//       setPreviewFromFile(file);
//     },
//   });

//   /* ------------------ Sync Preview for Edit Mode ------------------ */

//   useEffect(() => {
//     if (!basicInfo.coverImage && basicInfo.coverImageUrl) {
//       setPreviewFromUrl(basicInfo.coverImageUrl);
//     }

//     if (!basicInfo.coverImage && !basicInfo.coverImageUrl) {
//       setPreviewFromUrl(null);
//     }
//   }, [basicInfo.coverImage, basicInfo.coverImageUrl, setPreviewFromUrl]);

//   return (
//     <div className="flex flex-col gap-6">
//       <p className="text-[20px] font-bold text-deepblue">Basic Info</p>

//       <div className="flex flex-col gap-5">
//         {/* Challenge Name */}
//         <div className="flex flex-col gap-2">
//           <label className="text-[16px] text-deepblue">Challenge Name</label>
//           <input
//             value={basicInfo.challengeName}
//             onChange={(e) => setBasicInfo({ challengeName: e.target.value })}
//             className="border border-[#E1E1E1] rounded-md p-2"
//             required
//             max={100}
//           />
//           {showError && !basicInfo.challengeName && (
//             <p className="text-red-500 text-sm">Challenge name is required</p>
//           )}
//         </div>

//         {/* Challenge Type */}
//         <div className="flex flex-col gap-2">
//           <label className="text-[16px] text-deepblue">Challenge Type</label>
//           <select
//             value={basicInfo.challengeType}
//             onChange={(e) => setBasicInfo({ challengeType: e.target.value })}
//             className="border border-[#E1E1E1] rounded-md p-2"
//             required
//           >
//             <option value="">Select</option>
//             <option value="walk">Walk</option>
//           </select>
//           {showError && !basicInfo.challengeType && (
//             <p className="text-red-500 text-sm">Challenge type is required</p>
//           )}
//         </div>

//         {/* Description */}
//         <div className="flex flex-col gap-2">
//           <label className="text-[16px] text-deepblue">Description</label>
//           <textarea
//             value={basicInfo.description}
//             onChange={(e) => setBasicInfo({ description: e.target.value })}
//             className="border border-[#E1E1E1] rounded-md p-2 h-[162px] resize-none"
//             required
//             maxLength={500}
//           />
//           {showError && !basicInfo.description && (
//             <p className="text-red-500 text-sm">Description is required</p>
//           )}
//         </div>

//         {/* Hashtags */}
//         <div className="flex flex-col gap-2">
//           <label className="text-[16px] text-deepblue">Hashtags</label>

//           <div className="flex gap-2 items-center">
//             <input
//               type="text"
//               value={hashtagInput}
//               onChange={(e) => setHashtagInput(e.target.value)}
//               className="border border-[#E1E1E1] rounded-md p-2 flex-1"
//               placeholder="Add hashtag (without #)"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   addHashtag();
//                 }
//               }}
//             />
//             <button
//               type="button"
//               onClick={addHashtag}
//               className="bg-brightblue text-white px-4 py-2 rounded-md"
//             >
//               Add
//             </button>
//           </div>

//           {basicInfo.primaryHashtags.length > 0 && (
//             <div className="flex flex-wrap gap-2 mt-2">
//               {basicInfo.primaryHashtags.map((tag) => (
//                 <span
//                   key={tag}
//                   className="text-xs bg-[#F4F8FD] text-brightblue px-2 py-1 rounded-full flex items-center gap-1"
//                 >
//                   #{tag}
//                   <button
//                     type="button"
//                     onClick={() => removeHashtag(tag)}
//                     className="ml-1"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//           )}
//           {showError && !basicInfo.primaryHashtags && (
//             <p className="text-red-500 text-sm">Hashtags are required</p>
//           )}
//         </div>

//         {/* Cover Image */}
//         <div className="flex flex-col gap-2">
//           <label className="text-[16px] text-deepblue">Cover Image</label>

//           <div
//             {...getRootProps()}
//             className="relative border-2 border-dashed h-[162px] rounded-[8px] p-6 cursor-pointer border-[#1570EF] bg-[#F4F8FD] overflow-hidden"
//           >
//             <input {...getInputProps()} />

//             {previewUrl ? (
//               <Image
//                 src={previewUrl}
//                 alt="preview"
//                 fill
//                 className="object-cover rounded-[6px]"
//               />
//             ) : isDragActive ? (
//               <div className="flex items-center justify-center h-full">
//                 <p className="text-blue-600">Drop the image here...</p>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center h-full text-center">
//                 <Image
//                   src="/document-upload.svg"
//                   alt="upload"
//                   width={24}
//                   height={24}
//                 />
//                 <p className="text-[14px] mt-4">
//                   Click or drag to upload preview image
//                 </p>
//                 <p className="text-[14px] mt-1">
//                   (Recommended size: 1200 × 400px)
//                 </p>
//               </div>
//             )}

//             {compressing && (
//               <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20 rounded-[6px]">
//                 <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
import { useImageUpload } from "@/hooks/useImageUpload";
import { div } from "framer-motion/client";

export default function BasicInfo() {
  const { basicInfo, setBasicInfo, touchedSteps } = useChallengeBuilderStore();
  const showError = touchedSteps[1];

  const [hashtagInput, setHashtagInput] = useState("");

  //word count limit for description

  const WORD_LIMIT = 300;
  const trimToWordLimit = (text: string, limit: number) => {
    const words = text.split(/\s+/);

    if (words.length <= limit) {
      return text; // preserve spaces while typing
    }

    return words.slice(0, limit).join(" ");
  };

  /* ------------------ Hashtag Logic ------------------ */
  const addHashtag = () => {
    const trimmed = hashtagInput.trim().toLowerCase();
    if (!trimmed || basicInfo.primaryHashtags.includes(trimmed)) return;

    setBasicInfo({
      primaryHashtags: [...basicInfo.primaryHashtags, trimmed],
    });
    setHashtagInput("");
  };

  const removeHashtag = (tag: string) => {
    setBasicInfo({
      primaryHashtags: basicInfo.primaryHashtags.filter((t) => t !== tag),
    });
  };

  /* ------------------ Image Upload Hook ------------------ */
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    previewUrl,
    compressing,
    setPreviewFromFile,
    setPreviewFromUrl,
  } = useImageUpload({
    maxUploadSizeMB: 5, // allow user to select up to 5MB
    maxCompressedSizeMB: 1, // compress to under 1MB
    initialImageUrl: basicInfo.coverImageUrl,
    onFileAccepted: (file) => {
      setBasicInfo({ coverImage: file, coverImageUrl: null });
      setPreviewFromFile(file);
    },
  });

  /* ------------------ Sync Preview for Edit Mode ------------------ */
  useEffect(() => {
    if (!basicInfo.coverImage && basicInfo.coverImageUrl) {
      setPreviewFromUrl(basicInfo.coverImageUrl);
    }
    if (!basicInfo.coverImage && !basicInfo.coverImageUrl) {
      setPreviewFromUrl(null);
    }
  }, [basicInfo.coverImage, basicInfo.coverImageUrl, setPreviewFromUrl]);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[20px] font-bold text-deepblue">Basic Info</p>

      <div className="flex flex-col gap-5">
        {/* Challenge Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Challenge Name</label>
          <input
            value={basicInfo.challengeName}
            onChange={(e) => setBasicInfo({ challengeName: e.target.value })}
            className="border border-[#E1E1E1] rounded-md p-2"
            required
            max={100}
          />
          {showError && !basicInfo.challengeName && (
            <p className="text-red-500 text-sm">Challenge name is required</p>
          )}
        </div>

        {/* Challenge Type */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Challenge Type</label>
          <select
            value={basicInfo.challengeType}
            onChange={(e) => setBasicInfo({ challengeType: e.target.value })}
            className="border border-[#E1E1E1] rounded-md p-2"
            required
          >
            <option value="">Select</option>
            <option value="walk">Walk</option>
          </select>
          {showError && !basicInfo.challengeType && (
            <p className="text-red-500 text-sm">Challenge type is required</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Description</label>
          <textarea
            value={basicInfo.description}
            // onChange={(e) => {
            //   setBasicInfo({
            //     description: trimToWordLimit(e.target.value, WORD_LIMIT),
            //   });
            // }}
            onChange={(e) => setBasicInfo({ description: e.target.value })}
            className="border border-[#E1E1E1] rounded-md p-2 h-[162px] resize-none"
            required
            maxLength={3000}
          />
          {showError && !basicInfo.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Hashtags */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Hashtags</label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              className="border border-[#E1E1E1] rounded-md p-2 flex-1"
              placeholder="Add hashtag (without #)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addHashtag();
                }
              }}
            />
            <button
              type="button"
              onClick={addHashtag}
              className="bg-brightblue text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
          {basicInfo.primaryHashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {basicInfo.primaryHashtags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[#F4F8FD] text-brightblue px-2 py-1 rounded-full flex items-center gap-1"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeHashtag(tag)}
                    className="ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          {showError && !basicInfo.primaryHashtags && (
            <p className="text-red-500 text-sm">Hashtags are required</p>
          )}
        </div>

        {/* Cover Image */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-deepblue">Cover Image</label>
          <div
            {...getRootProps()}
            className="relative border-2 border-dashed h-[162px] rounded-[8px] p-6 cursor-pointer border-[#1570EF] bg-[#F4F8FD] "
          >
            <input {...getInputProps()} />

            {/* Preview or placeholder */}
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="preview"
                fill
                className="object-cover rounded-[6px]"
              />
            ) : isDragActive ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-blue-600">Drop the image here...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
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
                  (Recommended size: 1200 × 400px)
                </p>
              </div>
            )}

            {/* Compression loader overlay */}
            {compressing && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20 rounded-[6px]">
                <p className="text-deepblue">Compressing image...</p>

                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
