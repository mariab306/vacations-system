import { Link, useNavigate, useLocation } from 'react-router-dom';
import type { User } from '../types/User';

export function Navbar() {
  const navigate = useNavigate();
  useLocation();

  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  const user: User | null = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav>
      {!token && (
        <>
          <Link to="/login">Login</Link> |{' '}
          <Link to="/register">Register</Link> |{' '}
          <Link to="/about">About</Link>
        </>
      )}

      {token && user?.role === 'User' && (
        <>
          <span>Hello, {user.first_name} {user.last_name}</span> |{' '}
          <Link to="/vacations">Vacations</Link> |{' '}
          <Link to="/ai">AI Recommendations</Link> |{' '}
          <Link to="/mcp">DB Assistant</Link> |{' '}
          <Link to="/about">About</Link> |{' '}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {token && user?.role === 'Admin' && (
        <>
          <span>Hello, {user.first_name} {user.last_name} (Admin)</span> |{' '}
          <Link to="/admin">Manage Vacations</Link> |{' '}
          <Link to="/admin/add">Add Vacation</Link> |{' '}
          <Link to="/admin/reports">Reports & CSV</Link> |{' '}
          <Link to="/about">About</Link> |{' '}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}