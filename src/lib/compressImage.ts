import imageCompression from "browser-image-compression";

export async function compressImageTo1MB(file: File) {
  const options = {
    maxSizeMB: 1,               // 🔒 backend limit
    maxWidthOrHeight: 1600,     // prevents huge dimensions
    useWebWorker: true,
    fileType: "image/jpeg",    // ensures consistent compression
    initialQuality: 0.8,
  };

  const compressedFile = await imageCompression(file, options);

  console.log("Original:", (file.size / 1024 / 1024).toFixed(2), "MB");
  console.log(
    "Compressed:",
    (compressedFile.size / 1024 / 1024).toFixed(2),
    "MB"
  );

  return compressedFile;
}
