import { createEffect } from 'effector';

export const showSuccessFx = createEffect((message: string) => {
  alert(message);
});

export const showErrorFx = createEffect((message: string) => {
  alert(message);
});
