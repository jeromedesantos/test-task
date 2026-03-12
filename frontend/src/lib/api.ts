import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response?.status === 401) {
      console.log("Unauthorized");
    }
    return Promise.reject(err);
  },
);

export function appError(err: unknown): string | null {
  return axios.isAxiosError(err) && err.response
    ? err.response.data.message
    : "Unexpected error";
}
