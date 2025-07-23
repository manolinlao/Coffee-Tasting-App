import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateTasting } from './pages/CreateTasting';
import { TastingList } from './pages/TastingList';
import { AppLayout } from './layout';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<CreateTasting />} />
          <Route path="/tastings" element={<TastingList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
