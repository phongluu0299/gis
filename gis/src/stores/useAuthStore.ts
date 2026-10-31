import { create } from "zustand";

// Chỉnh các thuộc tính cho khớp dữ liệu API /auth/me
export interface AuthUser {
  userId: number;
  username: string;
  fullname: string;
}

type AuthState = {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),
}));