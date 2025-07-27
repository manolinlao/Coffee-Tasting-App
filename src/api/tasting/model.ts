import { createEffect, createStore, createEvent, sample } from 'effector';
import type { TastingEntry } from './types';
import { addTastingEntry, getAllTastingEntriesByUser } from './db';
import { ALERT_TYPE, showAlert } from '../../shared/model/alertModel';

/*********************************************************** */
/** Fetching tastings 
/*********************************************************** */
export const fetchTastingsFx = createEffect(
  async (userId: string) => await getAllTastingEntriesByUser(userId)
);

export const getTastings = createEvent<string>(); // userId

const $tastingList = createStore<TastingEntry[]>([]).on(
  fetchTastingsFx.doneData,
  (_, data) => data
);
const $isFetching = fetchTastingsFx.pending;

sample({
  clock: getTastings,
  target: fetchTastingsFx
});

sample({
  clock: fetchTastingsFx.failData,
  fn: (error) => ({
    message: `Error al cargar entradas: ${error}`,
    type: ALERT_TYPE.Error
  }),
  target: showAlert
});

/*********************************************************** */
/** Adding tastings 
/*********************************************************** */
export const addTastingEntryFx = createEffect(
  async (entry: Omit<TastingEntry, 'id'>) => {
    return await addTastingEntry(entry);
  }
);

const addTasting = createEvent<TastingEntry>();

const $isSubmitting = addTastingEntryFx.pending;
const $addError = createStore<string | null>(null)
  .on(addTastingEntryFx.failData, (_, error) => {
    console.error('Error en addTastingEntryFx:', error);
    return `Error adding tasting: ${error}`;
  })
  .reset(addTastingEntryFx.done);

sample({
  clock: addTasting,
  target: addTastingEntryFx
});

sample({
  clock: addTastingEntryFx.doneData,
  fn: (id) => ({
    message: `Entrada guardada con ID: ${id}`,
    type: ALERT_TYPE.Success
  }),
  target: showAlert
});

// Al fallar al añadir
sample({
  clock: addTastingEntryFx.failData,
  fn: () => ({
    message: 'Error al guardar la entrada',
    type: ALERT_TYPE.Error
  }),
  target: showAlert
});

/*********************************************************** */
/** Exports
/*********************************************************** */
export const tastingStores = {
  $tastingList,
  $isFetching,
  $isSubmitting,
  $addError
};

export const tastingEvents = {
  getTastings,
  addTasting
};

export const tastingEffects = {
  fetchTastingsFx,
  addTastingEntryFx
};
