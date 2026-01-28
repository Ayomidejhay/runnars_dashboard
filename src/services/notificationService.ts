// import api from "@/lib/api";
// import { CreateNotificationPayload } from "@/types/notification";

// export const sendNotification = async (
//   payload: NotificationPayload
// ) => {
//   const { data } = await api.post("/api/admin/notification/send", payload);
//   return data;
// };


import axios from "axios";
import { CreateNotificationPayload } from "@/types/notification";
import api from "@/lib/api";

export const sendNotification = async (
  payload: CreateNotificationPayload,
) => {
  const res = await api.post("/api/admin/notification/send", payload);

  if (!res.data?.success) {
    throw new Error(res.data.message || "Notification failed");
  }

  return res.data;
};
