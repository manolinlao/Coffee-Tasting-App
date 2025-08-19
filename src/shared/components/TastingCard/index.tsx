import { Trash2 } from 'lucide-react';
import { useUnit } from 'effector-react';
import type { TastingEntry } from '../../../api/tasting/types';
import { useLocalizedDateFormat } from '../../../hooks/useLocalizedDateFormat';
import { confirmModalModelEvents } from '../../model/confirmModalModel';
import { tastingEvents } from '../../../api/tasting/model';
import { useEffect, useState } from 'react';
import { photoEffects } from '../../../api/photo/model';
import type { PhotoEntry } from '../../../api/photo/types';
import { PhotoCarousel } from '../PhotoCarousel';

interface TastingCardProps {
  tastingEntry: TastingEntry;
}

export const TastingCard: React.FC<TastingCardProps> = ({ tastingEntry }) => {
  const showConfirmModal = useUnit(confirmModalModelEvents.showConfirmModal);
  const deleteEntry = useUnit(tastingEvents.deleteTastingEntryEvt);
  const fetchPhotosByTastingIdFx = useUnit(
    photoEffects.fetchPhotosByTastingIdFx
  );

  const [photos, setPhotos] = useState<PhotoEntry[]>([]);

  const { formatDate } = useLocalizedDateFormat();

  useEffect(() => {
    fetchPhotosByTastingIdFx(tastingEntry.id)
      .then(setPhotos)
      .catch((err) => console.error('Error cargando fotos:', err));
  }, [tastingEntry.id, fetchPhotosByTastingIdFx]);

  const handleDeleteEntry = (id: number) => {
    showConfirmModal({
      message: '¿Seguro que quieres borrar esta cata?',
      onConfirm: () => deleteEntry(id)
    });
  };

  return (
    <div className="card card-border card-xs mb-2">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title">Card Title</h2>
          <button
            className="btn btn-error btn-xs"
            onClick={() => handleDeleteEntry(tastingEntry.id)}
            title="Borrar esta cata"
          >
            <Trash2 size={14} />
          </button>
        </div>
        <p>Origen: {tastingEntry.origin}</p>
        <p>Método: {tastingEntry.method}</p>
        <p>Fecha: {formatDate(tastingEntry.date)}</p>
        <p>Notas: {tastingEntry.notes}</p>
        <p>Puntuación: {tastingEntry.score}</p>

        {photos.length > 0 && (
          <PhotoCarousel photos={photos} heightClass="h-48" />
        )}
      </div>
    </div>
  );
};
