import { createEffect, createStore, createEvent, sample } from 'effector';
import type { TastingEntry } from './types';
import { addTastingEntry, getAllTastingEntriesByUser } from './db';
import { showAlert } from '../../shared/model/alertModel';

/*********************************************************** */
/** Fetching tastings 
/*********************************************************** */
//const fetchTastingsFx = createEffect(getAllTastingEntries);
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
  fn: (error) => `Error al cargar entradas: ${error}`,
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
  fn: (id) => `Entrada guardada con ID: ${id}`,
  target: showAlert
});

// Al fallar al añadir
sample({
  clock: addTastingEntryFx.failData,
  fn: () => 'Error al guardar la entrada',
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
