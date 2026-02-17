"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import { mockPetChallenges } from "@/mockdata";
import { Search } from "lucide-react";
import Link from "next/link";
import { AdminChallenge } from "@/types/challenge";
import { useChallengeUsers } from "@/hooks/useUsers";
import { useChallengeOverview } from "@/hooks/useAnalyticsChallenge";

interface Participant {
  id: string;
  userId: string;
  joinedAt: string;
  status: string;
  completionRate?: number;
}

interface Pet {
  _id: string;
  name: string;
  breed: string;
  petType: string;
  picture?: string;
}

interface ChallengeUser {
  id: string;
  basicInfo: {
    fullName?: string;
    email?: string;
    profilePicture?: string;
  };
  pets: Pet[];
}

interface EnrichedParticipant extends Participant {
  userDetails: ChallengeUser | null;
}

// interface UserDetails {
//   id: string;
//   [key: string]: any;
// }

interface ParticipantsTabProps {
  adminChallenge: AdminChallenge;

}

export default function ParticipantsTab({
  adminChallenge
}: ParticipantsTabProps) {
  const { id } = useParams();
   
      const { data, error } = useChallengeOverview(
        id as string,
        // active,
      );

  // const participantIds = adminChallenge.publishedChallenge.participants.map(
  // (p) => p.user
      const participantIds = data?.data?.participantStatistics.map(
    (p:any) => p.userId

);
const uniqueIds = Array.from(new Set(participantIds));

  const participants: Participant[] =
    // adminChallenge.publishedChallenge.participants ?? [];
    data?.data?.participantStatistics ?? [];

 
   const userIds = useMemo(
    () => (participants || []).map((p) => p.userId),
    [participants]
  );
  const { data: usersData = [], isLoading } = useChallengeUsers(userIds);



 const userMap = useMemo<Record<string, ChallengeUser>>(() => {
    const map: Record<string, ChallengeUser> = {};

    usersData.forEach((user) => {
      map[user.id] = user;
    });

    return map;
  }, [usersData]);


  // Enrich participants with user details
  // const enrichedParticipants = adminChallenge.publishedChallenge.participants.map((p) => ({
  //   ...p,
  //   userDetails: userMap[p.user] || null,
  // }));
   const enrichedParticipants: EnrichedParticipant[] = useMemo(
    () =>
      (participants ?? []).map((p) => ({
        ...p,
        userDetails: userMap[p.userId] ?? null,
      })),
    [participants, userMap]
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

 

   // Filtering
  // const filteredParticipants = enrichedParticipants.filter((p) => {
  //   const matchesSearch =
  //     p.userDetails?.fullName
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase()) ?? false;
  //   const matchesStatus =
  //     statusFilter === "all" || p.status === statusFilter;
  //   return matchesSearch && matchesStatus;
  // });

  const formatPets = (pets?: Pet[]) => {
  if (!pets || pets.length === 0) return "";

  return pets
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((pet) => `${pet.name} (${pet.breed})`)
    .join(", ");
};

   const filteredParticipants = useMemo(() => {
    return enrichedParticipants.filter((p) => {
      const fullName =
        p.userDetails?.basicInfo?.fullName?.toLowerCase() ?? "";

      const matchesSearch = fullName.includes(
        searchTerm.toLowerCase()
      );

      const matchesStatus =
        statusFilter === "all" || p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enrichedParticipants, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredParticipants.length / rowsPerPage);

  // const paginatedParticipants = filteredParticipants.slice(
  //   (currentPage - 1) * rowsPerPage,
  //   currentPage * rowsPerPage,
  // );

  const paginatedParticipants = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredParticipants.slice(
      start,
      start + rowsPerPage
    );
  }, [filteredParticipants, currentPage]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-600";
      case "completed":
        return "bg-blue-100 text-blue-600";
      case "scheduled":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  function formatJoinedDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short", // May
      day: "numeric", // 10
      hour: "numeric", // 10
      minute: "2-digit", // 45
      hour12: true, // AM
    });
  }

     if (isLoading) return <p>Loading participants...</p>;
     if (!participants.length) return <p>No participants found.</p>;
  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Participants",
            value: data?.data?.participantMetrics?.totalParticipants || 0,
            subtitle: "",
          },
          {
            title: "Active Participants",
            value: data?.data?.participantMetrics?.activeParticipants || 0,
            subtitle: "Currently active",
          },
          {
            title: "Completed Challenge",
            value: data?.data?.participantMetrics?.completedParticipants || 0,
            subtitle: "Marked complete",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-1 mt-6"
          >
            <div className="flex justify-between items-center text-sm text-gray">
              <span>{item.title}</span>
            </div>
            <div className="text-2xl font-bold text-deepblue">{item.value}</div>
            <p className="text-xs text-[#40B773] flex items-center">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>

      {(
        // Filters
        <div className="bg-white p-4 rounded mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 capitalize">
              All Participants
            </h2>
            <div className="flex flex-wrap gap-4">
              <div className="relative h-10 rounded-[8px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search participants..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-2 border rounded-[8px] w-[240px] text-sm"
                />
              </div>

              {/* Status Filter */}
              <div className="relative w-[87px]">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border px-3 text-xs w-full rounded-[32px] appearance-none h-10"
                >
                  <option value="all">Status</option>
                  <option value="active">Active</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                </select>

                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 rounded-md">
                <tr>
                  <th className="px-4 py-2">User Name</th>
                  <th className="px-4 py-2">Joined Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Progress</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedParticipants.length > 0 ? (
                  paginatedParticipants.map((user) => (
                    <tr key={user.userId} className="border-b">
                      <td className="px-4 py-2 font-bold text-deepblue">
                        <div className="flex items-center gap-2">
                          <Image
                            src={user.userDetails?.basicInfo?.profilePicture || "/profile-icon.svg"}
                            alt={user.userDetails?.basicInfo?.fullName || "user"}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="flex flex-col gap-1">
                            <p>{user.userDetails?.basicInfo?.fullName}</p>
                            <p className="text-xs text-[#8E98A8] font-normal">
                              {user.userDetails?.basicInfo?.email || ""} 
                              
                            </p>
                            <p className="text-[10px] text-[#8E98A8] font-normal">{formatPets(user.userDetails?.pets)} </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-bold text-deepblue">
                        {formatJoinedDate(user.joinedAt)}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                            user.status,
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 flex items-center gap-2">
                        <div className="w-[120px] h-[6px] bg-gray-200 rounded-full overflow-hidden mt-1">
                          <div
                            className="bg-brightblue h-full"
                            // style={{ width: `${user.completionRate}%` }}
                          ></div>
                        </div>
                        {/* <p>{user.completionRate}%</p> */}
                      </td>

                      <td className="px-4 py-2 text-xs">
                        <Link
                          href={`/users/${user.userId}`}
                          className="w-[85px] h-[36px] rounded-full border bg-transparent border-[#E1E1E1] flex items-center justify-center cursor-pointer"
                        >
                          View details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">
                      No participants found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <label htmlFor="rows" className="text-sm text-gray-600">
                  Rows per page:
                </label>
                <select
                  id="rows"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="text-sm font-bold text-deepblue px-2 py-1"
                >
                  {[5, 10, 20].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <Image src="/prev.svg" alt="prev" height={32} width={32} />
                </button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  <Image src="/next.svg" alt="next" height={32} width={32} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
