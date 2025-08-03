export type ChallengeStatus =
  | "active"
  | "scheduled"
  | "completed"
  | "draft"
  ;

export interface ChallengeReward {
  completionPoints: number;
  achievementBadge: string;
}

export interface ChallengeUser {
  id: string;
  name: string;
  joinedAt: string; // ISO date string
  status: ChallengeStatus ;
  completionRate: number;
}

export interface PetChallenge {
  id: number;
  name: string;
  location: string;
  participants: number;
  type: string;
  category: string;
  status?: ChallengeStatus;
  is_active: boolean;
  is_featured: boolean;
  community_id?: number;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  completionRate: number;
  description: string;
  primaryGoal: string;
  totalDistance: string | null;
  hashtags: string[];
  rewards: ChallengeReward;
  eligibleParticipants: string;
  users: ChallengeUser[];
}

export type Community = {
  id: string;
  name: string;
  creator: string;
  createdDate: string; // ISO date string (e.g. "2023-04-12")
  members: number;
  location: string;
  status: "active" | "inactive";
};