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

import { openDB } from 'idb';
import {
  DB_NAME,
  DB_VERSION,
  TASTING_STORE_NAME,
  PHOTO_STORE_NAME
} from './constants';

export function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(TASTING_STORE_NAME)) {
        db.createObjectStore(TASTING_STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true
        });
      }

      if (!db.objectStoreNames.contains(PHOTO_STORE_NAME)) {
        const photoStore = db.createObjectStore(PHOTO_STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true
        });
        photoStore.createIndex('tastingId', 'tastingId', { unique: false });
      }
    }
  });
}
