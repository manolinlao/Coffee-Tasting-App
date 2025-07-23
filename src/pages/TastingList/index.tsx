import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { useLocalizedDateFormat } from '../../hooks/useLocalizedDateFormat';
import { tastingEvents, tastingStores } from '../../api/tasting/model';

export const TastingList = () => {
  const entries = useUnit(tastingStores.$tastingList);
  const getTastings = useUnit(tastingEvents.getTastings);
  const { formatDate } = useLocalizedDateFormat();

  useEffect(() => {
    getTastings();
  }, [getTastings]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Todas las catas</h2>
      {entries.length === 0 ? (
        <p>No hay catas guardadas.</p>
      ) : (
        <div className="flex-col">
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
      )}
    </div>
  );
};
