import { createStore, createEvent } from 'effector';

export const ALERT_TYPE = {
  Success: 'success',
  Error: 'error',
  Warning: 'warning',
  Info: 'info'
} as const;

export type AlertType = (typeof ALERT_TYPE)[keyof typeof ALERT_TYPE];

export interface AlertState {
  message: string | null;
  type?: AlertType;
}

export const showAlert = createEvent<AlertState | null>();

export const $alert = createStore<AlertState>({
  message: null,
  type: ALERT_TYPE.Info
}).on(
  showAlert,
  (_, alert) => alert || { message: null, type: ALERT_TYPE.Info }
);
