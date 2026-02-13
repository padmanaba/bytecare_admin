// services/bookingService.ts
import api from "./api";

export const fetchBookings = async (page = 1) => {
  const res = await api.get(`/api/booking?page=${page}`);

  const payload = res.data.data;

  return {
    list: payload.data,
    total: payload.total,
    page: payload.page,
  };
};

export const fetchAvailableCaregivers = async (bookingId: string) => {
  const res = await api.get(`/api/booking/${bookingId}/available-caregivers`);
  return res.data.data;
};

export const assignCaregiverToBooking = async (
  bookingId: string,
  caregiverId: string,
) => {
  const res = await api.post(`/api/booking/${bookingId}/assign-caregiver`, {
    caregiverId,
  });
  return res.data;
};
