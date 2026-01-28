// stores/useAudienceStore.ts
import { create } from "zustand";
import { TargetType } from "@/types/notification";

type AudienceState = {
  targetType: TargetType;
  criteria?: any;
  setAudience: (data: Partial<AudienceState>) => void;
  reset: () => void;
};

export const useAudienceStore = create<AudienceState>((set) => ({
  targetType: "all_users",
  criteria: undefined,

  setAudience: (data) =>
    set((state) => ({ ...state, ...data })),

  reset: () =>
    set({
      targetType: "all_users",
      criteria: undefined,
    }),
}));
