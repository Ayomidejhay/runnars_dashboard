import api from "@/lib/api"
import { LeaderboardFilters } from "@/types/leaderboard"

export async function fetchLeaderboard(filters: LeaderboardFilters) {

  const params = new URLSearchParams()

  params.append("type", filters.type)
  params.append("page", filters.page.toString())
  params.append("limit", filters.limit.toString())

  if (filters.type === "breed" && filters.breed) {
    params.append("breed", filters.breed)
  }

  try {

    const response = await api.get(
      `/api/admin/users/all/leaderboard?${params.toString()}`
    )

    return response.data

  } catch (error: any) {

    throw new Error(
      error?.response?.data?.message || "Failed to fetch leaderboard"
    )

  }
}