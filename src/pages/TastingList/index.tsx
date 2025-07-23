import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { Card } from 'primereact/card';
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
            <Card
              key={entry.id}
              title={entry.coffeeName}
              subTitle={entry.roaster}
            >
              <p>Origen: {entry.origin}</p>
              <p>Método: {entry.method}</p>
              <p>Fecha: {formatDate(entry.date)}</p>
              <p>Notas: {entry.notes}</p>
              <p>Puntuación: {entry.score}</p>
              {/* Podrías añadir fotos si las muestras como URL o miniaturas más adelante */}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
