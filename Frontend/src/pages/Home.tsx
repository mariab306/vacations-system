import { Link, Navigate } from 'react-router-dom';
import type { User } from '../types/User';

export function Home() {
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  const user: User | null = userJson ? JSON.parse(userJson) : null;

  if (token && user) {
    return <Navigate to={user.role === 'Admin' ? '/admin' : '/vacations'} replace />;
  }

  return (
    <div>
      <h1>Vacations System</h1>
      <p>Please sign in or create an account to continue.</p>
      <div>
        <Link to="/login"><button>Login</button></Link>{' '}
        <Link to="/register"><button>Register</button></Link>
      </div>
    </div>
  );
}