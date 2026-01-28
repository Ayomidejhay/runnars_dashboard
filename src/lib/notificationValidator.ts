import { CreateNotificationPayload } from "@/types/notification";

export function validateNotification(payload: CreateNotificationPayload) {
  if (!payload.title.trim()) {
    throw new Error("Notification title is required");
  }

  if (!payload.body.trim()) {
    throw new Error("Notification message is required");
  }

  if (!payload.targetType) {
    throw new Error("Target audience is required");
  }

  
}
