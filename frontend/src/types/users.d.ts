export interface User {
  id: string;
  name: string;
  email: string;
}

interface UserResponse {
  data: User;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  setAuthLoading: (loading: boolean) => void;
}

export interface RouteProps {
  children: React.ReactNode;
}
