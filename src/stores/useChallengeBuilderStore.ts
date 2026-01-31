import { create } from "zustand";

/* =========================
   STORE MODE
========================= */

type BuilderMode = "create" | "edit";

/* =========================
   GOAL TYPES
========================= */

export type GoalType = "distance" | "frequency" | "time" | "streak" | "photo";

/* =========================
   GOAL CONFIGS
========================= */

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
  timeRange?: { start: string; end: string };
  walksPerPeriod?: number;
  minimumWalkDuration?: number;
  selectedDays?: string[];
}

export interface TimeGoalConfig {
  totalWalkingTime?: number;
  minimumWalkDuration?: number;
  numberOfWalks?: number;
  numberOfWeeks?: number;
}

export interface StreakGoalConfig {
  consecutiveDaysTarget?: number;
  allowJokerDay?: boolean;
  minimumStreakTarget?: number;
  challengeDuration?: number;
  selectedDays?: string[];
}

export interface PhotoGoalConfig {
  numberOfPhotos?: number;
  challengeDuration?: number;
  frequency?: string;
}

/* =========================
   PAYLOAD
========================= */

export interface GoalPayload<T> {
  configurationType: string;
  config: T;
}

/* =========================
   STATE INTERFACES
========================= */

export interface BasicInfoState {
  challengeName: string;
  challengeType: string;
  description: string;
  primaryHashtags: string[];
  coverImage: File | null;
  coverImageUrl: string | null;
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
   SNAPSHOT (EDIT DIFF)
========================= */

type Snapshot = {
  basicInfo: BasicInfoState;
  goalsAndMetrics: GoalsAndMetricsState;
  schedule: ScheduleState;
  rewards: RewardState;
};

/* =========================
   ROOT STORE
========================= */

export interface ChallengeBuilderState {
  mode: BuilderMode;
  challengeId?: string;
  initialSnapshot?: Snapshot;

  step: number;
  touchedSteps: Record<number, boolean>;

  isGoalsEditable: boolean;

  basicInfo: BasicInfoState;
  goalsAndMetrics: GoalsAndMetricsState;
  schedule: ScheduleState;
  rewards: RewardState;
  rewardActions: RewardActions;

  hasHydratedFromServer: boolean;

  /* navigation */
  setStep: (step: number) => void;
  markStepTouched: (step: number) => void;
  isStepValid: (step: number) => boolean;

  /* setters */
  setBasicInfo: (data: Partial<BasicInfoState>) => void;
  setGoalType: (type: GoalType) => void;
  setGoalsAndMetrics: (data: Partial<GoalsAndMetricsState>) => void;
  setDistanceConfig: (payload: GoalPayload<DistanceGoalConfig>) => void;
  setFrequencyConfig: (payload: GoalPayload<FrequencyGoalConfig>) => void;
  setTimeConfig: (payload: GoalPayload<TimeGoalConfig>) => void;
  setStreakConfig: (payload: GoalPayload<StreakGoalConfig>) => void;
  setPhotoConfig: (payload: GoalPayload<PhotoGoalConfig>) => void;
  setSchedule: (data: Partial<ScheduleState>) => void;
  setRewards: (data: Partial<RewardState>) => void;

  /* edit flow */
  initializeFromApi: (data: any, challengeId: string) => void;
  getUpdatePayload: () => Partial<Snapshot>;

