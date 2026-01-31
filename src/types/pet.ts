// types/petChallenge.ts

// ---------- Reusable Types ----------
export interface Location {
  lat: number;
  lng: number;
  timestamp: string; // ISO string
}

export interface EmergencyContact {
  _id: string;
  name: string;
  phoneNumber: string;
  relationship: string;
}

// ---------- Pet Info ----------
export interface PetBasicInfo {
  id: string;
  name: string;
  photo: string;
  petType: string;
  breed: string;
  ageGroup: string;
  weight: number;
  otherPetType: string;
  status: "Active" | "Inactive";
  icon: string;
  createdAt: string; // ISO date
}

// ---------- Owner / User ----------
export interface PetOwner {
  id: string;
  fullName: string;
  username: string;
  email: string;
  profilePicture: string;
  location?: Location;
  isActive: boolean;
  lastActive: string;
  joinDate: string;
  emergencyContacts: EmergencyContact[];
}

// ---------- API Response ----------
export interface PetProfileResponse {
  success: boolean;
  data: {
    basicInfo: PetBasicInfo;
    owner: PetOwner;
  };
  message: string;
}

// ---------- Combined Shape for Challenge Participants ----------
export interface ChallengeParticipant {
  owner: PetOwner;
  basicInfo: PetBasicInfo;
}

// ---------- Optional: Participant + Status for Challenge Tab ----------
export interface Participant {
  id: string;
  user: string; // userId
  joinedAt: string;
  status: "active" | "completed" | "scheduled";
  completionRate?: number;
}

