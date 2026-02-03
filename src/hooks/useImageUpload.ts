

// "use client";

// import { useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import toast from "react-hot-toast";
// import { compressImageTo1MB } from "@/lib/compressImage";

// interface UseImageUploadOptions {
//   maxSizeMB?: number;
//   initialImageUrl?: string | null;
//   onFileAccepted: (file: File) => void;
// }

// export function useImageUpload({
//   maxSizeMB = 5, // accept large files
//   initialImageUrl = null,
//   onFileAccepted,
// }: UseImageUploadOptions) {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl);
//   const maxSizeBytes = maxSizeMB * 1024 * 1024;

//   const dropzone = useDropzone({
//     accept: { "image/*": [] },
//     multiple: false,

//     onDrop: async (files) => {
//       if (!files.length) return;

//       const originalFile = files[0];
//       const originalSizeMB = originalFile.size / 1024 / 1024;

//       // 🔒 Frontend max (5MB)
//       if (originalFile.size > maxSizeBytes) {
//         alert(`Image must be smaller than ${maxSizeMB}MB`);
//         return;
//       }

//       // 🧠 Compress BEFORE preview & upload
//       const compressedFile = await compressImageTo1MB(originalFile);

//       // 🔥 Absolute guarantee
//       if (compressedFile.size > 1024 * 1024) {
//         alert("Image could not be compressed below 1MB");
//         return;
//       }

//       const url = URL.createObjectURL(compressedFile);
//       setPreviewUrl(url);

//       onFileAccepted(compressedFile);
//     },
//   });

//   useEffect(() => {
//     return () => {
//       if (previewUrl?.startsWith("blob:")) {
//         URL.revokeObjectURL(previewUrl);
//       }
//     };
//   }, [previewUrl]);

//   return {
//     ...dropzone,
//     previewUrl,
//     setPreviewFromUrl: setPreviewUrl,
//   };
// }

"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

interface UseImageUploadOptions {
  maxUploadSizeMB?: number; // max file the user can select
  maxCompressedSizeMB?: number; // max compressed file size
  initialImageUrl?: string | null;
  onFileAccepted: (file: File) => void;
//   compressing?: boolean;
}

export function useImageUpload({
  maxUploadSizeMB = 5,
  maxCompressedSizeMB = 1,
  initialImageUrl = null,
  onFileAccepted,
}: UseImageUploadOptions) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl);
  const [compressing, setCompressing] = useState(false);
  const maxUploadBytes = maxUploadSizeMB * 1024 * 1024;

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0]?.errors?.[0];
        toast.error(error?.message || `Image must be smaller than ${maxUploadSizeMB}MB`);
        return;
      }

      if (!acceptedFiles.length) return;

      let file = acceptedFiles[0];

      console.log(`Original image size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`);

    

      // Compress if bigger than maxCompressedSizeMB
      if (file.size / (1024 * 1024) > maxCompressedSizeMB) {
        try {
              setCompressing(true);
               // Give React a tick to render spinner
          await new Promise((resolve) => setTimeout(resolve, 50));
          const compressedFile = await imageCompression(file, {
            maxSizeMB: maxCompressedSizeMB,
            maxWidthOrHeight: 2000, // optional: limit dimensions
            useWebWorker: true,
          });
           

          console.log(
            `Compressed image size: ${(compressedFile.size / (1024 * 1024)).toFixed(2)} MB`
          );

          file = new File([compressedFile], file.name, { type: compressedFile.type });
        } catch (err) {
          console.error("Image compression failed:", err);
          toast.error("Failed to compress image. Please try a smaller image.");
          return;
        } finally {
          setCompressing(false);
        }
      }

      // Update preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Pass compressed file upwards
      onFileAccepted(file);
    },
    [maxCompressedSizeMB, maxUploadSizeMB, onFileAccepted]
  );

  const dropzone = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    maxSize: maxUploadBytes,
    onDrop,
  });

  /* Cleanup blob URLs */
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const setPreviewFromFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const setPreviewFromUrl = (url: string | null) => setPreviewUrl(url);

  return {
    ...dropzone,
    previewUrl,
    setPreviewFromFile,
    setPreviewFromUrl,
    compressing,
  };
}
