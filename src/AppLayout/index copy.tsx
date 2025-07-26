import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { NavBar } from './NavBar';

export const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-base-200 border-r p-4">
        <NavBar />
      </aside>

      {/* Mobile drawer */}
      <div className="md:hidden drawer">
        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Top bar */}
          <div className="navbar bg-base-100 border-b px-4">
            <label htmlFor="mobile-drawer" className="btn btn-square btn-ghost">
              <Menu size={24} />
            </label>
            <span className="ml-4 font-bold text-xl">Coffee Tasting</span>
          </div>

          {/* Main content */}
          <main className="p-4 overflow-auto">
            <Outlet />
          </main>
        </div>
        <div className="drawer-side z-40">
          <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
          <aside className="menu p-4 w-64 min-h-full bg-base-200">
            <NavBar />
          </aside>
        </div>
      </div>

      {/* Main content on desktop */}
      <div className="flex-1 hidden md:block p-4 overflow-auto">
        <div className="text-xl font-bold mb-4">Coffee Tasting</div>
        <Outlet />
      </div>
    </div>
  );
};
