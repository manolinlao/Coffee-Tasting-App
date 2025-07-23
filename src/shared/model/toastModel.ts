import { createEffect } from 'effector';
import { showSuccess, showError } from '../ui/showToast';

export const showSuccessFx = createEffect((message: string) => {
  showSuccess(message);
});

export const showErrorFx = createEffect((message: string) => {
  showError(message);
});
