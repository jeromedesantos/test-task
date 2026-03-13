import { useEffect } from "react";
import { getMe } from "../services/users.service";
import { useAuthStore } from "../stores/auth.store";
import { Outlet } from "react-router-dom";

export const InitializerRoute = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  useEffect(() => {
    const init = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch {
        logout();
      }
    };
    init();
  }, [setUser, logout]);

  if (isAuthLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return <Outlet />;
};
