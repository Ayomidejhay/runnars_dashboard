// import { create } from "zustand";

// /* =========================
//    Goal & Config Types
// ========================= */

// export type GoalType = "distance" | "frequency" | "time" | "streak" | "photo";

// export interface DistanceGoalConfig {
//   targetDistance?: number;
//   numberOfWalks?: number;
//   duration?: number;
//   distancePerWeek?: number;
//   walksPerWeek?: number;
//   distancePerWalk?: number;
//   startDistance?: number;
//   weeklyIncrease?: number;
//   durationWeeks?: number;
// }

// export interface FrequencyGoalConfig {
//   numberOfWalks?: number;
//   walksPerWeek?: number;
//   numberOfWeeks?: number;
//   selectedDay?: string;
//   timePeriod?: string;
//   timeRange?: {
//     start: string;
//     end: string;
//   };
//   walksPerPeriod?: number;
//   minimumWalkDuration?: number;
//   minDuration?: number;
//   selectedDays?: string[];
//   weeksCount?: number;
//   minimumDuration?: number;
//   minWalkDuration?: number;
// }

// export interface TimeGoalConfig {
//   totalWalkingTime?: number;
//   minimumWalkDuration?: number;
//   numberOfWalks?: number;
//   distancePerWalk?: number;
//   startDistance?: number;
//   weeklyIncrease?: number;
//   durationWeeks?: number;
//   timePerWeek?: number;
//   numberOfWeeks?: number;
// }

// export interface StreakGoalConfig {
//   consecutiveDaysTarget?: number;
//   allowJokerDay?: boolean;
//   minimumStreakTarget?: number;
//   minimumStreakValue?: number;
//   challengeDuration?: number;
//   numberOfStreaks?: number;
//   streakLength?: number;
//   restDays?: number;
//   selectedDays?: string[];
//   minimumWalkDuration?: number;
//   numberOfWeeks?: number;
// }

// export interface PhotoGoalConfig {
//   numberOfPhotos?: number;
//   challengeDuration?: number;
//   frequency?: string;
//   photoRequirements?: string[];
// }

// export interface GoalPayload<T> {
//   configurationType: string;
//   config: T;
// }

// /* =========================
//    State Interfaces
// ========================= */

// export interface BasicInfoState {
//   challengeName: string;
//   challengeType: string;
//   description: string;
//   primaryHashtags: string[];
//   coverImage?: File | null;
// }

// export interface GoalsAndMetricsState {
//   selectedGoalTypes: GoalType[];
//   activeTab: GoalType;

//   selectedGoalConfiguration: string;
//   selectedFrequencyConfiguration: string;
//   selectedTimeConfiguration: string;
//   selectedStreakConfiguration: string;
//   selectedPhotoConfiguration: string;

//   distanceGoal?: GoalPayload<DistanceGoalConfig>;
//   frequencyGoal?: GoalPayload<FrequencyGoalConfig>;
//   timeGoal?: GoalPayload<TimeGoalConfig>;
//   streakGoal?: GoalPayload<StreakGoalConfig>;
//   photoGoal?: GoalPayload<PhotoGoalConfig>;
// }

// export interface ScheduleState {
//   startDate: string;
//   startTime: string;
//   endDate: string;
//   endTime: string;
//   recurrenceType: string;
//   selectedDay: string[];
// }

// /* =========================
//    Rewards
// ========================= */

// export interface RewardState {
//   points: number;
//   participation: {
//     whoCanParticipate:
//       | "all_users"
//       | "new_users"
//       | "specific_pet_type"
//       | "users_with_min_fit_score";
//   };
//   segmentCriteria: {
//     petFitScoreRange: "all" | "low" | "medium" | "high";
//     specificPetTypes: string[];
//   };
//   rewardFile: File | null;
// }

// export interface RewardActions {
//   setRewards: (data: Partial<RewardState>) => void;
//   resetRewards: () => void;
// }

// /* =========================
//    Root Store Interface
// ========================= */

