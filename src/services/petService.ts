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