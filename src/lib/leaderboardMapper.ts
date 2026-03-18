import { BackendPet, LeaderboardPet } from "@/types/leaderboard"

export function mapLeaderboard(
  pets: BackendPet[],
  currentPage: number,
  limit: number
): LeaderboardPet[] {

  return pets.map((pet, index) => ({
    id: pet._id,
    name: pet.name,
    avatar: pet.photo || "/petmock.svg",
    photo: pet.photo || "/petmock.svg",
    ownerName: pet.owner.fullName,
    ownerAvatar: pet.owner.profilePicture || "/avatars/default.png",
    breed: pet.breed,
    points: pet.totalPoints,
    challengesCompleted: pet.challengesCompleted,
    rank: (currentPage - 1) * limit + index + 1
  }))

}