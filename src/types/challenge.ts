/* =========================
   Root API Response
========================= */

export interface GetAdminChallengeByIdResponse {
  success: boolean;
  data: {
    adminChallenge: AdminChallenge;
  };
}

/* =========================
   Admin Challenge
========================= */

export interface AdminChallenge {
  _id: string;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  __v: number;

  basicInfo: BasicInfo;
  goalsAndMetrics: GoalsAndMetrics;
  scheduleAndDuration: ScheduleAndDuration;
  rewards: AdminRewards;

  createdBy: AdminUser;
  publishedChallenge: PublishedChallenge;
}

/* =========================
   Basic Info
========================= */

export interface BasicInfo {
  name: string;
  type: "walk" | "run" | "cycle" | string;
  description: string;
  primaryHashtags: string[];
  coverImage: string | null;
  coverImagePublicId: string;
}

/* =========================
   Goals & Metrics
========================= */

export interface GoalsAndMetrics {
  selectedGoalTypes: GoalType[];

  distanceGoals: DistanceGoal[];
  frequencyGoals: FrequencyGoal[];
  timeGoals: TimeGoal[];
  streakGoals: StreakGoal[];
  photoGoals: PhotoGoal[];
}

export type GoalType =
  | "distance"
  | "frequency"
  | "time"
  | "streak"
  | "photo";

/* ---- Distance Goals ---- */

export interface DistanceGoal {
  _id: string;
  configurationType: "total_distance" | string;
  config: DistanceGoalConfig;
}

export interface DistanceGoalConfig {
  targetDistance: number;
  numberOfWalks: number;
  duration: number;
}

/* ---- Empty goal placeholders (future-safe) ---- */

export interface FrequencyGoal {}
export interface TimeGoal {}
export interface StreakGoal {}
export interface PhotoGoal {}

/* =========================
   Schedule & Duration
========================= */

export interface ScheduleAndDuration {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  recurrenceType: "daily" | "weekly" | "monthly" | string;
  challengeDays: string[];
}

/* =========================
   Rewards (Admin Side)
========================= */

export interface AdminRewards {
  achievementBadge: AchievementBadge;
  participation: ParticipationRules;
  segmentCriteria: SegmentCriteria;
  points: number;
}

export interface AchievementBadge {
  image: string;
  imagePublicId: string;
}

export interface ParticipationRules {
  whoCanParticipate: "users_with_min_fit_score" | string;
}

export interface SegmentCriteria {
  petFitScoreRange: "all" | string;
  specificPetTypes: string[];
}

/* =========================
   Admin User
========================= */

export interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
}

/* =========================
   Published Challenge
========================= */

export interface PublishedChallenge {
  _id: string;
  id: string;

  title: string;
  description: string;
  type: string;
  challengeCategory: "featured" | string;
  difficulty: "beginner" | "intermediate" | "advanced";
  status: "active" | "completed" | "upcoming";

  startDate: string;
  endDate: string;
  maxParticipants: number;
  createdBy: string;

  image: string;
  petTypes: string[];
  isPublic: boolean;
  searchTags: string[];

  duration: ChallengeDuration;
  goals: PublishedGoals;
  rewards: PublishedRewards;
  participationRules: ParticipationRules;
  location: Location;
  geoLocation: GeoLocation;

  participants: Participant[];

  createdAt: string;
  updatedAt: string;
  __v: number;

  participantCount: number;
  completedParticipants: number;
  isActive: boolean;
  daysLeft: number;
  daysUntilStart: number;
  currentStatus: "active" | "completed" | string;
  progressPercentage: number;
}

/* =========================
   Published Sub-Structures
========================= */

export interface ChallengeDuration {
  value: number;
  unit: "days" | "weeks" | "months";
}

export interface PublishedGoals {
  dailyGoal: DailyGoal;
  totalDistance: number;
  totalDuration: number;
  frequency: number;
}

export interface DailyGoal {
  distance: number;
  duration: number;
  description: string;
}

export interface PublishedRewards {
  points: number;
  badges: string[];
  description: string;
}

export interface Location {
  radius: number;
}

export interface GeoLocation {
  type: "Point";
  coordinates: number[];
}

/* =========================
   Participants
========================= */

export interface Participant {
  _id: string;
  id: string;

  user: string;
  status: "active" | "completed" | "withdrawn";
  pets: string[];

  joinedAt: string;

  progress: ParticipantProgress;
  joinLocation: JoinLocation;
}

export interface ParticipantProgress {
  currentDay: number;
  completedDays: number;
  totalDistance: number;
  totalDuration: number;
  activities: unknown[];
}

export interface JoinLocation {
  timestamp: string;
}
