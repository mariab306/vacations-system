import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { loginUser } from '../services/authService';
import type { LoginData } from '../types/User';

export function Login() {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (formData: LoginData) => {
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!formData.password || formData.password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate(response.user.role === 'Admin' ? '/admin' : '/vacations');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
}