export interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginResponse {
  user: User;
}

export interface RegisterResponse {
  user: User;
}
