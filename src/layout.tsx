// src/layout.tsx
import { Outlet, NavLink } from 'react-router-dom';

export const AppLayout = () => {
  //const language = useUnit(langStores.$language);
  //const [menuOpen, setMenuOpen] = useState(false);
  /*
  const onChangeLanguage = (e: { value: string }) => {
    langEvents.changeLanguage(e.value);
  };
  */

  return (
    <>
      <div>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'font-bold' : '')}
            >
              Nueva cata <button className="btn btn-primary">Button</button>
              <button className="btn w-64 rounded-full">Button</button>
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
      <div>
        {/*<div className="mt-4 md:mt-auto">
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
        */}
      </div>

      <Outlet />
    </>
  );
};
