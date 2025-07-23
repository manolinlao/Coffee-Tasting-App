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
        <div style={{ display: 'grid', gap: '1rem' }}>
          {entries.map((entry) => (
            <div key={entry.id}>
              <p>Origen: {entry.origin}</p>
              <p>Método: {entry.method}</p>
              <p>Fecha: {formatDate(entry.date)}</p>
              <p>Notas: {entry.notes}</p>
              <p>Puntuación: {entry.score}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
