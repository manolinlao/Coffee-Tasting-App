import { createStore, createEvent, createEffect, sample } from 'effector';
import { persist } from 'effector-storage/local';

type User = {
  id: string;
  name: string;
};

// Evento para iniciar sesión
const login = createEvent<{ username: string; password: string }>();
const logout = createEvent();

logout.watch(() => {
  localStorage.clear();
});

// Mock efecto login
const loginFx = createEffect(
  async ({ username, password }: { username: string; password: string }) => {
    // Aquí puedes hacer llamada real a backend
    // Mock: si username y password iguales a "test" -> éxito, sino error
    if (username === 'test' && password === 'test') {
      return { id: '1', name: 'Test User' } as User;
    }
    throw new Error('Invalid credentials');
  }
);

// Al hacer login, disparar efecto
sample({
  clock: login,
  target: loginFx
});

// Store con el usuario logueado (null si no)
const $user = createStore<User | null>(null)
  .on(loginFx.doneData, (_, user) => user)
  .on(logout, () => null)
  .reset(loginFx.fail);

// Persistir usuario en localStorage para mantener sesión
persist({
  store: $user,
  key: 'user'
});

const $loginError = createStore<Error | null>(null)
  .on(loginFx.failData, (_, error) => error)
  .reset(loginFx.doneData);

export const authStores = {
  $user,
  $loginError
};

export const authEvents = {
  login,
  logout
};

export const authEffects = {
  loginFx
};
