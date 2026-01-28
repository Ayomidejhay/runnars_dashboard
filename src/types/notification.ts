export type TargetType =
  | "all_users"
  | "new_users"
  | "petfitscore_range"
  | "pet_type"
  | "incomplete_profile"
  | "challenge_status"
  | "specific_users";

export interface CreateNotificationPayload {
  title: string;
  body: string;
  campaign?: string;
  targetType: TargetType;
  criteria: Record<string, any>;
  data?: {
    screen?: string;
    challengeId?: string;
  };
}
