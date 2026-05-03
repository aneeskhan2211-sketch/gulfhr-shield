import type { UserRole } from "@/backend";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: bigint;
  fullName: string;
  email: string;
  role: UserRole;
  companyId: bigint;
  companyName: string;
  isDemo: boolean;
}

interface AuthState {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) =>
        set({ currentUser: user, isAuthenticated: true, isLoading: false }),
      clearUser: () =>
        set({ currentUser: null, isAuthenticated: false, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "gulfhr-auth",
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
