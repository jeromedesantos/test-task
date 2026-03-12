import { api } from "../lib/api";
import { useAuthStore } from "../stores/auth.store";
import type { User, LoginResponse, RegisterResponse } from "../types/user";

export const login = async (email: string, password: string): Promise<User> => {
  const res = await api.post<LoginResponse>("/users/login", {
    email,
    password,
  });
  const user = res.data.user;
  useAuthStore.getState().setUser(user);
  return user;
};

export const register = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  const res = await api.post<RegisterResponse>("/users/register", {
    name,
    email,
    password,
  });
  const user = res.data.user;
  useAuthStore.getState().setUser(user);
  return user;
};
