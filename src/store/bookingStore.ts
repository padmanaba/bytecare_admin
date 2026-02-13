import { create } from "zustand";
import {
  fetchBookings,
  assignCaregiverToBooking,
} from "@/services/bookingService";

interface BookingState {
  list: any[];
  loading: boolean;
  page: number;
  total: number;

  getBookings: () => Promise<void>;
  setPage: (page: number) => void;
  assignCaregiver: (bookingId: string, caregiverId: string) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  list: [],
  loading: false,
  page: 1,
  total: 0,

  setPage: (page) => set({ page }),

  getBookings: async () => {
    try {
      set({ loading: true });

      const { page } = get();
      const data = await fetchBookings(page);

      set({
        list: data.list,
        total: data.total,
        page: data.page,
        loading: false,
      });
    } catch (err) {
      set({ loading: false });
    }
  },

  assignCaregiver: async (bookingId, caregiverId) => {
    await assignCaregiverToBooking(bookingId, caregiverId);

    // Optimistic update
    set((state) => ({
      list: state.list.map((item) =>
        item._id === bookingId
          ? {
              ...item,
              caregiverStatus: "ASSIGNED",
              caregiver: {
                _id: caregiverId,
              },
            }
          : item,
      ),
    }));
  },
}));
