import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { useLocalizedDateFormat } from '../../hooks/useLocalizedDateFormat';
import { tastingEvents, tastingStores } from '../../api/tasting/model';
import { authStores } from '../../shared/model/authModel';
import { Coffee } from 'lucide-react';

export const TastingList = () => {
  const entries = useUnit(tastingStores.$tastingList);
  const getTastings = useUnit(tastingEvents.getTastings);
  const user = useUnit(authStores.$user);
  const { formatDate } = useLocalizedDateFormat();

  useEffect(() => {
    if (user) {
      getTastings(user.id);
    }
  }, [getTastings, user]);

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
              // aquí podrías hacer navegación hacia el formulario nueva cata, por ejemplo
              // navigate('/nueva-cata') si usas react-router
            }}
          >
            Añadir nueva cata
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Todas las catas</h2>
          <div className="flex flex-col">
            {entries.map((entry) => (
              <div key={entry.id} className="card card-border card-xs mb-2">
                <div className="card-body">
                  <h2 className="card-title">Card Title</h2>
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
