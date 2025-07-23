import { createEffect, createStore, createEvent, sample } from 'effector';
import type { TastingEntry } from './types';
import { addTastingEntry, getAllTastingEntries } from './db';
import { showErrorFx, showSuccessFx } from '../../shared/model/toastModel';

/*********************************************************** */
/** Fetching tastings 
/*********************************************************** */
const fetchTastingsFx = createEffect(getAllTastingEntries);

const getTastings = createEvent();

const $tastingList = createStore<TastingEntry[]>([]).on(
  fetchTastingsFx.doneData,
  (_, data) => data
);
const $isFetching = fetchTastingsFx.pending;
const $fetchError = createStore<string | null>(null)
  .on(fetchTastingsFx.failData, (_, error) => {
    console.error('Error in fetchTastingsFx:', error);
    return `Error getting tastings: ${error}`;
  })
  .reset([fetchTastingsFx.done, fetchTastingsFx.pending]);

sample({
  clock: getTastings,
  target: fetchTastingsFx,
});

sample({
  clock: fetchTastingsFx.failData,
  fn: (error) => `Error al cargar entradas: ${error}`,
  target: showErrorFx,
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
  target: addTastingEntryFx,
});

sample({
  clock: addTastingEntryFx.doneData,
  fn: (id) => `Entrada guardada con ID: ${id}`,
  target: showSuccessFx,
});

// Al fallar al añadir
sample({
  clock: addTastingEntryFx.failData,
  fn: () => 'Error al guardar la entrada',
  target: showErrorFx,
});

/*********************************************************** */
/** Exports
/*********************************************************** */
export const tastingStores = {
  $tastingList,
  $isFetching,
  $isSubmitting,
  $addError,
  $fetchError,
};

export const tastingEvents = {
  getTastings,
  addTasting,
};

export const tastingEffects = {
  fetchTastingsFx,
  addTastingEntryFx,
};
