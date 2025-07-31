import { createEffect, createEvent, createStore, sample } from 'effector';
import type { PhotoEntry, TempPhoto } from './types';
import * as photoDB from './db';
import { tastingEffects } from '../tasting/model';

// Eventos
const addTempPhoto = createEvent<TempPhoto>();
const addTempPhotos = createEvent<TempPhoto[]>();
const removeTempPhoto = createEvent<string>();
export const clearTempPhotos = createEvent();

export const savePhotosFx = createEffect(
  async ({ tastingId, photos }: { tastingId: number; photos: TempPhoto[] }) => {
    const entries: Omit<PhotoEntry, 'id'>[] = photos.map((photo) => ({
      tastingId,
      blob: photo.blob,
      type: photo.type,
      createdAt: new Date()
    }));

    console.log('entries', entries);

    const result = await Promise.all(
      entries.map((photo) => photoDB.addPhoto(photo))
    );

    return result;
  }
);

// Store de fotos temporales
const $tempPhotos = createStore<TempPhoto[]>([])
  .on(addTempPhoto, (state, photo) => [...state, photo])
  .on(addTempPhotos, (_, photos) => photos)
  .on(removeTempPhoto, (state, id) => state.filter((p) => p.id !== id))
  .reset(clearTempPhotos);

// Al guardar con éxito, limpiamos las fotos temporales
sample({
  clock: savePhotosFx.done,
  target: clearTempPhotos
});

sample({
  source: savePhotosFx.fail,
  fn: (err) => {
    console.log('FAIL', err);
  },
  target: clearTempPhotos
});

sample({
  source: $tempPhotos,
  clock: tastingEffects.addTastingEntryFx.doneData,
  fn: (photos, tastingId) => {
    console.log('entrada guardada', tastingId, photos);
    return { tastingId: tastingId as number, photos };
  },
  target: savePhotosFx
});

export const photoStores = {
  $tempPhotos
};

export const phbotoEvents = {
  addTempPhoto,
  addTempPhotos,
  removeTempPhoto
};
