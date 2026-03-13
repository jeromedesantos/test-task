import { api } from "../lib/api";

export const getMyTasks = async () => {
  const res = await api.get("/tasks/my-tasks");
  return res.data.data;
};

export const createTask = async (title: string, description: string) => {
  const res = await api.post("/tasks", { title, description });
  return res.data.data;
};

export const updateTask = async (
  id: string,
  title: string,
  description: string,
  status: string,
) => {
  const res = await api.put(`/tasks/${id}`, {
    title,
    description,
    status,
  });
  return res.data.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
