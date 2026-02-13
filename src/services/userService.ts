import api from "./api";

export type UserType = "caregiver" | "user";

export interface Skill {
  _id: string;
  name: string;
  description: string;
}

export interface ServiceItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Certification {
  courseName: string;
  university: string;
  year: number;
  attachment: string;
}

export interface CaregiverProfile {
  gender: string;
  experienceYears: number;
  consultationFee: number;
  services: ServiceItem[];
  skills: Skill[];
  availability: string;
  certifications: Certification[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  type: UserType;
  isApproved?: boolean;
  approvalStatus?: string;
  caregiver?: CaregiverProfile; // Optional (only if caregiver)
  profileImage?: string;
  createdAt: string;
}

export interface UserListResponse {
  details: User[];
  count: number;
  total: number;
  page: number;
  limit: number;
  type: UserType;
}

export const fetchUsers = async (
  type: UserType,
  page: number,
): Promise<UserListResponse> => {
  const response = await api.get(`/api/user?type=${type}&page=${page}`);

  return response.data.data;
};

export const approveCaregiver = async (id: string) => {
  const response = await api.put(`/admin/caregiver/${id}/approve`);
  return response.data;
};

export const rejectCaregiver = async (id: string, adminNote: string) => {
  const response = await api.put(`/admin/caregiver/${id}/cancel`, {
    adminNote,
  });
  return response.data;
};
