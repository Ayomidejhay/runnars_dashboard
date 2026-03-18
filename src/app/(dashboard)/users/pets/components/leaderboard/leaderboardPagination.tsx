import { LeaderboardFilters } from "@/types/leaderboard"
import Image from "next/image";

interface Props {
  filters: LeaderboardFilters
  totalPages: number
  setFilters: (filters: LeaderboardFilters) => void
}

export default function LeaderboardPagination({
  filters,
  totalPages,
  setFilters
}: Props) {

  return (
    <div className="flex items-center justify-between mt-6">

      <div>
        Page {filters.page} of {totalPages}
      </div>

      <div className="flex gap-2">

        <button
          disabled={filters.page === 1}
          onClick={() =>
            setFilters({ ...filters, page: filters.page - 1 })
          }
          className=""
        >
          <Image src="/prev.svg" alt="prev" height={32} width={32} />
        </button>

        <button
          disabled={filters.page === totalPages}
          onClick={() =>
            setFilters({ ...filters, page: filters.page + 1 })
          }
          className=""
        >
          <Image src="/next.svg" alt="next" height={32} width={32} />
        </button>

      </div>

    </div>
  )
}