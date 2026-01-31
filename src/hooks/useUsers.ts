import api from "@/lib/api";
import { getAllUsers, GetUsersParams } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";



export const useAllUsers = (params: GetUsersParams) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: () => getAllUsers(params),
        placeholderData: (previousData) => previousData,
    });
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await api.get(`/api/admin/users/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

// export const useChallengeUsers = (ids: string[]) => {
//   return useQuery({
//     queryKey: ["users", ids],
//     queryFn: async () => {
//       const res = await Promise.all(
//         ids.map(async (id) => {
//           const response = await api.get(`/api/admin/users/${id}`);
//           return response.data.data.basicInfo; // Extract only basicInfo
          
//         })
//       );
//       return res;
//     },
//     enabled: ids.length > 0,
//   });
// };

export interface ChallengeUser {
  id: string;
  basicInfo: any;
  pets: any[];
}

export const useChallengeUsers = (ids: string[]) => {
  return useQuery<ChallengeUser[]>({
    queryKey: ["challenge-users", ids],
    queryFn: async () => {
      const res = await Promise.all(
        ids.map(async (id) => {
          const response = await api.get(`/api/admin/users/${id}`);

          const { basicInfo, pets } = response.data.data;

          return {
            id,
            basicInfo,
            pets: pets ?? [],
          };
        })
      );

      return res;
    },
    enabled: ids.length > 0,
  });
};