// export interface ChallengeBuilderState {
//   step: number;

//   basicInfo: BasicInfoState;
//   goalsAndMetrics: GoalsAndMetricsState;
//   schedule: ScheduleState;

//   rewards: RewardState;
//   rewardActions: RewardActions;

//   setStep: (step: number) => void;
//   setBasicInfo: (data: Partial<BasicInfoState>) => void;
//   setGoalType: (type: GoalType) => void;
//   setGoalsAndMetrics: (data: Partial<GoalsAndMetricsState>) => void;

//   setDistanceConfig: (payload: GoalPayload<DistanceGoalConfig>) => void;
//   setFrequencyConfig: (payload: GoalPayload<FrequencyGoalConfig>) => void;
//   setTimeConfig: (payload: GoalPayload<TimeGoalConfig>) => void;
//   setStreakConfig: (payload: GoalPayload<StreakGoalConfig>) => void;
//   setPhotoConfig: (payload: GoalPayload<PhotoGoalConfig>) => void;

//   setSchedule: (data: Partial<ScheduleState>) => void;

//   reset: () => void;
// }

// /* =========================
//    Initial Rewards
// ========================= */

// const initialRewardsState: RewardState = {
//   points: 0,
//   participation: { whoCanParticipate: "all_users" },
//   segmentCriteria: {
//     petFitScoreRange: "all",
//     specificPetTypes: [],
//   },
//   rewardFile: null,
// };

// /* =========================
//    Store Implementation
// ========================= */

// export const useChallengeBuilderStore = create<ChallengeBuilderState>(
//   (set) => ({
//     step: 1,

//     /* ---------- Basic Info ---------- */
//     basicInfo: {
//       challengeName: "",
//       challengeType: "",
//       description: "",
//       primaryHashtags: [],
//       coverImage: null,
//     },

//     /* ---------- Goals & Metrics ---------- */
//     goalsAndMetrics: {
//       selectedGoalTypes: ["distance"],
//       activeTab: "distance",
//       selectedGoalConfiguration: "",
//       selectedFrequencyConfiguration: "",
//       selectedTimeConfiguration: "",
//       selectedStreakConfiguration: "",
//       selectedPhotoConfiguration: "",
//     },

//     /* ---------- Schedule ---------- */
//     schedule: {
//       startDate: "",
//       startTime: "",
//       endDate: "",
//       endTime: "",
//       recurrenceType: "",
//       selectedDay: [],
//     },

//     /* ---------- Rewards ---------- */
//     rewards: initialRewardsState,

//     rewardActions: {
//       setRewards: (data) =>
//         set((state) => ({
//           rewards: { ...state.rewards, ...data },
//         })),
//       resetRewards: () =>
//         set(() => ({
//           rewards: initialRewardsState,
//         })),
//     },

//     /* ---------- Global Setters ---------- */
//     setStep: (step) => set({ step }),

//     setBasicInfo: (data) =>
//       set((state) => ({ basicInfo: { ...state.basicInfo, ...data } })),

//     setGoalType: (type) =>
//       set((state) => ({
//         goalsAndMetrics: {
//           ...state.goalsAndMetrics,
//           selectedGoalTypes: [type],
//           activeTab: type,
//         },
//       })),

//     setGoalsAndMetrics: (data) =>
//       set((state) => ({
//         goalsAndMetrics: { ...state.goalsAndMetrics, ...data },
//       })),

//     setDistanceConfig: (payload) =>
//       set((state) => ({
//         goalsAndMetrics: {
//           ...state.goalsAndMetrics,
//           distanceGoal: payload,
//           selectedGoalConfiguration: payload.configurationType,
//         },
//       })),

//     setFrequencyConfig: (payload) =>
//       set((state) => ({
//         goalsAndMetrics: {
//           ...state.goalsAndMetrics,
//           frequencyGoal: payload,
//           selectedFrequencyConfiguration: payload.configurationType,
//         },
//       })),

