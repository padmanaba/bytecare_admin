import api from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string; // make sure backend returns this
  user: {
    id: string;
    name: string;
    email: string;
    role: "super_admin" | "caregiver" | "user";
    avatar?: string;
  };
}

export const loginAdmin = async (
  data: LoginPayload,
): Promise<LoginResponse> => {
  const response = await api.post("/admin/auth/login", data);
  return response.data;
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<{ accessToken: string }> => {
  const response = await api.post("/api/auth/refresh", {
    refreshToken,
  });

  return response.data;
};