  reset: () => void;
}

/* =========================
   INITIAL STATE
========================= */

const initialRewards: RewardState = {
  points: 0,
  participation: { whoCanParticipate: "all_users" },
  segmentCriteria: { petFitScoreRange: "all", specificPetTypes: [] },
  rewardFile: null,
};

const initialState: Omit<
  ChallengeBuilderState,
  | "setStep"
  | "markStepTouched"
  | "isStepValid"
  | "setBasicInfo"
  | "setGoalType"
  | "setGoalsAndMetrics"
  | "setDistanceConfig"
  | "setFrequencyConfig"
  | "setTimeConfig"
  | "setStreakConfig"
  | "setPhotoConfig"
  | "setSchedule"
  | "setRewards"
  | "initializeFromApi"
  | "getUpdatePayload"
  | "reset"
  | "rewardActions"
> = {
  mode: "create",
  challengeId: undefined,

  initialSnapshot: undefined,

  step: 1,
  touchedSteps: {},

  isGoalsEditable: true,

  basicInfo: {
    challengeName: "",
    challengeType: "",
    description: "",
    primaryHashtags: [],
    coverImage: null,
    coverImageUrl: null,
  },

  goalsAndMetrics: {
    selectedGoalTypes: ["distance" as GoalType],
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

  rewards: initialRewards,
  hasHydratedFromServer: false,
};

/* =========================
   STORE
========================= */

export const useChallengeBuilderStore = create<ChallengeBuilderState>(
  (set, get) => ({
    ...initialState,

    /* ---------- Reward Actions ---------- */
    rewardActions: {
      setRewards: (data) =>
        set((s) => ({
          rewards: { ...s.rewards, ...data },
        })),
      resetRewards: () =>
        set(() => ({
          rewards: initialRewards,
        })),
    },

    /* navigation */
    setStep: (step) => set({ step }),

    markStepTouched: (step) =>
      set((s) => ({
        touchedSteps: { ...s.touchedSteps, [step]: true },
      })),

    isStepValid: (step) => {
      const s = get();
      if (step === 1)
        return Boolean(
          s.basicInfo.challengeName &&
          s.basicInfo.challengeType &&
          s.basicInfo.description,
        );

      if (step === 2) return true;
      // return Boolean(s.goalsAndMetrics.selectedGoalTypes.length);

      if (step === 3)
        return Boolean(
          s.schedule.startDate &&
          s.schedule.startTime &&
          s.schedule.endDate &&
          s.schedule.endTime,
        );

      if (step === 4) return s.rewards.points > 0;

      return true;
    },

    /* setters */
    setBasicInfo: (data) =>
      set((s) => ({ basicInfo: { ...s.basicInfo, ...data } })),

    setGoalType: (type) => {
      if (!get().isGoalsEditable) return;
      set((s) => ({
        goalsAndMetrics: {
          ...s.goalsAndMetrics,
          selectedGoalTypes: [type],
          activeTab: type,
        },
      }));
    },

    setGoalsAndMetrics: (data) => {
      if (!get().isGoalsEditable) return;
      set((s) => ({
        goalsAndMetrics: { ...s.goalsAndMetrics, ...data },
      }));
    },

    setDistanceConfig: (p) =>
      get().isGoalsEditable &&
      set((s) => ({
        goalsAndMetrics: {
          ...s.goalsAndMetrics,
          distanceGoal: p,
          selectedGoalConfiguration: p.configurationType,
        },
      })),

    setFrequencyConfig: (p) =>
      get().isGoalsEditable &&
      set((s) => ({
        goalsAndMetrics: {
          ...s.goalsAndMetrics,
          frequencyGoal: p,
          selectedFrequencyConfiguration: p.configurationType,
        },
      })),

    setTimeConfig: (p) =>
      get().isGoalsEditable &&
      set((s) => ({
        goalsAndMetrics: {
          ...s.goalsAndMetrics,
          timeGoal: p,
          selectedTimeConfiguration: p.configurationType,
        },
      })),

    setStreakConfig: (p) =>
      get().isGoalsEditable &&
      set((s) => ({
        goalsAndMetrics: {
          ...s.goalsAndMetrics,
          streakGoal: p,
          selectedStreakConfiguration: p.configurationType,
        },
      })),

    setPhotoConfig: (p) =>
      get().isGoalsEditable &&
      set((s) => ({
        goalsAndMetrics: {
          ...s.goalsAndMetrics,
          photoGoal: p,
          selectedPhotoConfiguration: p.configurationType,
        },
      })),

    setSchedule: (data) =>
      set((s) => ({ schedule: { ...s.schedule, ...data } })),

    setRewards: (data) => set((s) => ({ rewards: { ...s.rewards, ...data } })),

    initializeFromApi: (apiData, challengeId) => {
      //

      const admin = apiData?.adminChallenge;
      if (!admin) return;

      // if (get().hasHydratedFromServer) return;

      // Prevent re-hydrating same challenge
      if (get().challengeId === challengeId) return;

      const selectedGoalTypes = admin.goalsAndMetrics?.selectedGoalTypes ?? [
        "distance",
      ];

      const snapshot: Snapshot = {
        basicInfo: {
          challengeName: admin.basicInfo?.name ?? "",
          challengeType: admin.basicInfo?.type ?? "",
          description: admin.basicInfo?.description ?? "",
          primaryHashtags: admin.basicInfo?.primaryHashtags ?? [],
          coverImage: null,
      coverImageUrl: admin?.basicInfo?.coverImage ?? null,
        },
        goalsAndMetrics: {
          ...admin.goalsAndMetrics,
          selectedGoalTypes,
          activeTab: selectedGoalTypes[0] as GoalType,
        },
        schedule: {
          startDate: admin.scheduleAndDuration?.startDate ?? "",
          startTime: admin.scheduleAndDuration?.startTime ?? "",
          endDate: admin.scheduleAndDuration?.endDate ?? "",
          endTime: admin.scheduleAndDuration?.endTime ?? "",
          recurrenceType: admin.scheduleAndDuration?.recurrenceType ?? "",
          selectedDay: admin.scheduleAndDuration?.selectedDay ?? [],
        },
        rewards: {
          ...initialRewards,
          ...admin.rewards,
          rewardFile: null,
        },
      };

      set({
        mode: "edit",
        challengeId,
        ...snapshot,
        initialSnapshot: snapshot,
        hasHydratedFromServer: true,
      });
    },

    getUpdatePayload: () => {
      const { initialSnapshot, basicInfo, goalsAndMetrics, schedule, rewards } =
        get();

      if (!initialSnapshot) return {};

      const diff: Partial<Snapshot> = {};

      const stripUi = (obj: any) => {
        const { activeTab, ...rest } = obj;
        return rest;
      };

      if (
        JSON.stringify(basicInfo) !== JSON.stringify(initialSnapshot.basicInfo)
      ) {
        diff.basicInfo = basicInfo;
      }

      if (
        JSON.stringify(stripUi(goalsAndMetrics)) !==
        JSON.stringify(stripUi(initialSnapshot.goalsAndMetrics))
      ) {
        diff.goalsAndMetrics = goalsAndMetrics;
      }

      if (
        JSON.stringify(schedule) !== JSON.stringify(initialSnapshot.schedule)
      ) {
        diff.schedule = schedule;
      }

      if (JSON.stringify(rewards) !== JSON.stringify(initialSnapshot.rewards)) {
        diff.rewards = rewards;
      }

      return diff;
    },

    reset: () => set(initialState),
  }),
);
