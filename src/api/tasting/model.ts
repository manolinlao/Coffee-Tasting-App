import { createEffect, createStore, createEvent, sample } from 'effector';
import type { TastingEntry, TastingEntryInput } from './types';
import {
  addTastingEntry,
  deleteAllTastingEntries,
  deleteTastingEntry,
  getAllTastingEntriesByUser
} from './db';
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

const addTasting = createEvent<TastingEntryInput>();

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
/** Delete tastings 
/*********************************************************** */
const deleteTastingEntryFx = createEffect(async (id: number) => {
  await deleteTastingEntry(id);
  return id; // retornamos el id borrado para actualizar estado
});

const deleteAllTastingEntriesFx = createEffect(async () => {
  await deleteAllTastingEntries();
});

const deleteTastingEntryEvt = createEvent<number>();
const deleteAllTastingEntriesEvt = createEvent();

/** Actualiza la lista en memoria quitando la entrada borrada */
$tastingList.on(deleteTastingEntryFx.doneData, (state, deletedId) =>
  state.filter((entry) => entry.id !== deletedId)
);

/** Vacía la lista cuando borramos todo */
$tastingList.on(deleteAllTastingEntriesFx.done, () => []);

/** Llama al efecto para borrar */
sample({
  clock: deleteTastingEntryEvt,
  target: deleteTastingEntryFx
});

sample({
  clock: deleteAllTastingEntriesEvt,
  target: deleteAllTastingEntriesFx
});

/** Alertas para borrar */
sample({
  clock: deleteTastingEntryFx.doneData,
  fn: (id) => ({
    message: `Entrada con ID ${id} borrada`,
    type: ALERT_TYPE.Success
  }),
  target: showAlert
});

sample({
  clock: deleteTastingEntryFx.failData,
  fn: () => ({
    message: 'Error al borrar la entrada',
    type: ALERT_TYPE.Error
  }),
  target: showAlert
});

sample({
  clock: deleteAllTastingEntriesFx.done,
  fn: () => ({
    message: 'Todas las entradas han sido borradas',
    type: ALERT_TYPE.Success
  }),
  target: showAlert
});

sample({
  clock: deleteAllTastingEntriesFx.failData,
  fn: () => ({
    message: 'Error al borrar todas las entradas',
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
  addTasting,
  deleteTastingEntryEvt,
  deleteAllTastingEntriesEvt
};

export const tastingEffects = {
  fetchTastingsFx,
  addTastingEntryFx,
  deleteTastingEntryFx
};
