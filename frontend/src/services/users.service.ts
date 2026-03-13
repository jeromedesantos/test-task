import { api } from "../lib/api";
import { useAuthStore } from "../stores/auth.store";
import type { User, UserResponse } from "../types/users";

export const login = async (email: string, password: string): Promise<User> => {
  const res = await api.post<UserResponse>("/users/login", {
    email,
    password,
  });
  const user = res.data.data;
  useAuthStore.getState().setUser(user);
  return user;
};

export const register = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  const res = await api.post<UserResponse>("/users/register", {
    name,
    email,
    password,
  });
  const user = res.data.data;
  useAuthStore.getState().setUser(user);
  return user;
};

export const logout = async () => {
  await api.post("/users/logout");
  useAuthStore.getState().logout();
};

export const getMe = async () => {
  const res = await api.get("/users/me");
  const user = res.data.data;
  useAuthStore.getState().setUser(user);
  return user;
};
