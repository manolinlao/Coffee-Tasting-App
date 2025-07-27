import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar';

export const DesktopLayout = () => (
  <>
    <aside className="flex flex-col w-64 bg-base-200 border-r p-4">
      <NavBar />
    </aside>
    <main className="flex-1 p-4 overflow-auto">
      <div className="text-xl font-bold mb-4">Coffee Tasting</div>
      <Outlet />
    </main>
  </>
);
