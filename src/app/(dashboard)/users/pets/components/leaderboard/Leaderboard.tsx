"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { fetchLeaderboard } from "@/hooks/useLeaderboard"
import { mapLeaderboard } from "@/lib/leaderboardMapper"

import LeaderboardFilter from "./LeaderboardFilter"
import LeaderboardTable from "./LeaderboardTable"
import LeaderboardPagination from "./leaderboardPagination"

import { LeaderboardFilters as Filters } from "@/types/leaderboard"

export default function Leaderboard() {

  const [filters, setFilters] = useState<Filters>({
    type: "global",
    page: 1,
    limit: 10
  })

  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard", filters],
    queryFn: () => fetchLeaderboard(filters)
  })

  const pets = mapLeaderboard(
    data?.data?.leaderboard || [],
    data?.data?.currentPage || 1,
    filters.limit
  )

  const totalPages = data?.data?.totalPages || 1

  if (isLoading) {
    return <div>Loading leaderboard...</div>
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between my-2">
        <h2 className="text-lg font-semibold text-gray-800 capitalize">Leaderboard</h2>
        <LeaderboardFilter
        filters={filters}
        setFilters={setFilters}
      />
      </div>

      <LeaderboardTable pets={pets} />

      <LeaderboardPagination
        filters={filters}
        totalPages={totalPages}
        setFilters={setFilters}
      />

    </div>
  )
}