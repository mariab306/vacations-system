import type { RegisterData, LoginData, AuthResponse } from '../types/User';
import { apiFetch } from '../config';

export const registerUser = async (data: RegisterData): Promise<AuthResponse> =>
  (await apiFetch('/users/register', { method: 'POST', body: JSON.stringify(data) })).json();

export const loginUser = async (data: LoginData): Promise<AuthResponse> =>
  (await apiFetch('/users/login', { method: 'POST', body: JSON.stringify(data) })).json();