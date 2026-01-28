// import { useMutation } from "@tanstack/react-query";
// import { sendNotification } from "@/services/notificationService";
// import { validateNotification } from "@/lib/notificationValidator";
// import { NotificationPayload } from "@/types/notification";

// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export const useSendNotification = (onSuccessReset: () => void) => {
  
//   const router = useRouter();
  

//  return useMutation<
//     unknown,                // response data (adjust if backend returns something)
//     Error,                  // error type
//     NotificationPayload     // ✅ payload type
//   >({
//     mutationFn: async (payload: NotificationPayload) => {
//       validateNotification(payload);
//       return sendNotification(payload);
//     },

//     onSuccess: () => {
//       toast.success("Notification sent successfully");
//       onSuccessReset();
//       router.push("/notifications");
//     },

//     onError: (error: any) => {
//       const message =
//         error?.response?.data?.message ||
//         error?.message ||
//         "Something went wrong";

//       toast.error(message);
//     },
//   });
// };


import { useMutation } from "@tanstack/react-query";
import { CreateNotificationPayload } from "@/types/notification";
import { sendNotification } from "@/services/notificationService";

export const useSendNotification = () => {
  return useMutation({
    mutationFn: (payload: CreateNotificationPayload) =>
      sendNotification(payload),
    
  });
};
