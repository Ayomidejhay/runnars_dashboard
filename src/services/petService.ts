import api from "@/lib/api";


export interface GetPetsParams {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    petType?: string;
    breed?: string;
    ageGroup?: string;
    startDate?: string;
    endDate?: string;
}

export const getAllPets = async ({ page, limit, search, status, petType, breed, ageGroup, startDate, endDate }: GetPetsParams) => {
    const response = await api.get("/api/admin/pets", {
        params: { page, limit, search, status, petType, breed, ageGroup, startDate, endDate },
    });
    return response.data;
};

export const getChallengeByPetId = async (id: string) => {
  const { data } = await api.get(`/api/admin/challenges/${id}`);
  return data;
};


export const getPetChallenges = async (petId: string) => {
  const { data } = await api.get(`/api/admin/challenges/${petId}/pet-challenges`);
  return data;
};




export interface ChallengeRow {
  id: string;
  title: string;
  type: string;
  status: string;
  startDate: string | null;
  endDate: string | null;
  goal: string;
  image: string;
}

export const fetchPetChallenges = async (
  petId: string
): Promise<ChallengeRow[]> => {
  if (!petId) throw new Error("petId is required");

  const { data } = await api.get(
    `/api/admin/challenges/${petId}/pet-challenges`
  );

  const activeChallenges = data?.data?.challenges?.active ?? [];

  return activeChallenges.map((item: any) => {
    const challenge = item.challenge;

    const goalItem = item.progressSummary?.[0];

    let goal = "--";
    if (goalItem) {
      goal = `${goalItem.target} ${goalItem.unit}`;
      // goal = `${goalItem.target} miles`;
    }

    return {
      id: challenge.id,
      title: challenge.title,
      type: challenge.type,
      status: item.participantStatus,
      startDate: challenge.startDate,
      endDate: challenge.endDate,
      goal,
      image: challenge.image,
    };
  });
};