//     setTimeConfig: (payload) =>
//       set((state) => ({
//         goalsAndMetrics: {
//           ...state.goalsAndMetrics,
//           timeGoal: payload,
//           selectedTimeConfiguration: payload.configurationType,
//         },
//       })),

//     setStreakConfig: (payload) =>
//       set((state) => ({
//         goalsAndMetrics: {
//           ...state.goalsAndMetrics,
//           streakGoal: payload,
//           selectedStreakConfiguration: payload.configurationType,
//         },
//       })),

  
//     setPhotoConfig: (payload) =>
//       set((state) => ({
//         goalsAndMetrics: {
//           ...state.goalsAndMetrics,
//           photoGoal: {
//             ...state.goalsAndMetrics.photoGoal,
//             configurationType: payload.configurationType,
//             config: {
//               ...state.goalsAndMetrics.photoGoal?.config,
//               ...payload.config,
//             },
//           },
//         },
//       })),

//     setSchedule: (data) =>
//       set((state) => ({ schedule: { ...state.schedule, ...data } })),



//     /* ---------- Reset ---------- */
//     reset: () =>
//       set(() => ({
//         step: 1,
//         basicInfo: {
//           challengeName: "",
//           challengeType: "",
//           description: "",
//           primaryHashtags: [],
//           coverImage: null,
//         },
//         goalsAndMetrics: {
//           selectedGoalTypes: ["distance"],
//           activeTab: "distance",
//           selectedGoalConfiguration: "",
//           selectedFrequencyConfiguration: "",
//           selectedTimeConfiguration: "",
//           selectedStreakConfiguration: "",
//           selectedPhotoConfiguration: "",
//         },
//         schedule: {
//           startDate: "",
//           startTime: "",
//           endDate: "",
//           endTime: "",
//           recurrenceType: "",
//           selectedDay: [],
//         },
//         rewards: initialRewardsState,
//       })),
//   }),
// );


import { create } from "zustand";

/* =========================
   Goal & Config Types
========================= */

export type GoalType = "distance" | "frequency" | "time" | "streak" | "photo";

export interface DistanceGoalConfig {
  targetDistance?: number;
  numberOfWalks?: number;
  duration?: number;
  distancePerWeek?: number;
  walksPerWeek?: number;
  distancePerWalk?: number;
  startDistance?: number;
  weeklyIncrease?: number;
  durationWeeks?: number;
}

export interface FrequencyGoalConfig {
  numberOfWalks?: number;
  walksPerWeek?: number;
  numberOfWeeks?: number;
  selectedDay?: string;
  timePeriod?: string;
  timeRange?: {
    start: string;
    end: string;
  };
  walksPerPeriod?: number;
  minimumWalkDuration?: number;
  minDuration?: number;
  selectedDays?: string[];
  weeksCount?: number;
  minimumDuration?: number;
  minWalkDuration?: number;
}

export interface TimeGoalConfig {
  totalWalkingTime?: number;
  minimumWalkDuration?: number;
  numberOfWalks?: number;
  distancePerWalk?: number;
  startDistance?: number;
  weeklyIncrease?: number;
  durationWeeks?: number;
  timePerWeek?: number;
  numberOfWeeks?: number;
}

export interface StreakGoalConfig {
  consecutiveDaysTarget?: number;
  allowJokerDay?: boolean;
  minimumStreakTarget?: number;
  minimumStreakValue?: number;
  challengeDuration?: number;
  numberOfStreaks?: number;
  streakLength?: number;
  restDays?: number;
  selectedDays?: string[];
  minimumWalkDuration?: number;
  numberOfWeeks?: number;
}

export interface PhotoGoalConfig {
  numberOfPhotos?: number;
  challengeDuration?: number;
  frequency?: string;
  photoRequirements?: string[];
}

export interface GoalPayload<T> {
  configurationType: string;
  config: T;
}

/* =========================
   State Interfaces
========================= */

export interface BasicInfoState {
  challengeName: string;
  challengeType: string;
  description: string;
  primaryHashtags: string[];
  coverImage?: File | null;
}

