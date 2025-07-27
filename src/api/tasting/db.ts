import { openDB } from 'idb';
import type { TastingEntry } from './types';

const DB_NAME = 'coffeeTastingDB';
const STORE_NAME = 'tastingEntries';
const DB_VERSION = 1;

/**
 * 
 * To delete DB from browser, from console execute:
 * 
indexedDB.deleteDatabase('coffeeTastingDB').onsuccess = () => {
  console.log('Base de datos borrada');
  location.reload();
};

Cómo funciona IndexedDB con versionado y upgrades
Cuando abres la base con openDB(name, version, { upgrade }), 
IndexedDB sólo llama a la función upgrade si subes la versión (o si la base no existía).

En la función upgrade, defines qué objectStore crear.

Pero si la base ya existe y la versión NO cambia, 
IndexedDB NO ejecuta upgrade y por tanto no crea ningún nuevo object store.

Por eso si antes tenías un object store llamado tastings y 
luego en tu código cambias a tastingEntries pero no subes la versión, 
la base sigue con el store antiguo tastings y no tiene tastingEntries.
 */

async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true //esto fuerza que las id's sean number
        });
      }
    }
  });
}

export async function addTastingEntry(entry: Omit<TastingEntry, 'id'>) {
  const db = await getDB();
  const id = await db.add(STORE_NAME, entry);
  return id;
}

export async function getAllTastingEntries(): Promise<TastingEntry[]> {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function getAllTastingEntriesByUser(
  userId: string
): Promise<TastingEntry[]> {
  const db = await getDB();
  const allEntries = await db.getAll(STORE_NAME);
  return allEntries.filter((entry) => entry.userId === userId);
}

export async function deleteTastingEntry(id: number): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.delete(id);
  await tx.done;
}

export async function deleteAllTastingEntries(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.clear();
  await tx.done;
}
