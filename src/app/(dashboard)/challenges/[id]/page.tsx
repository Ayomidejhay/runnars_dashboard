"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
// import { mockPetChallenges } from "@/mockdata";
import { useChallenge, useDeleteChallenge } from "@/hooks/useChallenges";
import { Search } from "lucide-react";
import ParticipantsTab from "../components/ParticipantsTab";
import OverviewTab from "../components/OverViewTab";
import { ChallengeStatus } from "@/types";
import AnalyticsTab from "../components/AnalyticsTab";
import PostsTab from "../components/PostsTab";
import { AdminChallenge } from "@/types/challenge";
import DeleteModal from "../../components/DeleteModal";

type Tab = "overview" | "participants" | "analytics" | "post";

const page = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [challengeToDelete, setChallengeToDelete] =
    useState<AdminChallenge | null>(null);

  const { data, isLoading, error } = useChallenge(id);

  const adminChallenge = data?.data?.adminChallenge;
  const published = adminChallenge?.publishedChallenge;
  const schedule = adminChallenge?.scheduleAndDuration;

  const deleteModalMutation = useDeleteChallenge();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Function to handle delete
  const handleDelete = () => {
    if (!adminChallenge) return;
    deleteModalMutation.mutate(adminChallenge._id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        router.push("/challenges"); // redirect after delete
      },
    });
  };

  //const [searchTerm, setSearchTerm] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const dropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // const challenge = mockPetChallenges.find((c) => c.id === Number(id));

  //date and time
  const startDate = new Date(`${schedule?.startDate}T${schedule?.startTime}`);
  const formattedDate = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const endDate = new Date(`${schedule?.endDate}T${schedule?.endTime}`);
  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedEndTime = endDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // calculate duration
  const start = new Date(`${schedule?.startDate}`);
  const end = new Date(`${schedule?.endDate}`);
  // Calculate difference in milliseconds
  const diffInMs = end.getTime() - start.getTime();
  // Convert to days
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  // const filterChallenges = () => {
  //   return mockPetChallenges.filter((challenge) => {
  //     const name = challenge.name?.toLowerCase() || "";
  //     const description = challenge.description?.toLowerCase() || "";

  //     const matchesSearch =
  //       name.includes(searchTerm.toLowerCase()) ||
  //       description.includes(searchTerm.toLowerCase());

  //     const matchesStatus =
  //       statusFilter === "all" || challenge.status === statusFilter;

  //     const matchesType =
  //       typeFilter === "all" || challenge.category === typeFilter;

  //     let matchesTab = true;
  //     if (activeTab === "featured") {
  //       matchesTab = challenge.is_featured;
  //     } else if (activeTab === "community") {
  //       matchesTab = challenge.community_id !== undefined;
  //     }

  //     return matchesSearch && matchesStatus && matchesType && matchesTab;
  //   });
  // };

  // const filteredChallenges = filterChallenges();

  //pages
  // const totalPages = Math.ceil(filteredChallenges.length / rowsPerPage);
  // const paginatedChallenges = filteredChallenges.slice(
  //   (currentPage - 1) * rowsPerPage,
  //   currentPage * rowsPerPage
  // );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(e.target)
      ) {
        setOpenRow(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return <div className="p-10">Loading challenge…</div>;
  }

  if (error || !data?.data?.adminChallenge) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Challenge not found</h2>
        <button
          onClick={() => router.push("/challenges")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Challenges
        </button>
      </div>
    );
  }

  return (
    <div className="px-10">
      <div>
        <button
          //cursor-pointer
          onClick={() => router.back()}
          className="flex gap-4 items-center text-deepblue"
        >
          <Image src="/arrow-back.svg" alt="icon" width={18} height={14} />
          Back
        </button>
        <div className="flex justify-between items-center">
          <h1 className="capitalize text-[34px] font-bold text-deepblue">
            challenges details
          </h1>
          <div className="flex gap-6">
            <Link href={`/challenges/${id}/edit`}>
              <Image src="/edit-detail.svg" alt="edit" width={40} height={40} />
            </Link>
            <button onClick={() => setShowDeleteModal(true)}>
              <Image
                src="/delete-detail.svg"
                alt="edit"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="py-4 mt-4">
        {/**tab */}
        <div className="flex space-x-4 border-b pl-4 ">
          {["overview", "participants", "analytics", "post"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 text-sm font-medium capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {/* {tab.charAt(0).toUpperCase() + tab.slice(1)} */}
              {tab}
            </button>
          ))}
        </div>
        {/**content */}
        <div className="mt-4">
          {activeTab === "overview" && (
            <OverviewTab
              adminChallenge={adminChallenge}
              getStatusBadge={getStatusBadge}
            />
          )}

          {activeTab === "participants" && (
            <ParticipantsTab adminChallenge={adminChallenge} />
          )}

          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "post" && <PostsTab />}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          deleteObject={adminChallenge.name || "this challenge"}
          message="Are you sure you want to delete this challenge? This action cannot be undone."
          isLoading={deleteModalMutation.isPending}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default page;