export interface GoalsAndMetricsState {
  selectedGoalTypes: GoalType[];
  activeTab: GoalType;

  selectedGoalConfiguration: string;
  selectedFrequencyConfiguration: string;
  selectedTimeConfiguration: string;
  selectedStreakConfiguration: string;
  selectedPhotoConfiguration: string;

  distanceGoal?: GoalPayload<DistanceGoalConfig>;
  frequencyGoal?: GoalPayload<FrequencyGoalConfig>;
  timeGoal?: GoalPayload<TimeGoalConfig>;
  streakGoal?: GoalPayload<StreakGoalConfig>;
  photoGoal?: GoalPayload<PhotoGoalConfig>;
}

export interface ScheduleState {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  recurrenceType: string;
  selectedDay: string[];
}

export interface RewardState {
  points: number;
  participation: {
    whoCanParticipate:
      | "all_users"
      | "new_users"
      | "specific_pet_type"
      | "users_with_min_fit_score";
  };
  segmentCriteria: {
    petFitScoreRange: "all" | "low" | "medium" | "high";
    specificPetTypes: string[];
  };
  rewardFile: File | null;
}

export interface RewardActions {
  setRewards: (data: Partial<RewardState>) => void;
  resetRewards: () => void;
}

/* =========================
   Root Store Interface
========================= */

export interface ChallengeBuilderState {
  step: number;
  touchedSteps: Record<number, boolean>;

  basicInfo: BasicInfoState;
  goalsAndMetrics: GoalsAndMetricsState;
  schedule: ScheduleState;

  rewards: RewardState;
  rewardActions: RewardActions;

  setStep: (step: number) => void;
  markStepTouched: (step: number) => void;
  isStepValid: (step: number) => boolean;

  setBasicInfo: (data: Partial<BasicInfoState>) => void;
  setGoalType: (type: GoalType) => void;
  setGoalsAndMetrics: (data: Partial<GoalsAndMetricsState>) => void;

  setDistanceConfig: (payload: GoalPayload<DistanceGoalConfig>) => void;
  setFrequencyConfig: (payload: GoalPayload<FrequencyGoalConfig>) => void;
  setTimeConfig: (payload: GoalPayload<TimeGoalConfig>) => void;
  setStreakConfig: (payload: GoalPayload<StreakGoalConfig>) => void;
  setPhotoConfig: (payload: GoalPayload<PhotoGoalConfig>) => void;

  setSchedule: (data: Partial<ScheduleState>) => void;
  reset: () => void;
}

/* =========================
   Initial Rewards
========================= */

const initialRewardsState: RewardState = {
  points: 0,
  participation: { whoCanParticipate: "all_users" },
  segmentCriteria: {
    petFitScoreRange: "all",
    specificPetTypes: [],
  },
  rewardFile: null,
};

/* =========================
   Store Implementation
========================= */

