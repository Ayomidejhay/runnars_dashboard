"use client";

import { useChallenges } from "@/hooks/usePets";
import { formatDateRange, getStatusColor } from "@/lib/format";
import Image from "next/image";

export default function ChallengesTable({ petId }: { petId: string }) {
  const { data, isLoading } = useChallenges(petId);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4">All challenges</h2>

      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-3">Challenge Name</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Goal</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((challenge) => (
            <tr key={challenge.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3 font-bold  flex items-center gap-3">
                <Image
                  src={challenge.image || "/petmock.svg"}
                  alt={challenge.title}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />

                {challenge.title}
              </td>

              <td className="px-4 py-3">
                {formatDateRange(challenge.startDate, challenge.endDate)}
              </td>

              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-600 capitalize">
                  {challenge.type}
                </span>
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(
                    challenge.status,
                  )}`}
                >
                  {challenge.status}
                </span>
              </td>

              <td className="px-4 py-3">{challenge.goal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
