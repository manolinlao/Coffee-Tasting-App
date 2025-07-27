import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CreateTasting } from '../../pages/CreateTasting';
import { TastingList } from '../../pages/TastingList';
import { AppLayout } from '../../AppLayout';
import { Login } from '../../pages/Login';
import { ProtectedRoute } from '../ProtectedRoute';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path="/create" element={<CreateTasting />} />
          <Route path="/list" element={<TastingList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