export const useChallengeBuilderStore = create<ChallengeBuilderState>(
  (set, get) => ({
    step: 1,
    touchedSteps: {},

    /* ---------- Basic Info ---------- */
    basicInfo: {
      challengeName: "",
      challengeType: "",
      description: "",
      primaryHashtags: [],
      coverImage: null,
    },

    /* ---------- Goals & Metrics ---------- */
    goalsAndMetrics: {
      selectedGoalTypes: ["distance"],
      activeTab: "distance",
      selectedGoalConfiguration: "",
      selectedFrequencyConfiguration: "",
      selectedTimeConfiguration: "",
      selectedStreakConfiguration: "",
      selectedPhotoConfiguration: "",
    },

    /* ---------- Schedule ---------- */
    schedule: {
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      recurrenceType: "",
      selectedDay: [],
    },

    /* ---------- Rewards ---------- */
    rewards: initialRewardsState,

    rewardActions: {
      setRewards: (data) =>
        set((state) => ({
          rewards: { ...state.rewards, ...data },
        })),
      resetRewards: () =>
        set(() => ({
          rewards: initialRewardsState,
        })),
    },

    /* ---------- Navigation ---------- */
    setStep: (step) => set({ step }),

    markStepTouched: (step) =>
      set((state) => ({
        touchedSteps: {
          ...state.touchedSteps,
          [step]: true,
        },
      })),

    isStepValid: (step) => {
      const state = get();

      switch (step) {
        case 1: {
          const { challengeName, challengeType, description } = state.basicInfo;
          return Boolean(
            challengeName.trim() &&
              challengeType &&
              description.trim()
          );
        }

        case 2: {
          const g = state.goalsAndMetrics;
          const active = g.selectedGoalTypes[0];

          if (!active) return false;

          switch (active) {
            case "distance":
              return Boolean(g.distanceGoal?.configurationType);
            case "time":
              return Boolean(g.selectedTimeConfiguration);
            case "streak":
              return Boolean(g.selectedStreakConfiguration);
            case "frequency":
              return Boolean(g.frequencyGoal?.configurationType);
            case "photo":
              return Boolean(g.selectedPhotoConfiguration);
            default:
              return false;
          }
        }

        case 3: {
          const s = state.schedule;
          return Boolean(
            s.startDate &&
              s.startTime &&
              s.endDate &&
              s.endTime &&
              s.recurrenceType
          );
        }

        case 4:
          return state.rewards.points > 0;

        default:
          return true;
      }
    },

    /* ---------- Setters ---------- */
    setBasicInfo: (data) =>
      set((state) => ({
        basicInfo: { ...state.basicInfo, ...data },
      })),

    setGoalType: (type) =>
      set((state) => ({
        goalsAndMetrics: {
          ...state.goalsAndMetrics,
          selectedGoalTypes: [type],
          activeTab: type,
        },
      })),

    setGoalsAndMetrics: (data) =>
      set((state) => ({
        goalsAndMetrics: { ...state.goalsAndMetrics, ...data },
      })),

    setDistanceConfig: (payload) =>
      set((state) => ({
        goalsAndMetrics: {
          ...state.goalsAndMetrics,
          distanceGoal: payload,
          selectedGoalConfiguration: payload.configurationType,
        },
      })),

    setFrequencyConfig: (payload) =>
      set((state) => ({
        goalsAndMetrics: {
          ...state.goalsAndMetrics,
          frequencyGoal: payload,
          selectedFrequencyConfiguration: payload.configurationType,
        },
      })),

    setTimeConfig: (payload) =>
      set((state) => ({
        goalsAndMetrics: {
          ...state.goalsAndMetrics,
          timeGoal: payload,
          selectedTimeConfiguration: payload.configurationType,
        },
      })),

    setStreakConfig: (payload) =>
      set((state) => ({
        goalsAndMetrics: {
          ...state.goalsAndMetrics,
          streakGoal: payload,
          selectedStreakConfiguration: payload.configurationType,
        },
      })),

    setPhotoConfig: (payload) =>
      set((state) => ({
        goalsAndMetrics: {
          ...state.goalsAndMetrics,
          photoGoal: payload,
          selectedPhotoConfiguration: payload.configurationType,
        },
      })),

    setSchedule: (data) =>
      set((state) => ({
        schedule: { ...state.schedule, ...data },
      })),

    /* ---------- Reset ---------- */
    reset: () =>
      set(() => ({
        step: 1,
        touchedSteps: {},
        basicInfo: {
          challengeName: "",
          challengeType: "",
          description: "",
          primaryHashtags: [],
          coverImage: null,
        },
        goalsAndMetrics: {
          selectedGoalTypes: ["distance"],
          activeTab: "distance",
          selectedGoalConfiguration: "",
          selectedFrequencyConfiguration: "",
          selectedTimeConfiguration: "",
          selectedStreakConfiguration: "",
          selectedPhotoConfiguration: "",
        },
        schedule: {
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: "",
          recurrenceType: "",
          selectedDay: [],
        },
        rewards: initialRewardsState,
      })),
  })
);
