"use client";

import { LeaderboardFilters } from "@/types/leaderboard";

interface Props {
  filters: LeaderboardFilters;
  setFilters: (filters: LeaderboardFilters) => void;
}

export default function LeaderboardFilter({ filters, setFilters }: Props) {
  return (
    <div className="flex items-center gap-4">
      <select
        value={filters.type}
        onChange={(e) =>
          setFilters({
            ...filters,
            type: e.target.value as any,
            page: 1,
          })
        }
        className="h-10 px-4 border rounded-full text-sm"
      >
        <option value="global">Global ranking</option>
        <option value="breed">Breed ranking</option>
        <option value="challenge">Challenges</option>
      </select>

      {filters.type === "breed" && (
        <select
          value={filters.breed || "all"}
          onChange={(e) => {
            const value = e.target.value;

            setFilters({
              ...filters,
              breed: value === "all" ? undefined : value,
              page: 1,
            });
          }}
          className="h-10 px-4 border rounded-full text-sm"
        >
          <option value="all">Breed</option>
          <option value="Golden Retriever">Golden Retriever</option>
          <option value="Bulldog">Bulldog</option>
          <option value="Labrador Retriever">Labrador Retriever</option>
          <option value="Beagle">Beagle</option>
          <option value="Rottweiler">Rottweiler</option>
          <option value="German Shepherd">German Shepherd</option>
          <option value="Poodle">Poodle</option>
          <option value="Other">Other</option>
        </select>
      )}
    </div>
  );
}
