

"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  LayoutGrid,
  Tv,
  Trash2,
  Pencil,
  Upload,
  X,
  FileCheck2,
  Plus,
  ImageIcon,
  Play,
  Loader2,
} from "lucide-react";
import Image from "next/image";

// --- Firebase Imports ---

import { db, storage } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export type MediaType = "image" | "video";

export interface Banner {
  id: string;
  title: string;
  type: MediaType;
  url: string;
  storagePath?: string;
}

// --- Reusable Modal Wrapper ---
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string;
}> = ({ isOpen, onClose, children, widthClass = "w-full max-w-lg" }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className={`relative ${widthClass} rounded-2xl border border-[#30363d] bg-[#161b22] shadow-2xl transition-all duration-300`}
        style={{ boxShadow: "0 10px 50px rgba(0,0,0,0.8)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// --- Upload / Edit Modal ---
const BannerFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; type: MediaType; file?: File }) => void;
  editBanner?: Banner | null;
  isSubmitting?: boolean;
}> = ({ isOpen, onClose, onSubmit, editBanner, isSubmitting = false }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<MediaType>("image");
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const isEditing = !!editBanner;

  useEffect(() => {
    if (isOpen) {
      setTitle(editBanner?.title ?? "");
      setType(editBanner?.type ?? "image");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }, [isOpen, editBanner]);

  const canSubmit =
    title.trim().length > 0 && (isEditing || !!file) && !isSubmitting;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({ title: title.trim(), type, file: file ?? undefined });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      widthClass="w-full max-w-md bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-[24px] font-bold text-deepblue">
          {isEditing ? "Edit banner" : "Upload new banner"}
        </h2>
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="flex items-center justify-center rounded-lg p-1.5  transition-colors   disabled:opacity-50 cursor-pointer text-deepblue"
        >
          <X size={24} />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-5 p-6">
        {/* Title input */}
        <div className="flex flex-col gap-2">
          <label className="block text-[16px] font-medium text-deepblue">
            Banner title
          </label>
          <input
            type="text"
            value={title}
            disabled={isSubmitting}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Summer sale 2026"
            className="rounded-md border border-[#E1E1E1]  p-2 disabled:opacity-50 text-deepblue"
          />
        </div>

        {/* Type toggle */}
        <div className="flex flex-col gap-2">
          <label className="block text-[16px] font-medium text-deepblue">
            Media type
          </label>
          <div className="flex gap-2 rounded-md border border-[#E1E1E1] w-full h-10 ">
            {(["image", "video"] as MediaType[]).map((t) => (
              <button
                key={t}
                type="button"
                disabled={isSubmitting || isEditing}
                onClick={() => {
                  setType(t);
                  setFile(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className={`flex items-center gap-1.5 rounded-md cursor-pointer px-4 py-2 text-sm font-medium capitalize transition-all ease-in-out w-1/2 ${
                  type === t
                    ? "text-brightblue shadow-sm"
                    : "text-[#8b949e] hover:text-[#e6edf3]"
                } disabled:opacity-50`}
              >
                {t === "image" ? <ImageIcon size={12} /> : <Tv size={12} />}
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Drop zone */}
        {!isEditing && (
          <div className="flex flex-col gap-2">
            <label className="block text-[16px] font-medium text-deepblue">
              Upload file
            </label>
            <div
              onClick={() => !isSubmitting && fileRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#E1E1E1] p-8 text-center transition-all ${
                isSubmitting ? "cursor-not-allowed opacity-55" : ""
              } ${
                file
                  ? "border-[#3fb950] bg-[#3fb95010]"
                  : "border-[#30363d] bg-[#0d1117] hover:border-[#58a6ff]"
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                disabled={isSubmitting}
                accept={type === "image" ? "image/*" : "video/*"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) setFile(e.target.files[0]);
                }}
              />
              {file ? (
                <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brightblue">
                    <FileCheck2 size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#e6edf3]">
                      {file.name.length > 30
                        ? file.name.slice(0, 30) + "…"
                        : file.name}
                    </p>
                    <p className="mt-0.5 text-xs text-[#3fb950]">
                      File ready to upload
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#21262d]">
                    <Upload size={20} className="text-[#8b949e]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">
                      Click to browse files
                    </p>
                    <p className="mt-0.5 text-xs text-[#484f58]">
                      {type === "image"
                        ? "JPG, PNG, GIF, WebP"
                        : "MP4, MOV, WebM"}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {isEditing && editBanner && (
          <div className="flex flex-col gap-2">
            <label className="block text-[16px] font-medium text-deepblue">
              Media
            </label>

            <div
              onClick={() => !isSubmitting && fileRef.current?.click()}
              className={`group relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] cursor-pointer transition-all ${
                isSubmitting ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                disabled={isSubmitting}
                accept={type === "image" ? "image/*" : "video/*"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) setFile(e.target.files[0]);
                }}
              />

              {/* Existing or New Preview */}
              {type === "image" ? (
                <img
                  src={file ? URL.createObjectURL(file) : editBanner.url}
                  alt={title}
                  className="h-30 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <video
                  src={file ? URL.createObjectURL(file) : editBanner.url}
                  className="h-30 w-full object-cover"
                  controls={!file}
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                  <Upload size={24} className="text-white" />
                </div>

                <p className="mt-3 text-sm font-medium text-white">
                  {file ? "Replace selected file" : "Click to replace media"}
                </p>

                {file && (
                  <p className="mt-1 text-xs text-[#d1fae5]">{file.name}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between px-6 py-4">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg bg-red-500 text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="bg-brightblue text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:cursor-not-allowed "
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isEditing ? "Save changes" : "Upload"}
        </button>
      </div>
    </Modal>
  );
};

// --- Custom Preview Modal ---
const PreviewModal: React.FC<{
  banner: Banner | null;
  onClose: () => void;
}> = ({ banner, onClose }) => (
  <Modal
    isOpen={!!banner}
    onClose={onClose}
    widthClass="w-auto max-w-[90vw] md:max-w-2xl lg:max-w-3xl"
  >
    {banner && (
      <div className="relative flex flex-col rounded-2xl overflow-hidden bg-black">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-[#e6edf3] border border-[#30363d]/50 backdrop-blur-md hover:bg-black/85 hover:scale-105 transition-all duration-200"
        >
          <X size={14} />
        </button>

        {/* Media Container */}
        <div className="relative flex items-center justify-center h-[90vh] overflow-hidden">
          {banner.type === "image" ? (
            <img
              src={banner.url}
              alt={banner.title}
              className="max-w-full h-[90vh] object-contain block rounded-t-2xl pointer-events-none"
            />
          ) : (
            <video
              src={banner.url}
              controls
              autoPlay
              className="w-full aspect-video max-h-[70vh] object-contain block rounded-t-2xl"
            />
          )}
        </div>

        {/* Dynamic Title / Metadata Strip */}
        <div className="border-t border-[#30363d] bg-[#161b22] px-4 py-3 flex items-center justify-between gap-6 z-10">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#f0f6fc] truncate">
              {banner.title}
            </p>
            <p className="text-[11px] text-[#8b949e] mt-0.5 capitalize flex items-center gap-1">
              {banner.type === "image" ? (
                <ImageIcon size={10} />
              ) : (
                <Tv size={10} />
              )}
              {banner.type} banner
            </p>
          </div>
          <span className="shrink-0 text-[10px] text-[#484f58] hidden sm:inline select-none">
            Click outside to dismiss
          </span>
        </div>
      </div>
    )}
  </Modal>
);

// --- Main Component ---
const BannerAdmin = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [previewBanner, setPreviewBanner] = useState<Banner | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<Banner | null>(null);

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        // collection name changed to 'advert'
        const q = query(collection(db, "advert"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedBanners: Banner[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedBanners.push({
            id: doc.id,
            title: data.title,
            type: data.type,
            url: data.url,
            storagePath: data.storagePath,
          });
        });
        setBanners(fetchedBanners);
      } catch (error) {
        console.error("Error fetching banners: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const imageCount = banners.filter((b) => b.type === "image").length;
  const videoCount = banners.filter((b) => b.type === "video").length;

  const handleFormSubmit = async ({
    title,
    type,
    file,
  }: {
    title: string;
    type: MediaType;
    file?: File;
  }) => {
    try {
      setIsSubmitting(true);

      if (editBanner) {
        let updatedUrl = editBanner.url;
        let updatedStoragePath = editBanner.storagePath;

        // If user selected a new file
        if (file) {
          // Delete old storage file
          if (editBanner.storagePath) {
            const oldFileRef = ref(storage, editBanner.storagePath);
            await deleteObject(oldFileRef);
          }

          // Upload new file
          const timestamp = Date.now();
          const safeFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
          const folder = type === "image" ? "images" : "videos";

          updatedStoragePath = `advert/${folder}/${timestamp}_${safeFileName}`;

          const storageRef = ref(storage, updatedStoragePath);

          const uploadTask = await uploadBytesResumable(storageRef, file);

          updatedUrl = await getDownloadURL(uploadTask.ref);
        }

        // Update firestore document
        const docRef = doc(db, "advert", editBanner.id);

        await updateDoc(docRef, {
          title,
          type,
          url: updatedUrl,
          storagePath: updatedStoragePath,
        });

        // Update local state
        setBanners((prev) =>
          prev.map((b) =>
            b.id === editBanner.id
              ? {
                  ...b,
                  title,
                  type,
                  url: updatedUrl,
                  storagePath: updatedStoragePath,
                }
              : b,
          ),
        );

        setEditBanner(null);
        setIsUploadOpen(false);
      } else {
        if (!file) return;

        // Create Firebase Storage reference with folder path structure
        const timestamp = Date.now();
        const safeFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
        const folder = type === "image" ? "images" : "videos";
        const storagePath = `advert/${folder}/${timestamp}_${safeFileName}`;
        const storageRef = ref(storage, storagePath);

        // Upload the physical file to Firebase Storage
        const uploadTask = await uploadBytesResumable(storageRef, file);
        const downloadURL = await getDownloadURL(uploadTask.ref);

        // Document layout saved in firestore 'advert' collection
        const newDocPayload = {
          title,
          type,
          url: downloadURL,
          storagePath,
          createdAt: new Date(),
        };

        const docRef = await addDoc(collection(db, "advert"), newDocPayload);

        const newBanner: Banner = {
          id: docRef.id,
          title,
          type,
          url: downloadURL,
          storagePath,
        };

        setBanners((prev) => [newBanner, ...prev]);
        setIsUploadOpen(false);
      }
    } catch (error) {
      console.error("Error saving banner:", error);
      alert("Something went wrong while saving the banner.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteBanner = async (banner: Banner) => {
    if (!window.confirm(`Are you sure you want to delete "${banner.title}"?`))
      return;
    try {
      setDeletingId(banner.id);

      // 1. Delete actual physical file from Firebase Storage if path details exist
      if (banner.storagePath) {
        const fileRef = ref(storage, banner.storagePath);
        await deleteObject(fileRef);
      }

      // 2. Delete data document entry from Firestore 'advert' collection
      await deleteDoc(doc(db, "advert", banner.id));

      setBanners((prev) => prev.filter((b) => b.id !== banner.id));
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("Failed to delete banner completely.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="px-10 py-6">
      <div>
        {/* Page header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="capitalize text-[34px] font-bold text-deepblue">
              Advertisement banners
            </h1>
          </div>
          <button
            onClick={() => {
              setEditBanner(null);
              setIsUploadOpen(true);
            }}
            className="w-[163px] h-[44px] text-white cursor-pointer bg-brightblue rounded-[32px] flex items-center justify-center gap-1.5"
          >
            <Plus size={16} />
            Add banner
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              label: "Total banners",
              value: banners.length,
              icon: <LayoutGrid size={15} />,
            },
            {
              label: "Images",
              value: imageCount,
              icon: <ImageIcon size={15} />,
            },
            { label: "Videos", value: videoCount, icon: <Tv size={15} /> },
          ].map((s) => (
            <div
              key={s.label}
              className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-1 mt-6"
            >
              <span className="text-[#484f58]">{s.icon}</span>
              <div>
                <p className="text-2xl font-bold text-deepblue">{s.value}</p>
                <p className="text-sm text-gray">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Core Content: Loading or Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Loader2 className="animate-spin text-[#1f6feb] mb-4" size={32} />
            <p className="text-sm text-[#8b949e]">
              Loading banners from Database...
            </p>
          </div>
        ) : banners.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl gap-5 border border-dashed border-[#30363d] py-24 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#21262d]">
              <ImageIcon size={24} className="text-[#484f58]" />
            </div>
            <p className="text-sm font-medium text-[#8b949e]">No banners yet</p>
            <p className="mt-1 text-xs text-[#484f58]">
              Upload your first banner to get started
            </p>
            <button
              onClick={() => {
                setEditBanner(null);
                setIsUploadOpen(true);
              }}
              className="mt-5 flex items-center gap-2 rounded-lg border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm text-[#c9d1d9] transition-colors hover:bg-[#30363d] mb-4 cursor-pointer"
            >
              <Plus size={14} /> Add banner
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-10">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#21262d] bg-[#161b22] transition-all duration-200 hover:border-[#30363d]"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
              >
                {/* Thumbnail Container */}
                <div
                  className="relative aspect-video w-full overflow-hidden bg-[#0d1117] cursor-pointer"
                  onClick={() => setPreviewBanner(banner)}
                >
                  {banner.type === "video" ? (
                    <video
                      src={banner.url}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      preload="metadata"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={banner.url}
                      alt={banner.title}
                      width={400}
                      height={400}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800";
                      }}
                    />
                  )}

                  {/* Video overlay icon */}
                  {banner.type === "video" && (
                    <div className="absolute inset-0 h-full w-full flex items-center justify-center bg-black/40 z-10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                        <Play
                          size={40}
                          className="translate-x-0.5 text-white"
                          fill="white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Type badge */}
                  <div
                    className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide z-20 ${
                      banner.type === "video"
                        ? "border border-[#3fb95030] bg-[#0d1117]/70 text-[#3fb950]"
                        : "border border-[#1f6feb30] bg-[#0d1117]/70 text-[#58a6ff]"
                    }`}
                    style={{ backdropFilter: "blur(4px)" }}
                  >
                    {banner.type}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4 bottom-0">
                  <h3 className="mb-4 truncate text-sm font-medium text-[#e6edf3]">
                    {banner.title}
                  </h3>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setEditBanner(banner);
                      }}
                      className="flex items-center gap-1.5 cursor-pointer rounded-lg bg-brightblue px-3 py-1.5 text-[16px] font-medium text-white transition-colors "
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => deleteBanner(banner)}
                        disabled={deletingId === banner.id}
                        className="flex items-center cursor-pointer justify-center rounded-lg bg-[#21262d] p-1.5 text-[#8b949e] transition-colors hover:border-[#f8514930] hover:text-[#f85149] disabled:opacity-50"
                      >
                        {deletingId === banner.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload / Edit Modal */}
      <BannerFormModal
        isOpen={isUploadOpen || !!editBanner}
        onClose={() => {
          setIsUploadOpen(false);
          setEditBanner(null);
        }}
        onSubmit={handleFormSubmit}
        editBanner={editBanner}
        isSubmitting={isSubmitting}
      />

      {/* Preview Modal */}
      <PreviewModal
        banner={previewBanner}
        onClose={() => setPreviewBanner(null)}
      />
    </div>
  );
};

export default BannerAdmin;
