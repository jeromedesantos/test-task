import { api } from "../lib/api";
import { useAuthStore } from "../stores/auth.store";
import type { User } from "../types/users";

export const login = async (email: string, password: string): Promise<User> => {
  const res = await api.post("/users/login", {
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
) => {
  const res = await api.post("/users", {
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

export const getCurrentUser = async () => {
  const res = await api.get("/users/me");
  const user = res.data.data;
  return user;
};

export const updateUser = async (name: string, email: string) => {
  const res = await api.put("/users/me", {
    name,
    email,
  });
  const user = res.data.data;
  useAuthStore.getState().setUser(user);
  return user;
};
