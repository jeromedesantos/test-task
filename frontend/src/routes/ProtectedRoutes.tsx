import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import type { AuthState } from "../types/users";

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore(
    (state: AuthState) => state.isAuthenticated,
  );
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
