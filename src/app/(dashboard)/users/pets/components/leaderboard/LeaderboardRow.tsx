import Image from "next/image"
import { LeaderboardPet } from "@/types/leaderboard"

interface Props {
  pet: LeaderboardPet
}

export default function LeaderboardRow({ pet }: Props) {

  return (
    <tr className="border-t hover:bg-gray-50">

      <td className="px-4 py-3 font-bold  flex items-center gap-3">

        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
          {pet.rank}
        </div>

        <Image
          src={pet.photo || "/petmock.svg"}
          alt={pet.name}
          width={32}
          height={32}
          className="rounded-full"
        />

        <div className="flex flex-col ">
          <span className="font-medium text-deepblue">{pet.name}</span>
          <span className="text-xs text-gray-500">
            {pet.ownerName}
          </span>
        </div>

      </td>

      <td className="px-4 py-3 capitalize">{pet.breed}</td>

      <td className="px-4 py-3">{pet.points}</td>

      <td className="px-8 py-3">{pet.challengesCompleted}</td>

    </tr>
  )
}