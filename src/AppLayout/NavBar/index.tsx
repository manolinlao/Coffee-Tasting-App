import { useUnit } from 'effector-react';
import { NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { langEvents, langStores } from '../../shared/model/languageModel';
import { authEvents } from '../../shared/model/authModel';

export const NavBar = () => {
  const language = useUnit(langStores.$language);
  const changeLanguage = useUnit(langEvents.changeLanguage);
  const logout = useUnit(authEvents.logout);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];
  return (
    <div>
      <nav className="space-y-2">
        <NavLink
          to="/create"
          className={({ isActive }) =>
            `block px-2 py-1 rounded hover:bg-base-300 ${
              isActive ? 'font-bold bg-base-300' : ''
            }`
          }
        >
          Nueva cata
        </NavLink>
        <NavLink
          to="/list"
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
    </div>
  );
};
