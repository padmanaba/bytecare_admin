import { create } from "zustand";
import {
  fetchUsers,
  User,
  UserType,
  approveCaregiver,
  rejectCaregiver,
} from "../services/userService";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
  total: number;
  totalPages: number;
  type: UserType;

  approveUser: (id: string) => Promise<void>;
  rejectUser: (id: string, note: string) => Promise<void>;

  setType: (type: UserType) => void;
  setPage: (page: number) => void;
  getUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  page: 1,
  total: 0,
  totalPages: 1,
  type: "caregiver",

  setType: (type) => set({ type, page: 1 }),

  setPage: (page) => set({ page }),

  getUsers: async () => {
    const { type, page } = get();

    try {
      set({ loading: true, error: null });

      const data = await fetchUsers(type, page);

      set({
        users: data.details,
        total: data.total,
        totalPages: Math.ceil(data.total / data.limit),
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Failed to fetch users",
        loading: false,
      });
    }
  },

  // ✅ APPROVE CAREGIVER
  approveUser: async (id: string) => {
    try {
      await approveCaregiver(id);

      set((state) => ({
        users: state.users.map((user) =>
          user._id === id
            ? {
                ...user,
                approvalStatus: "approved",
                isApproved: true,
              }
            : user,
        ),
      }));
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Failed to approve",
      });
    }
  },

  // ✅ REJECT CAREGIVER
  rejectUser: async (id: string, note: string) => {
    try {
      await rejectCaregiver(id, note);

      set((state) => ({
        users: state.users.map((user) =>
          user._id === id
            ? {
                ...user,
                approvalStatus: "rejected",
                isApproved: false,
              }
            : user,
        ),
      }));
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Failed to reject",
      });
    }
  },
}));
