export interface BackendPet {
  _id: string
  owner: {
    _id: string
    fullName: string
    profilePicture: string
  }
  name: string
  photo: string
  petType: string
  breed: string
  ageGroup: string
  weight: number
  totalPoints: number
  challengesCompleted: number
}

export interface LeaderboardPet {
  id: string
  name: string
  photo: string
  ownerName: string
  ownerAvatar: string
  breed: string
  points: number
  challengesCompleted: number
  rank: number
}

export interface LeaderboardResponse {
  leaderboard: BackendPet[]
  userPetRank: number
  totalPets: number
  totalPages: number
  currentPage: number
  period: string
}

export interface LeaderboardFilters {
  type: "global" | "breed" | "challenge"
  page: number
  limit: number
  breed?: string
}