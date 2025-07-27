import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { Coffee, Trash2 } from 'lucide-react';
import { tastingEvents, tastingStores } from '../../api/tasting/model';
import { useLocalizedDateFormat } from '../../hooks/useLocalizedDateFormat';
import { authStores } from '../../shared/model/authModel';
import { confirmModalModelEvents } from '../../shared/model/confirmModalModel';

export const TastingList = () => {
  const entries = useUnit(tastingStores.$tastingList);
  const getTastings = useUnit(tastingEvents.getTastings);
  const user = useUnit(authStores.$user);
  const showConfirmModal = useUnit(confirmModalModelEvents.showConfirmModal);
  const deleteEntry = useUnit(tastingEvents.deleteTastingEntryEvt);
  const deleteAllEntries = useUnit(tastingEvents.deleteAllTastingEntriesEvt);

  const { formatDate } = useLocalizedDateFormat();

  useEffect(() => {
    if (user) {
      getTastings(user.id);
    }
  }, [getTastings, user]);

  const handleDeleteEntry = (id: number) => {
    showConfirmModal({
      message: '¿Seguro que quieres borrar esta cata?',
      onConfirm: () => deleteEntry(id)
    });
  };

  const handleDeleteAll = () => {
    showConfirmModal({
      message:
        '¿Seguro que quieres borrar TODAS las catas? Esta acción no se puede deshacer.',
      onConfirm: () => deleteAllEntries()
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">
          <Coffee size={48} className="mb-4 text-yellow-600" />
          <p className="mb-2 text-lg font-medium">No hay catas guardadas</p>
          <p className="max-w-sm">
            Aún no has registrado ninguna cata. Comienza añadiendo una nueva
            para guardar tus experiencias y descubrir nuevos sabores.
          </p>
          <button
            className="mt-6 btn btn-primary"
            onClick={() => {
              // navegación al formulario, si tienes un router configurado
              // navigate('/nueva-cata')
            }}
          >
            Añadir nueva cata
          </button>
        </div>
      ) : (
        <div>
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
          <div className="flex flex-col">
            {entries.map((entry) => (
              <div key={entry.id} className="card card-border card-xs mb-2">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <h2 className="card-title">Card Title</h2>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleDeleteEntry(entry.id)}
                      title="Borrar esta cata"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p>Origen: {entry.origin}</p>
                  <p>Método: {entry.method}</p>
                  <p>Fecha: {formatDate(entry.date)}</p>
                  <p>Notas: {entry.notes}</p>
                  <p>Puntuación: {entry.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
