// src/pages/Login.tsx
import { useState } from 'react';
import { useUnit } from 'effector-react';
import {
  authEffects,
  authEvents,
  authStores
} from '../../shared/model/authModel';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = useUnit(authEvents.login);
  const loggingIn = useUnit(authEffects.loginFx.pending);
  const loginError = useUnit(authStores.$loginError);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <form
        onSubmit={onSubmit}
        className="bg-base-100 p-6 rounded shadow-md w-80 space-y-4"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <input
          type="text"
          placeholder="Usuario"
          className="input input-bordered w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginError && (
          <p className="text-error text-sm">Credenciales inválidas</p>
        )}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loggingIn}
        >
          {loggingIn ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};
