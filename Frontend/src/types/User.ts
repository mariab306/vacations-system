export type User = {
  user_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  role?: 'User' | 'Admin';
};

export type RegisterData = {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
};

export type LoginData = {
  email: string;
  password?: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};