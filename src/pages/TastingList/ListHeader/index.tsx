import { useUnit } from 'effector-react';
import { Trash2 } from 'lucide-react';
import { confirmModalModelEvents } from '../../../shared/model/confirmModalModel';
import { tastingEvents } from '../../../api/tasting/model';

export const ListHeader = () => {
  const showConfirmModal = useUnit(confirmModalModelEvents.showConfirmModal);
  const deleteAllEntries = useUnit(tastingEvents.deleteAllTastingEntriesEvt);

  const handleDeleteAll = () => {
    showConfirmModal({
      message:
        '¿Seguro que quieres borrar TODAS las catas? Esta acción no se puede deshacer.',
      onConfirm: () => deleteAllEntries()
    });
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-semibold">Todas las catas</h2>
      <button
        className="btn btn-danger btn-sm flex items-center gap-2"
        onClick={handleDeleteAll}
        title="Borrar todas las catas"
      >
        <Trash2 size={16} />
        Borrar todo
      </button>
    </div>
  );
};
