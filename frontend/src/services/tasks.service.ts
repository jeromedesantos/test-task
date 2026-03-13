import { api } from "../lib/api";

export const getMyTasks = async () => {
  const res = await api.get("/tasks/my-tasks");
  const task = res.data.data;
  return task;
};

export const createTask = async (title: string, description: string) => {
  const res = await api.post("/tasks", { title, description });
  const task = res.data.data;
  return task;
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
  const task = res.data.data;
  return task;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
