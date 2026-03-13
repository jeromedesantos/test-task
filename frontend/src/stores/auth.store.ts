import { create } from "zustand";
import type { AuthState } from "../types/users";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      isAuthLoading: false,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isAuthLoading: false,
    }),
  setAuthLoading: (loading) =>
    set({
      isAuthLoading: loading,
    }),
}));
