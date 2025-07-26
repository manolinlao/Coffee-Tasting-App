// src/shared/model/alertModel.ts
import { createStore, createEvent } from 'effector';

export const showAlert = createEvent<string | null>();

export const $alertMessage = createStore<string | null>(null).on(
  showAlert,
  (_, msg) => msg
);
