import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateTasting } from '../../pages/CreateTasting';
import { TastingList } from '../../pages/TastingList';
import { AppLayout } from '../../layout';
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
          <Route path="/" element={<CreateTasting />} />
          <Route path="/tastings" element={<TastingList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
