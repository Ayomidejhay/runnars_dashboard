import { LeaderboardPet } from "@/types/leaderboard"
import LeaderboardRow from "./LeaderboardRow"

interface Props {
  pets: LeaderboardPet[]
}

export default function LeaderboardTable({ pets }: Props) {

  return (
    <div className="overflow-x-auto bg-white rounded">

      <table className="w-full text-sm">

        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-3">Pet</th>
            <th className="px-4 py-3">Breed</th>
            <th className="px-4 py-3">Points</th>
            <th className="px-4 py-3">Challenges</th>
          </tr>
        </thead>

        <tbody>
          {pets.map((pet) => (
            <LeaderboardRow key={pet.id} pet={pet} />
          ))}
        </tbody>

      </table>

    </div>
  )
}