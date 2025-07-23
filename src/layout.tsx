// src/layout.tsx
import { Outlet, NavLink } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { langEvents, langStores } from './shared/model/languageModel';
import { languages } from './i18n/constants';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export const AppLayout = () => {
  const language = useUnit(langStores.$language);
  const [menuOpen, setMenuOpen] = useState(false);

  const onChangeLanguage = (e: { value: string }) => {
    langEvents.changeLanguage(e.value);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen md:flex-row">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between bg-gray-100 p-4 md:hidden">
          <h2 className="text-xl font-bold">☕ Coffee Journal</h2>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </header>

        {/* Sidebar */}
        <aside
          className={`bg-gray-100 border-r w-full md:w-60 p-4 md:block ${
            menuOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'font-bold' : '')}
                onClick={() => setMenuOpen(false)}
              >
                Nueva cata
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tastings"
                className={({ isActive }) => (isActive ? 'font-bold' : '')}
                onClick={() => setMenuOpen(false)}
              >
                Listado
              </NavLink>
            </li>
          </ul>

          <div className="mt-4 md:mt-auto">
            <Dropdown
              value={language}
              options={languages}
              onChange={onChangeLanguage}
              optionLabel="label"
              optionValue="code"
              placeholder="Idioma"
              className="w-full"
            />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
};
