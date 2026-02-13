import api from "./api";

export const fetchAvailableCaregivers = async (callbackId: string) => {
  const res = await api.get(
    `/api/admin/callback/available-caregivers/${callbackId}`,
  );

  return res.data.data;
};
