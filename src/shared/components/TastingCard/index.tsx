import { Trash2 } from 'lucide-react';
import { useUnit } from 'effector-react';
import type { TastingEntry } from '../../../api/tasting/types';
import { useLocalizedDateFormat } from '../../../hooks/useLocalizedDateFormat';
import { confirmModalModelEvents } from '../../model/confirmModalModel';
import { tastingEvents } from '../../../api/tasting/model';

interface TastingCardProps {
  tastingEntry: TastingEntry;
}

export const TastingCard: React.FC<TastingCardProps> = ({ tastingEntry }) => {
  const showConfirmModal = useUnit(confirmModalModelEvents.showConfirmModal);
  const deleteEntry = useUnit(tastingEvents.deleteTastingEntryEvt);

  const { formatDate } = useLocalizedDateFormat();

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
      </div>
    </div>
  );
};
