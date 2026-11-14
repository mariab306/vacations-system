import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';
import { registerUser } from '../services/authService';
import type { RegisterData } from '../types/User';

export function Registration() {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async (formData: RegisterData) => {
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
      const response = await registerUser(formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/vacations');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <RegisterForm onSubmit={handleRegister} error={error} />
    </div>
  );
}