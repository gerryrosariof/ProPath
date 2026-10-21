import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { Role } from '@/types';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: Role[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    const homeByRole: Record<Role, string> = {
      student: '/student/dashboard',
      counselor: '/counselor/dashboard',
      admin: '/admin/dashboard',
    };
    return <Navigate to={homeByRole[user.role]} replace />;
  }

  return <>{children}</>;
}
