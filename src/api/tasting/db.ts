import { TASTING_STORE_NAME } from '../constants';
import { getDB } from '../db';
import type { TastingEntry } from './types';

export async function addTastingEntry(entry: Omit<TastingEntry, 'id'>) {
  const db = await getDB();
  const id = await db.add(TASTING_STORE_NAME, entry);
  return id;
}

export async function getAllTastingEntries(): Promise<TastingEntry[]> {
  const db = await getDB();
  return db.getAll(TASTING_STORE_NAME);
}

export async function getAllTastingEntriesByUser(
  userId: string
): Promise<TastingEntry[]> {
  const db = await getDB();
  const allEntries = await db.getAll(TASTING_STORE_NAME);
  return allEntries.filter((entry) => entry.userId === userId);
}

export async function deleteTastingEntry(id: number): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(TASTING_STORE_NAME, 'readwrite');
  const store = tx.objectStore(TASTING_STORE_NAME);
  await store.delete(id);
  await tx.done;
}

export async function deleteAllTastingEntries(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(TASTING_STORE_NAME, 'readwrite');
  const store = tx.objectStore(TASTING_STORE_NAME);
  await store.clear();
  await tx.done;
}
