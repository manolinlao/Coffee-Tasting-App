import { sample } from 'effector';
import { tastingEffects } from './tasting/model';
import { photoEffects, photoStores } from './photo/model';

// Cuando guardo una cata, guardo sus fotos
sample({
  source: photoStores.$tempPhotos,
  clock: tastingEffects.addTastingEntryFx.doneData,
  fn: (photos, tastingId) => ({ tastingId: tastingId as number, photos }),
  target: photoEffects.savePhotosFx
});

// Cuando elimino una cata, borro sus fotos
sample({
  clock: tastingEffects.deleteTastingEntryFx.done.map(({ params }) => params),
  target: photoEffects.deletePhotosByTastingIdFx
});
