// src/layout.tsx
import { useUnit } from 'effector-react';
import { Outlet, NavLink } from 'react-router-dom';
import { langEvents, langStores } from './shared/model/languageModel';

export const AppLayout = () => {
  const language = useUnit(langStores.$language);
  const changeLanguage = useUnit(langEvents.changeLanguage);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  return (
    <>
      <div>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'font-bold' : '')}
            >
              Nueva cata
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tastings"
              className={({ isActive }) => (isActive ? 'font-bold' : '')}
            >
              Listado
            </NavLink>
          </li>
        </ul>
      </div>
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

      <Outlet />
    </>
  );
};
