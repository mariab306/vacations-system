import { Navigate } from 'react-router-dom';

type Props = {
  children: any;
};

export function AdminRoute({ children }: Props) {
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  if (!token || user?.role !== 'Admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
}