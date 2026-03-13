import { useCallback, useEffect, useState } from "react";
import {
  getMyTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/tasks.service";
import { createTaskSchema, updateTaskSchema } from "../schemas/tasks.schema";
import type { Task } from "../types/tasks";

export const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<Pick<Task, "title" | "description">>({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Pick<Task, "title" | "description">>(
    {
      title: "",
      description: "",
    },
  );

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMyTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = createTaskSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    await createTask(form.title, form.description as string);
    setForm({ title: "", description: "" });
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  const toggleStatus = async (task: Task) => {
    let newStatus: Task["status"];
    if (task.status === "PENDING") newStatus = "IN_PROGRESS";
    else if (task.status === "IN_PROGRESS") newStatus = "DONE";
    else newStatus = "DONE";
    const result = updateTaskSchema.safeParse({ status: newStatus });
    if (!result.success) {
      console.error(result.error.format());
      return;
    }
    await updateTask(task.id, task.title, task.description || "", newStatus);
    fetchTasks();
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditForm({ title: task.title, description: task.description || "" });
  };
  const saveEdit = async (task: Task) => {
    const result = updateTaskSchema.safeParse(editForm);
    if (!result.success) {
      console.error(result.error.format());
      return;
    }
    await updateTask(
      task.id,
      editForm.title,
      editForm.description || "",
      task.status,
    );
    setEditingTaskId(null);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">My Tasks</h1>

        {/* CREATE TASK */}
        <form
          onSubmit={handleCreate}
          className="bg-white p-4 rounded-lg shadow mb-6 space-y-3"
        >
          <input
            name="title"
            placeholder="Task title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}

          <input
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}

          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Task
          </button>
        </form>

        {/* TASK LIST */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-500 text-center">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks yet</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-4 rounded-lg shadow relative flex flex-col"
              >
                {/* DELETE ICON */}
                {editingTaskId !== task.id && (
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    title="Delete task"
                  >
                    🗑️
                  </button>
                )}

                {/* TITLE & DESCRIPTION */}
                <div className="flex-1">
                  {editingTaskId === task.id ? (
                    <>
                      <input
                        name="title"
                        value={editForm.title}
                        onChange={handleEditChange}
                        className="w-full border rounded p-1 mb-1"
                      />
                      <input
                        name="description"
                        value={editForm.description}
                        onChange={handleEditChange}
                        className="w-full border rounded p-1 mb-2"
                      />
                    </>
                  ) : (
                    <>
                      <h2 className="font-medium">{task.title}</h2>
                      {task.description && (
                        <p className="text-sm text-gray-500 mb-2">
                          {task.description}
                        </p>
                      )}
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
                          task.status === "PENDING"
                            ? "bg-gray-200 text-gray-700"
                            : task.status === "IN_PROGRESS"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-green-200 text-green-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </>
                  )}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-2">
                  {editingTaskId === task.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(task)}
                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTaskId(null)}
                        className="text-sm bg-gray-300 text-gray-800 px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        disabled={task.status === "DONE"}
                        onClick={() => toggleStatus(task)}
                        className={`text-sm px-3 py-1 rounded text-white ${
                          task.status === "PENDING"
                            ? "bg-yellow-500"
                            : task.status === "IN_PROGRESS"
                              ? "bg-green-500"
                              : "bg-gray-500"
                        }`}
                      >
                        {task.status === "PENDING"
                          ? "Start"
                          : task.status === "IN_PROGRESS"
                            ? "Finish"
                            : "Done"}
                      </button>

                      <button
                        onClick={() => startEditing(task)}
                        className="text-sm bg-blue-300 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
