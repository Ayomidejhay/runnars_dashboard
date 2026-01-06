"use client";

import Image from "next/image";
import Link from "next/link";
import { mockPetChallenges } from "@/mockdata";
import { communityMockData } from "@/mockdata";
import { useRef, useState } from "react";
import PaginationControls from "./components/PaginationControls";
import DropdownMenu from "./components/DropdownMenu";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [challengePage, setChallengePage] = useState(1);
  const [communityPage, setCommunityPage] = useState(1);
  const [challengeRowsPerPage, setChallengeRowsPerPage] = useState(5);
  const [communityRowsPerPage, setCommunityRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any | null>(null);

  const [openRow, setOpenRow] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    buttonHeight: number;
  } | null>(null);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Mock list of pending admin requests
  const pendingAdmins = [
    { id: 1, name: "John Doe", image: "/image.jpg" },
    { id: 2, name: "Jane Smith", image: "/image.jpg" },
    { id: 3, name: "Samuel Johnson", image: "/image.jpg" },
    { id: 4, name: "Emily Davis", image: "/image.jpg" },
  ];

  const filteredChallenges = mockPetChallenges.filter((challenge) =>
    challenge.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalChallengePages = Math.ceil(
    filteredChallenges.length / challengeRowsPerPage
  );
  const paginatedChallenges = filteredChallenges.slice(
    (challengePage - 1) * challengeRowsPerPage,
    challengePage * challengeRowsPerPage
  );

  const totalCommunityPages = Math.ceil(
    communityMockData.length / communityRowsPerPage
  );
  const paginatedCommunity = communityMockData.slice(
    (communityPage - 1) * communityRowsPerPage,
    communityPage * communityRowsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#E8F1FD] text-[#1570EF]";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getChallengeBadge = (type: string) => {
    switch (type) {
      case "walk":
        return "bg-[#E8F1FD] text-[#1570EF]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleToggleMenu = (challengeId: number, index: number) => {
    if (openRow === challengeId) {
      setOpenRow(null);
      return;
    }

    const btn = buttonRefs.current[index];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const dropdownHeight = 150;
      const spaceBelow = window.innerHeight - rect.bottom;

      const shouldFlip = spaceBelow < dropdownHeight;

      setMenuPosition({
        top: shouldFlip
          ? rect.top + window.scrollY - dropdownHeight
          : rect.top + window.scrollY + rect.height,
        left: rect.left + window.scrollX,
        buttonHeight: rect.height,
      });
    }

    setOpenRow(challengeId);
  };

  return (
    <div className="px-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-[34px] font-bold text-deepblue">
          dashboard
        </h1>
        <div className="w-[163px] h-[44px] text-white bg-brightblue rounded-[32px] flex items-center justify-center">
          <Link
            href="/challenges/new-challenge"
            className="text-[14px] flex items-center gap-[2px] font-bold"
          >
            <Image src="/add.svg" alt="add" width={24} height={24} />
            New Challenge
          </Link>
        </div>
      </div>

      {/* Alert Box */}
      <div className="mt-6 w-full h-[134px] bg-[#ECF1F9] rounded-[16px] p-6 flex flex-col gap-[10px]">
        <p className="font-bold text-black text-[18px]">
          Review Admin Request
        </p>
        <p className="text-sm text-[#8E98A8]">
          Review pending community admin request
        </p>
        <div
          onClick={() => setShowModal(true)}
          className="text-[14px] text-brightblue w-[132px] flex items-center cursor-pointer"
        >
          <p>Review requests</p>
          <Image
            src="/arrow-right.svg"
            alt="arrow-right"
            width={16}
            height={16}
            className="inline-block ml-2"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Total Users",
            value: "12,845",
            subtitle: "+12% from last month",
          },
          {
            title: "Active Challenges",
            value: 26,
            subtitle: "4 new this week",
          },
          {
            title: "Total Communities",
            value: 400,
            subtitle: "+5% from last month",
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

      {/* Challenges Table */}
      <div className="p-4 mt-4 bg-white rounded-[10px]">
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-[16px] text-deepblue capitalize font-bold">
            Featured Challenges
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-tableheader font-normal text-tableheadertext rounded-md">
              <tr className="border-none">
                <th className="px-4 py-2 font-normal">Challenge Name</th>
                <th className="px-4 py-2 font-normal">Location</th>
                <th className="px-4 py-2 font-normal">Participants</th>
                <th className="px-4 py-2 font-normal">Type</th>
                <th className="px-4 py-2 font-normal">Status</th>
                <th className="px-4 py-2 font-normal">Completion Rate</th>
                <th className="px-4 py-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedChallenges.length > 0 ? (
                paginatedChallenges.map((challenge, index) => (
                  <tr
                    key={challenge.id}
                    className="border-b border-border hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 font-bold text-deepblue">
                      <div className="flex gap-1.5 items-center">
                        <Image
                          src="/image.jpg"
                          alt={challenge.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {challenge.name}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-deepblue font-bold">
                      {challenge.location}
                    </td>
                    <td className="px-4 py-4 text-deepblue font-bold">
                      {challenge.participants}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-2 rounded-full text-xs font-semibold capitalize ${getChallengeBadge(
                          challenge.type
                        )}`}
                      >
                        {challenge.type}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-2 rounded-full text-xs font-semibold capitalize ${getStatusBadge(
                          challenge.status
                        )}`}
                      >
                        {challenge.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 flex items-center gap-2">
                      <div className="w-[120px] h-[6px] bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div
                          className="bg-brightblue h-full"
                          style={{ width: `${challenge.completionRate}%` }}
                        ></div>
                      </div>
                      <p>{challenge.completionRate}%</p>
                    </td>
                    <td className="relative px-4 py-4">
                      <button
                        ref={(el) => {
                          buttonRefs.current[index] = el;
                        }}
                        onClick={() => handleToggleMenu(challenge.id, index)}
                      >
                        <Image
                          src="/Button-table.svg"
                          alt="button"
                          width={24}
                          height={24}
                          className="cursor-pointer"
                        />
                      </button>

                      {openRow === challenge.id && (
                        <DropdownMenu
                          isOpen={openRow === challenge.id}
                          position={menuPosition}
                          onClose={() => setOpenRow(null)}
                          items={[
                            {
                              label: "See Details",
                              icon: "/eye.svg",
                              href: `/challenges/${challenge.id}`,
                            },
                            {
                              label: "Edit",
                              icon: "/edit.svg",
                              onClick: () => console.log("Edit", challenge.id),
                            },
                            {
                              label: "Delete",
                              icon: "/user.svg",
                              danger: true,
                              onClick: () =>
                                console.log("Delete", challenge.id),
                            },
                          ]}
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No challenges found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <PaginationControls
          currentPage={challengePage}
          totalPages={totalChallengePages}
          rowsPerPage={challengeRowsPerPage}
          onPageChange={setChallengePage}
          onRowsPerPageChange={(rows) => {
            setChallengeRowsPerPage(rows);
            setChallengePage(1);
          }}
        />
      </div>

      {/* Community Table */}
      <div className="p-4 mt-4 bg-white rounded-[10px]">
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-[16px] text-deepblue capitalize font-bold">
            Recent Community Activity
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-tableheader font-normal text-tableheadertext rounded-md">
              <tr className="border-none">
                <th className="px-4 py-2 font-normal">Community</th>
                <th className="px-4 py-2 font-normal">Members</th>
                <th className="px-4 py-2 font-normal">Activity</th>
                <th className="px-4 py-2 font-normal">Timestamp</th>
                <th className="px-4 py-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCommunity.length > 0 ? (
                paginatedCommunity.map((community) => (
                  <tr
                    key={community.id}
                    className="border-b border-border hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 font-bold text-deepblue">
                      <div className="flex gap-1.5 items-center">
                        <Image
                          src="/image.jpg"
                          alt={community.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {community.name}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-deepblue font-bold">
                      {community.members}
                    </td>
                    <td className="px-4 py-4 text-deepblue font-bold">
                      {community.activity}
                    </td>
                    <td className="px-4 py-4 text-deepblue font-bold">
                      10 minutes ago
                    </td>
                    <td className="relative px-4 py-4 flex items-center gap-2">
                      <button className="w-[85px] h-[36px] rounded-full border bg-transparent border-[#E1E1E1] flex items-center justify-center cursor-pointer">
                        View
                      </button>
                      <button
                        className={`w-[85px] h-[36px] rounded-full border ${
                          community.activity === "Content reported"
                            ? "border-0 text-white bg-[#FF3729]"
                            : "border-[#E1E1E1] bg-transparent"
                        } flex items-center justify-center cursor-pointer`}
                      >
                        {community.activity === "Content reported"
                          ? "Review"
                          : "Manage"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No community data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <PaginationControls
          currentPage={communityPage}
          totalPages={totalCommunityPages}
          rowsPerPage={communityRowsPerPage}
          onPageChange={setCommunityPage}
          onRowsPerPageChange={(rows) => {
            setCommunityRowsPerPage(rows);
            setCommunityPage(1);
          }}
        />
      </div>

      {/* MODAL SECTION */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-white w-[588px] max-w-full max-h-[504px] rounded-[12px] shadow-lg p-6 relative flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              {selectedAdmin ? (
                <div className="flex items-center gap-4">
                  <button
                  onClick={() => setSelectedAdmin(null)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <Image
                    src="/arrow-back.svg"
                    alt="back"
                    width={24}
                    height={24}
                  />
                  
                </button>
                <span className="font-bold text-2xl text-deepblue">Review Details</span>
                </div>
              ) : (
                <h2 className="text-2xl font-bold text-deepblue">
                  Review Admin Request
                </h2>
              )}

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedAdmin(null);
                }}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <Image src="/close.svg" alt="close" width={28} height={28} />
              </button>
            </div>

            {/* Conditional Content */}
            {!selectedAdmin ? (
              <div className="divide-y divide-[#E1E1E1] overflow-y-auto flex-1">
                {pendingAdmins.map((admin) => (
                  <div
                    key={admin.id}
                    className="flex justify-between items-center py-4"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={admin.image}
                        alt={admin.name}
                        width={40}
                        height={40}
                        className="rounded-full h-10 w-10 object-cover border"
                      />
                      <div>
                        <p className="font-semibold text-deepblue">
                          {admin.name}
                        </p>
                        <p className="text-xs text-[#8E98A8]">@SarahM</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedAdmin(admin)}
                      className="px-4 py-2 bg-transparent text-[#1570EF] border border-[#1570EF] rounded-full text-sm hover:bg-[#1570EF]/10 transition"
                    >
                      Review
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <ReviewDetails
                admin={selectedAdmin}
                onBack={() => setSelectedAdmin(null)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------
   REVIEW DETAILS COMPONENT
----------------------------- */
function ReviewDetails({ admin, onBack }: any) {
  const [readMore, setReadMore] = useState(false);

  const description =
    "This admin request is from a highly active community member who has led multiple initiatives to improve engagement and content quality within the platform. Their proposal includes organizing weekly events, moderating discussions, and handling reported content efficiently.";

  const shortText = description.split(" ").slice(0, 20).join(" ") + "...";

  return (
    <div className="flex flex-col flex-1 overflow-y-auto gap-4">
      {/* Profile Section */}
      {/* <div className="flex items-center gap-4 mb-4">
        <Image
          src={admin.image}
          alt={admin.name}
          width={60}
          height={60}
          className="rounded-full border object-cover"
        />
        <div>
          <p className="text-lg font-bold text-deepblue">{admin.name}</p>
          <p className="text-sm text-[#8E98A8]">@SarahM</p>
        </div>
      </div> */}

      {/* Description */}
      <div className="border border-border py-4 px-6 rounded-2xl ">
        <h3 className="font-bold text-deepblue mb-2 text-[16px]">Description</h3>
        <p className="text-[#8E98A8] text-sm leading-relaxed">
          {readMore ? description : shortText}
        </p>
        {description.split(" ").length > 25 && (
          <button
            onClick={() => setReadMore(!readMore)}
            className="text-[#1570EF] text-sm mt-1"
          >
            {readMore ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      {/* Location */}
      <div className="border border-border py-4 px-6 rounded-2xl ">
        <div>
          <h3 className="font-bold text-deepblue mb-2 text-[16px]">Location</h3>
        <p className="text-[#8E98A8] text-sm">Lakeside Dog Park - South Entrance</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex  justify-end gap-4">
        <button className="px-6 py-2  bg-[#40B773] text-white rounded-full text-sm">
          Accept
        </button>
        <button
          onClick={onBack}
          className="px-6 py-2  bg-[#FF3729] rounded-full text-white text-sm"
        >
          Decline
        </button>
        
      </div>
    </div>
  );
}