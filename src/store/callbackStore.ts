import { create } from "zustand";
import {
  fetchPendingCallbacks,
  assignCaregiver,
} from "@/services/callbackService";

interface CallbackState {
  list: any[];
  loading: boolean;
  page: number;
  total: number;

  getCallbacks: () => Promise<void>;
  setPage: (page: number) => void;
  assignToCaregiver: (callbackId: string, caregiverId: string) => Promise<void>;
}

export const useCallbackStore = create<CallbackState>((set, get) => ({
  list: [],
  loading: false,
  page: 1,
  total: 0,

  setPage: (page) => set({ page }),

  getCallbacks: async () => {
    try {
      set({ loading: true });

      const { page } = get();
      const data = await fetchPendingCallbacks(page);

      set({
        list: data.list,
        total: data.total,
        loading: false,
      });
    } catch (err) {
      set({ loading: false });
    }
  },

  assignToCaregiver: async (callbackId, caregiverId) => {
    await assignCaregiver(callbackId, caregiverId);

    // Optimistic update
    set((state) => ({
      list: state.list.map((item) =>
        item._id === callbackId
          ? {
              ...item,
              status: "assigned",
              assignedCaregiver: caregiverId,
            }
          : item,
      ),
    }));
  },
}));
