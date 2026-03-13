import { useEffect, useState } from "react";
import { updateUser } from "../services/users.service";
import {
  updateUserSchema,
  type UpdateUserInput,
} from "../schemas/users.schema";
import { appError } from "../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import type { User } from "../types/users";

export const Profile = () => {
  const [form, setForm] = useState<UpdateUserInput>({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async (user: User) => {
      setLoading(true);
      try {
        if (!user) return;
        setForm({ name: user.name, email: user.email });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchUser(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = updateUserSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await updateUser(form.name || "", form.email || "");
      navigate("/");
    } catch (err) {
      const message = appError(err);
      setErrors({ general: message || "Failed to update profile" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Profile</h1>

        {errors.general && (
          <p className="text-red-500 text-sm text-center mb-4">
            {errors.general}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};
