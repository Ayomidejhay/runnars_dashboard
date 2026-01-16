import { create } from "zustand";

// ----------------- Goal Type -----------------
type Goal = {
  selectedGoalConfiguration: string;
};

// ----------------- Main State Types -----------------
type BasicInfo = {
  name: string;
  type: string;
  description: string;
  coverImage: File | null;
  primaryHashtags: string[];
};

type ActiveTab = "distance" | "frequency" | "time" | "streak" | "photo";

type GoalsAndMetrics = {
  activeTab: ActiveTab;
  distance: Goal;
  frequency: Goal;
  time: Goal;
  streak: Goal;
  photo: Goal;
};

type ScheduleAndDuration = {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  recurrenceType: string;
  selectedDay: string;
};

type Rewards = {
  points: number | "";
  whoCanParticipate: string;
  segmentCriteria?: {
    petFitScoreRange?: string;
    specificPetTypes?: string[];
  };
};

type ChallengeBuilderErrors = {
  basicInfo?: Partial<{
    name: string;
    type: string;
    description: string;
    coverImage: string;
    primaryHashtags: string;
  }>;
  goalsAndMetrics?: string;
  scheduleAndDuration?: string;
  rewards?: string;
};

// ----------------- Store -----------------
type ChallengeBuilderState = {
  basicInfo: BasicInfo;
  goalsAndMetrics: GoalsAndMetrics;
  scheduleAndDuration: ScheduleAndDuration;
  rewards: Rewards;
  errors: ChallengeBuilderErrors;

  setActiveTab: (tab: ActiveTab) => void;
  setGoalsAndMetrics: (data: Partial<GoalsAndMetrics>) => void;
  setErrors: (data: Partial<ChallengeBuilderErrors>) => void;
  reset: () => void;
};

export const useChallengeBuilderStore = create<ChallengeBuilderState>((set) => ({
  basicInfo: {
    name: "",
    type: "",
    description: "",
    coverImage: null,
    primaryHashtags: [],
  },

  goalsAndMetrics: {
    activeTab: "distance",
    distance: { selectedGoalConfiguration: "" },
    frequency: { selectedGoalConfiguration: "" },
    time: { selectedGoalConfiguration: "" },
    streak: { selectedGoalConfiguration: "" },
    photo: { selectedGoalConfiguration: "" },
  },

  scheduleAndDuration: {
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    recurrenceType: "",
    selectedDay: "",
  },

  rewards: {
    points: "",
    whoCanParticipate: "all_users",
    segmentCriteria: {
      petFitScoreRange: "all",
      specificPetTypes: [],
    },
  },

  errors: {},

  setActiveTab: (tab) =>
    set((state) => ({
      goalsAndMetrics: {
        ...state.goalsAndMetrics,
        activeTab: tab,
      },
    })),

  setGoalsAndMetrics: (data) =>
    set((state) => ({
      goalsAndMetrics: {
        ...state.goalsAndMetrics,
        ...data,
      },
    })),

  setErrors: (data) =>
    set((state) => ({
      errors: {
        ...state.errors,
        ...data,
      },
    })),

  reset: () =>
    set({
      basicInfo: {
        name: "",
        type: "",
        description: "",
        coverImage: null,
        primaryHashtags: [],
      },
      goalsAndMetrics: {
        activeTab: "distance",
        distance: { selectedGoalConfiguration: "" },
        frequency: { selectedGoalConfiguration: "" },
        time: { selectedGoalConfiguration: "" },
        streak: { selectedGoalConfiguration: "" },
        photo: { selectedGoalConfiguration: "" },
      },
      scheduleAndDuration: {
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        recurrenceType: "",
        selectedDay: "",
      },
      rewards: {
        points: "",
        whoCanParticipate: "all_users",
        segmentCriteria: {
          petFitScoreRange: "all",
          specificPetTypes: [],
        },
      },
      errors: {},
    }),
}));
