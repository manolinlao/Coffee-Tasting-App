import { createEvent, createStore } from 'effector';

export type ConfirmModalPayload = {
  message: string;
  onConfirm: () => void;
};

// Eventos
const showConfirmModal = createEvent<ConfirmModalPayload>();
const hideConfirmModal = createEvent();

// Store que contiene los datos del modal (null = oculto)
const $confirmModal = createStore<ConfirmModalPayload | null>(null)
  .on(showConfirmModal, (_, payload) => payload)
  .on(hideConfirmModal, () => null);

export const confirmModalModelStores = {
  $confirmModal
};

export const confirmModalModelEvents = {
  showConfirmModal,
  hideConfirmModal
};
