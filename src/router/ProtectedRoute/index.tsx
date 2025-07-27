import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { authStores } from '../../shared/model/authModel';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = useUnit(authStores.$user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
