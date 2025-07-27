import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { NavBar } from '../NavBar';

export const MobileLayout = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-screen">
        {/* Navbar superior: no crece */}
        <div className="navbar bg-base-100 border-b px-4 shrink-0">
          <label htmlFor="mobile-drawer" className="btn btn-square btn-ghost">
            <Menu size={24} />
          </label>
          <span className="ml-4 font-bold text-xl">Coffee Tasting</span>
        </div>
        {/* Contenido */}
        <main className="p-4 overflow-auto flex-1">
          <Outlet />
        </main>
      </div>
      {/* Lateral del drawer */}
      <div className="drawer-side z-40">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <aside className="menu p-4 w-64 min-h-full bg-base-200">
          <NavBar />
        </aside>
      </div>
    </div>
  );
};
