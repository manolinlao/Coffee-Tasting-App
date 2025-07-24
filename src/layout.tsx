import { useUnit } from 'effector-react';
import { Outlet, NavLink } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';
import { langEvents, langStores } from './shared/model/languageModel';
import { authEvents } from './shared/model/authModel';

export const AppLayout = () => {
  const language = useUnit(langStores.$language);
  const changeLanguage = useUnit(langEvents.changeLanguage);
  const logout = useUnit(authEvents.logout);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-base-200 border-r p-4">
        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-2 py-1 rounded hover:bg-base-300 ${
                isActive ? 'font-bold bg-base-300' : ''
              }`
            }
          >
            Nueva cata
          </NavLink>
          <NavLink
            to="/tastings"
            className={({ isActive }) =>
              `block px-2 py-1 rounded hover:bg-base-300 ${
                isActive ? 'font-bold bg-base-300' : ''
              }`
            }
          >
            Listado
          </NavLink>
        </nav>

        <div className="mt-6">
          <label className="block text-sm mb-1">Idioma</label>
          <select
            className="select select-bordered w-full"
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 mt-2 btn btn-outline" onClick={logout}>
          Logout
          <LogOut />
        </div>
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
            <nav className="space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-2 py-1 rounded hover:bg-base-300 ${
                    isActive ? 'font-bold bg-base-300' : ''
                  }`
                }
              >
                Nueva cata
              </NavLink>
              <NavLink
                to="/tastings"
                className={({ isActive }) =>
                  `block px-2 py-1 rounded hover:bg-base-300 ${
                    isActive ? 'font-bold bg-base-300' : ''
                  }`
                }
              >
                Listado
              </NavLink>
            </nav>

            <div className="mt-6">
              <label className="block text-sm mb-1">Idioma</label>
              <select
                className="select select-bordered w-full"
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 mt-2 btn btn-outline" onClick={logout}>
              Logout
              <LogOut />
            </div>
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
