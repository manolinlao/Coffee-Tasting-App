import { PHOTO_STORE_NAME } from '../constants';
import { getDB } from '../db';
import type { PhotoEntry } from './types';

/** Añade una foto y devuelve su ID */
export async function addPhoto(photo: Omit<PhotoEntry, 'id'>) {
  console.log('🧪 adding photo to IndexedDB:', photo);
  const db = await getDB();
  const id = await db.add(PHOTO_STORE_NAME, photo);
  return id;
}

/** Devuelve todas las fotos asociadas a una entrada de cata */
export async function getPhotosByTastingId(
  tastingId: number
): Promise<PhotoEntry[]> {
  const db = await getDB();
  return db.getAllFromIndex(PHOTO_STORE_NAME, 'tastingId', tastingId);
}

/** Borra una foto concreta */
export async function deletePhoto(id: number): Promise<void> {
  const db = await getDB();
  await db.delete(PHOTO_STORE_NAME, id);
}

/** Borra todas las fotos de una entrada */
export async function deletePhotosByTastingId(
  tastingId: number
): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(PHOTO_STORE_NAME, 'readwrite');
  const store = tx.objectStore(PHOTO_STORE_NAME);
  const index = store.index('tastingId');

  const cursor = await index.openCursor(tastingId);
  while (cursor) {
    await cursor.delete();
    await cursor.continue();
  }

  await tx.done;
}
